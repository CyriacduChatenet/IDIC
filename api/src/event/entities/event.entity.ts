import { Club } from '../../club/entities/club.entity';

export class Event {
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
  club: Club;
}
