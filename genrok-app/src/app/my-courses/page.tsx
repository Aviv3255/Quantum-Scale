'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  GraduationCap,
  FileText,
  Calendar,
  ArrowRight,
  ShoppingBag,
  Loader2,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getUserCourses, PurchasedCourse } from '@/lib/course-access';

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

export default function MyCoursesPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const [courses, setCourses] = useState<PurchasedCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    async function loadCourses() {
      if (user?.id) {
        const userCourses = await getUserCourses(user.id);
        setCourses(userCourses);
        setIsLoading(false);
      }
    }

    if (user?.id) {
      loadCourses();
    }
  }, [user?.id]);

  if (authLoading || !user) {
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
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="flex items-center gap-3">
                <GraduationCap size={32} className="text-[var(--primary)]" strokeWidth={1.5} />
                My Courses
              </h1>
              <p className="mt-2">Access your purchased courses and learning materials</p>
            </div>
            <Link
              href="/courses"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <ShoppingBag size={18} />
              Browse More Courses
            </Link>
          </div>
        </motion.header>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-[var(--text-muted)]" />
          </div>
        ) : courses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card text-center py-16"
          >
            <div className="w-20 h-20 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-6">
              <GraduationCap size={40} className="text-[var(--text-muted)]" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              No courses yet
            </h2>
            <p className="text-[var(--text-muted)] mb-6 max-w-md mx-auto">
              You haven&apos;t purchased any courses yet. Browse our collection of premium courses to start learning.
            </p>
            <Link href="/courses" className="btn btn-primary inline-flex">
              Browse Courses
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6"
          >
            {courses.map((course) => (
              <motion.div
                key={course.course_id}
                variants={itemVariants}
                className="card card-hover"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Course Image */}
                  <div className="relative w-full md:w-64 h-48 md:h-auto rounded-xl overflow-hidden bg-white flex-shrink-0">
                    {course.image_url ? (
                      <Image
                        src={course.image_url}
                        alt={course.title}
                        fill
                        className="object-contain p-4"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[var(--bg-secondary)]">
                        <GraduationCap size={48} className="text-[var(--text-muted)]" />
                      </div>
                    )}
                  </div>

                  {/* Course Details */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                      {course.title}
                    </h3>
                    {course.description && (
                      <p className="text-[var(--text-muted)] mb-4 line-clamp-2">
                        {course.description}
                      </p>
                    )}

                    {/* Course Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 mt-auto">
                      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                        <FileText size={16} />
                        <span>{course.file_count} {course.file_count === 1 ? 'file' : 'files'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                        <Calendar size={16} />
                        <span>Purchased {new Date(course.purchase_date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/my-courses/${course.slug}`}
                      className="btn btn-primary self-start"
                    >
                      Continue Learning
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.section>
        )}
      </div>
    </DashboardLayout>
  );
}
