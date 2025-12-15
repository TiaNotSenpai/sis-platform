import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 0;

const UNIMIA_URL = 'https://www.unimi.it/it'; 

export async function GET() {
  // Client Supabase dentro la funzione (Build-safe)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const start = performance.now();
  let status = 'down';
  let code = 0;

  try {
    // IL TRUCCO: Mettiamo i "baffi finti" alla richiesta
    const response = await fetch(UNIMIA_URL, {
      method: 'GET', // Usiamo GET invece di HEAD, è più umano
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(8000), // Timeout 8s
    });
    
    code = response.status;
    
    // Accettiamo anche i redirect (3xx) come "operativo"
    if (response.ok || (code >= 300 && code < 400)) {
        status = 'operational';
    } else if (code >= 500) {
        status = 'degraded';
    } else if (code === 403) {
        // Se ci dà 403, probabilmente ci sta ancora bloccando il firewall, ma il sito è su.
        // Possiamo considerarlo "degraded" o rischiare "operational".
        // Per sicurezza mettiamo degraded così capiamo che c'è un problema di accesso.
        status = 'degraded'; 
        console.log("Firewall Block 403 rilevato");
    }

  } catch (error) {
    status = 'down';
    code = 500;
    console.error("Ping Error:", error);
  }

  const end = performance.now();
  const latency = Math.round(end - start);

  // 1. INSERIMENTO LOG
  supabase.from('uptime_logs').insert([{ status, latency }]).then();

  // 2. PULIZIA
  const now = new Date();
  const hours48Ago = new Date(now.getTime() - (48 * 60 * 60 * 1000)).toISOString();
  const days30Ago = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString();

  supabase.from('uptime_logs').delete().lt('created_at', hours48Ago).neq('status', 'down').then();
  supabase.from('uptime_logs').delete().lt('created_at', days30Ago).eq('status', 'down').then();

  // 3. RECUPERO LAST DOWN
  const { data: lastDownData } = await supabase
    .from('uptime_logs')
    .select('created_at')
    .eq('status', 'down')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  return NextResponse.json({ 
    status, 
    latency, 
    timestamp: new Date().toISOString(),
    code,
    lastDown: lastDownData?.created_at || null 
  });
}