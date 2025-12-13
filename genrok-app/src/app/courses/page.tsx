'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  Gift,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getAllCourses } from '@/data/courses';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CoursesPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const courses = getAllCourses();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1>Courses</h1>
              <p>Premium frameworks to scale your eCommerce business</p>
            </div>
          </div>
        </header>

        {/* Course Grid */}
        {courses.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {courses.map((course) => (
              <motion.div key={course.slug} variants={itemVariants}>
                <Link
                  href={`/courses/${course.slug}`}
                  className="card card-hover group block overflow-hidden"
                  style={{ padding: 0 }}
                >
                  {/* Image Section */}
                  <div
                    className="relative w-full flex items-center justify-center p-8"
                    style={{
                      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                      minHeight: '220px',
                    }}
                  >
                    {course.image ? (
                      <Image
                        src={course.image}
                        alt={course.title}
                        width={200}
                        height={160}
                        unoptimized
                        className="max-h-40 w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                        style={{
                          filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
                        }}
                      />
                    ) : (
                      <div className="w-24 h-32 bg-white/10 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-white/40" />
                      </div>
                    )}
                    {course.badge && (
                      <div className="absolute top-4 left-4 badge badge-primary">
                        {course.badge}
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    {/* Title */}
                    <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2 group-hover:opacity-70 transition-opacity">
                      {course.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      {course.stats.slice(0, 3).map((stat, index) => (
                        <div key={index} className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-[var(--text-primary)]">
                            {stat.value}
                          </span>
                          <span className="text-xs text-[var(--text-muted)]">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bonuses indicator */}
                    {course.bonuses && course.bonuses.length > 0 && (
                      <div
                        className="flex items-center gap-2 mb-4 p-3 rounded-xl"
                        style={{ backgroundColor: 'var(--bg-secondary)' }}
                      >
                        <Gift className="w-4 h-4" style={{ color: '#22c55e' }} />
                        <span className="text-xs text-[var(--text-muted)]">
                          Includes {course.bonuses.length} bonuses worth $
                          {course.bonuses.reduce((sum, b) => sum + b.value, 0)}
                        </span>
                      </div>
                    )}

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)]">
                      <div className="flex items-baseline gap-2">
                        {course.originalPrice && (
                          <span className="text-sm line-through text-[var(--text-muted)]">
                            ${course.originalPrice}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-[var(--text-primary)]">
                          ${course.price}
                        </span>
                      </div>

                      <div
                        className="flex items-center gap-1 text-sm font-semibold transition-all duration-200 group-hover:gap-2"
                        style={{ color: '#22c55e' }}
                      >
                        View Course
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="empty-state">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-[var(--bg-secondary)]">
              <GraduationCap size={24} className="text-[var(--text-tertiary)]" strokeWidth={1.5} />
            </div>
            <h3>No courses available yet</h3>
            <p>Check back soon for new learning materials</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
