"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type UserType = "donor" | "hospital";

export interface UserData {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: UserData | null;
  userType: UserType | null;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (user: UserData, userType: UserType) => void;
  signup: (user: UserData, userType: UserType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "vital-drops-auth";

function loadFromStorage(): AuthState {
  if (typeof window === "undefined") {
    return { user: null, userType: null, isAuthenticated: false };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        user: parsed.user ?? null,
        userType: parsed.userType ?? null,
        isAuthenticated: !!(parsed.user && parsed.userType),
      };
    }
  } catch {
    // ignore
  }
  return { user: null, userType: null, isAuthenticated: false };
}

function saveToStorage(user: UserData | null, userType: UserType | null) {
  if (typeof window === "undefined") return;
  if (user && userType) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, userType }));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function clearAllAuthData() {
  // Clear localStorage
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("vital-drops-refresh-token");
  localStorage.removeItem("vital-drops-access-token");

  // Clear any auth-related cookies
  document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
  document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
  document.cookie = "vital-drops-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(loadFromStorage);

  const login = useCallback((user: UserData, userType: UserType) => {
    saveToStorage(user, userType);
    setState({ user, userType, isAuthenticated: true });
  }, []);

  const signup = useCallback((user: UserData, userType: UserType) => {
    saveToStorage(user, userType);
    setState({ user, userType, isAuthenticated: true });
  }, []);

  const logout = useCallback(() => {
    clearAllAuthData();
    setState({ user: null, userType: null, isAuthenticated: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
