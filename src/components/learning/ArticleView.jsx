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
      <div className="flex flex-wrap gap-4">
        {article.buttons.map((button, idx) => (
          <a
            key={idx}
            href={button.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all text-sm ${idx === 0 ? 'btn-primary' : ''}`}
            style={idx === 0 ? {} : {
              background: '#FFFFFF',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              color: '#000000',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
            }}
            onMouseEnter={(e) => {
              if (idx !== 0) {
                e.currentTarget.style.background = '#FAFAFA';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (idx !== 0) {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(0)';
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
          className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-xl font-semibold transition-all"
          style={{
            background: '#FAFAFA',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            color: '#000000'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F5F5F5';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#FAFAFA';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </button>

        {/* Title & Intro */}
        <div className="mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-premium-heading" style={{
            color: '#000000',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: '1.2'
          }}>
            {article.title}
          </h1>

          <p className="text-xl leading-relaxed mb-8" style={{
            color: '#6B7280'
          }}>
            {article.intro}
          </p>

          {/* Action Buttons - Top */}
          <div className="pb-10 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            <ActionButtons />
          </div>
        </div>

        {/* Special Features (for Article 1) */}
        {article.specialFeatures && (
          <div className="mb-14 grid md:grid-cols-3 gap-6">
            {article.specialFeatures.map((feature, idx) => (
              <div key={idx} className="p-8 rounded-2xl text-center premium-card" style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.06)'
              }}>
                <ArrowUp className="w-6 h-6 mx-auto mb-4" style={{ color: '#000000' }} />
                <div className="font-bold text-2xl mb-2" style={{ color: '#000000' }}>
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
        <div className="prose prose-lg max-w-none mb-14">
          <ReactMarkdown
            components={{
              h2: ({node, ...props}) => <h2 className="text-3xl font-bold mt-14 mb-6 text-premium-heading" style={{ color: '#000000', fontFamily: 'Poppins, sans-serif' }} {...props} />,
              h3: ({node, ...props}) => <h3 className="text-2xl font-bold mt-10 mb-4 text-premium-heading" style={{ color: '#000000', fontFamily: 'Poppins, sans-serif' }} {...props} />,
              h4: ({node, ...props}) => <h4 className="text-xl font-semibold mt-8 mb-3" style={{ color: '#000000' }} {...props} />,
              p: ({node, ...props}) => <p className="text-lg leading-relaxed mb-6" style={{ color: '#374151' }} {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-3" {...props} />,
              li: ({node, ...props}) => <li className="text-lg leading-relaxed" style={{ color: '#374151' }} {...props} />,
              strong: ({node, ...props}) => <strong style={{ color: '#000000', fontWeight: '700' }} {...props} />,
              img: ({node, ...props}) => (
                <div className="my-10 w-full overflow-hidden rounded-xl" style={{ aspectRatio: '16/9', maxHeight: '350px' }}>
                  <img className="w-full h-full object-cover" {...props} />
                </div>
              ),
              a: ({node, ...props}) => <a className="font-medium underline" style={{ color: '#000000' }} {...props} />
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* Action Buttons - Bottom */}
        {article.buttons && article.buttons.length > 0 && (
          <div className="pt-10 border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            <ActionButtons />
          </div>
        )}

        {/* Back to Top */}
        <div className="mt-16 text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all"
            style={{
              background: '#FAFAFA',
              border: '1px solid rgba(0,0,0,0.06)',
              color: '#6B7280'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F5F5F5';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FAFAFA';
              e.currentTarget.style.color = '#6B7280';
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