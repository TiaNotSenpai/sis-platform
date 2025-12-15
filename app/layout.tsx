import type { Metadata, Viewport } from 'next'; // Aggiungi Viewport
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// 1. OGGETTO METADATA (Senza themeColor)
export const metadata: Metadata = {
  title: 'SIS - Studenti Indipendenti Statale',
  description: 'La piattaforma di autodifesa universitaria. Scadenze, guide e segnalazioni anonime.',
  icons: {
    icon: '/favicon.ico',
  },
};

// 2. NUOVO OGGETTO VIEWPORT (Con themeColor)
export const viewport: Viewport = {
  themeColor: '#800020',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={inter.className}>{children}</body>
    </html>
  );
}