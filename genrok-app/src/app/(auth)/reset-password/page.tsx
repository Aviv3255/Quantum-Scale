'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowRight, Loader2, Check } from 'lucide-react';
import { updatePassword } from '@/lib/supabase';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch('password', '');

  const passwordRequirements = [
    { label: '8+ characters', met: password.length >= 8 },
    { label: 'Uppercase', met: /[A-Z]/.test(password) },
    { label: 'Lowercase', met: /[a-z]/.test(password) },
    { label: 'Number', met: /[0-9]/.test(password) },
  ];

  const onSubmit = async (data: ResetPasswordFormData) => {
    setError(null);

    const { error: updateError } = await updatePassword(data.password);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push('/login');
    }, 3000);
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
        <h1 className="mb-2 text-2xl font-bold text-[var(--text-primary)]">Password updated!</h1>
        <p className="mb-6 text-[var(--text-muted)]">
          Your password has been successfully reset. Redirecting you to sign in...
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 font-semibold text-[#000000] hover:underline"
        >
          Sign In Now
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
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
          <h1 className="mb-2 text-2xl font-bold text-[var(--text-primary)]">
            Reset your password
          </h1>
          <p className="text-[var(--text-muted)]">Create a new secure password for your account</p>
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
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <div className="input-group">
              <Lock className="input-icon text-[#888888]" size={18} strokeWidth={1.5} />
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Create a strong password"
                className={`form-input input-with-icon pr-12 ${errors.password ? 'border-[var(--error)]' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] transition-colors hover:text-[#333333]"
              >
                {showPassword ? (
                  <EyeOff size={18} strokeWidth={1.5} />
                ) : (
                  <Eye size={18} strokeWidth={1.5} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
            )}
            {password && (
              <div className="mt-3 flex flex-wrap gap-2">
                {passwordRequirements.map((req) => (
                  <div
                    key={req.label}
                    className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-xs ${
                      req.met
                        ? 'bg-[#000000]/10 text-[#000000]'
                        : 'bg-[#F5F5F7] text-[var(--text-muted)]'
                    }`}
                  >
                    {req.met && <Check size={12} strokeWidth={2} />}
                    {req.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm New Password
            </label>
            <div className="input-group">
              <Lock className="input-icon text-[#888888]" size={18} strokeWidth={1.5} />
              <input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Confirm your new password"
                className={`form-input input-with-icon pr-12 ${errors.confirmPassword ? 'border-[var(--error)]' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888888] transition-colors hover:text-[#333333]"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} strokeWidth={1.5} />
                ) : (
                  <Eye size={18} strokeWidth={1.5} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-auth-primary w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" strokeWidth={1.5} />
                Updating password...
              </>
            ) : (
              <>
                Update Password
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
