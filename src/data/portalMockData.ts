import { StaffUser, Client, Job, SupportTicket, Payment, PromoCode, Campaign, Address } from '@/types/portal';

export const mockStaff: StaffUser[] = [
  { id: 's1', name: 'Maria Santos', email: 'maria@dustoff.com', role: 'ADMIN', active: true, backgroundCheck: 'Cleared', rating: 4.9, phone: '555-0101', completedJobs: 312, lateCount: 0, cancelCount: 1 },
  { id: 's2', name: 'James Thornton', email: 'james@dustoff.com', role: 'OPERATIONS_MANAGER', active: true, backgroundCheck: 'Cleared', rating: 4.7, phone: '555-0102', completedJobs: 0, lateCount: 0, cancelCount: 0 },
  { id: 's3', name: 'Aisha Johnson', email: 'aisha@dustoff.com', role: 'CLEANER', active: true, backgroundCheck: 'Cleared', rating: 4.8, phone: '555-0103', completedJobs: 187, lateCount: 2, cancelCount: 3 },
  { id: 's4', name: 'Carlos Rivera', email: 'carlos@dustoff.com', role: 'CLEANER', active: true, backgroundCheck: 'Cleared', rating: 4.6, phone: '555-0104', completedJobs: 143, lateCount: 5, cancelCount: 2 },
  { id: 's5', name: 'Emily Chen', email: 'emily@dustoff.com', role: 'SUPPORT', active: true, backgroundCheck: 'Cleared', rating: 4.5, phone: '555-0105', completedJobs: 0, lateCount: 0, cancelCount: 0 },
  { id: 's6', name: 'Derek Williams', email: 'derek@dustoff.com', role: 'MARKETING', active: true, backgroundCheck: 'Pending', rating: 0, phone: '555-0106', completedJobs: 0, lateCount: 0, cancelCount: 0 },
];

const addresses: Address[] = [
  { id: 'a1', street: '123 Oak Lane', city: 'Austin', state: 'TX', zip: '78701', accessInstructions: 'Gate code: 4521. Key under mat.' },
  { id: 'a2', street: '456 Elm St', city: 'Austin', state: 'TX', zip: '78702', accessInstructions: 'Ring doorbell. Dog is friendly.' },
  { id: 'a3', street: '789 Pine Ave', city: 'Round Rock', state: 'TX', zip: '78664', accessInstructions: 'Lockbox code: 1234' },
  { id: 'a4', street: '101 Cedar Blvd', city: 'Austin', state: 'TX', zip: '78703', accessInstructions: 'Front desk has key.' },
  { id: 'a5', street: '202 Maple Dr', city: 'Georgetown', state: 'TX', zip: '78626', accessInstructions: 'Back door is unlocked.' },
  { id: 'a6', street: '303 Birch Ct', city: 'Austin', state: 'TX', zip: '78704', accessInstructions: 'Call upon arrival.' },
];

export const mockClients: Client[] = [
  { id: 'c1', name: 'Sarah Mitchell', email: 'sarah@example.com', phone: '555-1001', addresses: [addresses[0]], preferences: { pets: true, productSensitivity: 'None', priorities: 'Kitchen & bathrooms' }, notes: 'Prefers mornings.', outstandingBalance: 0, createdAt: '2024-06-15' },
  { id: 'c2', name: 'David Park', email: 'david@example.com', phone: '555-1002', addresses: [addresses[1]], preferences: { pets: false, productSensitivity: 'Fragrance-free only', priorities: 'Floors' }, notes: '', outstandingBalance: 150, createdAt: '2024-08-20' },
  { id: 'c3', name: 'Lisa Nguyen', email: 'lisa@example.com', phone: '555-1003', addresses: [addresses[2]], preferences: { pets: true, productSensitivity: 'None', priorities: 'General' }, notes: 'Two cats.', outstandingBalance: 0, createdAt: '2024-09-01' },
  { id: 'c4', name: 'Robert Garcia', email: 'robert@example.com', phone: '555-1004', addresses: [addresses[3]], preferences: { pets: false, productSensitivity: 'None', priorities: 'Bathrooms' }, notes: 'Condo unit 5B.', outstandingBalance: 0, createdAt: '2024-10-10' },
  { id: 'c5', name: 'Amanda Foster', email: 'amanda@example.com', phone: '555-1005', addresses: [addresses[4]], preferences: { pets: false, productSensitivity: 'Eco-friendly', priorities: 'Whole house' }, notes: '', outstandingBalance: 75, createdAt: '2025-01-05' },
  { id: 'c6', name: 'Michael Brown', email: 'michael@example.com', phone: '555-1006', addresses: [addresses[5]], preferences: { pets: true, productSensitivity: 'None', priorities: 'Kitchen' }, notes: 'Large dog, keep gate closed.', outstandingBalance: 0, createdAt: '2025-01-20' },
];

