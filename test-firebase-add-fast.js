import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  console.log("Start:", Date.now());
  try {
    const docRef = await addDoc(collection(db, 'leads'), {
      name: 'John2',
      email: 'john2@example.com',
      budget: '1000',
      message: 'Hello this is a message',
      status: 'New',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log("Added in:", Date.now(), docRef.id);
  } catch (err) {
    console.error("Error:", err);
  }
  process.exit(0);
}

run();
