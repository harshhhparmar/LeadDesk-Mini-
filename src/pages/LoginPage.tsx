import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';
import { Loader2, Lock, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to admin
  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful');
      navigate('/admin');
    } catch (error: any) {
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10"
    >
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>
      
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full space-y-8 glass p-10 rounded-[2rem] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="mx-auto w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-indigo-100 dark:border-indigo-500/20">
            <Lock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Welcome back
          </h2>
          <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400 font-light">
            Sign in to access your dashboard
          </p>
        </div>
        
        <form className="mt-8 space-y-6 relative z-10" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="relative">
              <label 
                htmlFor="email-address" 
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  focusedInput === 'email' || email ? '-top-2.5 text-xs bg-white dark:bg-gray-900 px-1 text-indigo-600 dark:text-indigo-400' : 'top-3 text-sm text-gray-500'
                }`}
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 sm:text-sm transition-all dark:text-white"
              />
            </div>
            
            <div className="relative">
              <label 
                htmlFor="password" 
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  focusedInput === 'password' || password ? '-top-2.5 text-xs bg-white dark:bg-gray-900 px-1 text-indigo-600 dark:text-indigo-400' : 'top-3 text-sm text-gray-500'
                }`}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 sm:text-sm transition-all dark:text-white"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center items-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:scale-[1.02] active:scale-[0.98] focus:outline-none disabled:opacity-70 shadow-lg shadow-gray-900/10 dark:shadow-white/10 transition-all duration-200 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Sign in to dashboard'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
