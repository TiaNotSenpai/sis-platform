"use client"; // Ora serve perché c'è interazione (apri/chiudi menu)

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, LockKeyhole } from "lucide-react"; // X per chiudere, Lock per login

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl tracking-tighter z-50">
          <span className="text-primary drop-shadow-[0_0_8px_rgba(220,20,60,0.8)]">SIS</span>
          <span className="text-white">.APP</span>
        </Link>

        {/* NAVIGAZIONE DESKTOP (Sparisce su mobile) */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/guida" className="text-white font-bold hover:glow-text transition-colors">Guida Matricole</Link>
          <Link href="/events" className="text-gray-400 hover:text-white transition-colors">Scadenze</Link>
          <Link href="/segnalazioni" className="text-gray-400 hover:text-white transition-colors">Segnalazioni</Link>
          <Link href="/chi-siamo" className="text-gray-400 hover:text-white transition-colors">Chi Siamo</Link>
        </nav>

        {/* AZIONI DX */}
        <div className="flex items-center gap-2 z-50">
           {/* LOGIN DISCRETO (Solo Icona) */}
           <Link href="/login">
            <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-full">
              <LockKeyhole className="h-5 w-5" />
            </Button>
           </Link>

           {/* Hamburger Toggle */}
           <Button 
             variant="ghost" 
             size="icon" 
             className="md:hidden text-white"
             onClick={() => setIsMenuOpen(!isMenuOpen)}
           >
             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
           </Button>
        </div>

        {/* MENU MOBILE (Overlay Fullscreen) */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 md:hidden animate-in fade-in slide-in-from-top-10 duration-200">
             <Link href="/guida" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-white glow-text">
                Guida Sopravvivenza
             </Link>
             <Link href="/events" onClick={() => setIsMenuOpen(false)} className="text-xl text-gray-400">
                Calendario Scadenze
             </Link>
             <Link href="/segnalazioni" onClick={() => setIsMenuOpen(false)} className="text-xl text-gray-400">
                Invia Segnalazione
             </Link>
             <Link href="/unimia" onClick={() => setIsMenuOpen(false)} className="text-xl text-gray-400">
                Stato UniMia
             </Link>
             <Link href="/chi-siamo" onClick={() => setIsMenuOpen(false)} className="text-xl text-gray-400">
                Chi Siamo
             </Link>
          </div>
        )}

      </div>
    </header>
  );
}