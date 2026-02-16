import { useAuth } from '@/contexts/AuthContext';
import { mockPayments, mockClients, mockJobs } from '@/data/portalMockData';
import StatusBadge from '@/components/portal/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, DollarSign } from 'lucide-react';

const Payments = () => {
  const { user } = useAuth();
  const isCleaner = user?.role === 'CLEANER';

  const payments = isCleaner
    ? mockPayments.filter(p => p.cleanerId === user?.id)
    : mockPayments;

  const totalPaid = payments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);
  const totalTips = payments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.tip, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="flex items-center gap-4 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10"><DollarSign className="h-5 w-5 text-primary" /></div>
          <div><p className="text-sm text-muted-foreground">{isCleaner ? 'My Earnings' : 'Total Revenue'}</p><p className="text-2xl font-bold">${totalPaid.toLocaleString()}</p></div>
        </CardContent></Card>
        <Card><CardContent className="flex items-center gap-4 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10"><DollarSign className="h-5 w-5 text-primary" /></div>
          <div><p className="text-sm text-muted-foreground">{isCleaner ? 'My Tips' : 'Total Tips'}</p><p className="text-2xl font-bold">${totalTips}</p></div>
        </CardContent></Card>
        {!isCleaner && (
          <Card><CardContent className="flex items-center gap-4 p-5">
            <Button variant="outline" className="w-full"><Download className="mr-2 h-4 w-4" /> Export CSV</Button>
          </CardContent></Card>
        )}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Transactions</CardTitle></CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/30">
              <th className="px-4 py-3 text-left font-medium">Invoice</th>
              {!isCleaner && <th className="px-4 py-3 text-left font-medium">Client</th>}
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Amount</th>
              <th className="px-4 py-3 text-left font-medium">Tip</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr></thead>
            <tbody>
              {payments.map(p => {
                const client = mockClients.find(c => c.id === p.clientId);
                return (
                  <tr key={p.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{p.invoiceId}</td>
                    {!isCleaner && <td className="px-4 py-3">{client?.name}</td>}
                    <td className="px-4 py-3">{p.date}</td>
                    <td className="px-4 py-3">${p.amount}</td>
                    <td className="px-4 py-3">${p.tip}</td>
                    <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
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

export default Payments;
