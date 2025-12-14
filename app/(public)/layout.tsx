import { Navbar } from "@/components/layout/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Sfondo sfumato globale per dare profondità */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black z-[-1]" />
      
      {/* Spot di luce rosso (opzionale, fa molto scena) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[100px] rounded-full opacity-50 z-[-1]" />

      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1 relative z-10">
        {children}
      </main>
      
      {/* Footer minimale */}
      <footer className="py-6 text-center text-xs text-zinc-600 z-10">
        &copy; 2024 Collettivo Studenti Indipendenti - Built for students, by students.
      </footer>
    </section>
  );
}