"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Activity, History } from "lucide-react";

type ApiData = {
  status: 'loading' | 'operational' | 'degraded' | 'down';
  latency: number;
  lastDown: string | null;
};

export function UnimiaStatus() {
  const [data, setData] = useState<ApiData>({ status: 'loading', latency: 0, lastDown: null });

  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch(() => setData({ status: 'down', latency: 0, lastDown: null }));
  }, []);

  // Logica Colori e Barra
  const getDetails = () => {
    switch (data.status) {
      case 'operational': return { 
        text: "OPERATIVO", 
        color: "text-green-400", 
        border: "border-green-500/30", 
        ping: "bg-green-500",
        bar: "bg-green-500" // Barra Verde
      };
      case 'degraded': return { 
        text: "RALLENTAMENTI", 
        color: "text-yellow-400", 
        border: "border-yellow-500/30", 
        ping: "bg-yellow-500",
        bar: "bg-yellow-500" // Barra Gialla
      };
      case 'down': return { 
        text: "OFFLINE", 
        color: "text-red-400", 
        border: "border-red-500/30", 
        ping: "bg-red-500",
        bar: "bg-red-500" // Barra Rossa
      };
      default: return { 
        text: "VERIFICA...", 
        color: "text-zinc-500", 
        border: "border-zinc-700", 
        ping: "bg-zinc-600",
        bar: "bg-zinc-700" // Barra Grigia
      };
    }
  };

  const d = getDetails();

  const lastDownText = data.lastDown 
    ? new Date(data.lastDown).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' }) 
    : "Mai";

  return (
    <Card className={`shadow-lg transition-all border ${d.border} bg-black/40 overflow-hidden`}>
      <CardContent className="p-5 flex flex-col gap-3">
        
        {/* HEADER: Titolo e Ping */}
        <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Stato Unimia</h3>
            <span className="relative flex h-2.5 w-2.5">
              {data.status !== 'loading' && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${d.ping}`}></span>}
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${d.ping}`}></span>
            </span>
        </div>

        {/* TESTO STATO GRANDE */}
        <div className={`text-2xl font-black ${d.color} tracking-tight leading-none mt-1`}>
            {d.text}
        </div>

        {/* --- BARRA COLOR CODED (Eccola!) --- */}
        <div className={`w-full h-1.5 rounded-full ${d.bar} opacity-80 my-1 shadow-[0_0_10px_rgba(0,0,0,0.5)]`} />

        {/* METRICHE */}
        <div className="flex items-center justify-between text-xs text-zinc-400 font-mono py-1">
           <div className="flex items-center gap-1.5">
               <Activity className="h-3 w-3 text-zinc-600" />
               <span>{data.status === 'loading' ? '...' : `${data.latency}ms`}</span>
           </div>
           <div className="flex items-center gap-1.5">
               <History className="h-3 w-3 text-zinc-600" />
               <span>Down: {lastDownText}</span>
           </div>
        </div>
        
        {/* BOTTONE REPORT */}
        <Link href="/unimia" className="w-full mt-2">
          <Button variant="secondary" size="sm" className="w-full h-8 text-xs justify-between bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors">
            REPORT COMPLETO
            <ArrowRight className="h-3 w-3 opacity-50" />
          </Button>
        </Link>

      </CardContent>
    </Card>
  );
}