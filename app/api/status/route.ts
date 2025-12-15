import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const UNIMIA_URL = 'https://www.unimi.it/it'; 

export async function GET() {
  const start = performance.now();
  console.log("--- START PING CHECK (HARDCODED) ---");

  // ⚠️ INCOLLA QUI LE STESSE CHIAVI REALI ⚠️
  // Così siamo sicuri al 100% che il server abbia accesso al DB
  const supabase = createClient(
    'https://TUO-PROGETTO.supabase.co',
    'eyJh...TUA-CHIAVE-LUNGHISSIMA...'
  );

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
    else if (code === 403) status = 'degraded';
    else if (code >= 500) status = 'degraded';

  } catch (error) {
    status = 'down';
    code = 500;
  }

  const end = performance.now();
  const latency = Math.round(end - start);

  // LOGICA DB
  let lastDownDate = null;
  
  try {
      // Scrittura
      await supabase.from('uptime_logs').insert([{ status, latency }]);
      
      // Lettura Ultimo Down
      const { data } = await supabase
        .from('uptime_logs')
        .select('created_at')
        .eq('status', 'down')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      lastDownDate = data?.created_at || null;

      // Pulizia
      const hours48Ago = new Date(Date.now() - (48 * 60 * 60 * 1000)).toISOString();
      await supabase.from('uptime_logs').delete().lt('created_at', hours48Ago).neq('status', 'down');
      
  } catch (err) {
      console.error("Errore DB Critical:", err);
  }

  return NextResponse.json({ 
    status, 
    latency, 
    timestamp: new Date().toISOString(),
    code,
    lastDown: lastDownDate
  });
}