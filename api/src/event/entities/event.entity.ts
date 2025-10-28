import { Sponsor } from 'src/sponsor/entities/sponsor.entity';
import { Club } from '../../club/entities/club.entity';

export class Event {
  id: number;
  documentId: string;
  name: string;
  date: Date;
  description: string;
  address: string;
  lat: string;
  lon: string;
  pictures: string[];
  banner: string;
  phone: string;
  email: string;
  team_size: number;
  club: Club;
  Sponsors: Sponsor[];
}
