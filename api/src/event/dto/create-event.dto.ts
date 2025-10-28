export class CreateEventDto {
  name: string;
  date: Date;
  description: string;
  address: string;
  lat: string;
  lon: string;
  pictures?: string[];
  banner?: string;
  phone: string;
  email: string;
  team_size: number;
  club: string;
}
