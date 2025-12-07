'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

// Get random video - runs on every page load/refresh
const getRandomVideo = (videos: string[]) => {
  const randomIndex = Math.floor(Math.random() * videos.length);
  return videos[randomIndex];
};

// Video URLs for the right panel (15 videos with equal probability)
const VIDEOS = [
  'https://cdn.shopify.com/videos/c/o/v/c4d75a58dbd34d33ba8f13202f17053f.mp4', // Waving with sunglasses
  'https://cdn.shopify.com/videos/c/o/v/f3311340d3ab4a9a8c678baf2bede90f.mp4', // Smoking cigar
  'https://cdn.shopify.com/videos/c/o/v/de358ce3176a4b63971c703a11fb617b.mp4', // Printing money
  'https://cdn.shopify.com/videos/c/o/v/ea85282e437d4099b0a48257428bdb4b.mp4', // Opening door
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
  const router = useRouter();
  const pathname = usePathname();
  const [showForm, setShowForm] = useState(false);

  // Random video - changes on every refresh/new window
  const [randomVideo] = useState(() => getRandomVideo(VIDEOS));

  const handleLogin = () => {
    if (pathname !== '/login') {
      router.push('/login');
    }
    setShowForm(true);
  };

  const handleSignup = () => {
    if (pathname !== '/signup') {
      router.push('/signup');
    }
    setShowForm(true);
  };

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
      <div className={`auth-container-mobile ${showForm ? 'form-active' : ''}`}>
        {/* Header - Only show when buttons are visible */}
        {!showForm && (
          <div className="auth-mobile-header">
            <h1 className="auth-mobile-title">Welcome back</h1>
            <p className="auth-mobile-subtitle">Sign in to continue building your empire</p>
          </div>
        )}

        {/* Video Section - Smaller when form is shown */}
        <div className={`auth-mobile-video ${showForm ? 'compact' : ''}`}>
          <video
            src={randomVideo}
            autoPlay
            loop
            muted
            playsInline
            className="auth-mobile-video-player"
          />
        </div>

        {/* Bottom Section - Buttons or Form */}
        <div className={`auth-mobile-bottom ${showForm ? 'expanded' : ''}`}>
          <div className={`auth-mobile-slide-container ${showForm ? 'show-form' : ''}`}>
            {/* Buttons Panel */}
            <div className="auth-mobile-slide-buttons">
              <div className="auth-mobile-btn-group">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="btn-auth-primary w-full"
                >
                  LOG IN
                </button>
                <button
                  type="button"
                  onClick={handleSignup}
                  className="btn-auth-secondary w-full"
                >
                  SIGN UP
                </button>
              </div>
            </div>

            {/* Form Panel */}
            <div className="auth-mobile-slide-form">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="auth-mobile-back"
              >
                <ArrowLeft size={16} />
                Back
              </button>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
