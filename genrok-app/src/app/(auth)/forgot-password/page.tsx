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
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F5F7]">
          <Check className="h-8 w-8 text-[#000000]" strokeWidth={2} />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-[var(--text-primary)]">Check your email</h1>
        <p className="mb-6 text-[var(--text-muted)]">
          We&apos;ve sent a password reset link to your email address. Click the link to create a
          new password.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 font-semibold text-[#000000] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
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
      <div className="auth-form">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F7]">
            <KeyRound className="h-7 w-7 text-[#000000]" strokeWidth={1.5} />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-[var(--text-primary)]">
            Forgot your password?
          </h1>
          <p className="text-[var(--text-muted)]">
            No worries, we&apos;ll send you reset instructions.
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="form-field">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <div className="input-group">
              <Mail className="input-icon text-[#888888]" size={18} strokeWidth={1.5} />
              <input
                {...register('email')}
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`form-input input-with-icon ${errors.email ? 'border-[var(--error)]' : ''}`}
              />
            </div>
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-auth-primary w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" strokeWidth={1.5} />
                Sending reset link...
              </>
            ) : (
              <>
                Reset Password
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[#000000]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            Back to Sign In
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
