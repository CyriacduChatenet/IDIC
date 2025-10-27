import { Permission } from "../enum/permission.enum";

export interface User {
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
  player: Object | null;
  club: Object | null;
  sponsor: Object | null;
  stripe_customer_id: string;
}