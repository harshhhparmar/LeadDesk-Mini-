import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const DB_FILE = path.join(process.cwd(), 'local_db.json');

// Initialize DB file
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ leads: [] }));
}

function getDb() {
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data);
}

function saveDb(data: any) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.post("/api/leads", async (req, res) => {
    try {
      const data = req.body;
      const db = getDb();
      
      const newLead = {
        _id: uuidv4(),
        ...data,
        status: 'New',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      db.leads.push(newLead);
      saveDb(db);
      
      res.json(newLead);
    } catch (err: any) {
      console.error("Error creating lead:", err);
      res.status(500).json({ error: 'Failed to process request' });
    }
  });

  app.get("/api/leads", async (req, res) => {
    try {
      const { search } = req.query;
      const db = getDb();
      let leads = db.leads || [];
      
      // Sort by createdAt desc
      leads.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      if (search && typeof search === 'string') {
        const searchLower = search.toLowerCase();
        leads = leads.filter((lead: any) => 
          (lead.name || '').toLowerCase().includes(searchLower) ||
          (lead.email || '').toLowerCase().includes(searchLower) ||
          (lead.message || '').toLowerCase().includes(searchLower)
        );
      }
      
      res.json(leads);
    } catch (err: any) {
      console.error("Error getting leads:", err);
      res.status(500).json({ error: 'Failed to fetch leads' });
    }
  });

  app.patch("/api/leads/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const db = getDb();
      const leadIndex = db.leads.findIndex((l: any) => l._id === id);
      
      if (leadIndex === -1) {
        return res.status(404).json({ error: 'Lead not found' });
      }
      
      db.leads[leadIndex] = {
        ...db.leads[leadIndex],
        status,
        updatedAt: new Date().toISOString(),
      };
      
      saveDb(db);
      res.json({ _id: id, status });
    } catch (err: any) {
      console.error("Error updating lead:", err);
      res.status(500).json({ error: 'Failed to update lead' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
