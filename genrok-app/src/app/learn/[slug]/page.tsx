'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Share2,
  Bookmark,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { FadeIn } from '@/components/animations';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';

function parseMarkdown(content: string): string {
  return content
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3 text-gray-900">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/^• (.*$)/gim, '<li class="ml-4 mb-2">$1</li>')
    .replace(/^✔️ (.*$)/gim, '<li class="ml-4 mb-2 text-green-700">✔️ $1</li>')
    .replace(/^❌ (.*$)/gim, '<li class="ml-4 mb-2 text-red-700">❌ $1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4 text-gray-600 leading-relaxed">')
    .replace(/^(?!<[hlu])/gm, '')
    ;
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;

  const article = getArticleBySlug(slug);
  const relatedArticles = getRelatedArticles(slug, 3);

  if (!article) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Learning Center
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Learning Center
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full capitalize">
                {article.category}
              </span>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Clock className="w-4 h-4" />
                {article.readTime} min read
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            <p className="text-xl text-gray-600">
              {article.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <FadeIn delay={0.1}>
            <div className="relative aspect-[2/1] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{
                __html: `<p class="mb-4 text-gray-600 leading-relaxed">${parseMarkdown(article.content)}</p>`
              }}
            />

            {/* Action Buttons */}
            {article.buttons && article.buttons.length > 0 && (
              <div className="mt-12 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Take Action</h3>
                <div className="flex flex-wrap gap-3">
                  {article.buttons.map((button, index) => (
                    <a
                      key={index}
                      href={button.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      {button.text}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* More Articles */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Continue Learning</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Link
                key={relatedArticle.id}
                href={`/learn/${relatedArticle.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
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
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {relatedArticle.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 text-sm text-blue-600">
                    Read more
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
