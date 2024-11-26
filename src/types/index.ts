export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'creator' | 'user';
  avatar: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'RFQ' | 'RFP' | 'Proposal';
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  creator: User;
  fileSize: string;
  progress: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
  read: boolean;
}