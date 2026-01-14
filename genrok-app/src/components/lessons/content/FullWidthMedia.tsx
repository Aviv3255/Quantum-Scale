'use client';

import { motion } from 'framer-motion';

interface FullWidthMediaProps {
  src: string;
  type: 'image' | 'video';
  alt?: string;
  caption?: string;
  aspectRatio?: '16/9' | '4/3' | '21/9' | 'auto';
  darkMode?: boolean;
}

/**
 * FullWidthMedia - Large media spanning full width with optional caption
 * Premium design with subtle shadow and rounded corners
 */
export function FullWidthMedia({
  src,
  type,
  alt,
  caption,
  aspectRatio = '16/9',
  darkMode = false,
}: FullWidthMediaProps) {
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const mutedClass = darkMode ? 'text-white/60' : 'text-[#666666]';

  return (
    <div className={`${bgClass} p-8 lg:p-12`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl mx-auto"
      >
        {/* Media container */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{
            aspectRatio: aspectRatio === 'auto' ? 'auto' : aspectRatio.replace('/', '/'),
          }}
        >
          {type === 'image' ? (
            <img
              src={src}
              alt={alt || ''}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={src}
              controls
              playsInline
              className="w-full h-full object-cover"
            />
          )}

          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Caption */}
        {caption && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-center ${mutedClass} text-sm mt-4`}
          >
            {caption}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default FullWidthMedia;
