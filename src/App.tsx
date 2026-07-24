import { Routes, Route, useLocation } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'motion/react';
import { LandingPage } from './pages/LandingPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundEffect } from './components/BackgroundEffect';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname} className="flex-grow flex flex-col">
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CustomCursor />
      <BackgroundEffect />
      <div className="min-h-screen flex flex-col font-sans relative z-10 selection:bg-indigo-500/30">
        <main className="flex-grow flex flex-col">
          <AnimatedRoutes />
        </main>
        
        <footer className="py-8 border-t border-gray-200/50 bg-white/50 backdrop-blur-md dark:bg-gray-900/50 dark:border-gray-800/50 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs leading-none">L</span>
              </div>
              <span className="font-semibold text-sm tracking-tight text-gray-900 dark:text-white">LeadDesk</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Built for Digital Heroes Training Task
              {' '}
              <a 
                href="https://digitalheroesco.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition-colors ml-1"
              >
                digitalheroesco.com
              </a>
            </div>
          </div>
        </footer>
        <Toaster 
          position="top-center" 
          toastOptions={{
            style: {
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(229, 231, 235, 0.5)',
              color: '#111827',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }
          }}
        />
      </div>
    </AuthProvider>
  );
}

