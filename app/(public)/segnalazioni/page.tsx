"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
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
  const [ticketId, setTicketId] = useState<number | null>(null);
  const [category, setCategory] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from('segnalazioni')
      .insert([{ category, place, description }])
      .select();

    setLoading(false);

    if (error) {
      alert("Errore invio: " + error.message);
    } else {
      if (data && data.length > 0) {
        setTicketId(data[0].id);
      }
      setSuccess(true);
      setCategory("");
      setPlace("");
      setDescription("");
    }
  };

  // VISTA SUCCESSO (Con Ticket ID e link al tracking)
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in zoom-in duration-500 px-4">
        <div className="bg-green-500/20 p-6 rounded-full border border-green-500/50 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
          <ShieldCheck className="h-16 w-16 text-green-500" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 glow-text">Ricevuto.</h2>
          {ticketId && (
            <div className="bg-zinc-950 border border-dashed border-zinc-700 p-6 rounded-xl my-6 max-w-xs mx-auto shadow-lg">
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2 font-mono">Il tuo codice segnalazione</p>
              <p className="text-4xl font-mono text-white font-bold tracking-tighter">#{ticketId}</p>
              <p className="text-[10px] text-zinc-600 mt-3">Salva questo numero (screenshot) per chiedere aggiornamenti.</p>
            </div>
          )}
        </div>
        <p className="text-zinc-400 max-w-md mx-auto">
          La segnalazione è stata inviata. Potrai controllarne lo stato in qualsiasi momento.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center max-w-md">
          <Link href={`/tracking?id=${ticketId}`} className="w-full">
            <Button className="w-full font-bold bg-primary hover:bg-red-700">Verifica Stato Ora</Button>
          </Link>
          <Button onClick={() => setSuccess(false)} variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800">
            Invia un'altra
          </Button>
        </div>
        <Link href="/" className="text-xs text-zinc-500 hover:text-white pt-4">Torna alla Home</Link>
      </div>
    );
  }

  // VISTA FORM (Default)
  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="text-center mb-8">
        <Link href="/tracking" className="text-sm text-zinc-400 hover:text-primary underline underline-offset-4 decoration-dashed">
          Hai già un Ticket ID? Verifica lo stato qui &rarr;
        </Link>
      </div>
      <div className="mb-8 text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-white glow-text">
          Segnalazioni <span className="text-primary">Anonime</span>
        </h1>
        <div className="flex items-center justify-center gap-2 text-yellow-500 bg-yellow-500/10 py-2 px-4 rounded-full border border-yellow-500/20 w-fit mx-auto text-sm font-medium">
          <AlertTriangle className="h-4 w-4" />
          <span>Connessione Sicura: Supabase Encrypted DB</span>
        </div>
      </div>
      <Card className="glass-panel border-zinc-800 text-zinc-100">
        <CardHeader>
          <CardTitle>Dettagli Problema</CardTitle>
          <CardDescription className="text-zinc-400">
            Questa segnalazione finirà direttamente nella Dashboard del collettivo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <Select required onValueChange={(val) => setCategory(val)}>
                <SelectTrigger className="bg-black/50 border-zinc-700 focus:ring-primary text-zinc-200">
                  <SelectValue placeholder="Seleziona tipo di problema" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                  <SelectItem value="edilizia">🏗️ Edilizia / Guasti</SelectItem>
                  <SelectItem value="didattica">📚 Didattica</SelectItem>
                  <SelectItem value="spazi">✊ Spazi / Occupazione</SelectItem>
                  <SelectItem value="molestie">🛡️ Discriminazioni</SelectItem>
                  <SelectItem value="altro">Altro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Luogo (Facoltativo)</label>
              <Input
                placeholder="Es. Aula 102, Bagni P.T..."
                className="bg-black/50 border-zinc-700 focus-visible:ring-primary"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descrizione</label>
              <Textarea
                placeholder="Descrivi il problema in dettaglio..."
                className="min-h-[150px] bg-black/50 border-zinc-700 focus-visible:ring-primary resize-none"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold h-12 shadow-[0_0_20px_rgba(220,20,60,0.3)] transition-all"
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              INVIA SEGNALAZIONE
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}