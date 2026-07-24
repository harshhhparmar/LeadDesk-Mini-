import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, query, orderBy, Timestamp } from 'firebase/firestore';
import fs from 'fs';

// Initialize Firebase
const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp, config.firestoreDatabaseId);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.post("/api/leads", async (req, res) => {
    try {
      const data = req.body;
      const docRef = await addDoc(collection(db, 'leads'), {
        ...data,
        status: 'New',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      
      res.json({
        _id: docRef.id,
        ...data,
        status: 'New',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error("Error creating lead:", err);
      res.status(500).json({ error: 'Failed to process request' });
    }
  });

  app.get("/api/leads", async (req, res) => {
    try {
      const { search } = req.query;
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      let leads = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          _id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
          updatedAt: data.updatedAt?.toDate().toISOString() || new Date().toISOString(),
        };
      });

      if (search && typeof search === 'string') {
        const searchLower = search.toLowerCase();
        leads = leads.filter((lead: any) => 
          lead.name.toLowerCase().includes(searchLower) ||
          lead.email.toLowerCase().includes(searchLower) ||
          lead.message.toLowerCase().includes(searchLower)
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
      const leadRef = doc(db, 'leads', id);
      await updateDoc(leadRef, {
        status,
        updatedAt: Timestamp.now(),
      });
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
    // Support Express v4 syntax which is what we installed
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
