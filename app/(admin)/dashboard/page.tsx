import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Users, Clock } from "lucide-react";
import { mockProjects, Project } from "@/lib/data"; // Importiamo i dati finti

export default function DashboardPage() {
  
  // Funzione helper per colorare le badge in base allo stato
  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "fatto": return "bg-green-900/50 text-green-400 hover:bg-green-900/70 border-green-800";
      case "in_corso": return "bg-yellow-900/50 text-yellow-400 hover:bg-yellow-900/70 border-yellow-800";
      case "revisione": return "bg-purple-900/50 text-purple-400 hover:bg-purple-900/70 border-purple-800";
      default: return "bg-zinc-800 text-zinc-400 border-zinc-700";
    }
  };

  const getStatusLabel = (status: string) => {
      return status.replace("_", " ").toUpperCase();
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER DELLA DASHBOARD */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-white glow-text">Progetti Attivi</h1>
            <p className="text-zinc-400">Panoramica operativa del collettivo.</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="mr-2 h-4 w-4" /> Nuovo Progetto
        </Button>
      </div>

      {/* GRIGLIA PROGETTI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockProjects.map((project) => (
            <Card key={project.id} className="bg-zinc-900/40 border-zinc-800 backdrop-blur-sm hover:border-zinc-700 transition-all group">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium leading-none text-zinc-100 group-hover:text-red-400 transition-colors">
                        {project.title}
                    </CardTitle>
                    {/* Badge Stato */}
                    <Badge variant="outline" className={`${getStatusColor(project.status)} uppercase text-[10px]`}>
                        {getStatusLabel(project.status)}
                    </Badge>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mt-4 text-sm text-zinc-500">
                        <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{project.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{project.deadline}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
        
        {/* CARD VUOTA PER AGGIUNGERE (Placeholder visivo) */}
        <button className="flex h-[140px] flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-950/30 text-zinc-600 hover:bg-zinc-900 hover:text-white hover:border-red-900/50 transition-all">
            <Plus className="h-8 w-8 mb-2 opacity-50" />
            <span className="text-sm font-medium">Aggiungi Task Rapida</span>
        </button>
      </div>

      {/* SEZIONE FILE/ARCHIVIO RAPIDO */}
      <div className="mt-8">
         <h2 className="text-xl font-bold mb-4 text-zinc-300">File Condivisi (Drive Mirror)</h2>
         <div className="p-6 rounded-lg border border-zinc-800 bg-zinc-950 text-center text-zinc-500">
            <p>📁 Connessione al Google Drive in corso...</p>
         </div>
      </div>

    </div>
  );
}