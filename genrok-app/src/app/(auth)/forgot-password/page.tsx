'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, Loader2, Check, KeyRound } from 'lucide-react';
import { resetPassword } from '@/lib/supabase';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null);

    const { error: resetError } = await resetPassword(data.email);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-white rounded-2xl p-8 text-center"
        style={{ border: '1px solid rgba(0, 0, 0, 0.06)' }}
      >
        <div
          className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(34, 197, 94, 0.1)' }}
        >
          <Check className="w-8 h-8" style={{ color: '#22c55e' }} strokeWidth={1.5} />
        </div>
        <h1
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#000' }}
        >
          Check your email
        </h1>
        <p className="mb-6" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>
          If an account exists with that email, we&apos;ve sent you a link to reset your password.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 font-semibold transition-colors"
          style={{ color: '#8b6914' }}
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Back to Sign In
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Mobile Logo */}
      <div className="lg:hidden text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: '#fdf6e3' }}
          >
            <span className="text-lg">🐵</span>
          </div>
          <span
            className="text-xl font-bold"
            style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
          >
            Quantum Scale
          </span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl p-8" style={{ border: '1px solid rgba(0, 0, 0, 0.06)' }}>
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(139, 105, 20, 0.1)' }}
          >
            <KeyRound className="w-8 h-8" style={{ color: '#8b6914' }} strokeWidth={1.5} />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#000' }}
          >
            Forgot your password?
          </h1>
          <p style={{ color: 'rgba(44, 24, 16, 0.5)' }}>
            No worries! Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl text-sm"
            style={{
              background: 'rgba(239, 68, 68, 0.06)',
              border: '1px solid rgba(239, 68, 68, 0.15)',
              color: '#ef4444',
            }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2"
              style={{ color: '#2c1810' }}
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: 'rgba(44, 24, 16, 0.4)' }}
                strokeWidth={1.5}
              />
              <input
                {...register('email')}
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl transition-all outline-none"
                style={{
                  border: errors.email ? '1px solid #ef4444' : '1px solid rgba(0, 0, 0, 0.06)',
                  color: '#000',
                }}
                onFocus={(e) => {
                  if (!errors.email) {
                    e.currentTarget.style.border = '1px solid #8b6914';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 105, 20, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = errors.email ? '1px solid #ef4444' : '1px solid rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm" style={{ color: '#ef4444' }}>{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: '#8b6914',
              boxShadow: '0 2px 8px rgba(139, 105, 20, 0.25)',
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.background = '#2c1810';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(44, 24, 16, 0.3)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#8b6914';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 105, 20, 0.25)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending reset link...
              </>
            ) : (
              <>
                Send Reset Link
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 transition-colors"
            style={{ color: 'rgba(44, 24, 16, 0.5)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#8b6914';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(44, 24, 16, 0.5)';
            }}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Back to Sign In
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
