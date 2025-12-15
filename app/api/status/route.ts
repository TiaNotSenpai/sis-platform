import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const UNIMIA_URL = 'https://www.unimi.it/it'; 

export async function GET() {
  const start = performance.now();
  console.log("--- START PING CHECK ---");

  // 1. RECUPERO VARIABILI
  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const sbKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let supabase = null;

  // 2. CONTROLLO DI SICUREZZA
  // Se le chiavi ci sono, attivo Supabase. Se mancano, loggo l'errore MA NON CRASHO.
  if (sbUrl && sbKey) {
    try {
      supabase = createClient(sbUrl, sbKey);
    } catch (e) {
      console.error("Errore inizializzazione Supabase:", e);
    }
  } else {
    console.error("ATTENZIONE: Variabili Supabase mancanti su Vercel!");
  }

  let status = 'down';
  let code = 0;

  try {
    const response = await fetch(UNIMIA_URL, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html',
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(6000),
    });
    
    code = response.status;
    if (response.ok || (code >= 300 && code < 400)) status = 'operational';
    else if (code === 403) status = 'degraded'; // Firewall block
    else if (code >= 500) status = 'degraded';

  } catch (error) {
    status = 'down';
    code = 500;
  }

  const end = performance.now();
  const latency = Math.round(end - start);

  // 3. SALVATAGGIO (SOLO SE SUPABASE ESISTE)
  let lastDownDate = null;

  if (supabase) {
    try {
      await supabase.from('uptime_logs').insert([{ status, latency }]);
      
      const { data } = await supabase
        .from('uptime_logs')
        .select('created_at')
        .eq('status', 'down')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
        
      lastDownDate = data?.created_at || null;
      
      // Pulizia background
      const hours48Ago = new Date(Date.now() - (48 * 60 * 60 * 1000)).toISOString();
      await supabase.from('uptime_logs').delete().lt('created_at', hours48Ago).neq('status', 'down');
    } catch (dbError) {
      console.error("Errore DB:", dbError);
    }
  }

  return NextResponse.json({ 
    status, 
    latency, 
    timestamp: new Date().toISOString(),
    code,
    lastDown: lastDownDate
  });
}