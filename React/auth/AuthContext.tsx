// auth/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

export type User = {
  id: string;
  name: string;
  permissions: string[];
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
};

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: true,
  });

  // Load session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("session");
    if (stored) {
      setState((prev) => ({ ...prev, ...JSON.parse(stored), loading: false }));
    } else {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();

    const session = {
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };

    localStorage.setItem("session", JSON.stringify(session));
    setState({ ...session, loading: false });
  };

  const logout = () => {
    localStorage.removeItem("session");
    setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
