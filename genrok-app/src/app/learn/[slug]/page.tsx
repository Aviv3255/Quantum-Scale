'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';

function parseMarkdown(content: string): string {
  return content
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 text-[var(--text-primary)]">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3 text-[var(--text-primary)]">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[var(--text-primary)]">$1</strong>')
    .replace(/^• (.*$)/gim, '<li class="ml-4 mb-2 text-[var(--text-muted)]">$1</li>')
    .replace(/^✔️ (.*$)/gim, '<li class="ml-4 mb-2 text-green-600">$1</li>')
    .replace(/^❌ (.*$)/gim, '<li class="ml-4 mb-2 text-red-500">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4 text-[var(--text-muted)] leading-relaxed">')
    .replace(/^(?!<[hlu])/gm, '');
}

export default function ArticlePage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const params = useParams();
  const slug = params.slug as string;

  const article = getArticleBySlug(slug);
  const relatedArticles = getRelatedArticles(slug, 3);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!article) {
    return (
      <DashboardLayout>
        <div className="page-wrapper">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mb-6">
              <BookOpen size={40} className="text-[var(--text-primary)]" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
              Article Not Found
            </h1>
            <p className="text-[var(--text-muted)] mb-8">
              The article you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/learn" className="btn btn-primary">
              <ArrowLeft size={20} strokeWidth={1.5} />
              Back to Learning Center
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Back Link */}
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-6"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back to Learning Center
        </Link>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="badge badge-gold capitalize">
              {article.category}
            </span>
            <div className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
              <Clock size={14} strokeWidth={1.5} />
              {article.readTime} min read
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            {article.title}
          </h1>

          <p className="text-lg text-[var(--text-muted)]">
            {article.description}
          </p>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-10"
          style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)' }}
        >
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl"
        >
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{
              __html: `<p class="mb-4 text-[var(--text-muted)] leading-relaxed">${parseMarkdown(article.content)}</p>`
            }}
          />

          {/* Action Buttons */}
          {article.buttons && article.buttons.length > 0 && (
            <div className="mt-12 card bg-[var(--bg-secondary)] border-[var(--border-gold)]">
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">
                Take Action
              </h3>
              <div className="flex flex-wrap gap-3">
                {article.buttons.map((button, index) => (
                  <a
                    key={index}
                    href={button.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    {button.text}
                    <ExternalLink size={16} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
              Continue Learning
            </h2>
            <div className="grid-3">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/learn/${relatedArticle.slug}`}
                  className="card card-hover group overflow-hidden"
                  style={{ padding: 0 }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={relatedArticle.thumbnail}
                      alt={relatedArticle.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-2 text-sm text-[var(--text-primary)]">
                      Read more
                      <ChevronRight size={14} strokeWidth={1.5} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </DashboardLayout>
  );
}
