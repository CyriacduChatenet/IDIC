import { Sponsor } from '../../sponsor/entities/sponsor.entity';
import { Club } from '../../club/entities/club.entity';
import { Permission } from '../../config/enum/permission.enum';
import { Player } from '../../player/entity/player.entity';

export class User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: string;
  confirmationToken: string;
  confirmed: boolean;
  blocked: boolean;
  permission: Permission;
  player: Player;
  club: Club;
  sponsor: Sponsor;
  stripe_customer_id: string;
}
