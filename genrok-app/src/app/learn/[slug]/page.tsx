'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Clock,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { FadeIn } from '@/components/animations';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';

function parseMarkdown(content: string): string {
  return content
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4" style="font-family: Satoshi, Inter, sans-serif; color: #2c1810;">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3" style="font-family: Satoshi, Inter, sans-serif; color: #2c1810;">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600; color: #2c1810;">$1</strong>')
    .replace(/^• (.*$)/gim, '<li class="ml-4 mb-2" style="color: rgba(44, 24, 16, 0.7);">$1</li>')
    .replace(/^✔️ (.*$)/gim, '<li class="ml-4 mb-2" style="color: #22c55e;">✔️ $1</li>')
    .replace(/^❌ (.*$)/gim, '<li class="ml-4 mb-2" style="color: #ef4444;">❌ $1</li>')
    .replace(/\n\n/g, '</p><p class="mb-4" style="color: rgba(44, 24, 16, 0.7); line-height: 1.8;">')
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
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-6">
            <span className="text-6xl">🐵</span>
          </div>
          <h1
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
          >
            Article Not Found
          </h1>
          <p className="mb-8" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-xl transition-all"
            style={{ background: '#8b6914', boxShadow: '0 4px 14px rgba(139, 105, 20, 0.25)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2c1810';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#8b6914';
            }}
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
            Back to Learning Center
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Header */}
      <section className="relative py-12" style={{ background: '#fdf6e3' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 mb-6 transition-colors"
              style={{ color: 'rgba(44, 24, 16, 0.6)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#8b6914';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(44, 24, 16, 0.6)';
              }}
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Back to Learning Center
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-sm font-medium px-3 py-1 rounded-full capitalize"
                style={{ background: 'rgba(139, 105, 20, 0.1)', color: '#8b6914' }}
              >
                {article.category}
              </span>
              <div className="flex items-center gap-1 text-sm" style={{ color: 'rgba(44, 24, 16, 0.5)' }}>
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                {article.readTime} min read
              </div>
            </div>

            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
            >
              {article.title}
            </h1>

            <p className="text-xl" style={{ color: 'rgba(44, 24, 16, 0.6)' }}>
              {article.description}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <FadeIn delay={0.1}>
            <div
              className="relative aspect-[2/1] rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)' }}
            >
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
                __html: `<p class="mb-4" style="color: rgba(44, 24, 16, 0.7); line-height: 1.8;">${parseMarkdown(article.content)}</p>`
              }}
            />

            {/* Action Buttons */}
            {article.buttons && article.buttons.length > 0 && (
              <div
                className="mt-12 p-6 rounded-2xl"
                style={{ background: '#fdf6e3', border: '1px solid rgba(139, 105, 20, 0.15)' }}
              >
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
                >
                  Take Action
                </h3>
                <div className="flex flex-wrap gap-3">
                  {article.buttons.map((button, index) => (
                    <a
                      key={index}
                      href={button.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 text-white font-semibold rounded-xl transition-all"
                      style={{ background: '#8b6914', boxShadow: '0 4px 14px rgba(139, 105, 20, 0.25)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#2c1810';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#8b6914';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {button.text}
                      <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* More Articles */}
      <section className="py-12" style={{ background: '#fdf6e3' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-bold mb-8"
            style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
          >
            Continue Learning
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Link
                key={relatedArticle.id}
                href={`/learn/${relatedArticle.slug}`}
                className="group bg-white rounded-xl overflow-hidden transition-all"
                style={{ border: '1px solid rgba(0, 0, 0, 0.06)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(139, 105, 20, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
                }}
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
                  <h3
                    className="font-semibold transition-colors line-clamp-2"
                    style={{ fontFamily: 'Satoshi, Inter, sans-serif', color: '#2c1810' }}
                  >
                    {relatedArticle.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 text-sm" style={{ color: '#8b6914' }}>
                    Read more
                    <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
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
