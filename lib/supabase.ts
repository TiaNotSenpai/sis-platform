import { createClient } from '@supabase/supabase-js';

// TRUCCO: Usiamo dei valori finti (OR ||) se le variabili non sono ancora caricate durante la build.
// Questo impedisce l'errore "supabaseUrl is required".
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);