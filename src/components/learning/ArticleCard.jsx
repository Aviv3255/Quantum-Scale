import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function ArticleCard({ article, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 premium-card"
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.06)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Thumbnail - 5:4 Aspect Ratio */}
      <div className="overflow-hidden relative" style={{ aspectRatio: '5/4', background: '#FAFAFA' }}>
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 skeleton-shimmer" />
        )}
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        ) : (
          <img
            src={article.thumbnail}
            alt={article.title}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-lg font-bold mb-3 line-clamp-2 text-premium-heading" style={{
          color: '#000000',
          fontFamily: 'Poppins, sans-serif'
        }}>
          {article.title}
        </h3>

        <p className="text-sm mb-5 line-clamp-2" style={{ color: '#6B7280' }}>
          {article.intro}
        </p>

        <div className="flex items-center gap-2 text-sm font-semibold transition-colors"
             style={{ color: '#000000' }}>
          <span>Read Article</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}