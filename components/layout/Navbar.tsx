"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, LockKeyhole, BookOpen, AlertTriangle, Calendar, Home, Server } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  // --- LISTA LINK PULITA (SENZA TRACKING) ---
  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5"/> },
    { href: "/guida", label: "Manuale", icon: <BookOpen className="w-5 h-5"/> },
    { href: "/events", label: "Scadenze", icon: <Calendar className="w-5 h-5"/> },
    { href: "/segnalazioni", label: "Segnala", icon: <AlertTriangle className="w-5 h-5"/> },
    { href: "/chi-siamo", label: "Chi Siamo", icon: null },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl tracking-tighter z-50 relative">
          <span className="text-primary drop-shadow-[0_0_15px_rgba(220,20,60,0.6)]">SIS</span>
          <span className="text-white">.PLATFORM</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
             <Link 
               key={link.href} 
               href={link.href} 
               className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive(link.href) ? "bg-white/10 text-white font-bold" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}>
               {link.label === 'Chi Siamo' ? 'Chi Siamo' : link.label}
             </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 z-50">
           <Link href="/login">
            <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-primary hover:bg-primary/10 rounded-full">
              <LockKeyhole className="h-5 w-5" />
            </Button>
           </Link>
           <Button 
             variant="ghost" 
             size="icon" 
             className="md:hidden text-white hover:bg-white/10"
             onClick={() => setIsMenuOpen(!isMenuOpen)}>
             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
           </Button>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 top-0 left-0 w-full h-screen bg-black z-40 flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-5 duration-300">
             <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full opacity-30 pointer-events-none" />
             <nav className="flex flex-col items-center gap-6 w-full px-8 relative z-50">
                {navLinks.map((link) => (
                    <Link 
                        key={link.href} 
                        href={link.href} 
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-4 text-2xl font-bold transition-colors w-full justify-center py-4 border-b border-white/5 ${isActive(link.href) ? "text-primary glow-text" : "text-white"}`}>
                        {link.icon}
                        <span>{link.label === 'Chi Siamo' ? 'Chi Siamo' : link.label}</span>
                    </Link>
                ))}
                <Link 
                    href="/unimia"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-8 text-zinc-400 hover:text-white text-sm font-medium border border-zinc-800 px-4 py-3 rounded-lg flex items-center gap-2">
                    <Server className="h-4 w-4"/>
                    Stato Servizi Ateneo
                </Link>
             </nav>
          </div>
        )}
      </div>
    </header>
  );
}