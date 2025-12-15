'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, Check } from 'lucide-react';
import { signUp, signIn, createUserProfile } from '@/lib/supabase';

const signupSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
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

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch('password', '');

  const passwordRequirements = [
    { label: '8+ characters', met: password.length >= 8 },
    { label: 'Uppercase', met: /[A-Z]/.test(password) },
    { label: 'Lowercase', met: /[a-z]/.test(password) },
    { label: 'Number', met: /[0-9]/.test(password) },
  ];

  const onSubmit = async (data: SignupFormData) => {
    setError(null);

    const { error: signUpError } = await signUp(data.email, data.password, data.fullName);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // Auto sign-in after signup (skip email verification)
    const { data: signInData, error: signInError } = await signIn(data.email, data.password);

    if (signInError) {
      // If sign-in fails, show success but redirect to login
      router.push('/login');
      return;
    }

    // Create user profile for onboarding
    if (signInData?.user) {
      await createUserProfile(signInData.user.id);
    }

    // Redirect to onboarding
    router.push('/onboarding');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Form Header */}
      <div className="auth-form-header">
        <h2>Start your journey</h2>
        <p>Create an account and begin building your empire</p>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[var(--error)]/5 border-[var(--error)]/10 mb-6 rounded-xl border p-4 text-sm text-[var(--error)]"
        >
          {error}
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        {/* Full Name Field */}
        <div className="form-field">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <div className="input-group">
            <User className="input-icon text-[#888888]" size={18} strokeWidth={1.5} />
            <input
              {...register('fullName')}
              type="text"
              id="fullName"
              placeholder="John Doe"
              className={`form-input input-with-icon ${errors.fullName ? 'border-[var(--error)]' : ''}`}
            />
          </div>
          {errors.fullName && <span className="form-error">{errors.fullName.message}</span>}
        </div>

        {/* Email Field */}
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <div className="input-group">
            <Mail className="input-icon text-[#888888]" size={18} strokeWidth={1.5} />
            <input
              {...register('email')}
              type="email"
              id="email"
              placeholder="you@example.com"
              className={`form-input input-with-icon ${errors.email ? 'border-[var(--error)]' : ''}`}
            />
          </div>
          {errors.email && <span className="form-error">{errors.email.message}</span>}
        </div>

        {/* Password Field */}
        <div className="form-field">
          <label htmlFor="password" className="form-label">
            Password
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
          {errors.password && <span className="form-error">{errors.password.message}</span>}
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

        {/* Confirm Password Field */}
        <div className="form-field">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <div className="input-group">
            <Lock className="input-icon text-[#888888]" size={18} strokeWidth={1.5} />
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Confirm your password"
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
            <span className="form-error">{errors.confirmPassword.message}</span>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3">
          <input type="checkbox" id="terms" required className="checkbox-black mt-0.5" />
          <label htmlFor="terms" className="text-sm text-[var(--text-muted)]">
            I agree to the{' '}
            <Link href="/terms" className="font-medium text-[#000000] hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="font-medium text-[#000000] hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Submit Button - Premium Black */}
        <button type="submit" disabled={isSubmitting} className="btn-auth-primary w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight size={18} strokeWidth={2} />
            </>
          )}
        </button>

        {/* Sign In Link */}
        <p className="auth-switch">
          Already have an account?
          <Link href="/login">Sign in</Link>
        </p>
      </form>
    </motion.div>
  );
}
