import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Server, Wifi, Database } from "lucide-react";

export default function UnimiaPage() {
  const services = [
    { name: "UniMia", url: "https://unimia.unimi.it", status: "ok" },
    { name: "Ariel", url: "https://ariel.unimi.it", status: "ok" },
    { name: "Webmail", url: "https://outlook.office.com", status: "ok" },
    { name: "Segreterie Online", url: "#", status: "lento" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-8">
      
      {/* STATUS GENERALE BIG */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-white">Stato dei Servizi</h1>
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-950/30 border border-green-900 rounded-full">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
            </span>
            <span className="text-green-400 font-bold tracking-wider">TUTTI I SISTEMI OPERATIVI</span>
        </div>
      </div>

      {/* GRIGLIA DETTAGLI */}
      <div className="grid md:grid-cols-2 gap-6">
         <Card className="glass-panel border-zinc-800">
            <CardHeader><CardTitle className="flex gap-2 items-center"><Server className="text-primary"/> Tempi di Risposta</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between text-sm text-zinc-400"><span>Login Page</span> <span className="text-green-400">20ms</span></div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 w-[20%] h-full"></div>
                </div>
                <div className="flex justify-between text-sm text-zinc-400"><span>Caricamento Libretto</span> <span className="text-yellow-400">1.2s</span></div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-yellow-500 w-[60%] h-full"></div>
                </div>
            </CardContent>
         </Card>

         <Card className="glass-panel border-zinc-800">
            <CardHeader><CardTitle className="flex gap-2 items-center"><Database className="text-blue-500"/> Log Incidenti</CardTitle></CardHeader>
            <CardContent>
                <ul className="space-y-3 text-sm">
                    <li className="text-zinc-500 pb-2 border-b border-zinc-800">
                        <span className="font-bold text-zinc-300">Oggi, 09:00</span> - Tutto regolare.
                    </li>
                    <li className="text-zinc-500 pb-2 border-b border-zinc-800">
                        <span className="font-bold text-red-400">Ieri, 14:30</span> - Rallentamenti su Ariel.
                    </li>
                    <li className="text-zinc-500">
                        <span className="font-bold text-zinc-300">12 Maggio</span> - Manutenzione programmata.
                    </li>
                </ul>
            </CardContent>
         </Card>
      </div>

      {/* LINKS RAPIDI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((s) => (
            <a href={s.url} target="_blank" key={s.name} className="block group">
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl hover:border-primary/50 hover:bg-zinc-800 transition-all text-center">
                    <h3 className="font-bold text-white mb-1 group-hover:text-primary">{s.name}</h3>
                    <div className="flex items-center justify-center gap-1 text-xs text-zinc-500">
                        Vai al sito <ExternalLink className="h-3 w-3" />
                    </div>
                </div>
            </a>
        ))}
      </div>

    </div>
  );
}