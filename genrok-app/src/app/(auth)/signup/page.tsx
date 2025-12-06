'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, Check } from 'lucide-react';
import { signUp } from '@/lib/supabase';

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
  '38+ in-depth eCommerce articles',
  'Premium calculator tools',
  'Exclusive app discounts',
  'A/B test results & insights',
];

export default function SignupPage() {
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
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch('password', '');

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', met: /[a-z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
  ];

  const onSubmit = async (data: SignupFormData) => {
    setError(null);

    const { error: signUpError } = await signUp(data.email, data.password, data.fullName);

    if (signUpError) {
      setError(signUpError.message);
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
          We&apos;ve sent a confirmation link to your email address.
          Please click the link to activate your account.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 font-semibold transition-colors"
          style={{ color: '#8b6914' }}
        >
          Back to Sign In
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
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
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#000' }}
          >
            Create your account
          </h1>
          <p style={{ color: 'rgba(44, 24, 16, 0.5)' }}>Start scaling your brand today</p>
        </div>

        {/* Benefits */}
        <div
          className="mb-6 p-4 rounded-xl"
          style={{ background: 'rgba(139, 105, 20, 0.06)', border: '1px solid rgba(139, 105, 20, 0.1)' }}
        >
          <p className="text-sm font-semibold mb-2" style={{ color: '#8b6914' }}>Free access includes:</p>
          <ul className="space-y-1">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2 text-sm" style={{ color: '#2c1810' }}>
                <Check className="w-4 h-4" style={{ color: '#8b6914' }} strokeWidth={1.5} />
                {benefit}
              </li>
            ))}
          </ul>
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
              htmlFor="fullName"
              className="block text-sm font-medium mb-2"
              style={{ color: '#2c1810' }}
            >
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: 'rgba(44, 24, 16, 0.4)' }}
                strokeWidth={1.5}
              />
              <input
                {...register('fullName')}
                type="text"
                id="fullName"
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl transition-all outline-none"
                style={{
                  border: errors.fullName ? '1px solid #ef4444' : '1px solid rgba(0, 0, 0, 0.06)',
                  color: '#000',
                }}
                onFocus={(e) => {
                  if (!errors.fullName) {
                    e.currentTarget.style.border = '1px solid #8b6914';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 105, 20, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = errors.fullName ? '1px solid #ef4444' : '1px solid rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            {errors.fullName && (
              <p className="mt-2 text-sm" style={{ color: '#ef4444' }}>{errors.fullName.message}</p>
            )}
          </div>

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

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{ color: '#2c1810' }}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: 'rgba(44, 24, 16, 0.4)' }}
                strokeWidth={1.5}
              />
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Create a strong password"
                className="w-full pl-12 pr-12 py-3.5 rounded-xl transition-all outline-none"
                style={{
                  border: errors.password ? '1px solid #ef4444' : '1px solid rgba(0, 0, 0, 0.06)',
                  color: '#000',
                }}
                onFocus={(e) => {
                  if (!errors.password) {
                    e.currentTarget.style.border = '1px solid #8b6914';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 105, 20, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = errors.password ? '1px solid #ef4444' : '1px solid rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'rgba(44, 24, 16, 0.4)' }}
              >
                {showPassword ? <EyeOff className="w-5 h-5" strokeWidth={1.5} /> : <Eye className="w-5 h-5" strokeWidth={1.5} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm" style={{ color: '#ef4444' }}>{errors.password.message}</p>
            )}
            {password && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {passwordRequirements.map((req) => (
                  <div
                    key={req.label}
                    className="flex items-center gap-1.5 text-xs"
                    style={{ color: req.met ? '#22c55e' : 'rgba(44, 24, 16, 0.4)' }}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full flex items-center justify-center"
                      style={{ background: req.met ? 'rgba(34, 197, 94, 0.1)' : 'rgba(0, 0, 0, 0.04)' }}
                    >
                      {req.met && <Check className="w-2.5 h-2.5" strokeWidth={2} />}
                    </div>
                    {req.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-2"
              style={{ color: '#2c1810' }}
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: 'rgba(44, 24, 16, 0.4)' }}
                strokeWidth={1.5}
              />
              <input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Confirm your password"
                className="w-full pl-12 pr-12 py-3.5 rounded-xl transition-all outline-none"
                style={{
                  border: errors.confirmPassword ? '1px solid #ef4444' : '1px solid rgba(0, 0, 0, 0.06)',
                  color: '#000',
                }}
                onFocus={(e) => {
                  if (!errors.confirmPassword) {
                    e.currentTarget.style.border = '1px solid #8b6914';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 105, 20, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = errors.confirmPassword ? '1px solid #ef4444' : '1px solid rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: 'rgba(44, 24, 16, 0.4)' }}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" strokeWidth={1.5} /> : <Eye className="w-5 h-5" strokeWidth={1.5} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm" style={{ color: '#ef4444' }}>{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              required
              className="mt-1 w-5 h-5 rounded-md cursor-pointer"
              style={{ accentColor: '#8b6914' }}
            />
            <label htmlFor="terms" className="text-sm" style={{ color: 'rgba(44, 24, 16, 0.7)' }}>
              I agree to the{' '}
              <Link
                href="/terms"
                className="font-medium transition-colors"
                style={{ color: '#8b6914' }}
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="font-medium transition-colors"
                style={{ color: '#8b6914' }}
              >
                Privacy Policy
              </Link>
            </label>
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
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p style={{ color: 'rgba(44, 24, 16, 0.5)' }}>
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold transition-colors"
              style={{ color: '#8b6914' }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
