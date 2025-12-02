import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ArticleCard({ article, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: '#FFFFFF',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
      }}
    >
      {/* Thumbnail - 5:4 Aspect Ratio */}
      <div className="overflow-hidden" style={{ aspectRatio: '5/4', background: '#F3F4F6' }}>
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2 line-clamp-2" style={{ 
          color: '#010C31',
          fontFamily: 'Poppins, sans-serif'
        }}>
          {article.title}
        </h3>
        
        <p className="text-sm mb-4 line-clamp-2" style={{ color: '#6B7280' }}>
          {article.intro}
        </p>

        <div className="flex items-center gap-2 text-sm font-semibold transition-colors"
             style={{ color: '#007DFF' }}>
          <span>Read Article</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}