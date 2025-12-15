"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Loader2, AlertCircle } from "lucide-react";

// Definiamo il tipo di dato che ci aspettiamo dal DB
type Event = {
  id: number;
  title: string;
  date: string;
  type: string;
  urgent: boolean;
};

export function Deadlines() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Funzione che scarica i dati reali
    async function fetchEvents() {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true }) // Ordina dal più vicino
        .limit(5); // Prendi solo i prossimi 5

      if (!error && data) {
        setEvents(data);
      }
      setLoading(false);
    }

    fetchEvents();
  }, []);

  // Funzione per formattare la data (es. "2025-05-31" -> "31 MAG")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    // Otteniamo il mese abbreviato (es. MAG, GIU)
    const month = date.toLocaleString('it-IT', { month: 'short' }).toUpperCase().replace('.', ''); 
    return { day, month };
  };

  return (
    <Card className="glass-panel h-full border-zinc-800 bg-black/20 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-zinc-100 text-lg">
          <CalendarDays className="text-primary h-5 w-5" />
          Prossime Scadenze
        </CardTitle>
      </CardHeader>
      
      <CardContent className="grid gap-4 flex-grow overflow-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-2 py-4">
            <Loader2 className="animate-spin h-5 w-5" />
            <span className="text-xs">Caricamento scadenze...</span>
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-500 py-4">
             <AlertCircle className="h-6 w-6 mb-2 opacity-50" />
             <p className="text-sm">Nessuna scadenza imminente.</p>
          </div>
        ) : (
          events.map((event) => {
            const { day, month } = formatDate(event.date);
            return (
              <div key={event.id} className="flex items-center justify-between border-b border-zinc-800 pb-3 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="font-bold text-sm text-zinc-200">{event.title}</p>
                  <div className="flex items-center gap-2">
                     <Badge variant="outline" className="text-[10px] h-5 border-zinc-700 text-zinc-400">
                        {event.type}
                     </Badge>
                     {event.urgent && (
                       <span className="text-[10px] text-red-400 font-bold animate-pulse">
                         ● URGENTE
                       </span>
                     )}
                  </div>
                </div>
                {/* CALENDARIETTO VISIVO */}
                <div className="flex flex-col items-center justify-center bg-zinc-900/80 p-2 rounded border border-zinc-800/50 min-w-[50px] text-center shadow-sm">
                   <span className="font-black text-lg leading-none text-white">{day}</span>
                   <span className="text-[10px] uppercase text-primary font-bold">{month}</span>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}