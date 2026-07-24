import { getApps, initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export const connectDB = async () => {
  try {
    if (!getApps().length) {
      initializeApp({
        credential: applicationDefault()
      });
    }
    console.log('Firebase Admin SDK initialized successfully');
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export const getDB = () => {
  return getFirestore();
};
