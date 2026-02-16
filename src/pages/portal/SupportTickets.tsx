import { useState } from 'react';
import { mockTickets, mockClients } from '@/data/portalMockData';
import StatusBadge from '@/components/portal/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SupportTickets = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = mockTickets.filter(t => statusFilter === 'All' || t.status === statusFilter);
  const selected = mockTickets.find(t => t.id === selectedId);
  const client = selected ? mockClients.find(c => c.id === selected.clientId) : null;

  if (selected) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setSelectedId(null)}><ArrowLeft className="h-4 w-4" /></Button>
          <div>
            <h2 className="text-xl font-bold">{selected.subject}</h2>
            <p className="text-sm text-muted-foreground">Ticket #{selected.id}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <StatusBadge status={selected.priority} />
            <StatusBadge status={selected.status} />
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Details</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div><span className="text-muted-foreground">Client:</span> {client?.name}</div>
              <div><span className="text-muted-foreground">Issue Type:</span> {selected.issueType}</div>
              <div><span className="text-muted-foreground">Created:</span> {new Date(selected.createdAt).toLocaleString()}</div>
              <div><span className="text-muted-foreground">Updated:</span> {new Date(selected.updatedAt).toLocaleString()}</div>
              {selected.jobId && <div><span className="text-muted-foreground">Linked Job:</span> #{selected.jobId}</div>}
              <div className="rounded-lg bg-muted/50 p-3 mt-3"><p>{selected.description}</p></div>
              {selected.resolution && <div className="rounded-lg bg-primary/5 p-3"><span className="text-xs font-medium">Resolution:</span><p>{selected.resolution}</p></div>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Activity Log</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {selected.notes.map((n, i) => (
                <div key={i} className="rounded-lg border p-3 text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{n.author}</span>
                    <span className="text-xs text-muted-foreground">{new Date(n.timestamp).toLocaleString()}</span>
                  </div>
                  <p>{n.text}</p>
                </div>
              ))}
              {selected.notes.length === 0 && <p className="text-sm text-muted-foreground">No activity yet.</p>}
            </CardContent>
          </Card>
        </div>
        <div className="flex gap-3">
          <Button>Add Note</Button>
          {selected.status !== 'Resolved' && <Button variant="outline">Resolve Ticket</Button>}
          <Button variant="outline">Escalate to Admin</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {['All', 'Open', 'In Progress', 'Resolved'].map(s => (
          <Button key={s} variant={statusFilter === s ? 'default' : 'outline'} size="sm" onClick={() => setStatusFilter(s)}>{s}</Button>
        ))}
      </div>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/30">
              <th className="px-4 py-3 text-left font-medium">Subject</th>
              <th className="px-4 py-3 text-left font-medium">Client</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Priority</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Updated</th>
            </tr></thead>
            <tbody>
              {filtered.map(t => {
                const c = mockClients.find(c => c.id === t.clientId);
                return (
                  <tr key={t.id} className="border-b hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => setSelectedId(t.id)}>
                    <td className="px-4 py-3 font-medium text-primary">{t.subject}</td>
                    <td className="px-4 py-3">{c?.name}</td>
                    <td className="px-4 py-3">{t.issueType}</td>
                    <td className="px-4 py-3"><StatusBadge status={t.priority} /></td>
                    <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                    <td className="px-4 py-3 text-xs">{new Date(t.updatedAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTickets;
