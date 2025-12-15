import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Impedisce a Vercel di salvare la risposta in cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const UNIMIA_URL = 'https://www.unimi.it/it'; 

export async function GET() {
  const start = performance.now();
  console.log("--- START PING CHECK ---"); // Log per debug Vercel

  // 1. Inizializza Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  let status = 'down';
  let code = 0;

  try {
    // 2. Fai il Ping (con User-Agent finto)
    const response = await fetch(UNIMIA_URL, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(6000), // Timeout ridotto a 6s per sicurezza
    });
    
    code = response.status;
    console.log(`Ping Response Code: ${code}`); // Log

    if (response.ok || (code >= 300 && code < 400)) {
        status = 'operational';
    } else if (code === 403) {
        // 403 = Firewall. Consideriamolo "Degraded" ma online.
        status = 'degraded';
        console.log("Rilevato Blocco 403 (Firewall)");
    } else if (code >= 500) {
        status = 'degraded';
    }

  } catch (error: any) {
    console.error("Errore Fetch:", error.message);
    status = 'down';
    code = 500;
  }

  const end = performance.now();
  const latency = Math.round(end - start);

  // 3. SALVATAGGIO NEL DB (CON AWAIT!!!)
  // Qui sta il fix: aspettiamo che Supabase risponda prima di chiudere la funzione
  const { error: insertError } = await supabase
    .from('uptime_logs')
    .insert([{ status, latency }]);
    
  if (insertError) {
    console.error("Errore Salvataggio Supabase:", insertError);
  } else {
    console.log("Log salvato con successo.");
  }

  // 4. RECUPERO LAST DOWN (CON AWAIT!!!)
  const { data: lastDownData } = await supabase
    .from('uptime_logs')
    .select('created_at')
    .eq('status', 'down')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
    
  // 5. PULIZIA RAPIDA (Questa possiamo lasciarla in background con un trucco, o farla veloce)
  // Per sicurezza ora facciamo await anche qui, per essere certi che pulisca.
  const hours48Ago = new Date(Date.now() - (48 * 60 * 60 * 1000)).toISOString();
  await supabase.from('uptime_logs').delete().lt('created_at', hours48Ago).neq('status', 'down');

  console.log(`--- END PING CHECK (Status: ${status}) ---`);

  return NextResponse.json({ 
    status, 
    latency, 
    timestamp: new Date().toISOString(),
    code,
    lastDown: lastDownData?.created_at || null 
  });
}