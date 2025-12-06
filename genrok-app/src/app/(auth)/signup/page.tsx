'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, Check, Rocket } from 'lucide-react';
import { signUp, signIn } from '@/lib/supabase';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof signupSchema>;

const benefits = [
  '250-step success checklist',
  '38+ in-depth articles',
  'Premium calculator tools',
  'Exclusive app discounts',
];

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
    const { error: signInError } = await signIn(data.email, data.password);

    if (signInError) {
      // If sign-in fails, show success but redirect to login
      router.push('/login');
      return;
    }

    // Redirect directly to dashboard
    router.push('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Mobile Logo */}
      <div className="lg:hidden text-center mb-8">
        <Link href="/login" className="inline-flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--accent-gold-bg)] rounded-xl flex items-center justify-center">
            <Rocket size={20} className="text-[var(--accent-gold)]" />
          </div>
          <span className="text-xl font-bold text-[var(--text-primary)]">
            Quantum Scale
          </span>
        </Link>
      </div>

      {/* Form Header */}
      <div className="auth-form-header">
        <h2>Start your journey</h2>
        <p>Create an account and begin building your empire</p>
      </div>

      {/* Benefits */}
      <div className="mb-6 p-4 rounded-xl bg-[var(--accent-gold-bg)] border border-[var(--accent-gold)]/10">
        <p className="text-sm font-semibold mb-3 text-[var(--accent-gold)]">Free access includes:</p>
        <ul className="grid grid-cols-2 gap-2">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <Check className="w-4 h-4 text-[var(--accent-gold)]" strokeWidth={1.5} />
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl text-sm bg-[var(--error)]/5 border border-[var(--error)]/10 text-[var(--error)]"
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
            <User className="input-icon" size={18} strokeWidth={1.5} />
            <input
              {...register('fullName')}
              type="text"
              id="fullName"
              placeholder="John Doe"
              className={`form-input input-with-icon ${errors.fullName ? 'border-[var(--error)]' : ''}`}
            />
          </div>
          {errors.fullName && (
            <span className="form-error">{errors.fullName.message}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <div className="input-group">
            <Mail className="input-icon" size={18} strokeWidth={1.5} />
            <input
              {...register('email')}
              type="email"
              id="email"
              placeholder="you@example.com"
              className={`form-input input-with-icon ${errors.email ? 'border-[var(--error)]' : ''}`}
            />
          </div>
          {errors.email && (
            <span className="form-error">{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="form-field">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <Lock className="input-icon" size={18} strokeWidth={1.5} />
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              {showPassword ? (
                <EyeOff size={18} strokeWidth={1.5} />
              ) : (
                <Eye size={18} strokeWidth={1.5} />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="form-error">{errors.password.message}</span>
          )}
          {password && (
            <div className="mt-3 flex flex-wrap gap-2">
              {passwordRequirements.map((req) => (
                <div
                  key={req.label}
                  className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${
                    req.met
                      ? 'bg-[var(--success)]/10 text-[var(--success)]'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-muted)]'
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
            <Lock className="input-icon" size={18} strokeWidth={1.5} />
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
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
          <input
            type="checkbox"
            id="terms"
            required
            className="checkbox mt-0.5"
          />
          <label htmlFor="terms" className="text-sm text-[var(--text-muted)]">
            I agree to the{' '}
            <Link href="/terms" className="text-[var(--accent-gold)] hover:text-[var(--accent-gold-hover)]">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[var(--accent-gold)] hover:text-[var(--accent-gold-hover)]">
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-full btn-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight size={18} strokeWidth={1.5} />
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
