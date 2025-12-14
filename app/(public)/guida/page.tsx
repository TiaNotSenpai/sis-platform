import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import  Link  from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, MapPin, Wallet, GraduationCap, Coffee, AlertCircle } from "lucide-react";

export default function GuidaPage() {
  const guides = [
    {
      title: "Soldi & ISEE",
      icon: <Wallet className="h-8 w-8 text-green-400" />,
      desc: "Come non pagare la seconda rata massima per sbaglio. Guida alla DSU.",
      status: "Essenziale",
    },
    {
      title: "Mappa del Campus",
      icon: <MapPin className="h-8 w-8 text-red-400" />,
      desc: "Dove sono le macchinette? Dove studiare col clima? I bagni decenti.",
      status: "WIP",
    },
    {
      title: "Piano Studi & CFU",
      icon: <GraduationCap className="h-8 w-8 text-blue-400" />,
      desc: "Come compilare il piano senza impazzire e quali esami a scelta evitare.",
      status: "Nuovo",
    },
    {
      title: "Pausa Pranzo",
      icon: <Coffee className="h-8 w-8 text-yellow-400" />,
      desc: "Dove mangiare spendendo meno di 5€. Recensioni oneste delle mense.",
      status: "Community",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-white glow-text">Manuale di Sopravvivenza</h1>
        <p className="text-xl text-zinc-400">
          Le guide non ufficiali scritte dagli studenti per gli studenti. <br/>
          <span className="text-primary italic">Perché il sito dell'ateneo è un labirinto.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide, i) => (
		<Link href="/wip" key={i} className="block group">
          <Card className="glass-panel border-zinc-800 hover:border-primary/50 transition-all cursor-pointer group">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 group-hover:scale-110 transition-transform">
                {guide.icon}
              </div>
              <div className="flex-1">
                 <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-white mb-1 group-hover:text-primary transition-colors">{guide.title}</CardTitle>
                    <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 border-zinc-700">{guide.status}</Badge>
                 </div>
                 <p className="text-sm text-zinc-400 leading-relaxed">
                    {guide.desc}
                 </p>
              </div>
            </CardHeader>
          </Card>
		</Link>
        ))}
      </div>

      {/* CALL TO ACTION */}
      <div className="bg-primary/10 border border-primary/20 p-8 rounded-2xl text-center space-y-4">
         <AlertCircle className="h-10 w-10 text-primary mx-auto" />
         <h3 className="text-2xl font-bold text-white">Manca una guida?</h3>
         <p className="text-zinc-400">
            Questa Wiki è collaborativa. Se hai scoperto un trucco per saltare la fila in segreteria, diccelo.
         </p>
         <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            Contribuisci su Telegram
         </Button>
      </div>

    </div>
  );
}