'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

interface EmailCaptureProps {
  buttonText?: string;
  variant?: 'default' | 'prominent' | 'dark';
}

export default function EmailCapture({ buttonText = 'Join the Waitlist', variant = 'default' }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
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
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setIsSubmitted(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isDark = variant === 'dark';
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
            <div className="flex flex-col sm:flex-row gap-3 flex-grow">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className={`px-5 py-4 rounded-lg transition-all duration-300 sm:w-40 ${
                  isDark
                    ? 'bg-white/10 border border-white/20 text-white placeholder-white/40'
                    : 'bg-white border border-[#E8DFC4] text-[#1A1A1A] placeholder-[#6B6B6B]/50'
                }`}
                disabled={isLoading}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className={`flex-grow px-5 py-4 rounded-lg transition-all duration-300 ${
                  isDark
                    ? 'bg-white/10 border border-white/20 text-white placeholder-white/40'
                    : 'bg-white border border-[#E8DFC4] text-[#1A1A1A] placeholder-[#6B6B6B]/50'
                }`}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
            >
              {isLoading ? (
                'Joining...'
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
            className={`flex items-center justify-center gap-3 py-4 ${
              isDark ? 'text-[#B8960C]' : 'text-[#B8960C]'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-[#B8960C]/10 flex items-center justify-center">
              <Check size={18} />
            </div>
            <span className="font-serif text-lg">You&apos;re in. Watch your inbox.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

      {!isSubmitted && (
        <p className={`text-sm mt-4 text-center sm:text-left ${isDark ? 'text-white/40' : 'text-[#6B6B6B]'}`}>
          Join the waitlist. No spam, ever.
        </p>
      )}
    </div>
  );
}
