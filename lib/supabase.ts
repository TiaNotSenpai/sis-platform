import { createClient } from '@supabase/supabase-js';

// TRUCCO: Usiamo dei valori finti (OR ||) se le variabili non sono ancora caricate durante la build.
// Questo impedisce l'errore "supabaseUrl is required".
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lugrbrxcmedlojvnutov.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1Z3JicnhjbWVkbG9qdm51dG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MzY0MjMsImV4cCI6MjA4MTMxMjQyM30.MIY0NN5uUkpx6b57YnpB1o5ybkaA-2PisIPszjHrWOQ';

export const supabase = createClient(supabaseUrl, supabaseKey);