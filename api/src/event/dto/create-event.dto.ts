export class CreateEventDto {
  name: string;
  date: Date;
  description: string;
  address: string;
  pictures?: string[];
  banner?: string;
  phone: string;
  email: string;
  club: string;
}
