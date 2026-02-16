import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_PERMISSIONS } from '@/types/portal';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, Briefcase, CalendarDays, Users, UserCog,
  ClipboardCheck, DollarSign, BarChart3, Megaphone, LifeBuoy,
  Settings, UserCircle, LogOut, Menu, X, Leaf
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

const navItems = [
  { label: 'Dashboard', path: '/portal', icon: LayoutDashboard, module: 'dashboard' },
  { label: 'Jobs', path: '/portal/jobs', icon: Briefcase, module: 'jobs' },
  { label: 'Calendar', path: '/portal/calendar', icon: CalendarDays, module: 'calendar' },
  { label: 'Clients', path: '/portal/clients', icon: Users, module: 'clients' },
  { label: 'Team', path: '/portal/team', icon: UserCog, module: 'team' },
  { label: 'Quality Control', path: '/portal/qc', icon: ClipboardCheck, module: 'qc' },
  { label: 'Payments & Tips', path: '/portal/payments', icon: DollarSign, module: 'payments' },
  { label: 'Reports', path: '/portal/reports', icon: BarChart3, module: 'reports' },
  { label: 'Marketing', path: '/portal/marketing', icon: Megaphone, module: 'marketing' },
  { label: 'Support Tickets', path: '/portal/tickets', icon: LifeBuoy, module: 'tickets' },
  { label: 'Settings', path: '/portal/settings', icon: Settings, module: 'settings' },
  { label: 'Profile', path: '/portal/profile', icon: UserCircle, module: 'profile' },
];

const PortalLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return null;

  const allowed = navItems.filter(n => ROLE_PERMISSIONS[user.role]?.includes(n.module));

  const handleLogout = () => {
    logout();
    navigate('/portal/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-card transition-transform duration-200 lg:static lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center gap-2 border-b border-border px-5 py-4">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tight">Dust Off</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {allowed.map(item => {
            const active = item.path === '/portal'
              ? location.pathname === '/portal'
              : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.role.replace('_', ' ')}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center gap-4 border-b border-border bg-card px-4 py-3 lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold flex-1">
            {allowed.find(n => n.path === '/portal' ? location.pathname === '/portal' : location.pathname.startsWith(n.path))?.label || 'Portal'}
          </h1>
          <ThemeToggle />
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
