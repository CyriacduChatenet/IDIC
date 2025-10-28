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
  Sponsors: any[];
}