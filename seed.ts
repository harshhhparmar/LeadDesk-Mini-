import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = {
  projectId: "tactical-handbook-k6ppv",
  appId: "1:781141328221:web:5c2791727f927a324968b4",
  apiKey: "AIzaSyDZsTSBza-WXp_cesU4YOmTNzGW2pRsyjA",
  authDomain: "tactical-handbook-k6ppv.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-leaddeskmini-c5195afd-ab99-4f4e-a616-57bdef656aa6");

async function seed() {
  const data = JSON.parse(fs.readFileSync('./local_db.json', 'utf8'));
  for (const lead of data.leads) {
    const leadRef = doc(db, 'leads', lead._id);
    const { _id, ...leadData } = lead;
    await setDoc(leadRef, leadData);
    console.log("Seeded lead:", lead._id);
  }
  console.log("Done");
  process.exit(0);
}

seed();
