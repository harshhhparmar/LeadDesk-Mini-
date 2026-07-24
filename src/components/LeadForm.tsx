import React, { useState } from 'react';
import { api, LeadFormData } from '../services/api';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

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
    // Clear error when typing
    if (errors[name as keyof LeadFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Jane Doe"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="jane@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
          Budget Range
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-colors ${
            errors.budget ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="" disabled>Select a budget</option>
          {BUDGET_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Tell us about your project..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-sm"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          'Submit Request'
        )}
      </button>
    </form>
  );
}
