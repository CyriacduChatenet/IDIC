import { Event } from '../../event/entities/event.entity';
import { Player } from '../../player/entity/player.entity';

export class Ticket {
  id: number;
  documentId: string;
  qr_code: string;
  event: Event;
  player: Player;
}
