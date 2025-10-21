import { User } from '../../user/entity/user.entity';

export interface AuthDataResponse {
  jwt: string;
  user: User;
}

export interface ForgotPasswordDataResponse {
  ok: boolean;
}

export interface ChangePasswordDataResponse {
  user: User;
}
