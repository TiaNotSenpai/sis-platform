import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function UnimiaStatus() {
  // Simuliamo lo stato. In futuro questo arriverà dal backend
  const status = "operational"; // operational | degraded | down

  return (
    <Card className="border-l-4 border-l-green-600 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Stato UniMia</CardTitle>
        {/* Pallino pulsante */}
        <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-700">OPERATIVO</div>
        <p className="text-xs text-muted-foreground mt-1">
          Ultimo controllo: 1 min fa
        </p>
        <p className="text-xs text-muted-foreground mt-4">
          Nessun disservizio segnalato su Ariel o Segreterie.
        </p>
      </CardContent>
    </Card>
  );
}