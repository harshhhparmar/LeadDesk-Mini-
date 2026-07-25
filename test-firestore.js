import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "tactical-handbook-k6ppv",
  appId: "1:781141328221:web:5c2791727f927a324968b4",
  apiKey: "AIzaSyDZsTSBza-WXp_cesU4YOmTNzGW2pRsyjA",
  authDomain: "tactical-handbook-k6ppv.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-leaddeskmini-c5195afd-ab99-4f4e-a616-57bdef656aa6");

async function run() {
  const snapshot = await getDocs(collection(db, 'leads'));
  console.log(snapshot.size);
}
run().catch(console.error);
