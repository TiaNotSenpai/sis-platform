"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, MapPin, MessageSquare, Plus, Users, Clock, AlertTriangle, Loader2 } from "lucide-react";
import { mockProjects, Project } from "@/lib/data";

type Segnalazione = {
  id: number;
  created_at: string;
  category: string;
  place: string | null;
  description: string;
  status: string;
};

export default function DashboardPage() {
  const [segnalazioni, setSegnalazioni] = useState<Segnalazione[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchSegnalazioni = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('segnalazioni').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error("Errore fetch:", error);
    } else {
      setSegnalazioni(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSegnalazioni();
  }, []);

  const updateStatus = async (ticketId: number, newStatus: 'letta' | 'risolta') => {
    setUpdatingId(ticketId);

    const { error } = await supabase
      .from('segnalazioni')
      .update({ status: newStatus })
      .eq('id', ticketId);

    if (error) {
      alert("Errore nell'aggiornamento: " + error.message);
    } else {
      await fetchSegnalazioni();
    }
    setUpdatingId(null);
  };

  const getStatusColor = (status: string) => {
    if (status === "risolta") return "bg-green-900/50 text-green-400 border-green-800";
    if (status === "letta") return "bg-yellow-900/50 text-yellow-400 border-yellow-800";
    return "bg-red-900/50 text-red-400 border-red-800";
  };

  const getProjectStatusClass = (status: Project["status"]) => {
    if (status === "fatto") return "bg-green-900/50 text-green-400 border-green-800";
    if (status === "in_corso") return "bg-yellow-900/50 text-yellow-400 border-yellow-800";
    if (status === "revisione") return "bg-blue-900/50 text-blue-400 border-blue-800";
    return "bg-zinc-800 text-zinc-400 border-zinc-700";
  };

  return (
    <div className="space-y-12">
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white glow-text flex items-center gap-3">
              <AlertTriangle className="text-primary"/> Centro Segnalazioni
            </h1>
            <p className="text-zinc-400">Dati in tempo reale dal database Supabase.</p>
          </div>
          <Button onClick={fetchSegnalazioni} variant="outline" className="border-zinc-700 hover:bg-zinc-800 text-white">
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> 
            Aggiorna Dati
          </Button>
        </div>
        
        {loading ? <p className="text-zinc-500 text-center py-8">Caricamento dati dal server...</p> : (
          segnalazioni.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 border border-dashed border-zinc-800 rounded-xl">Nessuna segnalazione presente.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {segnalazioni.map((item) => (
                <Card key={item.id} className="bg-zinc-900/40 border-zinc-800 backdrop-blur-sm flex flex-col">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-medium text-zinc-100 capitalize">{item.category}</CardTitle>
                      <span className="text-xs text-zinc-500 font-mono">Ticket #{item.id}</span>
                    </div>
                    <Badge className={`${getStatusColor(item.status)} uppercase text-[10px]`}>{item.status}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4 mt-2 flex-grow flex flex-col justify-between">
                    <div>
                      <p className="bg-black/50 p-3 rounded-md text-sm text-zinc-300 min-h-[60px] mb-4">{item.description}</p>
                      <div className="flex justify-between text-xs text-zinc-500">
                        <span className="flex items-center gap-1"><MapPin size={12}/>{item.place || "N/D"}</span>
                        <span className="flex items-center gap-1"><MessageSquare size={12}/>{new Date(item.created_at).toLocaleDateString('it-IT')}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                       <Button 
                         variant="secondary" 
                         size="sm" 
                         className="flex-1 text-xs h-8"
                         disabled={updatingId === item.id}
                         onClick={() => updateStatus(item.id, 'letta')}
                       >
                         {updatingId === item.id ? <Loader2 className="animate-spin h-4 w-4"/> : 'Letta'}
                       </Button>
                       <Button 
                         variant="outline" 
                         size="sm" 
                         className="flex-1 text-xs h-8 border-green-900 text-green-500 hover:bg-green-900/20 hover:text-green-400"
                         disabled={updatingId === item.id}
                         onClick={() => updateStatus(item.id, 'risolta')}
                       >
                         {updatingId === item.id ? <Loader2 className="animate-spin h-4 w-4"/> : 'Risolta'}
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )
        )}
      </section>

      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white glow-text">Progetti Interni</h2>
            <p className="text-zinc-400">Panoramica operativa del collettivo.</p>
          </div>
          <Button className="bg-primary hover:bg-red-700">
            <Plus className="mr-2 h-4 w-4" /> Nuovo Progetto
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockProjects.map((project) => (
            <Card key={project.id} className="bg-zinc-900/40 border-zinc-800">
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <CardTitle className="text-lg font-medium text-zinc-100">{project.title}</CardTitle>
                <Badge variant="outline" className={`${getProjectStatusClass(project.status)} uppercase text-[10px]`}>{project.status.replace("_", " ")}</Badge>
              </CardHeader>
              <CardContent className="flex justify-between text-sm text-zinc-500 pt-4">
                <span className="flex items-center gap-1"><Users size={12}/>{project.assignee}</span>
                <span className="flex items-center gap-1"><Clock size={12}/>{project.deadline}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}