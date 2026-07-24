import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const auth = getAuth(app);

async function run() {
  try {
    const userCredential = await signInAnonymously(auth);
    console.log("Logged in Anonymously:", userCredential.user.uid);
  } catch (err) {
    console.error("Login Error:", err.message);
  }
  process.exit(0);
}

run();