export const mockJobs: Job[] = [
  { id: 'j1', clientId: 'c1', addressId: 'a1', serviceType: 'Standard', addOns: ['Dusting', 'Bathroom'], status: 'Completed', assignedTo: ['s3'], date: '2026-02-14', startTime: '09:00', endTime: '11:00', internalNotes: 'Great job', clientNotes: 'Focus on kitchen', paymentStatus: 'Paid', tip: 20, amount: 120, checklistCompleted: true, photos: { before: [], after: [] }, timeline: [{ event: 'Created', timestamp: '2026-02-10T10:00:00Z' }, { event: 'Completed', timestamp: '2026-02-14T11:00:00Z' }], rating: 5, ratingComment: 'Excellent!' },
  { id: 'j2', clientId: 'c2', addressId: 'a2', serviceType: 'Deep', addOns: ['Windows', 'Floor Care'], status: 'Scheduled', assignedTo: ['s4'], date: '2026-02-15', startTime: '10:00', endTime: '13:00', internalNotes: '', clientNotes: 'Use fragrance-free products', paymentStatus: 'Pending', tip: 0, amount: 200, checklistCompleted: false, photos: { before: [], after: [] }, timeline: [{ event: 'Created', timestamp: '2026-02-11T09:00:00Z' }] },
  { id: 'j3', clientId: 'c3', addressId: 'a3', serviceType: 'Standard', addOns: ['Sweeping/Mopping'], status: 'Confirmed', assignedTo: ['s3'], date: '2026-02-15', startTime: '14:00', endTime: '16:00', internalNotes: '', clientNotes: 'Careful with cats', paymentStatus: 'Pending', tip: 0, amount: 110, checklistCompleted: false, photos: { before: [], after: [] }, timeline: [{ event: 'Created', timestamp: '2026-02-12T08:00:00Z' }] },
  { id: 'j4', clientId: 'c4', addressId: 'a4', serviceType: 'Move-In/Out', addOns: ['Windows', 'Bathroom', 'Floor Care'], status: 'Scheduled', assignedTo: [], date: '2026-02-16', startTime: '08:00', endTime: '12:00', internalNotes: 'Needs 2 cleaners', clientNotes: '', paymentStatus: 'Pending', tip: 0, amount: 350, checklistCompleted: false, photos: { before: [], after: [] }, timeline: [{ event: 'Created', timestamp: '2026-02-13T14:00:00Z' }] },
  { id: 'j5', clientId: 'c5', addressId: 'a5', serviceType: 'Recurring', addOns: ['Dusting', 'Trash'], status: 'Scheduled', assignedTo: ['s4'], date: '2026-02-17', startTime: '09:00', endTime: '11:00', internalNotes: '', clientNotes: 'Eco-friendly products please', paymentStatus: 'Pending', tip: 0, amount: 130, checklistCompleted: false, photos: { before: [], after: [] }, timeline: [{ event: 'Created', timestamp: '2026-02-14T10:00:00Z' }] },
  { id: 'j6', clientId: 'c6', addressId: 'a6', serviceType: 'Standard', addOns: ['Bathroom'], status: 'In Progress', assignedTo: ['s3'], date: '2026-02-15', startTime: '08:00', endTime: '10:00', internalNotes: 'Started on time', clientNotes: 'Keep gate closed - dog', paymentStatus: 'Pending', tip: 0, amount: 115, checklistCompleted: false, photos: { before: [], after: [] }, timeline: [{ event: 'Created', timestamp: '2026-02-13T11:00:00Z' }, { event: 'Started', timestamp: '2026-02-15T08:00:00Z' }] },
  { id: 'j7', clientId: 'c1', addressId: 'a1', serviceType: 'Deep', addOns: ['Windows', 'Dusting', 'Floor Care'], status: 'Completed', assignedTo: ['s4'], date: '2026-02-12', startTime: '09:00', endTime: '12:00', internalNotes: '', clientNotes: '', paymentStatus: 'Paid', tip: 30, amount: 220, checklistCompleted: true, photos: { before: [], after: [] }, timeline: [{ event: 'Created', timestamp: '2026-02-08T10:00:00Z' }, { event: 'Completed', timestamp: '2026-02-12T12:00:00Z' }], rating: 4, ratingComment: 'Good overall' },
  { id: 'j8', clientId: 'c2', addressId: 'a2', serviceType: 'Standard', addOns: [], status: 'Cancelled', assignedTo: ['s3'], date: '2026-02-13', startTime: '10:00', endTime: '12:00', internalNotes: 'Client cancelled day-of', clientNotes: '', paymentStatus: 'Refunded', tip: 0, amount: 100, checklistCompleted: false, photos: { before: [], after: [] }, timeline: [{ event: 'Created', timestamp: '2026-02-09T09:00:00Z' }, { event: 'Cancelled', timestamp: '2026-02-13T08:00:00Z' }] },
  { id: 'j9', clientId: 'c3', addressId: 'a3', serviceType: 'Standard', addOns: ['Sweeping/Mopping', 'Trash'], status: 'Completed', assignedTo: ['s4'], date: '2026-02-11', startTime: '13:00', endTime: '15:00', internalNotes: '', clientNotes: '', paymentStatus: 'Paid', tip: 15, amount: 125, checklistCompleted: true, photos: { before: [], after: [] }, timeline: [{ event: 'Created', timestamp: '2026-02-07T12:00:00Z' }, { event: 'Completed', timestamp: '2026-02-11T15:00:00Z' }], rating: 5, ratingComment: 'Perfect' },
  { id: 'j10', clientId: 'c5', addressId: 'a5', serviceType: 'Recurring', addOns: ['Dusting'], status: 'Scheduled', assignedTo: [], date: '2026-02-18', startTime: '09:00', endTime: '11:00', internalNotes: 'Unassigned - need cleaner', clientNotes: '', paymentStatus: 'Pending', tip: 0, amount: 110, checklistCompleted: false, photos: { before: [], after: [] }, timeline: [{ event: 'Created', timestamp: '2026-02-14T16:00:00Z' }] },
];

