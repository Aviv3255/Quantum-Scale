'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
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
      router.push('/');
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
            Welcome back
          </h1>
          <p style={{ color: 'rgba(44, 24, 16, 0.5)' }}>
            Enter your credentials to continue
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

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium"
                style={{ color: '#2c1810' }}
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium transition-colors"
                style={{ color: '#8b6914' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#2c1810';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#8b6914';
                }}
              >
                Forgot password?
              </Link>
            </div>
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
                placeholder="Enter your password"
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
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p style={{ color: 'rgba(44, 24, 16, 0.5)' }}>
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold transition-colors"
              style={{ color: '#8b6914' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#2c1810';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#8b6914';
              }}
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
