"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Server, Database, Loader2, CheckCircle, AlertTriangle, Wifi, Activity } from "lucide-react";

type ApiData = {
  status: 'operational' | 'degraded' | 'down';
  latency: number;
  timestamp: string;
  code: number;
};

export default function UnimiaPage() {
  const [data, setData] = useState<ApiData | null>(null);
  const [loading, setLoading] = useState(true);

  // Funzione per ricaricare i dati manualmente
  const checkStatus = () => {
    setLoading(true);
    fetch('/api/status')
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setData({ status: 'down', latency: 0, timestamp: new Date().toISOString(), code: 500 });
        setLoading(false);
      });
  };

  useEffect(() => {
    checkStatus();
  }, []);

  // Configurazioni Grafiche in base allo stato
  const getConfig = () => {
    if (loading) return { color: "text-zinc-500", bg: "bg-zinc-900", border: "border-zinc-800", icon: <Loader2 className="animate-spin"/>, text: "ANALISI..." };
    
    switch (data?.status) {
      case 'operational': return { color: "text-green-400", bg: "bg-green-950/30", border: "border-green-900", icon: <CheckCircle/>, text: "OPERATIVO" };
      case 'degraded': return { color: "text-yellow-400", bg: "bg-yellow-950/30", border: "border-yellow-900", icon: <AlertTriangle/>, text: "RALLENTATO" };
      default: return { color: "text-red-400", bg: "bg-red-950/30", border: "border-red-900", icon: <Wifi/>, text: "OFFLINE" };
    }
  };

  const config = getConfig();

  // Calcolo per la barra di latenza (max 1000ms = 100%)
  const latencyPercent = data ? Math.min((data.latency / 1000) * 100, 100) : 0;
  const latencyColor = data?.latency && data.latency < 300 ? "bg-green-500" : (data?.latency && data.latency < 800 ? "bg-yellow-500" : "bg-red-500");

  const services = [
    { name: "Portale UniMia", url: "https://unimia.unimi.it" },
    { name: "Ariel", url: "https://ariel.unimi.it" },
    { name: "Webmail", url: "https://outlook.office.com" },
    { name: "Segreterie", url: "https://www.unimi.it/it/studiare/servizi-gli-studenti/segreterie-studenti" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 px-4">
      
      {/* HEADER STATO MACRO */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white glow-text">Monitoraggio Servizi</h1>
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border transition-all ${config.bg} ${config.border}`}>
          <span className={config.color}>{config.icon}</span>
          <span className={`text-xl ${config.color} font-bold tracking-wider`}>{config.text}</span>
        </div>
        <p className="text-xs text-zinc-500 font-mono">
           Ultimo check: {data ? new Date(data.timestamp).toLocaleTimeString() : '--:--'}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* CARD 1: LATENZA REALE */}
        <Card className="glass-panel border-zinc-800">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center text-zinc-300">
                <Activity className="text-primary"/> Performance Rete
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400">Tempo di Risposta (Ping)</span>
                    <span className="text-white font-mono font-bold">{loading ? "..." : `${data?.latency} ms`}</span>
                </div>
                {/* BARRA DI CARICAMENTO REALE */}
                <div className="w-full bg-zinc-900 h-3 rounded-full overflow-hidden border border-zinc-800">
                    <div 
                        className={`h-full transition-all duration-1000 ${loading ? "w-0" : latencyColor}`} 
                        style={{ width: loading ? '0%' : `${latencyPercent}%` }}
                    ></div>
                </div>
                <p className="text-xs text-zinc-600 mt-2">
                    {data?.latency && data.latency < 300 ? "Connessione Ottimale" : "Possibile congestione server"}
                </p>
            </div>
          </CardContent>
        </Card>

        {/* CARD 2: DATI TECNICI REALI */}
        <Card className="glass-panel border-zinc-800">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center text-zinc-300">
                <Database className="text-blue-500"/> Log Connessione
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-zinc-800 bg-black/40 overflow-hidden">
                <table className="w-full text-xs text-left">
                    <thead className="bg-zinc-900 text-zinc-400">
                        <tr>
                            <th className="p-2">Parametro</th>
                            <th className="p-2">Valore</th>
                        </tr>
                    </thead>
                    <tbody className="font-mono text-zinc-300 divide-y divide-zinc-800">
                        <tr>
                            <td className="p-2">HTTP Status</td>
                            <td className="p-2">{loading ? "..." : data?.code}</td>
                        </tr>
                        <tr>
                            <td className="p-2">Target</td>
                            <td className="p-2">unimia.it</td>
                        </tr>
                        <tr>
                            <td className="p-2">Timestamp</td>
                            <td className="p-2">{data ? new Date(data.timestamp).toLocaleTimeString() : "..."}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button 
                onClick={checkStatus} 
                className="text-xs text-primary mt-4 hover:underline w-full text-center"
                disabled={loading}
            >
                {loading ? "Aggiornamento..." : "Forza nuovo controllo"}
            </button>
          </CardContent>
        </Card>
      </div>

      {/* LINK RAPIDI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        {services.map((s) => (
            <a href={s.url} target="_blank" rel="noopener noreferrer" key={s.name} className="block group h-full">
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl hover:border-primary/50 hover:bg-zinc-800 transition-all text-center h-full flex flex-col justify-center items-center gap-2">
                    <h3 className="font-bold text-white text-sm group-hover:text-primary">{s.name}</h3>
                    <ExternalLink className="h-3 w-3 text-zinc-600 group-hover:text-primary" />
                </div>
            </a>
        ))}
      </div>
    </div>
  );
}