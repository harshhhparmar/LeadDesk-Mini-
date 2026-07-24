import React, { useState } from 'react';
import { api, LeadFormData } from '../services/api';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const BUDGET_OPTIONS = [
  'Below ₹10,000',
  '₹10,000 – ₹25,000',
  '₹25,000 – ₹50,000',
  'Above ₹50,000',
];

export function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    budget: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Partial<LeadFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<keyof LeadFormData | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<LeadFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.budget) {
      newErrors.budget = 'Please select a budget range';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await api.createLead(formData);
      toast.success('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        budget: '',
        message: '',
      });
      setErrors({});
    } catch (error: any) {
      toast.error(error.message || 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof LeadFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-transparent border-0 border-b-2 border-gray-200 dark:border-gray-700 rounded-none focus:ring-0 focus:border-indigo-500 transition-colors dark:text-white px-0";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="relative group">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          className={`${inputClasses} ${errors.name ? 'border-red-500' : ''}`}
          placeholder=" "
        />
        <label 
          htmlFor="name" 
          className={`absolute left-0 transition-all duration-200 pointer-events-none ${
            focusedField === 'name' || formData.name ? '-top-4 text-xs text-indigo-600 dark:text-indigo-400 font-medium' : 'top-3 text-gray-500'
          }`}
        >
          Full Name
        </label>
        <AnimatePresence>
          {errors.name && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-red-500 font-medium">
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="relative group">
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`}
          placeholder=" "
        />
        <label 
          htmlFor="email" 
          className={`absolute left-0 transition-all duration-200 pointer-events-none ${
            focusedField === 'email' || formData.email ? '-top-4 text-xs text-indigo-600 dark:text-indigo-400 font-medium' : 'top-3 text-gray-500'
          }`}
        >
          Work Email
        </label>
        <AnimatePresence>
          {errors.email && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-red-500 font-medium">
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="relative group">
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          onFocus={() => setFocusedField('budget')}
          onBlur={() => setFocusedField(null)}
          className={`${inputClasses} ${errors.budget ? 'border-red-500' : ''} ${!formData.budget ? 'text-transparent' : ''} appearance-none cursor-pointer`}
        >
          <option value="" disabled className="text-gray-500">Select a budget</option>
          {BUDGET_OPTIONS.map(option => (
            <option key={option} value={option} className="text-gray-900 dark:text-white">{option}</option>
          ))}
        </select>
        <label 
          htmlFor="budget" 
          className={`absolute left-0 transition-all duration-200 pointer-events-none ${
            focusedField === 'budget' || formData.budget ? '-top-4 text-xs text-indigo-600 dark:text-indigo-400 font-medium' : 'top-3 text-gray-500'
          }`}
        >
          Project Budget
        </label>
        <div className="absolute right-0 top-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
        <AnimatePresence>
          {errors.budget && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-red-500 font-medium">
              {errors.budget}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="relative group pt-4">
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          rows={3}
          className={`${inputClasses} resize-none ${errors.message ? 'border-red-500' : ''}`}
          placeholder=" "
        />
        <label 
          htmlFor="message" 
          className={`absolute left-0 transition-all duration-200 pointer-events-none ${
            focusedField === 'message' || formData.message ? 'top-0 text-xs text-indigo-600 dark:text-indigo-400 font-medium' : 'top-7 text-gray-500'
          }`}
        >
          How can we help you?
        </label>
        <AnimatePresence>
          {errors.message && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 text-xs text-red-500 font-medium">
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative w-full flex justify-center items-center py-4 px-6 border border-transparent text-sm font-bold rounded-xl text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:scale-[1.02] active:scale-[0.98] focus:outline-none disabled:opacity-70 shadow-lg shadow-gray-900/20 dark:shadow-white/10 transition-all duration-200 overflow-hidden mt-6"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity"></div>
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending Request...
          </>
        ) : (
          'Get in touch'
        )}
      </button>
    </form>
  );
}
