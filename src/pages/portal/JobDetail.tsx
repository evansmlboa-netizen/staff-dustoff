import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { mockJobs, mockClients, mockStaff } from '@/data/portalMockData';
import StatusBadge from '@/components/portal/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, MapPin, User, DollarSign, Camera, ClipboardCheck } from 'lucide-react';

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const job = mockJobs.find(j => j.id === id);
  const client = job ? mockClients.find(c => c.id === job.clientId) : null;
  const address = client?.addresses.find(a => a.id === job?.addressId);
  const assignedStaff = job ? mockStaff.filter(s => job.assignedTo.includes(s.id)) : [];
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'OPERATIONS_MANAGER';
  const isCleaner = user?.role === 'CLEANER';

  if (!job) return <div className="text-center py-12 text-muted-foreground">Job not found.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/portal/jobs"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <div>
          <h2 className="text-xl font-bold">Job #{job.id}</h2>
          <p className="text-sm text-muted-foreground">{job.serviceType} Clean</p>
        </div>
        <div className="ml-auto flex gap-2">
          <StatusBadge status={job.status} />
          <StatusBadge status={job.paymentStatus} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><User className="h-4 w-4" /> Client & Location</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div><span className="text-muted-foreground">Client:</span> <span className="font-medium">{client?.name}</span></div>
            <div><span className="text-muted-foreground">Phone:</span> {client?.phone}</div>
            {address && (
              <>
                <div className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" /><span>{address.street}, {address.city}, {address.state} {address.zip}</span></div>
                <div className="rounded-lg bg-muted/50 p-3"><span className="text-xs font-medium text-muted-foreground">Access Instructions</span><p>{address.accessInstructions}</p></div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Clock className="h-4 w-4" /> Schedule & Details</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div><span className="text-muted-foreground">Date:</span> {job.date}</div>
            <div><span className="text-muted-foreground">Time:</span> {job.startTime} - {job.endTime}</div>
            <div><span className="text-muted-foreground">Add-ons:</span> {job.addOns.length > 0 ? job.addOns.join(', ') : 'None'}</div>
            <div><span className="text-muted-foreground">Assigned:</span> {assignedStaff.length > 0 ? assignedStaff.map(s => s.name).join(', ') : <span className="text-amber-600 font-medium">Unassigned</span>}</div>
            {job.clientNotes && <div className="rounded-lg bg-muted/50 p-3"><span className="text-xs font-medium text-muted-foreground">Client Notes</span><p>{job.clientNotes}</p></div>}
            {job.internalNotes && <div className="rounded-lg bg-primary/5 p-3"><span className="text-xs font-medium text-muted-foreground">Internal Notes</span><p>{job.internalNotes}</p></div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><DollarSign className="h-4 w-4" /> Payment</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Amount</span><span className="font-medium">${job.amount}</span></div>
            <div className="flex justify-between"><span>Tip</span><span className="font-medium">${job.tip}</span></div>
            <div className="flex justify-between border-t pt-2"><span className="font-medium">Total</span><span className="font-bold">${job.amount + job.tip}</span></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><ClipboardCheck className="h-4 w-4" /> Timeline</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {job.timeline.map((e, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium">{e.event}</span>
                  <span className="text-xs text-muted-foreground">{new Date(e.timestamp).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        {isCleaner && job.status === 'Confirmed' && <Button>Start Job</Button>}
        {isCleaner && job.status === 'In Progress' && <Button>Complete Job</Button>}
        {isCleaner && <Button variant="outline"><Camera className="mr-2 h-4 w-4" /> Upload Photos</Button>}
        {isAdmin && <Button variant="outline">Assign/Reassign Cleaner</Button>}
        {isAdmin && <Button variant="outline">Reschedule</Button>}
        {isAdmin && job.status !== 'Cancelled' && <Button variant="outline" className="text-destructive">Cancel Job</Button>}
      </div>
    </div>
  );
};

export default JobDetail;
