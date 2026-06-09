import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AuthCredentials, AuthResponse, AuthRole, AuthUser } from '../api/types/auth';

const AUTH_STORAGE_KEY = 'emt-lab-auth';
const TOKEN_STORAGE_KEY = 'emt-lab-token';

type StoredAuth = AuthUser | null;

interface AuthContextValue {
    user: AuthUser | null;
    isLoggedIn: boolean;
    isAdmin: boolean;
    login: (credentials: AuthCredentials, response: AuthResponse) => void;
    register: (credentials: AuthCredentials, response: AuthResponse) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const getRoleForUsername = (username: string): AuthRole => {
    return username.trim().toLowerCase() === 'admin' ? 'ADMIN' : 'USER';
};

const readStoredAuth = (): StoredAuth => {
    try {
        const raw = localStorage.getItem(AUTH_STORAGE_KEY);
        if (!raw) {
            return null;
        }

        const parsed = JSON.parse(raw) as StoredAuth;

        if (parsed && parsed.expiresAt <= Date.now()) {
            localStorage.removeItem(AUTH_STORAGE_KEY);
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            return null;
        }

        return parsed;
    } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        return null;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(() => readStoredAuth());

    useEffect(() => {
        if (user) {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
            localStorage.setItem(TOKEN_STORAGE_KEY, user.token);
        } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
            localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
    }, [user]);

    const setAuthenticatedUser = useCallback((credentials: AuthCredentials, response: AuthResponse) => {
        const nextUser: AuthUser = {
            username: credentials.username,
            role: getRoleForUsername(credentials.username),
            token: response.token,
            expiresAt: Date.now() + response.expiresInMs
        };

        setUser(nextUser);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const value = useMemo<AuthContextValue>(() => ({
        user,
        isLoggedIn: user !== null,
        isAdmin: user?.role === 'ADMIN',
        login: setAuthenticatedUser,
        register: setAuthenticatedUser,
        logout
    }), [logout, setAuthenticatedUser, user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};



