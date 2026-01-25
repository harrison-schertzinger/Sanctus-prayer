'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

interface EmailCaptureProps {
  buttonText?: string;
  variant?: 'default' | 'prominent';
}

export default function EmailCapture({ buttonText = 'Follow the Journey', variant = 'default' }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const existingEmails = JSON.parse(localStorage.getItem('sanctus_emails') || '[]');

      if (existingEmails.includes(email)) {
        setError('This email is already registered');
        setIsLoading(false);
        return;
      }

      existingEmails.push(email);
      localStorage.setItem('sanctus_emails', JSON.stringify(existingEmails));

      await new Promise((resolve) => setTimeout(resolve, 600));

      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isProminent = variant === 'prominent';

  return (
    <div className={isProminent ? 'bg-[#F5F3EF] border border-[#E8DFC4] rounded-2xl p-8 md:p-12' : ''}>
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-grow">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-5 py-4 bg-white border border-[#E8DFC4] rounded-lg text-[#1A1A1A] placeholder-[#6B6B6B]/50 transition-all duration-300"
                disabled={isLoading}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
            >
              {isLoading ? (
                'Submitting...'
              ) : (
                <>
                  {buttonText}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 py-4 text-[#B8960C]"
          >
            <div className="w-8 h-8 rounded-full bg-[#B8960C]/10 flex items-center justify-center">
              <Check size={18} />
            </div>
            <span className="font-serif text-lg">You&apos;re in. Watch your inbox.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {!isSubmitted && (
        <p className="text-[#6B6B6B] text-sm mt-4 text-center sm:text-left">
          Join the founding members. No spam, ever.
        </p>
      )}
    </div>
  );
}
