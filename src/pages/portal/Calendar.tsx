import { useState } from 'react';
import { mockJobs, mockClients, mockStaff } from '@/data/portalMockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/portal/StatusBadge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 15));
  const [view, setView] = useState<'day' | 'week'>('week');

  const getWeekDays = (date: Date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const weekDays = getWeekDays(currentDate);
  const unassigned = mockJobs.filter(j => j.assignedTo.length === 0 && j.status !== 'Cancelled');
  const hours = Array.from({ length: 12 }, (_, i) => i + 7);

  const formatDateStr = (d: Date) => d.toISOString().split('T')[0];
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => { const d = new Date(currentDate); d.setDate(d.getDate() - 7); setCurrentDate(d); }}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-semibold">
            {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </h3>
          <Button variant="outline" size="icon" onClick={() => { const d = new Date(currentDate); d.setDate(d.getDate() + 7); setCurrentDate(d); }}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant={view === 'day' ? 'default' : 'outline'} size="sm" onClick={() => setView('day')}>Day</Button>
          <Button variant={view === 'week' ? 'default' : 'outline'} size="sm" onClick={() => setView('week')}>Week</Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Header */}
              <div className="grid border-b" style={{ gridTemplateColumns: '64px repeat(7, 1fr)' }}>
                <div className="p-2 border-r" />
                {weekDays.map((d, i) => (
                  <div key={i} className="p-2 text-center border-r last:border-r-0">
                    <p className="text-xs text-muted-foreground">{dayNames[i]}</p>
                    <p className="text-sm font-medium">{d.getDate()}</p>
                  </div>
                ))}
              </div>
              {/* Time grid */}
              {hours.map(h => (
                <div key={h} className="grid border-b" style={{ gridTemplateColumns: '64px repeat(7, 1fr)' }}>
                  <div className="p-2 text-xs text-muted-foreground border-r">{h}:00</div>
                  {weekDays.map((d, i) => {
                    const dayStr = formatDateStr(d);
                    const jobsInSlot = mockJobs.filter(j => j.date === dayStr && parseInt(j.startTime) <= h && parseInt(j.endTime) > h);
                    return (
                      <div key={i} className="min-h-[48px] border-r last:border-r-0 p-0.5">
                        {jobsInSlot.map(j => (
                          <div key={j.id} className="mb-0.5 rounded bg-primary/15 px-1.5 py-0.5 text-xs truncate">
                            {j.serviceType} • {mockClients.find(c => c.id === j.clientId)?.name?.split(' ')[0]}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Unassigned sidebar */}
        <Card>
          <CardHeader><CardTitle className="text-base">Unassigned Jobs</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {unassigned.length === 0 ? (
              <p className="text-sm text-muted-foreground">All jobs assigned!</p>
            ) : unassigned.map(j => (
              <div key={j.id} className="rounded-lg border p-3 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{j.serviceType}</span>
                  <StatusBadge status={j.status} />
                </div>
                <p className="text-xs text-muted-foreground">{j.date} • {j.startTime}-{j.endTime}</p>
                <Button size="sm" variant="outline" className="w-full mt-1">Assign Cleaner</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
