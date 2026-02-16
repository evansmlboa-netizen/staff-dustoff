import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_PERMISSIONS } from '@/types/portal';

interface RoleGuardProps {
  module: string;
  children: ReactNode;
}

const RoleGuard = ({ module, children }: RoleGuardProps) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated || !user) return <Navigate to="/portal/login" replace />;
  
  const allowed = ROLE_PERMISSIONS[user.role]?.includes(module);
  if (!allowed) return <Navigate to="/portal" replace />;
  
  return <>{children}</>;
};

export default RoleGuard;
