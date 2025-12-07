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
        transition={{ duration: 0.5 }}
        className="auth-form text-center"
      >
        <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-green-600" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Check your email</h1>
        <p className="text-[var(--text-muted)] mb-6">
          We&apos;ve sent a password reset link to your email address. Click the link to create a new password.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-[var(--accent-gold)] hover:text-[var(--accent-gold-hover)] font-semibold"
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
      transition={{ duration: 0.5 }}
    >
      {/* Mobile Logo */}
      <div className="lg:hidden text-center mb-8">
        <Link href="/" className="inline-block">
          <span className="text-3xl font-bold text-[var(--accent-gold)]">
            Quantum Scale
          </span>
        </Link>
      </div>

      <div className="auth-form">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 bg-[var(--accent-gold-bg)] rounded-full flex items-center justify-center">
            <KeyRound className="w-7 h-7 text-[var(--accent-gold)]" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Forgot your password?</h1>
          <p className="text-[var(--text-muted)]">
            No worries, we&apos;ll send you reset instructions.
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="form-field">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" strokeWidth={1.5} />
              <input
                {...register('email')}
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`form-input pl-12 ${errors.email ? 'border-red-300 focus:ring-red-500' : ''}`}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" strokeWidth={1.5} />
                Sending reset link...
              </>
            ) : (
              <>
                Reset Password
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-gold)] font-medium"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Back to Sign In
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
