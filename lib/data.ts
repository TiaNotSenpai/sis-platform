// MOCK DATA - In futuro questi arriveranno da Supabase

export type ProjectStatus = "bozza" | "in_corso" | "revisione" | "fatto";

export interface Project {
  id: string;
  title: string;
  assignee: string; // Chi se ne occupa
  status: ProjectStatus;
  deadline: string;
}

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Grafiche Post 'Caro Affitti'",
    assignee: "Laura",
    status: "in_corso",
    deadline: "Oggi",
  },
  {
    id: "2",
    title: "Comunicato Stampa Occupazione",
    assignee: "Marco",
    status: "revisione",
    deadline: "Domani",
  },
  {
    id: "3",
    title: "Reel Instagram 'Mensa da Incubo'",
    assignee: "Tutti",
    status: "bozza",
    deadline: "20 Maggio",
  },
  {
    id: "4",
    title: "Aggiornamento Sito Web",
    assignee: "Tech Team",
    status: "fatto",
    deadline: "Ieri",
  },
];