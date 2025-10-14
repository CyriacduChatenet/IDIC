import { Event } from '../../event/entities/event.entity';

export class Club {
  id: number;
  documentId: string;
  name: string;
  logo: string;
  phone: string;
  email: string;
  address: string;
  events: Event[];
}
