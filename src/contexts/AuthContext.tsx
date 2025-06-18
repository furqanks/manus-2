import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react'; // Use type-only import for ReactNode
import { getCurrentUser } from '../services/api'; // Assuming api.ts is in ../services

// Define login credentials interface
interface LoginCredentials {
  username: string;
  password: string;
}

// Define register credentials interface
interface RegisterCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: any; // Replace 'any' with a proper User type/interface later
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Verify token by fetching user data
      getCurrentUser()
        .then(userData => {
          setUser(userData);
          setIsAuthenticated(true);
        })
        .catch(() => {
          // Token is invalid or expired
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
          setUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      // This is a placeholder - in a real implementation, you would call your API service
      // const response = await loginUser(credentials);
      // const token = response.token;
      
      // For demo purposes, we'll just use a fake token
      const token = "fake-auth-token-" + Date.now();
      
      localStorage.setItem('authToken', token);
      setIsLoading(true);
      
      // Simulate getting user data
      const userData = { email: credentials.username, id: 1 };
      setUser(userData);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      // This is a placeholder - in a real implementation, you would call your API service
      // const response = await registerUser(credentials);
      // const token = response.token;
      
      // For demo purposes, we'll just use a fake token
      const token = "fake-auth-token-" + Date.now();
      
      localStorage.setItem('authToken', token);
      setIsLoading(true);
      
      // Simulate getting user data
      const userData = { email: credentials.email, id: 1 };
      setUser(userData);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
