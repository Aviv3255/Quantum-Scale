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
  Clock,
  Users,
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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="animate-spin w-8 h-8 border-2 border-black border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Page Header */}
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-[#111111] mb-2">Courses</h1>
            <p className="text-[#666666]">Premium frameworks to scale your eCommerce business</p>
          </header>

          {/* Course Grid */}
          {courses.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {courses.map((course) => (
                <motion.div key={course.slug} variants={itemVariants}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e5e5',
                    }}
                  >
                    {/* Image Section - Clean white/light gray background */}
                    <div
                      className="relative w-full flex items-center justify-center p-10"
                      style={{
                        backgroundColor: '#f8f8f8',
                        minHeight: '240px',
                      }}
                    >
                      {course.image ? (
                        <Image
                          src={course.image}
                          alt={course.title}
                          width={220}
                          height={180}
                          unoptimized
                          className="max-h-44 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                          style={{
                            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
                          }}
                        />
                      ) : (
                        <div className="w-24 h-32 bg-[#e5e5e5] rounded-lg flex items-center justify-center">
                          <BookOpen className="w-10 h-10 text-[#999999]" />
                        </div>
                      )}
                      {course.badge && (
                        <div
                          className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium"
                          style={{ backgroundColor: '#111111', color: '#ffffff' }}
                        >
                          {course.badge}
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Title */}
                      <h2 className="text-xl font-semibold text-[#111111] mb-2 group-hover:opacity-80 transition-opacity">
                        {course.title}
                      </h2>

                      {/* Subtitle */}
                      <p className="text-sm text-[#666666] mb-4 line-clamp-2">
                        {course.subtitle}
                      </p>

                      {/* Stats Row */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-[#888888]">
                        <div className="flex items-center gap-1.5">
                          <BookOpen size={14} />
                          <span>{course.stats[0]?.value} {course.stats[0]?.label}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} />
                          <span>{course.stats[2]?.value} {course.stats[2]?.label}</span>
                        </div>
                      </div>

                      {/* Bonuses indicator */}
                      {course.bonuses && course.bonuses.length > 0 && (
                        <div
                          className="flex items-center gap-2 mb-5 p-3 rounded-xl"
                          style={{ backgroundColor: '#f5f5f5' }}
                        >
                          <Gift className="w-4 h-4 text-[#666666]" />
                          <span className="text-xs text-[#666666]">
                            <strong className="text-[#111111]">{course.bonuses.length} bonuses</strong> worth ${course.bonuses.reduce((sum, b) => sum + b.value, 0)} included
                          </span>
                        </div>
                      )}

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-5 border-t border-[#eeeeee]">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-[#111111]">
                            ${course.price}
                          </span>
                          {course.originalPrice && (
                            <span className="text-sm line-through text-[#999999]">
                              ${course.originalPrice}
                            </span>
                          )}
                        </div>

                        <div
                          className="flex items-center gap-1 text-sm font-medium transition-all duration-200 group-hover:gap-2"
                          style={{ color: '#111111' }}
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
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-[#f5f5f5]">
                <GraduationCap size={24} className="text-[#999999]" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-medium text-[#111111] mb-2">No courses available yet</h3>
              <p className="text-[#666666]">Check back soon for new learning materials</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
