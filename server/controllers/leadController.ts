import { Request, Response } from 'express';
import { Lead } from '../models/Lead';
import mongoose from 'mongoose';

const checkDbConnection = (res: Response) => {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ error: 'Database connection not established. Please configure MONGODB_URI in your secrets.' });
    return false;
  }
  return true;
};

// @desc    Create a new lead
// @route   POST /api/leads
export const createLead = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!checkDbConnection(res)) return;

    const { name, email, budget, message } = req.body;

    
    // Server-side validation
    if (!name || !email || !budget || !message) {
      res.status(400).json({ error: 'Please provide all required fields' });
      return;
    }

    const lead = await Lead.create({
      name,
      email,
      budget,
      message,
    });

    res.status(201).json(lead);
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val: any) => val.message);
      res.status(400).json({ error: messages.join(', ') });
    } else {
      console.error('Error creating lead:', error);
      res.status(500).json({ error: 'Server error creating lead' });
    }
  }
};

// @desc    Get all leads with optional search
// @route   GET /api/leads
export const getLeads = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!checkDbConnection(res)) return;

    const search = req.query.search as string;
    
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { message: { $regex: search, $options: 'i' } },
        ],
      };
    }

    // Sort by newest first
    const leads = await Lead.find(query).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Server error fetching leads' });
  }
};

// @desc    Update lead status
// @route   PATCH /api/leads/:id
export const updateLeadStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!checkDbConnection(res)) return;

    const { status } = req.body;
    const { id } = req.params;

    if (!['New', 'Contacted', 'Closed'].includes(status)) {
      res.status(400).json({ error: 'Invalid status value' });
      return;
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      res.status(404).json({ error: 'Lead not found' });
      return;
    }

    res.json(lead);
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Server error updating lead' });
  }
};
