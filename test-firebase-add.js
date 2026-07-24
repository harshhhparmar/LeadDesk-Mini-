import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

const app = initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId
});

const db = getFirestore(app, config.firestoreDatabaseId);

async function run() {
  console.log("Adding lead...");
  try {
    const docRef = await addDoc(collection(db, 'leads'), {
      name: 'John',
      email: 'john@example.com',
      budget: '1000',
      message: 'Hello this is a message',
      status: 'New',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log("Added:", docRef.id);
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
