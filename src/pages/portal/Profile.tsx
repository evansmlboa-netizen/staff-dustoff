import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/portal/StatusBadge';

const Profile = () => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <div className="flex gap-2 mt-1">
                <StatusBadge status={user.role.replace('_', ' ')} variant="info" />
                <StatusBadge status={user.active ? 'Active' : 'Inactive'} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Name</Label><Input defaultValue={user.name} /></div>
            <div className="space-y-2"><Label>Email</Label><Input defaultValue={user.email} /></div>
            <div className="space-y-2"><Label>Phone</Label><Input defaultValue={user.phone} /></div>
            <div className="space-y-2"><Label>Role</Label><Input value={user.role.replace('_', ' ')} disabled /></div>
          </div>
          <Button>Update Profile</Button>
        </CardContent>
      </Card>

      {user.role === 'CLEANER' && (
        <Card>
          <CardHeader><CardTitle className="text-base">Performance</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-3 gap-4 text-center text-sm">
            <div><p className="text-muted-foreground">Completed</p><p className="text-2xl font-bold">{user.completedJobs}</p></div>
            <div><p className="text-muted-foreground">Rating</p><p className="text-2xl font-bold">{user.rating}</p></div>
            <div><p className="text-muted-foreground">Late</p><p className="text-2xl font-bold">{user.lateCount}</p></div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Profile;
