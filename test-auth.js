import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const auth = getAuth(app);

async function run() {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, 'admin@example.com', 'password123');
    console.log("Created:", userCredential.user.uid);
  } catch (err) {
    console.error("Create Error:", err.message);
    try {
      const userCredential2 = await signInWithEmailAndPassword(auth, 'admin@example.com', 'password123');
      console.log("Logged in:", userCredential2.user.uid);
    } catch(err2) {
      console.error("Login Error:", err2.message);
    }
  }
  process.exit(0);
}

run();