export const mockTickets: SupportTicket[] = [
  { id: 't1', clientId: 'c2', jobId: 'j8', issueType: 'Billing Issue', priority: 'Medium', status: 'Open', subject: 'Refund not received', description: 'Client says refund for cancelled job has not appeared.', notes: [{ text: 'Checking with payment processor', author: 'Emily Chen', timestamp: '2026-02-14T10:00:00Z' }], createdAt: '2026-02-14T09:00:00Z', updatedAt: '2026-02-14T10:00:00Z' },
  { id: 't2', clientId: 'c4', jobId: 'j4', issueType: 'Other', priority: 'Low', status: 'Open', subject: 'Special request for move-out', description: 'Client wants to confirm that oven cleaning is included.', notes: [], createdAt: '2026-02-14T11:00:00Z', updatedAt: '2026-02-14T11:00:00Z' },
  { id: 't3', clientId: 'c1', jobId: 'j1', issueType: 'Quality Issue', priority: 'High', status: 'In Progress', subject: 'Missed spots in bathroom', description: 'Client reported spots behind toilet were not cleaned.', notes: [{ text: 'Scheduled re-clean for tomorrow', author: 'James Thornton', timestamp: '2026-02-14T15:00:00Z' }], createdAt: '2026-02-14T14:00:00Z', updatedAt: '2026-02-14T15:00:00Z' },
  { id: 't4', clientId: 'c6', issueType: 'Late Arrival', priority: 'Medium', status: 'Open', subject: 'Cleaner arrived 30 min late', description: 'Cleaner was late to the appointment.', notes: [], createdAt: '2026-02-15T09:00:00Z', updatedAt: '2026-02-15T09:00:00Z' },
  { id: 't5', clientId: 'c3', issueType: 'Damage Claim', priority: 'High', status: 'Open', subject: 'Broken vase during cleaning', description: 'Client reports a vase was knocked over and broken.', notes: [{ text: 'Photos requested from client', author: 'Emily Chen', timestamp: '2026-02-15T10:00:00Z' }], createdAt: '2026-02-15T09:30:00Z', updatedAt: '2026-02-15T10:00:00Z' },
  { id: 't6', clientId: 'c5', issueType: 'Billing Issue', priority: 'Low', status: 'Resolved', subject: 'Duplicate charge', description: 'Client was charged twice for recurring service.', notes: [{ text: 'Refund issued', author: 'Emily Chen', timestamp: '2026-02-13T11:00:00Z' }], resolution: 'Refund issued successfully', createdAt: '2026-02-13T09:00:00Z', updatedAt: '2026-02-13T11:00:00Z' },
];

