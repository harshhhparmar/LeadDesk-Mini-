import { collection, addDoc, getDocs, doc, updateDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

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
    const now = new Date().toISOString();
    const newLeadData = {
      ...data,
      status: 'New' as const,
      createdAt: now,
      updatedAt: now,
    };
    const docRef = await addDoc(collection(db, 'leads'), newLeadData);
    return { ...newLeadData, _id: docRef.id };
  },
  
  getLeads: async (search?: string): Promise<Lead[]> => {
    const leadsQuery = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(leadsQuery);
    
    let leads: Lead[] = [];
    snapshot.forEach((doc) => {
      leads.push({ _id: doc.id, ...doc.data() } as Lead);
    });

    if (search && search.trim() !== '') {
      const searchLower = search.toLowerCase();
      leads = leads.filter(
        (lead) =>
          (lead.name || '').toLowerCase().includes(searchLower) ||
          (lead.email || '').toLowerCase().includes(searchLower) ||
          (lead.message || '').toLowerCase().includes(searchLower)
      );
    }
    
    return leads;
  },
  
  updateLeadStatus: async (id: string, status: 'New' | 'Contacted' | 'Closed'): Promise<Lead> => {
    const leadRef = doc(db, 'leads', id);
    const now = new Date().toISOString();
    await updateDoc(leadRef, {
      status,
      updatedAt: now,
    });
    
    return { _id: id, status, updatedAt: now } as Lead; // We only return partial here, but the app usually updates local state based on id.
  }
};
