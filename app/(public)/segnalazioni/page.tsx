"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Loader2, Send, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function SegnalazioniPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // SIMULIAMO L'INVIO AL SERVER
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setLoading(false);
    setSuccess(true);
  };

  // VISTA SUCCESSO (Dopo l'invio)
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="bg-green-500/20 p-6 rounded-full border border-green-500/50 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
            <ShieldCheck className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-white">Ricevuto.</h2>
        <p className="text-zinc-400 max-w-md">
          La tua segnalazione è stata criptata e inviata al direttivo. <br/>
          Non è stato salvato nessun dato personale (IP o dispositivo).
        </p>
        <div className="flex gap-4 pt-4">
            <Button onClick={() => setSuccess(false)} variant="outline">
                Invia un'altra
            </Button>
            <Link href="/">
                <Button>Torna alla Home</Button>
            </Link>
        </div>
      </div>
    );
  }

  // VISTA FORM
  return (
    <div className="max-w-2xl mx-auto">
      
      {/* HEADER DELLA PAGINA */}
      <div className="mb-8 text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-white glow-text">
            Segnalazioni <span className="text-primary">Anonime</span>
        </h1>
        <div className="flex items-center justify-center gap-2 text-yellow-500 bg-yellow-500/10 py-2 px-4 rounded-full border border-yellow-500/20 w-fit mx-auto text-sm font-medium">
            <AlertTriangle className="h-4 w-4" />
            <span>Nessun log. Nessun tracciamento. Totale riservatezza.</span>
        </div>
      </div>

      {/* FORM CARD */}
      <Card className="glass-panel border-zinc-800 text-zinc-100">
        <CardHeader>
            <CardTitle>Dettagli Problema</CardTitle>
            <CardDescription className="text-zinc-400">
                Sii specifico. Se è un problema strutturale (es. bagno rotto), indica il numero dell'aula o il piano.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* CATEGORIA */}
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Categoria
                    </label>
                    <Select required>
                        <SelectTrigger className="bg-black/50 border-zinc-700 focus:ring-primary text-zinc-200">
                            <SelectValue placeholder="Seleziona tipo di problema" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                            <SelectItem value="edilizia">🏗️ Edilizia / Guasti (Bagni, Prese, Aule)</SelectItem>
                            <SelectItem value="didattica">📚 Didattica (Professori, Appelli, Orari)</SelectItem>
                            <SelectItem value="spazi">✊ Spazi / Occupazione</SelectItem>
                            <SelectItem value="molestie">🛡️ Discriminazioni / Molestie</SelectItem>
                            <SelectItem value="altro">Altro</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* LUOGO */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Luogo (Facoltativo)</label>
                    <Input 
                        placeholder="Es. Aula 102, Via Festa del Perdono..." 
                        className="bg-black/50 border-zinc-700 focus-visible:ring-primary"
                    />
                </div>

                {/* DESCRIZIONE */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Descrizione</label>
                    <Textarea 
                        placeholder="Descrivi cosa è successo o cosa non funziona..." 
                        className="min-h-[150px] bg-black/50 border-zinc-700 focus-visible:ring-primary resize-none"
                        required
                    />
                </div>

                {/* BOTTONE INVIO */}
                <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold h-12 shadow-[0_0_20px_rgba(220,20,60,0.3)]"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Criptazione in corso...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-4 w-4" />
                            INVIA SEGNALAZIONE SICURA
                        </>
                    )}
                </Button>

                <p className="text-[10px] text-center text-zinc-600 mt-4">
                    Cliccando Invia confermi che la segnalazione è veritiera. <br/>
                    Gli abusi verranno ignorati dai moderatori.
                </p>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}