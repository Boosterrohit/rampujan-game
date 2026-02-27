import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  userId: string;
  username: string;
  email: string;
  role: string;
  walletBalance: number;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (user: User, tokenExpiryTime?: number) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  isTokenValid: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getInitialAuth = (): { user: User | null; tokenExpiry: number | null } => {
  if (typeof window === 'undefined') return { user: null, tokenExpiry: null };
  const storedUser = localStorage.getItem('user');
  const storedExpiry = localStorage.getItem('tokenExpiry');
  if (!storedUser || !storedExpiry) return { user: null, tokenExpiry: null };
  try {
    const parsedUser = JSON.parse(storedUser) as User;
    const expiry = parseInt(storedExpiry);
    if (Date.now() > expiry) {
      localStorage.removeItem('user');
      localStorage.removeItem('tokenExpiry');
      return { user: null, tokenExpiry: null };
    }
    return { user: parsedUser, tokenExpiry: expiry };
  } catch {
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiry');
    return { user: null, tokenExpiry: null };
  }
};

const initialAuth = getInitialAuth();

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(initialAuth.user);
  const [loading, setLoading] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState<number | null>(initialAuth.tokenExpiry);

  const login = (userData: User, tokenExpiryTime?: number) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Store token expiry time (15 minutes default to match backend; use backend's expiresIn if provided)
    const expiryTime = tokenExpiryTime || (Date.now() + 15 * 60 * 1000);
    setTokenExpiry(expiryTime);
    localStorage.setItem('tokenExpiry', expiryTime.toString());
  };

  const logout = () => {
    setUser(null);
    setTokenExpiry(null);
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('otpEmail');
    localStorage.removeItem('otpTimestamp');
    // Clear any cached agent assignment so next login/user
    // can see the correct state from the backend.
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key === 'assignedAgent' || key.startsWith('assignedAgent_')) {
          localStorage.removeItem(key);
        }
      });
    } catch {
      // ignore storage errors
    }
  };

  const isTokenValid = () => {
    if (!tokenExpiry || !user) return false;
    return Date.now() < tokenExpiry;
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user && isTokenValid(),
    loading,
    login,
    logout,
    setLoading,
    isTokenValid,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
