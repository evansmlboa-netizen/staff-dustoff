import { useState } from 'react';
import { mockPromoCodes, mockCampaigns } from '@/data/portalMockData';
import StatusBadge from '@/components/portal/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Megaphone, Tag, Mail, MessageSquare } from 'lucide-react';

const Marketing = () => {
  const [tab, setTab] = useState<'promos' | 'campaigns'>('promos');

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button variant={tab === 'promos' ? 'default' : 'outline'} onClick={() => setTab('promos')}><Tag className="mr-2 h-4 w-4" /> Promo Codes</Button>
        <Button variant={tab === 'campaigns' ? 'default' : 'outline'} onClick={() => setTab('campaigns')}><Megaphone className="mr-2 h-4 w-4" /> Campaigns</Button>
      </div>

      {tab === 'promos' && (
        <div className="space-y-4">
          <div className="flex justify-end"><Button><Plus className="mr-2 h-4 w-4" /> Create Promo</Button></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockPromoCodes.map(p => (
              <Card key={p.id}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <code className="rounded bg-muted px-2 py-1 text-sm font-bold">{p.code}</code>
                    <StatusBadge status={p.active ? 'Active' : 'Expired'} />
                  </div>
                  <p className="text-lg font-bold">{p.type === 'percent' ? `${p.value}% off` : `$${p.value} off`}</p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Services: {p.applicableServices.join(', ')}</p>
                    <p>Used: {p.usageCount}/{p.usageLimit}</p>
                    <p>Expires: {p.expiresAt}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {tab === 'campaigns' && (
        <div className="space-y-4">
          <div className="flex justify-end"><Button><Plus className="mr-2 h-4 w-4" /> New Campaign</Button></div>
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead><tr className="border-b bg-muted/30">
                  <th className="px-4 py-3 text-left font-medium">Campaign</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Audience</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Sent</th>
                  <th className="px-4 py-3 text-left font-medium">Open Rate</th>
                </tr></thead>
                <tbody>
                  {mockCampaigns.map(c => (
                    <tr key={c.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{c.name}</td>
                      <td className="px-4 py-3 flex items-center gap-1">{c.type === 'email' ? <Mail className="h-3 w-3" /> : <MessageSquare className="h-3 w-3" />}{c.type.toUpperCase()}</td>
                      <td className="px-4 py-3">{c.audience}</td>
                      <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                      <td className="px-4 py-3">{c.sentCount}</td>
                      <td className="px-4 py-3">{c.openRate > 0 ? `${c.openRate}%` : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Marketing;
