import { cn } from '@/lib/utils';

type Variant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const variantStyles: Record<Variant, string> = {
  success: 'bg-primary/15 text-primary border-primary/30',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  neutral: 'bg-muted text-muted-foreground border-border',
};

const statusVariantMap: Record<string, Variant> = {
  Completed: 'success', Paid: 'success', Active: 'success', Cleared: 'success', Resolved: 'success',
  'In Progress': 'info', Confirmed: 'info',
  Scheduled: 'neutral', Pending: 'neutral', Draft: 'neutral', Open: 'warning',
  Cancelled: 'danger', Refunded: 'warning', Failed: 'danger', High: 'danger',
  Medium: 'warning', Low: 'neutral',
};

interface StatusBadgeProps {
  status: string;
  variant?: Variant;
  className?: string;
}

const StatusBadge = ({ status, variant, className }: StatusBadgeProps) => {
  const v = variant || statusVariantMap[status] || 'neutral';
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', variantStyles[v], className)}>
      {status}
    </span>
  );
};

export default StatusBadge;
