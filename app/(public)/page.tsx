import { Button } from "@/components/ui/button";
import { UnimiaStatus } from "@/components/widgets/UnimiaStatus";
import { Deadlines } from "@/components/widgets/Deadlines";
import Link from "next/link";
import { MessageSquareWarning, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 md:gap-10 pb-20">
      
      {/* HERO SECTION */}
      <section className="py-12 md:py-24 text-center space-y-6 relative">
        {/* Badge "Beta" */}
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
           {/* TASTO PRINCIPALE ORA È LA GUIDA */}
           <Link href="/guida" className="w-full sm:w-auto">
            <Button size="lg" className="w-full font-bold shadow-[0_0_20px_rgba(220,20,60,0.4)] h-12 text-md">
              📖 Manuale di Sopravvivenza
            </Button>
           </Link>
           {/* TASTO SECONDARIO */}
           <Link href="/chi-siamo" className="w-full sm:w-auto">
             <Button variant="secondary" size="lg" className="w-full sm:w-auto h-12 bg-white/5 border border-white/10 text-white hover:bg-white/10">
               Chi siamo
             </Button>
           </Link>
        </div>
      </section>

      {/* DASHBOARD: Grid responsive */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2">
        
        {/* WIDGET 1: STATUS (Glass Effect) */}
        <div className="glass-panel rounded-xl p-1">
           {/* Per ora mettiamo il componente standard, poi lo renderemo trasparente */}
           <div className="h-full bg-transparent p-4">
              <h2 className="text-lg font-bold text-gray-300 mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                Sistemi Ateneo
              </h2>
              <UnimiaStatus />
           </div>
        </div>

        {/* WIDGET 2: SEGNALAZIONE RAPIDA (Mobile Priority) */}
        <div className="glass-panel rounded-xl p-6 flex flex-col justify-between border-l-4 border-l-primary/60">
           <div>
             <div className="flex items-center gap-3 mb-2 text-primary">
                <MessageSquareWarning className="h-6 w-6" />
                <h3 className="font-bold text-xl tracking-tight">Segnala Problema</h3>
             </div>
             <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                Bagni rotti? Aule senza prese? Molestie?
                Il collettivo raccoglie la tua segnalazione in forma <strong>anonima</strong>.
             </p>
           </div>
           <Link href="/segnalazioni">
              <Button variant="destructive" className="w-full shadow-lg">
                Compila il Form
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
           </Link>
        </div>

        {/* WIDGET 3: CALENDARIO (Full width su mobile se serve) */}
        <div className="md:col-span-2 lg:col-span-1 glass-panel rounded-xl p-1">
             <div className="bg-transparent p-4 h-full">
                <Deadlines />
             </div>
        </div>

        {/* NEWS BOX (Meme Style) */}
        <div className="glass-panel rounded-xl p-6 md:col-span-3 lg:col-span-3 flex flex-col md:flex-row gap-6 items-center border border-white/5 bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">🔥 Plenaria d'Urgenza</h3>
              <p className="text-gray-300 text-sm">
                Ci vediamo in Aula 102. Tema: caro affitti e nuovi spazi. Non mancare o sei complice.
              </p>
            </div>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-colors whitespace-nowrap">
               Leggi Ordine del Giorno
            </Button>
        </div>

      </section>
    </div>
  );
}