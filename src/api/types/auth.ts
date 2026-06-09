export type AuthRole = 'USER' | 'ADMIN';

export interface AuthCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    expiresInMs: number;
}

export interface AuthUser {
    username: string;
    role: AuthRole;
    token: string;
    expiresAt: number;
}

export interface AuthLog {
    id: number;
    username: string;
    token: string;
    issuedAt: number;
    expiresAt: number;
}
