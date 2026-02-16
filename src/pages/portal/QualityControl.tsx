import { mockJobs, mockClients, mockStaff } from '@/data/portalMockData';
import StatusBadge from '@/components/portal/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Camera, AlertTriangle, MessageSquare } from 'lucide-react';

const QualityControl = () => {
  const recentCompleted = mockJobs.filter(j => j.status === 'Completed').slice(0, 7);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-5 text-center"><p className="text-sm text-muted-foreground">Reviewed</p><p className="text-2xl font-bold">{recentCompleted.filter(j => j.checklistCompleted).length}</p></CardContent></Card>
        <Card><CardContent className="p-5 text-center"><p className="text-sm text-muted-foreground">Pending Review</p><p className="text-2xl font-bold">{recentCompleted.filter(j => !j.checklistCompleted).length}</p></CardContent></Card>
        <Card><CardContent className="p-5 text-center"><p className="text-sm text-muted-foreground">Avg Rating</p><p className="text-2xl font-bold">{(recentCompleted.filter(j=>j.rating).reduce((s,j,_,a) => s + (j.rating||0)/a.length, 0)).toFixed(1)}</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Review Queue — Last 7 Days</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {recentCompleted.map(j => {
            const client = mockClients.find(c => c.id === j.clientId);
            const cleaner = mockStaff.find(s => j.assignedTo.includes(s.id));
            return (
              <div key={j.id} className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Job #{j.id} — {j.serviceType}</p>
                    <p className="text-sm text-muted-foreground">{client?.name} • {cleaner?.name || 'Unknown'} • {j.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {j.rating && <span className="flex items-center gap-1 text-sm"><Star className="h-3 w-3 text-amber-500 fill-amber-500" />{j.rating}/5</span>}
                    <StatusBadge status={j.checklistCompleted ? 'Reviewed' : 'Pending'} variant={j.checklistCompleted ? 'success' : 'warning'} />
                  </div>
                </div>
                {j.ratingComment && <p className="text-sm italic text-muted-foreground">"{j.ratingComment}"</p>}
                <div className="flex gap-2 text-sm">
                  <span className="text-muted-foreground">Checklist: {j.checklistCompleted ? '✓ Complete' : '○ Incomplete'}</span>
                  <span className="text-muted-foreground">Photos: {j.photos.before.length + j.photos.after.length} uploaded</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline"><AlertTriangle className="mr-1 h-3 w-3" /> Flag Issue</Button>
                  <Button size="sm" variant="outline"><MessageSquare className="mr-1 h-3 w-3" /> Note to Cleaner</Button>
                  <Button size="sm" variant="outline">Request Re-clean</Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default QualityControl;
