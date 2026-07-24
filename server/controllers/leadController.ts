import { Request, Response } from 'express';
import { getDB } from '../config/db';
import { ILead, BUDGET_OPTIONS, STATUS_OPTIONS } from '../models/Lead';

// @desc    Create a new lead
// @route   POST /api/leads
export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, budget, message } = req.body;
    
    // Server-side validation
    if (!name || !email || !budget || !message) {
      res.status(400).json({ error: 'Please provide all required fields' });
      return;
    }
    
    if (name.length < 2) {
      res.status(400).json({ error: 'Name must be at least 2 characters' });
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      res.status(400).json({ error: 'Please use a valid email address' });
      return;
    }
    
    if (!BUDGET_OPTIONS.includes(budget)) {
      res.status(400).json({ error: 'Invalid budget range' });
      return;
    }
    
    if (message.length < 10) {
      res.status(400).json({ error: 'Message must be at least 10 characters' });
      return;
    }

    const db = getDB();
    const leadsRef = db.collection('leads');
    
    const now = new Date().toISOString();
    
    const newLead = {
      name,
      email,
      budget,
      message,
      status: 'New',
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await leadsRef.add(newLead);
    
    res.status(201).json({ id: docRef.id, ...newLead });
  } catch (error: any) {
    res.status(500).json({ error: 'Server error creating lead' });
  }
};

// @desc    Get all leads with optional search
// @route   GET /api/leads
export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = (req.query.search as string || '').toLowerCase();
    
    const db = getDB();
    const snapshot = await db.collection('leads').orderBy('createdAt', 'desc').get();
    
    let leads: ILead[] = [];
    
    snapshot.forEach((doc) => {
      leads.push({ id: doc.id, ...doc.data() } as ILead);
    });

    if (search) {
      leads = leads.filter(lead => 
        lead.name.toLowerCase().includes(search) || 
        lead.email.toLowerCase().includes(search) || 
        lead.message.toLowerCase().includes(search)
      );
    }

    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching leads' });
  }
};

// @desc    Update lead status
// @route   PATCH /api/leads/:id
export const updateLeadStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!STATUS_OPTIONS.includes(status)) {
      res.status(400).json({ error: 'Invalid status value' });
      return;
    }

    const db = getDB();
    const docRef = db.collection('leads').doc(id);
    
    const doc = await docRef.get();
    if (!doc.exists) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }

    await docRef.update({ 
      status, 
      updatedAt: new Date().toISOString() 
    });

    const updatedDoc = await docRef.get();
    res.json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (error) {
    res.status(500).json({ error: 'Server error updating lead' });
  }
};
