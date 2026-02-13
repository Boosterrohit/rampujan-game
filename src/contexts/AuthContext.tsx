import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState<number | null>(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      const storedExpiry = localStorage.getItem('tokenExpiry');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          const expiry = storedExpiry ? parseInt(storedExpiry) : null;
          
          // Check if token is still valid
          if (expiry && Date.now() > expiry) {
            // Token has expired
            localStorage.removeItem('user');
            localStorage.removeItem('tokenExpiry');
            setUser(null);
            setTokenExpiry(null);
          } else {
            setUser(parsedUser);
            setTokenExpiry(expiry);
          }
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('tokenExpiry');
        }
      }
    };

    checkAuth();
  }, []);

  const login = (userData: User, tokenExpiryTime?: number) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Store token expiry time (24 hours default; use backend's expiresIn if provided)
    const expiryTime = tokenExpiryTime || (Date.now() + 24 * 60 * 60 * 1000);
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
