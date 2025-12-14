import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-900 selection:text-white">
      {/* BACKGROUND TECNICO: Griglia diversa per distinguere l'area */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* ADMIN TOPBAR */}
      <header className="relative z-10 border-b border-red-900/30 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-500">
                <ShieldAlert className="h-5 w-5" />
                <span className="font-mono text-sm font-bold tracking-widest">SIS.INTERNAL_SYS</span>
            </div>
            
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-white text-xs">
                        Torna al Sito Pubblico
                    </Button>
                </Link>
                {/* Questo bottone per ora riporta solo alla home, in futuro farà il logout vero */}
                <Link href="/">
                    <Button variant="destructive" size="icon" className="h-8 w-8">
                        <LogOut className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
      </header>

      {/* CONTENUTO PRINCIPALE */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}