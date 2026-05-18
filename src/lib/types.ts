export interface SponsorContact {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  notes?: string;
  status: 'Active' | 'Archived';
  createdAt: string;
  updatedAt: string;
}

export interface SponsorDeal {
  id: string;
  sponsorContactId?: string;
  name: string;
  value: number;
  dueDate?: string;
  status: 'Lead' | 'Pitched' | 'Negotiating' | 'Approved' | 'In Progress' | 'Delivered' | 'Completed' | 'Rejected' | 'Archived';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deliverable {
  id: string;
  dealId: string;
  type: string;
  description?: string;
  dueDate?: string;
  status: 'Planned' | 'In Progress' | 'Ready for Review' | 'Approved' | 'Revisions Needed' | 'Completed';
  link?: string;
  approvalStatus: 'Pending Sponsor Review' | 'Approved by Sponsor' | 'Changes Requested by Sponsor';
  createdAt: string;
  updatedAt: string;
}

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  avatar: string;
  joinedAt: string;
}

export type ActivityType = 'deal_created' | 'deliverable_updated' | 'status_change' | 'note_added';

export interface ActivityLog {
  id: string;
  type: ActivityType;
  entityType: 'deal' | 'deliverable' | 'contact';
  entityId: string;
  description: string;
  timestamp: string;
  userId: string;
}