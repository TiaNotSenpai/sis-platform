import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 0;

const UNIMIA_URL = 'https://www.unimi.it/it'; 

// ❌ NON CREARE IL CLIENT QUI FUORI
// const supabase = createClient(...) <--- CANCELLA O COMMENTA QUESTO

export async function GET() {
  // ✅ CREALO QUI DENTRO.
  // Così se le variabili mancano durante la build, non esplode tutto subito.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const start = performance.now();
  let status = 'down';
  let code = 0;

  try {
    const response = await fetch(UNIMIA_URL, {
      method: 'HEAD',
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    
    code = response.status;
    if (response.ok) status = 'operational';
    else if (response.status >= 500) status = 'degraded';

  } catch (error) {
    status = 'down';
    code = 500;
  }

  const end = performance.now();
  const latency = Math.round(end - start);

  // Il resto è uguale...
  supabase.from('uptime_logs').insert([{ status, latency }]).then();

  // ... (tutto il resto del codice di pulizia e select rimane uguale) ...
  
  // (Ricopia il resto delle logiche di pulizia qui sotto, usando la variabile 'supabase' locale)
  const now = new Date();
  const hours48Ago = new Date(now.getTime() - (48 * 60 * 60 * 1000)).toISOString();
  const days30Ago = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString();

  supabase.from('uptime_logs').delete().lt('created_at', hours48Ago).neq('status', 'down').then();
  supabase.from('uptime_logs').delete().lt('created_at', days30Ago).eq('status', 'down').then();

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