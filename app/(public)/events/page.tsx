import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Download } from "lucide-react";

export default function EventsPage() {
  const events = [
    { date: "15 Maggio", title: "Scadenza Seconda Rata", category: "Tasse", desc: "Ultimo giorno per pagare senza mora. Controlla su UniMia se il bollettino è generato.", urgent: true },
    { date: "20 Maggio", title: "Apertura Iscrizioni Appelli", category: "Esami", desc: "Aprono le iscrizioni per la sessione estiva. I server esploderanno, preparati.", urgent: false },
    { date: "10 Giugno", title: "Inizio Sessione Estiva", category: "Esami", desc: "Che la forza sia con te.", urgent: false },
    { date: "15 Luglio", title: "Bando Borse di Studio", category: "DSU", desc: "Esce il bando provvisorio. Tieni l'ISEE pronto.", urgent: false },
  ];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold text-white glow-text">Calendario Accademico</h1>
            <p className="text-zinc-400">Tutte le date che l'ateneo nasconde nei PDF illeggibili.</p>
        </div>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            <Download className="mr-2 h-4 w-4" /> Scarica .ICS
        </Button>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-700 before:to-transparent">
        {events.map((ev, i) => (
          <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            
            {/* ICONA CENTRALE */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700 bg-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(220,20,60,0.5)] transition-all">
               <CalendarDays className="h-5 w-5 text-zinc-400 group-hover:text-primary" />
            </div>
            
            {/* CARD */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 glass-panel rounded-xl border-zinc-800 group-hover:border-zinc-600 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-primary font-mono">{ev.date}</span>
                <Badge variant={ev.urgent ? "destructive" : "secondary"} className="text-[10px]">{ev.category}</Badge>
              </div>
              <h3 className="font-bold text-white text-lg">{ev.title}</h3>
              <p className="text-sm text-zinc-400 mt-2">{ev.desc}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}