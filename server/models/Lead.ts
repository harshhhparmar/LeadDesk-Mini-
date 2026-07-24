export interface ILead {
  id?: string;
  name: string;
  email: string;
  budget: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
  createdAt: string;
  updatedAt: string;
}

export const BUDGET_OPTIONS = [
  'Below ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  'Above ₹50,000',
];

export const STATUS_OPTIONS = ['New', 'Contacted', 'Closed'];
