import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Hammer, ArrowLeft } from "lucide-react";

export default function WipPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in zoom-in">
      <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/50 shadow-[0_0_40px_rgba(234,179,8,0.3)]">
          <Hammer className="h-16 w-16 text-yellow-500" />
      </div>
      <h1 className="text-4xl font-extrabold text-white">Lavori in Corso</h1>
      <p className="text-zinc-400 max-w-md mx-auto">
        Questa sezione è in fase di scrittura da parte del collettivo. <br/>
        La piattaforma è in <strong>Beta</strong>, tornaci tra qualche giorno!
      </p>
      
      <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-mono text-zinc-500">
         Status: PENDING_CONTENT_UPLOAD
      </div>

      <Link href="/">
        <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Torna alla Home
        </Button>
      </Link>
    </div>
  );
}