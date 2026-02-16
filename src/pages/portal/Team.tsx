import { mockStaff } from '@/data/portalMockData';
import { useAuth } from '@/contexts/AuthContext';
import StatusBadge from '@/components/portal/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, UserPlus } from 'lucide-react';

const Team = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="space-y-4">
      {isAdmin && (
        <div className="flex justify-end">
          <Button><UserPlus className="mr-2 h-4 w-4" /> Invite Staff</Button>
        </div>
      )}
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/30">
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Role</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Background</th>
              <th className="px-4 py-3 text-left font-medium">Rating</th>
              <th className="px-4 py-3 text-left font-medium">Jobs</th>
            </tr></thead>
            <tbody>
              {mockStaff.map(s => (
                <tr key={s.id} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">{s.role.replace('_', ' ')}</td>
                  <td className="px-4 py-3"><StatusBadge status={s.active ? 'Active' : 'Inactive'} /></td>
                  <td className="px-4 py-3"><StatusBadge status={s.backgroundCheck} /></td>
                  <td className="px-4 py-3">{s.rating > 0 ? <span className="flex items-center gap-1"><Star className="h-3 w-3 text-amber-500 fill-amber-500" />{s.rating}</span> : '—'}</td>
                  <td className="px-4 py-3">{s.completedJobs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Team;
