'use client';

import { useMemo } from 'react';

// Video URLs for the right panel (19 videos with equal probability)
const VIDEOS = [
  'https://cdn.shopify.com/videos/c/o/v/c4d75a58dbd34d33ba8f13202f17053f.mp4', // Waving with sunglasses
  'https://cdn.shopify.com/videos/c/o/v/f3311340d3ab4a9a8c678baf2bede90f.mp4', // Smoking cigar
  'https://cdn.shopify.com/videos/c/o/v/de358ce3176a4b63971c703a11fb617b.mp4', // Printing money
  'https://cdn.shopify.com/videos/c/o/v/ea85282e437d4099b0a48257428bdb4b.mp4', // Opening door
  'https://cdn.shopify.com/videos/c/o/v/c8c906ed41d1492e96c76ee462f5f7cf.mp4', // Dancing salsa
  'https://cdn.shopify.com/videos/c/o/v/28fffc64bec641e8839f102e8bac790c.mp4', // Breakdance
  'https://cdn.shopify.com/videos/c/o/v/6c7a8420e19c46f4883b1165c506c778.mp4', // Robot dance
  'https://cdn.shopify.com/videos/c/o/v/00dfc99eda684430ba42235578e42e59.mp4', // Moonwalk
  'https://cdn.shopify.com/videos/c/o/v/b418dc1ab0e449878966438784c205a7.mp4', // Leaning on dollar, clapping
  'https://cdn.shopify.com/videos/c/o/v/066c3aa20af24efcb9cf59197bac63e8.mp4', // Leaning on dollar, lighting cigar
  'https://cdn.shopify.com/videos/c/o/v/b793644b86164f048208eba43398aa01.mp4', // Leaning on Shopify, clapping
  'https://cdn.shopify.com/videos/c/o/v/719d004e46734351b31128cb2e7881af.mp4', // Money falling from sky
  'https://cdn.shopify.com/videos/c/o/v/19d3c39f4e5e4d57bc9bbdc8db9d1639.mp4', // Drinking in hammock
  'https://cdn.shopify.com/videos/c/o/v/f074d80da8f54b2e9fdf2414633445ca.mp4', // Giving kiss
  'https://cdn.shopify.com/videos/c/o/v/f4e014ea4ee64397a4c6ff88675b34ce.mp4', // Chasing dollars
  'https://cdn.shopify.com/videos/c/o/v/65197cabd21f4d1d9d9f7d8e42bed164.mp4', // Climbing money mountain 1
  'https://cdn.shopify.com/videos/c/o/v/0b6a143059e44ccc9709c2dfa6e105c0.mp4', // Climbing money mountain 2
  'https://cdn.shopify.com/videos/c/o/v/db18c3e6ce2d4b169594dd188276c4d3.mp4', // Flying on rocket
  'https://cdn.shopify.com/videos/c/o/v/568c4d18549f45c6a337e87f078a6c9d.mp4', // With Rolex
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Select a random video once per session (using crypto for true randomness)
  const randomVideo = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * VIDEOS.length);
    return VIDEOS[randomIndex];
  }, []);

  return (
    <>
      {/* Desktop Layout */}
      <div className="auth-container-desktop">
        {/* Left Panel - Form */}
        <div className="auth-form-side">
          <div className="auth-form-wrapper">
            {children}
          </div>
        </div>

        {/* Right Panel - Video only */}
        <div className="auth-media-side">
          <div className="auth-media-wrapper">
            <video
              src={randomVideo}
              autoPlay
              loop
              muted
              playsInline
              className="auth-media"
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="auth-container-mobile">
        {/* Top Section - Video */}
        <div className="auth-mobile-video">
          <video
            src={randomVideo}
            autoPlay
            loop
            muted
            playsInline
            className="auth-mobile-video-player"
          />
        </div>

        {/* Bottom Section - Form */}
        <div className="auth-mobile-bottom">
          {children}
        </div>
      </div>
    </>
  );
}
