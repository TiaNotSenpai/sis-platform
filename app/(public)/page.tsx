import { Button } from "@/components/ui/button";
import { UnimiaStatus } from "@/components/widgets/UnimiaStatus";
import { Deadlines } from "@/components/widgets/Deadlines"; // Assicurati che questo esista ancora, l'avevi rimosso?
import Link from "next/link";
import { ArrowRight, MessageSquareWarning, Megaphone, Info, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase"; // <--- Importiamo la connessione nel server
import { Card } from "@/components/ui/card";

// Questa funzione gira SUL SERVER, non sul browser dell'utente
async function getActiveNews() {
  // Trucco: creiamo il client qui dentro per evitare errori di build se il file lib/supabase non è perfetto
  const { data } = await supabase
    .from('news')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(1) // Prendiamo solo la più recente
    .maybeSingle();
  
  return data;
}

export const revalidate = 60; // Aggiorna la home al massimo ogni 60 secondi (Cache ISR)

export default async function HomePage() {
  const latestNews = await getActiveNews();

  return (
    <div className="flex flex-col gap-6 md:gap-10 pb-20">
      
      {/* HERO SECTION */}
      <section className="py-12 md:py-24 text-center space-y-6 relative">
        <div className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs text-primary font-bold border border-primary/30 mb-2">
          SIS.MEMETICA — BETA 0.1
        </div>
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-white glow-text leading-tight">
          L'UNIVERSITÀ <br className="md:hidden" />
          <span className="text-primary">SEMPLIFICATA</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-[600px] mx-auto px-4">
          Non farti fregare dall'ISEE o dalle scadenze. <br/>
          Tutto quello che la Statale non ti dice, te lo diciamo noi.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 px-6">
           <Link href="/guida" className="w-full sm:w-auto">
            <Button size="lg" className="w-full font-bold shadow-[0_0_20px_rgba(220,20,60,0.4)] h-12 text-md">
              📖 Manuale di Sopravvivenza
            </Button>
           </Link>
           <Link href="/chi-siamo" className="w-full sm:w-auto">
             <Button variant="secondary" size="lg" className="w-full sm:w-auto h-12 bg-white/5 border border-white/10 text-white hover:bg-white/10">
               Chi siamo
             </Button>
           </Link>
        </div>
      </section>

      {/* DASHBOARD GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2">
        
        {/* WIDGET 1: STATUS UNIMIA */}
        <div className="md:row-span-2">
           <UnimiaStatus />
        </div>

        {/* WIDGET 2: SEGNALAZIONE RAPIDA */}
        <Card className="glass-panel border-l-4 border-l-primary/60 p-6 flex flex-col justify-between">
           <div>
             <div className="flex items-center gap-3 mb-2 text-primary">
                <MessageSquareWarning className="h-6 w-6" />
                <h3 className="font-bold text-xl tracking-tight">Segnala Problema</h3>
             </div>
             <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Bagni rotti? Aule senza prese? Molestie?
                Raccogliamo la tua segnalazione in forma <strong>anonima</strong>.
             </p>
           </div>
           <Link href="/segnalazioni">
              <Button variant="destructive" className="w-full shadow-lg">
                Compila il Form
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
           </Link>
        </Card>

        {/* WIDGET 3: NEWS DINAMICA (Ex Box Plenaria) */}
        <div className="md:col-span-2 lg:col-span-1">
             {latestNews ? (
                // SE C'E' UNA NEWS ATTIVA SU SUPABASE
                <div className={`
                    rounded-xl p-6 h-full flex flex-col justify-between border
                    ${latestNews.type === 'alert' ? 'bg-red-950/30 border-red-900/50' : 'bg-blue-950/30 border-blue-900/50'}
                `}>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            {latestNews.type === 'alert' ? <Megaphone className="text-red-400 h-5 w-5"/> : <Info className="text-blue-400 h-5 w-5"/>}
                            <h3 className={`font-bold text-lg ${latestNews.type === 'alert' ? 'text-red-100' : 'text-blue-100'}`}>
                                {latestNews.title}
                            </h3>
                        </div>
                        <p className="text-zinc-300 text-sm leading-relaxed">
                            {latestNews.content}
                        </p>
                    </div>
                    <p className="text-xs text-zinc-500 mt-4 text-right">
                        Pubblicato il: {new Date(latestNews.created_at).toLocaleDateString('it-IT')}
                    </p>
                </div>
             ) : (
                // SE NON CI SONO NEWS (Fallback carino)
                <div className="glass-panel rounded-xl p-6 h-full flex flex-col justify-center items-center text-center border-dashed border-zinc-800">
                    <AlertCircle className="h-8 w-8 text-zinc-600 mb-2"/>
                    <p className="text-zinc-500 font-medium">Nessun avviso urgente al momento.</p>
                </div>
             )}
        </div>

        {/* WIDGET 4: CALENDARIO (Placeholder per ora) */}
        {/* Se vuoi reinserire Deadlines, fallo qui. Altrimenti lasciamo spazio vuoto o mettiamo altro. */}

      </section>
    </div>
  );
}