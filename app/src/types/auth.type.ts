export interface LoginDto {
    identifier: string;
    password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  // ✅ L'API attend la date au format string (ISO)
  birth_date: string; 
  phone: string; 
  // 💡 Ajout du champ permission pour l'API. La valeur est envoyée sous forme de string (enum stringifié).
  permission: string;
}

export interface ForgotPasswordDto {
    email: string;
}

export interface ResetPasswordDto {
    password: string;
}