export const mockPayments: Payment[] = [
  { id: 'p1', jobId: 'j1', clientId: 'c1', amount: 120, tip: 20, status: 'Paid', invoiceId: 'INV-001', date: '2026-02-14', cleanerId: 's3' },
  { id: 'p2', jobId: 'j7', clientId: 'c1', amount: 220, tip: 30, status: 'Paid', invoiceId: 'INV-002', date: '2026-02-12', cleanerId: 's4' },
  { id: 'p3', jobId: 'j9', clientId: 'c3', amount: 125, tip: 15, status: 'Paid', invoiceId: 'INV-003', date: '2026-02-11', cleanerId: 's4' },
  { id: 'p4', jobId: 'j8', clientId: 'c2', amount: 100, tip: 0, status: 'Refunded', invoiceId: 'INV-004', date: '2026-02-13', cleanerId: 's3' },
  { id: 'p5', jobId: 'j2', clientId: 'c2', amount: 200, tip: 0, status: 'Pending', invoiceId: 'INV-005', date: '2026-02-15', cleanerId: 's4' },
  { id: 'p6', jobId: 'j3', clientId: 'c3', amount: 110, tip: 0, status: 'Pending', invoiceId: 'INV-006', date: '2026-02-15', cleanerId: 's3' },
  { id: 'p7', jobId: 'j6', clientId: 'c6', amount: 115, tip: 0, status: 'Pending', invoiceId: 'INV-007', date: '2026-02-15', cleanerId: 's3' },
  { id: 'p8', jobId: 'j5', clientId: 'c5', amount: 130, tip: 0, status: 'Pending', invoiceId: 'INV-008', date: '2026-02-17', cleanerId: 's4' },
];

export const mockPromoCodes: PromoCode[] = [
  { id: 'pr1', code: 'CLEAN20', type: 'percent', value: 20, expiresAt: '2026-03-31', usageLimit: 100, usageCount: 34, applicableServices: ['Standard', 'Deep'], active: true },
  { id: 'pr2', code: 'SPRING50', type: 'fixed', value: 50, expiresAt: '2026-04-15', usageLimit: 50, usageCount: 12, applicableServices: ['Deep', 'Move-In/Out'], active: true },
  { id: 'pr3', code: 'WELCOME10', type: 'percent', value: 10, expiresAt: '2026-12-31', usageLimit: 500, usageCount: 89, applicableServices: ['Standard', 'Deep', 'Move-In/Out', 'Recurring'], active: true },
];

export const mockCampaigns: Campaign[] = [
  { id: 'cm1', name: 'Spring Cleaning Special', type: 'email', status: 'Active', audience: 'All customers', content: 'Get ready for spring with 20% off deep cleans!', sentCount: 450, openRate: 34.2, conversionRate: 8.5, createdAt: '2026-02-01' },
  { id: 'cm2', name: 'Reactivation SMS', type: 'sms', status: 'Draft', audience: 'Inactive 60 days', content: 'We miss you! Book now and save $25.', sentCount: 0, openRate: 0, conversionRate: 0, createdAt: '2026-02-10' },
  { id: 'cm3', name: 'Referral Reminder', type: 'email', status: 'Completed', audience: 'Recurring customers', content: 'Refer a friend and both get $30 off!', sentCount: 280, openRate: 42.1, conversionRate: 12.3, createdAt: '2026-01-15' },
];
