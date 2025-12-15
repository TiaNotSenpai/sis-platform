"use client";

import { useState, useEffect, Suspense } from "react"; // <--- Aggiunto Suspense
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, Loader2, AlertTriangle, CheckCircle, Clock } from "lucide-react";

type Segnalazione = {
  id: number;
  created_at: string;
  category: string;
  status: string;
  description: string;
};

// 1. SPOSTIAMO TUTTA LA LOGICA IN UN SOTTO-COMPONENTE
function TrackingContent() {
  const [ticketId, setTicketId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Segnalazione | null>(null);
  
  const searchParams = useSearchParams(); // <--- Questo è il colpevole che richiede Suspense

  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      setTicketId(idFromUrl);
      handleSearch(idFromUrl);
    }
  }, [searchParams]);

  const handleSearch = async (idToSearch?: string) => {
    const finalId = idToSearch || ticketId;
    if (!finalId) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const { data, error } = await supabase
      .from('segnalazioni')
      .select('id, created_at, category, status, description')
      .eq('id', finalId)
      .single();

    if (error || !data) {
      setError("Ticket non trovato. Controlla il numero e riprova.");
    } else {
      setResult(data);
    }
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    if (status === "risolta") return <CheckCircle className="h-10 w-10 text-green-500" />;
    if (status === "letta") return <Clock className="h-10 w-10 text-yellow-500" />;
    return <AlertTriangle className="h-10 w-10 text-red-500" />;
  };

  return (
    <div className="max-w-xl mx-auto py-12 text-center">
      <h1 className="text-4xl font-extrabold text-white glow-text">Verifica Stato Segnalazione</h1>
      <p className="text-zinc-400 mt-4 mb-8">
        Inserisci il Ticket ID che ti è stato dato dopo l'invio.
      </p>
      <div className="flex w-full items-center space-x-2">
        <Input
          type="number"
          placeholder="Scrivi qui il tuo ID..."
          className="bg-black/50 border-zinc-700 h-12 text-lg text-center"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={() => handleSearch()} disabled={loading} className="h-12 font-bold">
          {loading ? <Loader2 className="animate-spin" /> : <Search />}
        </Button>
      </div>
      <div className="mt-8 min-h-[200px]">
        {error && (
          <Card className="bg-red-950/30 border border-red-900/50 text-red-400 p-6 text-center animate-in fade-in">
            <p className="font-bold">{error}</p>
          </Card>
        )}
        {result && (
          <Card className="glass-panel border-zinc-700 text-left p-6 animate-in fade-in">
            <div className="flex gap-6 items-center">
              <div>{getStatusIcon(result.status)}</div>
              <div className="flex-1">
                <p className="text-zinc-400 text-sm">Ticket #{result.id}</p>
                <p className="text-2xl font-bold capitalize text-white">{result.status}</p>
                <p className="text-xs text-zinc-500 mt-1">
                  Stato aggiornato il: {new Date().toLocaleDateString('it-IT')}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <p className="text-zinc-500 text-sm">Riepilogo: <span className="text-zinc-300 font-medium">"{result.description.substring(0, 50)}..."</span></p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

// 2. QUESTO È IL COMPONENTE PRINCIPALE CHE ESPORTIAMO
// Avvolge tutto in un <Suspense>, così Next.js è felice durante la build.
export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-zinc-500">Caricamento sistema tracking...</div>}>
      <TrackingContent />
    </Suspense>
  );
}