# LeadDesk Mini

A full-stack lead management mini-CRM application built with React, Firebase Authentication, and Firestore.

## Project Overview

LeadDesk Mini allows businesses to capture incoming leads from a public landing page and manage them within a secure, authenticated admin dashboard. It is a client-side application demonstrating modern development practices, serverless architecture using Firebase, security features, and a responsive UI.

## Features

- **Public Landing Page**: A responsive, conversion-optimized landing page with hero, features, and a contact form.
- **Lead Capture Form**: Built-in client validation to capture Name, Email, Budget, and Message, writing directly to Firestore.
- **Admin Authentication**: 
  - Managed by Firebase Authentication (Email/Password).
  - Securely maintains user sessions using Firebase's local persistence.
- **Admin Dashboard**:
  - Secure, protected routes accessible only to authenticated users.
  - View all leads with status badges.
  - Live search across name, email, and messages.
  - Real-time statistics cards (Total, New, Contacted, Closed).
  - Status toggle (New -> Contacted -> Closed).
  - Pagination for performance with large datasets.
- **Security**: Firestore Security Rules strictly protect data. Unauthenticated users can only create leads, while only authenticated administrators can read, update, or delete them.

## Folder Structure

```
├── src/                    # React frontend
│   ├── components/         # Reusable UI components (LeadForm, ProtectedRoute)
│   ├── context/            # Global state (AuthContext)
│   ├── lib/                # Firebase initialization and configuration
│   ├── pages/              # Main view containers (Landing, Login, Admin, 404)
│   ├── services/           # Firebase Firestore communication layer
│   ├── App.tsx             # Main React Router setup
│   └── main.tsx            # React DOM rendering entry
├── package.json            # Dependencies and scripts
└── firestore.rules         # Security rules for Firestore
```

## Database Schema (Firestore)

### Leads Collection (`leads`)
- `name` (String)
- `email` (String)
- `budget` (String)
- `message` (String)
- `status` (String, Enum: ['New', 'Contacted', 'Closed'], default: 'New')
- `createdAt` (Timestamp)
- `updatedAt` (Timestamp)

## Authentication Flow

1. **Login**: User submits credentials to Firebase Authentication via `/login`.
2. **Validation**: Firebase handles secure validation of credentials.
3. **Session Recovery**: `onAuthStateChanged` automatically restores the authenticated session across page reloads.
4. **Protected Routes**: Frontend uses `<ProtectedRoute>` to guard `/admin`.
5. **Data Protection**: Firestore Security rules (`firestore.rules`) enforce that queries and updates to the `leads` collection require a valid authentication token.
6. **Logout**: User hits "Logout", signing out from Firebase Auth.

## Environment Variables

Create a `.env` file in the root directory (only necessary if not using the generated `firebase-applet-config.json`):

```env
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
VITE_FIREBASE_DATABASE_ID=""
```

## Installation Steps

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables as described above, or place your `firebase-applet-config.json` in the root.
4. Deploy the Firestore rules:
   ```bash
   firebase deploy --only firestore:rules
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment Instructions

This application is fully client-side and serverless, making it trivial to deploy on Vercel.

### To deploy on Vercel:
1. Connect your GitHub repository to Vercel.
2. Ensure Build Command is: `npm run build`
3. Ensure Output Directory is: `dist`
4. Provide the environment variables (`VITE_FIREBASE_*`) in the Vercel dashboard.
5. Deploy.

## Admin Setup

The application does not include an automatic admin account creator for security reasons.

To create an admin account:
1. Go to the Firebase Console.
2. Select your project.
3. Navigate to **Authentication** -> **Users**.
4. Click **Add user**.
5. Enter the desired email and password for the admin account.
6. Click **Add user**.

You can then log in using these credentials at `/login`.
