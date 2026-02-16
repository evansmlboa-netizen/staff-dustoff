import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { mockJobs, mockClients } from '@/data/portalMockData';
import StatusBadge from '@/components/portal/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

const Jobs = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const jobs = user?.role === 'CLEANER'
    ? mockJobs.filter(j => j.assignedTo.includes(user.id))
    : mockJobs;

  const filtered = jobs.filter(j => {
    const client = mockClients.find(c => c.id === j.clientId);
    const matchesSearch = !search || j.id.includes(search) || client?.name.toLowerCase().includes(search.toLowerCase()) || j.serviceType.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses = ['All', 'Scheduled', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search jobs..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-2">
          {statuses.map(s => (
            <Button key={s} variant={statusFilter === s ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter(s)}>
              {s}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-4 py-3 text-left font-medium">Job</th>
                  <th className="px-4 py-3 text-left font-medium">Client</th>
                  <th className="px-4 py-3 text-left font-medium">Service</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Time</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(j => {
                  const client = mockClients.find(c => c.id === j.clientId);
                  return (
                    <tr key={j.id} className="border-b hover:bg-muted/30 transition-colors cursor-pointer">
                      <td className="px-4 py-3">
                        <Link to={`/portal/jobs/${j.id}`} className="font-medium text-primary hover:underline">#{j.id}</Link>
                      </td>
                      <td className="px-4 py-3">{client?.name}</td>
                      <td className="px-4 py-3">{j.serviceType}</td>
                      <td className="px-4 py-3">{j.date}</td>
                      <td className="px-4 py-3">{j.startTime}-{j.endTime}</td>
                      <td className="px-4 py-3"><StatusBadge status={j.status} /></td>
                      <td className="px-4 py-3">${j.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Jobs;
