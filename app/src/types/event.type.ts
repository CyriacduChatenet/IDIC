import { Ticket } from "./ticket.type";

export interface Event {
  id: number;
  documentId: string;
  name: string;
  date: Date;
  description: string;
  address: string;
  pictures: string[];
  banner: string;
  phone: string;
  email: string;
  team_size: number;
  club: any;
  tickets: Ticket[]
  Sponsors: any[];
}

export interface CreateEventDto {
  name: string;
  date: Date;
  description: string;
  address: string;
  phone: string;
  email: string;
  team_size: number;
  club: string;
}