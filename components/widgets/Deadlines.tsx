import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dati statici per la demo
const events = [
  { id: 1, title: "Seconda Rata", date: "31 Mag", type: "Tasse", urgent: true },
  { id: 2, title: "Bando Erasmus", date: "15 Giu", type: "Bandi", urgent: false },
  { id: 3, title: "Sessione Estiva", date: "20 Giu", type: "Esami", urgent: true },
];

export function Deadlines() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📅 Prossime Scadenze
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
            <div className="space-y-1">
              <p className="font-medium leading-none">{event.title}</p>
              <p className="text-xs text-muted-foreground">{event.type}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
               <span className="font-bold text-sm">{event.date}</span>
               {event.urgent && <Badge variant="destructive" className="text-[10px] h-5">Urgente</Badge>}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}