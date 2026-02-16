import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockJobs, mockPayments } from '@/data/portalMockData';
import { BarChart3 } from 'lucide-react';

const Reports = () => {
  const completed = mockJobs.filter(j => j.status === 'Completed');
  const totalRevenue = mockPayments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);
  const totalTips = mockPayments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.tip, 0);
  const avgJobValue = completed.length > 0 ? (totalRevenue / completed.length).toFixed(0) : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="p-5 text-center"><p className="text-sm text-muted-foreground">Total Jobs</p><p className="text-2xl font-bold">{mockJobs.length}</p></CardContent></Card>
        <Card><CardContent className="p-5 text-center"><p className="text-sm text-muted-foreground">Completed</p><p className="text-2xl font-bold">{completed.length}</p></CardContent></Card>
        <Card><CardContent className="p-5 text-center"><p className="text-sm text-muted-foreground">Revenue</p><p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="p-5 text-center"><p className="text-sm text-muted-foreground">Avg Job Value</p><p className="text-2xl font-bold">${avgJobValue}</p></CardContent></Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Analytics</CardTitle></CardHeader>
        <CardContent className="flex items-center justify-center py-16 text-muted-foreground">
          <div className="text-center space-y-2">
            <BarChart3 className="h-12 w-12 mx-auto opacity-30" />
            <p>Charts and detailed analytics will be available when connected to a live data source.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
