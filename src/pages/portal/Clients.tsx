import { useState } from 'react';
import { mockClients, mockJobs } from '@/data/portalMockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowLeft } from 'lucide-react';

const Clients = () => {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = mockClients.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  const selected = mockClients.find(c => c.id === selectedId);
  const clientJobs = selected ? mockJobs.filter(j => j.clientId === selected.id) : [];

  if (selected) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setSelectedId(null)}><ArrowLeft className="h-4 w-4" /></Button>
          <h2 className="text-xl font-bold">{selected.name}</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-base">Contact Info</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div><span className="text-muted-foreground">Email:</span> {selected.email}</div>
              <div><span className="text-muted-foreground">Phone:</span> {selected.phone}</div>
              <div><span className="text-muted-foreground">Member since:</span> {selected.createdAt}</div>
              {selected.outstandingBalance > 0 && <div className="text-amber-600 font-medium">Outstanding balance: ${selected.outstandingBalance}</div>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-base">Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div><span className="text-muted-foreground">Pets:</span> {selected.preferences.pets ? 'Yes' : 'No'}</div>
              <div><span className="text-muted-foreground">Product sensitivity:</span> {selected.preferences.productSensitivity}</div>
              <div><span className="text-muted-foreground">Priorities:</span> {selected.preferences.priorities}</div>
              {selected.notes && <div className="rounded-lg bg-muted/50 p-3"><span className="text-xs text-muted-foreground">Notes</span><p>{selected.notes}</p></div>}
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="text-base">Addresses</CardTitle></CardHeader>
            <CardContent>
              {selected.addresses.map(a => (
                <div key={a.id} className="rounded-lg border p-3 mb-2 text-sm">
                  <p className="font-medium">{a.street}, {a.city}, {a.state} {a.zip}</p>
                  <p className="text-xs text-muted-foreground">{a.accessInstructions}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle className="text-base">Appointment History ({clientJobs.length})</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {clientJobs.map(j => (
                  <div key={j.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                    <div>
                      <span className="font-medium">{j.serviceType}</span> — {j.date}
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${j.status === 'Completed' ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'}`}>{j.status}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search clients..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/30">
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Phone</th>
              <th className="px-4 py-3 text-left font-medium">Balance</th>
            </tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-b hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => setSelectedId(c.id)}>
                  <td className="px-4 py-3 font-medium text-primary">{c.name}</td>
                  <td className="px-4 py-3">{c.email}</td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3">{c.outstandingBalance > 0 ? <span className="text-amber-600">${c.outstandingBalance}</span> : '$0'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;
