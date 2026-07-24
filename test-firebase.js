import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
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
  console.log("Fetching leads...");
  try {
    const snap = await getDocs(collection(db, 'leads'));
    console.log("Got leads:", snap.size);
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
