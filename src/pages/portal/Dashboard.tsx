import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatusBadge from '@/components/portal/StatusBadge';
import { mockJobs, mockTickets, mockPayments, mockStaff } from '@/data/portalMockData';
import { Briefcase, DollarSign, AlertTriangle, Star, Clock, Users, Megaphone, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, subtitle }: { title: string; value: string | number; icon: any; subtitle?: string }) => (
  <Card>
    <CardContent className="flex items-center gap-4 p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const todayJobs = mockJobs.filter(j => j.date === '2026-02-15');
  const unassigned = mockJobs.filter(j => j.assignedTo.length === 0 && j.status !== 'Cancelled');
  const openTickets = mockTickets.filter(t => t.status !== 'Resolved');
  const totalRevenue = mockPayments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);
  const totalTips = mockPayments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.tip, 0);
  const avgRating = mockJobs.filter(j => j.rating).reduce((s, j, _, a) => s + (j.rating || 0) / a.length, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Today's Jobs" value={todayJobs.length} icon={Briefcase} subtitle={`${unassigned.length} unassigned`} />
        <StatCard title="Revenue (This Period)" value={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} subtitle="Placeholder" />
        <StatCard title="Tips Collected" value={`$${totalTips}`} icon={DollarSign} subtitle="Placeholder" />
        <StatCard title="Avg Rating" value={avgRating.toFixed(1)} icon={Star} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-lg">Alerts</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {unassigned.length > 0 && (
              <div className="flex items-center gap-3 rounded-lg bg-amber-50 p-3 text-sm">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span><strong>{unassigned.length}</strong> unassigned jobs need attention</span>
              </div>
            )}
            {openTickets.length > 0 && (
              <div className="flex items-center gap-3 rounded-lg bg-red-50 p-3 text-sm">
                <LifeBuoy className="h-4 w-4 text-red-600" />
                <span><strong>{openTickets.length}</strong> open support tickets</span>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-lg">Staff Overview</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockStaff.filter(s => s.active).map(s => (
                <div key={s.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.role.replace('_', ' ')}</p>
                  </div>
                  <StatusBadge status={s.active ? 'Active' : 'Inactive'} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const OpsDashboard = () => {
  const todayJobs = mockJobs.filter(j => j.date === '2026-02-15');
  const unassigned = mockJobs.filter(j => j.assignedTo.length === 0 && j.status !== 'Cancelled');
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Today's Jobs" value={todayJobs.length} icon={Briefcase} />
        <StatCard title="Unassigned Queue" value={unassigned.length} icon={AlertTriangle} />
        <StatCard title="Active Cleaners" value={mockStaff.filter(s => s.role === 'CLEANER' && s.active).length} icon={Users} />
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Today's Schedule</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {todayJobs.map(j => (
              <Link key={j.id} to={`/portal/jobs/${j.id}`} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-medium">Job #{j.id} — {j.serviceType}</p>
                  <p className="text-xs text-muted-foreground">{j.startTime} - {j.endTime}</p>
                </div>
                <StatusBadge status={j.status} />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CleanerDashboard = ({ userId }: { userId: string }) => {
  const myJobs = mockJobs.filter(j => j.assignedTo.includes(userId));
  const todayJobs = myJobs.filter(j => j.date === '2026-02-15');
  const myTips = mockPayments.filter(p => p.cleanerId === userId && p.status === 'Paid').reduce((s, p) => s + p.tip, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Today's Jobs" value={todayJobs.length} icon={Briefcase} />
        <StatCard title="My Tips (This Week)" value={`$${myTips}`} icon={DollarSign} subtitle="Placeholder" />
        <StatCard title="Completed Jobs" value={myJobs.filter(j => j.status === 'Completed').length} icon={Clock} />
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">My Jobs Today</CardTitle></CardHeader>
        <CardContent>
          {todayJobs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No jobs scheduled for today.</p>
          ) : (
            <div className="space-y-2">
              {todayJobs.map(j => (
                <Link key={j.id} to={`/portal/jobs/${j.id}`} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium">{j.serviceType} — {j.startTime}-{j.endTime}</p>
                    <p className="text-xs text-muted-foreground">{j.addOns.join(', ') || 'No add-ons'}</p>
                  </div>
                  <StatusBadge status={j.status} />
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const SupportDashboard = () => {
  const openTickets = mockTickets.filter(t => t.status !== 'Resolved');
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard title="Open Tickets" value={openTickets.length} icon={LifeBuoy} />
        <StatCard title="High Priority" value={openTickets.filter(t => t.priority === 'High').length} icon={AlertTriangle} />
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg">Open Tickets</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {openTickets.map(t => (
              <Link key={t.id} to={`/portal/tickets`} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="text-sm font-medium">{t.subject}</p>
                  <p className="text-xs text-muted-foreground">{t.issueType}</p>
                </div>
                <div className="flex gap-2">
                  <StatusBadge status={t.priority} />
                  <StatusBadge status={t.status} />
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const MarketingDashboard = () => (
  <div className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard title="Active Promos" value={3} icon={Megaphone} />
      <StatCard title="Campaign Drafts" value={1} icon={Megaphone} />
      <StatCard title="Conversion Rate" value="8.5%" icon={Star} subtitle="Placeholder" />
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Welcome back, {user.name.split(' ')[0]}</h2>
        <p className="text-muted-foreground">Here's what's happening today.</p>
      </div>
      {user.role === 'ADMIN' && <AdminDashboard />}
      {user.role === 'OPERATIONS_MANAGER' && <OpsDashboard />}
      {user.role === 'CLEANER' && <CleanerDashboard userId={user.id} />}
      {user.role === 'SUPPORT' && <SupportDashboard />}
      {user.role === 'MARKETING' && <MarketingDashboard />}
    </div>
  );
};

export default Dashboard;
