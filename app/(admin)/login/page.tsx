"use client"; // Obbligatorio perché usiamo input e state

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // LOGICA FAKE DI LOGIN
    if (password === "sis2024") {
      router.push("/dashboard");
    } else {
      setError(true);
      // Shake effect finto (lo facciamo resettando l'errore dopo un po' se volessimo animarlo, ma semplice per ora)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-950/50 backdrop-blur text-zinc-100 shadow-[0_0_50px_rgba(255,0,0,0.1)]">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto bg-red-950/30 p-3 rounded-full mb-4 w-fit border border-red-900/50">
             <LockKeyhole className="h-8 w-8 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Accesso Riservato</CardTitle>
          <CardDescription className="text-zinc-500">
            Inserisci la passphrase del collettivo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input 
                type="password" 
                placeholder="Passphrase..." 
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                }}
                className={`bg-black border-zinc-800 focus-visible:ring-red-500 ${error ? "border-red-600 focus-visible:ring-red-600" : ""}`}
              />
              {error && <p className="text-xs text-red-500 font-bold ml-1">Accesso Negato: Password errata.</p>}
            </div>
            <Button type="submit" className="w-full bg-red-700 hover:bg-red-800 text-white font-bold">
              AUTENTICAZIONE
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-xs text-zinc-600 font-mono">
        IP: LOGGED · SYSTEM: SECURE · SIS.MEMETICA
      </p>
    </div>
  );
}