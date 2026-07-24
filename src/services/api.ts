import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, query, orderBy, Timestamp } from 'firebase/firestore';

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
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timed out. Please check your connection and try again.')), 10000);
    });

    const addDocPromise = addDoc(collection(db, 'leads'), {
      ...data,
      status: 'New',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    const docRef = await Promise.race([addDocPromise, timeoutPromise]) as any;
    
    return {
      _id: docRef.id,
      ...data,
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },
  
  getLeads: async (search?: string): Promise<Lead[]> => {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timed out. Please check your connection and try again.')), 10000);
    });

    const querySnapshot = await Promise.race([getDocs(q), timeoutPromise]) as any;
    
    let leads = querySnapshot.docs.map((doc: any) => {
      const data = doc.data();
      return {
        _id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate().toISOString() || new Date().toISOString(),
      } as Lead;
    });

    if (search) {
      const searchLower = search.toLowerCase();
      leads = leads.filter(lead => 
        lead.name.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        lead.message.toLowerCase().includes(searchLower)
      );
    }
    
    return leads;
  },
  
  updateLeadStatus: async (id: string, status: 'New' | 'Contacted' | 'Closed'): Promise<Lead> => {
    const leadRef = doc(db, 'leads', id);
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timed out. Please check your connection and try again.')), 10000);
    });

    const updatePromise = updateDoc(leadRef, {
      status,
      updatedAt: Timestamp.now(),
    });

    await Promise.race([updatePromise, timeoutPromise]);
    
    // We don't need to return the full lead for the current UI to work
    // as the UI only needs the status updated, but we return a partial
    return { _id: id, status } as unknown as Lead;
  }
};
