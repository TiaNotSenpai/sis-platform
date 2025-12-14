import { Button } from "@/components/ui/button";
import Image from "next/image"; // In futuro useremo foto vere

export default function ChiSiamoPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      
      {/* HEADER */}
      <div className="space-y-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tighter text-white glow-text">
          PIÙ DI UN <span className="text-primary">MEME</span>.
        </h1>
        <p className="text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Siamo nati ridendo delle disavventure universitarie, ma abbiamo deciso di smettere di ridere e basta. <br/>
          <strong>Studenti Indipendenti</strong> è la risposta all'ateneo che ci ignora.
        </p>
      </div>

      {/* SECTION: COSA FACCIAMO */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
         <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white border-l-4 border-primary pl-4">Cosa Facciamo</h2>
            <ul className="space-y-4 text-zinc-400 text-lg">
                <li className="flex gap-3">
                    <span className="text-primary font-bold">01.</span>
                    Rappresentanza vera negli organi (Senato, CdA).
                </li>
                <li className="flex gap-3">
                    <span className="text-primary font-bold">02.</span>
                    Sportelli di ascolto e aiuto burocratico.
                </li>
                <li className="flex gap-3">
                    <span className="text-primary font-bold">03.</span>
                    Feste, cultura e spazi di aggregazione.
                </li>
                <li className="flex gap-3">
                    <span className="text-primary font-bold">04.</span>
                    Meme di qualità superiore (ovviamente).
                </li>
            </ul>
         </div>
         {/* BOX ESTETICO (Placeholder per foto di gruppo) */}
         <div className="aspect-video bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-zinc-600 font-mono text-sm">
                [QUI INSERIRE FOTO GRUPPO/MANIFESTAZIONE]
            </p>
         </div>
      </div>

      {/* MANIFESTO BREVE */}
      <div className="bg-zinc-950 p-8 rounded-2xl border border-zinc-800 text-center space-y-6">
         <h2 className="text-2xl font-bold text-white">Perché una piattaforma?</h2>
         <p className="text-zinc-400 max-w-2xl mx-auto">
            Vogliamo liberarci dalla dipendenza dai social. Instagram oscura i post politici, Telegram è caotico. 
            Questo sito è il nostro spazio digitale autogestito. Costruito da zero, a costo zero, con le nostre mani.
         </p>
         <Button size="lg" className="bg-white text-black hover:bg-zinc-200 font-bold">
            Unisciti al Canale Telegram
         </Button>
      </div>

    </div>
  );
}