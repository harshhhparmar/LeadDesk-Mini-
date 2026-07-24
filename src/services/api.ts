export interface Lead {
  _id: string;
  name: string;
  email: string;
  budget: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
  createdAt: string;
  updatedAt: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  budget: string;
  message: string;
}

export const api = {
  createLead: async (data: LeadFormData): Promise<Lead> => {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to submit form');
    }
    
    return res.json();
  },
  
  getLeads: async (search?: string): Promise<Lead[]> => {
    const url = search ? `/api/leads?search=${encodeURIComponent(search)}` : '/api/leads';
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error('Failed to fetch leads');
    }
    
    return res.json();
  },
  
  updateLeadStatus: async (id: string, status: 'New' | 'Contacted' | 'Closed'): Promise<Lead> => {
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    if (!res.ok) {
      throw new Error('Failed to update status');
    }
    
    return res.json();
  }
};
