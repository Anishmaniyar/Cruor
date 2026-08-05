"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { logoutHospital, logoutUser } from "@/services/auth.services";

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
  login: (user: UserData, userType: UserType, accessToken?: string) => void;
  signup: (user: UserData, userType: UserType, accessToken?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "vital-drops-auth";
const TOKEN_KEY = "vital-drops-access-token";

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

function saveToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
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

  const login = useCallback((user: UserData, userType: UserType, accessToken?: string) => {
    saveToStorage(user, userType);
    if (accessToken) saveToken(accessToken);
    setState({ user, userType, isAuthenticated: true });
  }, []);

  const signup = useCallback((user: UserData, userType: UserType, accessToken?: string) => {
    saveToStorage(user, userType);
    if (accessToken) saveToken(accessToken);
    setState({ user, userType, isAuthenticated: true });
  }, []);

  const logout = useCallback(() => {
    // Invalidate the httpOnly cookies on the backend (fire-and-forget).
    const request =
      state.userType === "hospital"
        ? logoutHospital()
        : logoutUser();

    request.catch(() => {
      // Even if the API call fails, we still clear the local session.
    });

    clearAllAuthData();
    setState({ user: null, userType: null, isAuthenticated: false });
  }, [state.userType]);

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
