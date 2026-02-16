import { mockStaff } from '@/data/portalMockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StatusBadge from '@/components/portal/StatusBadge';
import { Building2, Shield, FileText, Users } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Building2 className="h-4 w-4" /> Company Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input defaultValue="Dust Off Cleaning LLC" />
            </div>
            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input defaultValue="support@dustoffcleaning.com" />
            </div>
            <div className="space-y-2">
              <Label>Support Phone</Label>
              <Input defaultValue="(555) 123-4567" />
            </div>
            <div className="flex gap-4 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-primary" /> Bonded</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="accent-primary" /> Insured</label>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4" /> Pricing (Placeholder)</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2"><span>Standard Clean</span><span className="font-medium">$100 - $150</span></div>
            <div className="flex justify-between border-b pb-2"><span>Deep Clean</span><span className="font-medium">$180 - $250</span></div>
            <div className="flex justify-between border-b pb-2"><span>Move-In/Out</span><span className="font-medium">$250 - $400</span></div>
            <div className="flex justify-between pb-2"><span>Recurring (weekly)</span><span className="font-medium">$90 - $130</span></div>
            <p className="text-xs text-muted-foreground">Add-on prices configurable once connected to backend.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4" /> Policies (Placeholder)</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Cancellation: 24 hours notice required</p>
            <p>• Reschedule: Up to 12 hours before appointment</p>
            <p>• Late arrival: 15-minute grace period</p>
            <p>• Damage claims: Report within 48 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4" /> Role Management</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {mockStaff.map(s => (
              <div key={s.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select defaultValue={s.role} className="rounded border bg-background px-2 py-1 text-xs">
                    <option value="ADMIN">Admin</option>
                    <option value="OPERATIONS_MANAGER">Ops Manager</option>
                    <option value="CLEANER">Cleaner</option>
                    <option value="SUPPORT">Support</option>
                    <option value="MARKETING">Marketing</option>
                  </select>
                  <StatusBadge status={s.active ? 'Active' : 'Inactive'} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Audit Log (Placeholder)</CardTitle></CardHeader>
        <CardContent className="flex items-center justify-center py-12 text-muted-foreground">
          <p>Audit log entries will appear here once connected to a backend.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
