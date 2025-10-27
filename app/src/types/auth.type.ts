export interface LoginDto {
    identifier: string;
    password: string;
}

export interface RegisterDto {
    username: string;
    email: string;
    password: string;
    first_name?: string;
    last_name?: string;
    birth_date?: Date;
    address: string;
    phone: number;
    name?: string;
}

export interface ForgotPasswordDto {
    email: string;
}

export interface ResetPasswordDto {
    password: string;
}