
import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "doctor" | "guardian" | "admin" | "patient";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("healthtrack-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function - in a real app, this would connect to an API
  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock users data
      const mockUsers = {
        "doctor@example.com": { id: "d1", name: "Dr. Smith", role: "doctor", email: "doctor@example.com" },
        "guardian@example.com": { id: "g1", name: "Jane Doe", role: "guardian", email: "guardian@example.com" },
        "admin@example.com": { id: "a1", name: "Admin User", role: "admin", email: "admin@example.com" },
      };
      
      // Simple validation
      if (password !== "password") {
        throw new Error("Invalid credentials");
      }
      
      const foundUser = mockUsers[email as keyof typeof mockUsers];
      if (!foundUser) {
        throw new Error("User not found");
      }
      
      if (foundUser.role !== role) {
        throw new Error("Incorrect role selected");
      }
      
      setUser(foundUser as User);
      localStorage.setItem("healthtrack-user", JSON.stringify(foundUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("healthtrack-user");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
