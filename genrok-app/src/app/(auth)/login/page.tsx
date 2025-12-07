'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Rocket } from 'lucide-react';
import { signIn } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setSession } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);

    const { data: authData, error: authError } = await signIn(data.email, data.password);

    if (authError) {
      setError(authError.message);
      return;
    }

    if (authData.user && authData.session) {
      setUser(authData.user);
      setSession(authData.session);
      router.push('/dashboard');
    }
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
        <h2>Welcome back</h2>
        <p>Sign in to continue building your empire</p>
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
          <div className="form-label-row">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Link href="/forgot-password" className="form-link">
              Forgot password?
            </Link>
          </div>
          <div className="input-group">
            <Lock className="input-icon" size={18} strokeWidth={1.5} />
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
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
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight size={18} strokeWidth={1.5} />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        {/* Social Login */}
        <button type="button" className="btn-social">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>

        {/* Sign Up Link */}
        <p className="auth-switch">
          New to Quantum Scale?
          <Link href="/signup">Create an account</Link>
        </p>
      </form>
    </motion.div>
  );
}
