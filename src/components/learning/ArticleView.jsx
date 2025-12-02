import React, { useEffect } from 'react';
import { ArrowLeft, ExternalLink, ArrowUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ArticleView({ article, onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article]);

  if (!article) return null;

  const ActionButtons = () => (
    article.buttons && article.buttons.length > 0 ? (
      <div className="flex flex-wrap gap-3">
        {article.buttons.map((button, idx) => (
          <a
            key={idx}
            href={button.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all text-sm"
            style={{
              background: idx === 0 ? '#007DFF' : 'rgba(0, 125, 255, 0.08)',
              border: idx === 0 ? 'none' : '1px solid rgba(0, 125, 255, 0.2)',
              color: idx === 0 ? '#FFFFFF' : '#007DFF',
              boxShadow: idx === 0 ? '0 2px 8px rgba(0, 125, 255, 0.25)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (idx === 0) {
                e.currentTarget.style.background = '#0066DD';
              } else {
                e.currentTarget.style.background = 'rgba(0, 125, 255, 0.12)';
              }
            }}
            onMouseLeave={(e) => {
              if (idx === 0) {
                e.currentTarget.style.background = '#007DFF';
              } else {
                e.currentTarget.style.background = 'rgba(0, 125, 255, 0.08)';
              }
            }}
          >
            <span>{button.text}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        ))}
      </div>
    ) : null
  );

  return (
    <div className="min-h-screen" style={{ background: '#FFFFFF' }}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl font-semibold transition-all"
          style={{
            background: 'rgba(0, 125, 255, 0.08)',
            border: '1px solid rgba(0, 125, 255, 0.2)',
            color: '#007DFF'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 125, 255, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 125, 255, 0.08)';
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </button>

        {/* Title & Intro */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{
            color: '#010C31',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: '1.2'
          }}>
            {article.title}
          </h1>

          <p className="text-xl leading-relaxed mb-6" style={{ 
            color: '#4B5563'
          }}>
            {article.intro}
          </p>

          {/* Action Buttons - Top */}
          <div className="pb-8 border-b" style={{ borderColor: '#E5E7EB' }}>
            <ActionButtons />
          </div>
        </div>

        {/* Special Features (for Article 1) */}
        {article.specialFeatures && (
          <div className="mb-12 grid md:grid-cols-3 gap-6">
            {article.specialFeatures.map((feature, idx) => (
              <div key={idx} className="p-6 rounded-2xl text-center" style={{
                background: 'rgba(16, 185, 129, 0.06)',
                border: '1px solid rgba(16, 185, 129, 0.15)'
              }}>
                <ArrowUp className="w-6 h-6 mx-auto mb-3" style={{ color: '#10B981' }} />
                <div className="font-bold text-2xl mb-2" style={{ color: '#010C31' }}>
                  {feature.value}
                </div>
                <div className="text-sm font-medium" style={{ color: '#6B7280' }}>
                  {feature.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <ReactMarkdown
            components={{
              h2: ({node, ...props}) => <h2 className="text-3xl font-bold mt-12 mb-6" style={{ color: '#010C31', fontFamily: 'Poppins, sans-serif' }} {...props} />,
              h3: ({node, ...props}) => <h3 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#010C31', fontFamily: 'Poppins, sans-serif' }} {...props} />,
              h4: ({node, ...props}) => <h4 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#010C31' }} {...props} />,
              p: ({node, ...props}) => <p className="text-lg leading-relaxed mb-6" style={{ color: '#374151' }} {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
              li: ({node, ...props}) => <li className="text-lg leading-relaxed" style={{ color: '#374151' }} {...props} />,
              strong: ({node, ...props}) => <strong style={{ color: '#010C31', fontWeight: '700' }} {...props} />,
              img: ({node, ...props}) => (
                <div className="my-8 w-full overflow-hidden" style={{ aspectRatio: '16/9', maxHeight: '350px' }}>
                  <img className="w-full h-full object-cover" {...props} />
                </div>
              ),
              a: ({node, ...props}) => <a className="text-blue-600 hover:text-blue-700 underline" {...props} />
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* Action Buttons - Bottom */}
        {article.buttons && article.buttons.length > 0 && (
          <div className="pt-8 border-t" style={{ borderColor: '#E5E7EB' }}>
            <ActionButtons />
          </div>
        )}

        {/* Back to Top */}
        <div className="mt-16 text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
            style={{
              background: '#F3F4F6',
              border: '1px solid #E5E7EB',
              color: '#6B7280'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E5E7EB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F3F4F6';
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </button>
        </div>
      </div>
    </div>
  );
}