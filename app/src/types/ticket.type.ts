import { Event } from "./event.type";

export interface Ticket {
  id: number;
  documentId: string;
  qr_code: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  event: Event;
}
