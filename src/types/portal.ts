export type Role = 'ADMIN' | 'OPERATIONS_MANAGER' | 'CLEANER' | 'SUPPORT' | 'MARKETING';

export type JobStatus = 'Scheduled' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
export type ServiceType = 'Standard' | 'Deep' | 'Move-In/Out' | 'Recurring';
export type AddOn = 'Sweeping/Mopping' | 'Dusting' | 'Windows' | 'Trash' | 'Floor Care' | 'Bathroom';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved';
export type TicketPriority = 'Low' | 'Medium' | 'High';
export type IssueType = 'Late Arrival' | 'Quality Issue' | 'Damage Claim' | 'Billing Issue' | 'Other';
export type PaymentStatus = 'Paid' | 'Pending' | 'Refunded' | 'Failed';
export type BackgroundCheckStatus = 'Cleared' | 'Pending' | 'Failed';
export type PromoType = 'percent' | 'fixed';
export type CampaignStatus = 'Draft' | 'Active' | 'Completed' | 'Paused';

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  backgroundCheck: BackgroundCheckStatus;
  rating: number;
  phone: string;
  avatar?: string;
  completedJobs: number;
  lateCount: number;
  cancelCount: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  preferences: { pets: boolean; productSensitivity: string; priorities: string };
  notes: string;
  outstandingBalance: number;
  createdAt: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  accessInstructions: string;
}

export interface Job {
  id: string;
  clientId: string;
  addressId: string;
  serviceType: ServiceType;
  addOns: AddOn[];
  status: JobStatus;
  assignedTo: string[];
  date: string;
  startTime: string;
  endTime: string;
  internalNotes: string;
  clientNotes: string;
  paymentStatus: PaymentStatus;
  tip: number;
  amount: number;
  checklistCompleted: boolean;
  photos: { before: string[]; after: string[] };
  timeline: { event: string; timestamp: string }[];
  rating?: number;
  ratingComment?: string;
}

export interface SupportTicket {
  id: string;
  clientId: string;
  jobId?: string;
  issueType: IssueType;
  priority: TicketPriority;
  status: TicketStatus;
  subject: string;
  description: string;
  notes: { text: string; author: string; timestamp: string }[];
  resolution?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  jobId: string;
  clientId: string;
  amount: number;
  tip: number;
  status: PaymentStatus;
  invoiceId: string;
  date: string;
  cleanerId: string;
}

export interface PromoCode {
  id: string;
  code: string;
  type: PromoType;
  value: number;
  expiresAt: string;
  usageLimit: number;
  usageCount: number;
  applicableServices: ServiceType[];
  active: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms';
  status: CampaignStatus;
  audience: string;
  content: string;
  sentCount: number;
  openRate: number;
  conversionRate: number;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
}

// Role permissions map
export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  ADMIN: ['dashboard', 'jobs', 'calendar', 'clients', 'team', 'qc', 'payments', 'reports', 'marketing', 'tickets', 'settings', 'profile'],
  OPERATIONS_MANAGER: ['dashboard', 'jobs', 'calendar', 'clients', 'team', 'qc', 'payments', 'tickets', 'reports', 'profile'],
  CLEANER: ['dashboard', 'jobs', 'payments', 'profile'],
  SUPPORT: ['dashboard', 'jobs', 'clients', 'tickets', 'profile'],
  MARKETING: ['dashboard', 'marketing', 'profile'],
};
