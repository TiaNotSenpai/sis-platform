import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const revalidate = 0;

const UNIMIA_URL = 'https://www.unimi.it/it'; 

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
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

  // 1. INSERIAMO IL NUOVO LOG
  await supabase.from('uptime_logs').insert([{ status, latency }]);

  // 2. PULIZIA AUTOMATICA (GARBAGE COLLECTION)
  // Calcoliamo le date limite
  const now = new Date();
  const hours48Ago = new Date(now.getTime() - (48 * 60 * 60 * 1000)).toISOString();
  const days30Ago = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString();

  // Cancelliamo i log normali più vecchi di 48 ore
  supabase.from('uptime_logs')
    .delete()
    .lt('created_at', hours48Ago)
    .neq('status', 'down') // Non cancellare i down!
    .then(); // .then() senza await fa andare il processo in background senza rallentare l'utente

  // Cancelliamo i down più vecchi di 30 giorni
  supabase.from('uptime_logs')
    .delete()
    .lt('created_at', days30Ago)
    .eq('status', 'down')
    .then();

  // 3. RECUPERO DATI PER FRONTEND
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