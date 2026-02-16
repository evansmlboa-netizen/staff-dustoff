import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Role, StaffUser, ROLE_PERMISSIONS } from '@/types/portal';
import { mockStaff } from '@/data/portalMockData';

interface AuthContextType {
  user: StaffUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (module: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<StaffUser | null>(() => {
    const saved = localStorage.getItem('portal-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    const found = mockStaff.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      localStorage.setItem('portal-user', JSON.stringify(found));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('portal-user');
  }, []);

  const hasPermission = useCallback((module: string): boolean => {
    if (!user) return false;
    return ROLE_PERMISSIONS[user.role]?.includes(module) ?? false;
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};
