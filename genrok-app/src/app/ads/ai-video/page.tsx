'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X, Play, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Platform data
type Platform = 'arcads' | 'creatify';

interface VideoExample {
  id: string;
  title: string;
  videoUrl: string;
  productImage?: string;
  prompt: string;
  poster?: string;
}

interface TutorialStep {
  step: number;
  title: string;
  description: string;
  gifUrl?: string;
}

const platformData: Record<Platform, {
  name: string;
  url: string;
  logo?: string;
  examples: VideoExample[];
  tutorialSteps: TutorialStep[];
}> = {
  arcads: {
    name: 'Arcads',
    url: 'https://arcads.ai/?via=quantum',
    examples: [
      {
        id: 'dress',
        title: 'Fashion Dress',
        videoUrl: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Fashion%20Try%20On.mp4',
        productImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/COEL-WD492_V3%20(1)%20(1).png',
        prompt: 'Create a UGC-style video showing young women trying on and styling this elegant dress. Include authentic reactions, mirror shots, and lifestyle moments. Keep it natural and relatable for social media ads.',
      },
      {
        id: 'pet-feeder',
        title: 'Smart Pet Feeder',
        videoUrl: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Cat%20Feeder%20Tool.mp4',
        productImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-01-02%20at%2011.55.45%20AM.jpeg',
        prompt: 'Create a video demonstrating this WiFi-controlled pet feeder. Show the app interface, a cat happily eating, and emphasize the convenience of feeding your pet remotely from your phone.',
      },
      {
        id: 'cosmetics',
        title: 'Cosmetic Product',
        videoUrl: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Untitled%20folder/Arcadscosmetics.mp4',
        productImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Untitled%20folder/Loyalty%20app%20Screenshots%20(25).jpg',
        prompt: 'Create a video of a woman using the product to cleanse her face with soap.',
        poster: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Untitled%20folder/Loyalty%20app%20Screenshots%20(25).jpg',
      },
      {
        id: 'shoes',
        title: 'Luxury Shoes',
        videoUrl: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Untitled%20folder/Arcadsfashion.mp4',
        productImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Untitled%20folder/Loyalty%20app%20Screenshots%20(26).jpg',
        prompt: 'Create a luxurious brand video for these shoes, in the style of a high-end luxury television commercial.',
      },
      {
        id: 'crocs',
        title: 'Crocs Shoes',
        videoUrl: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Untitled%20folder/CROCS.mp4',
        productImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Untitled%20folder/Loyalty%20app%20Screenshots%20(27).jpg',
        prompt: 'Create a marketing video in a UGC style for this product.',
      },
      {
        id: 'armchair',
        title: 'Armchair (Home Decor)',
        videoUrl: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Untitled%20folder/home%20decor%20.mp4',
        productImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Untitled%20folder/WhatsApp%20Image%202025-12-28%20at%2011.08.23%20(1)%20(1).jpeg',
        prompt: 'Create a UGC-style video for this product, where the woman sits on the armchair, emphasizes its comfort, and conveys a feeling of warmth, comfort, and home.',
      },
      {
        id: 'perfume',
        title: "Women's Perfume",
        videoUrl: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Untitled%20folder/Videoaracds.mp4',
        productImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Untitled%20folder/Loyalty%20app%20Screenshots%20(28).jpg',
        prompt: 'Create a video for this luxury perfume, clearly conveying lifestyle, luxury, and a strong sense of exclusivity.',
      },
      {
        id: 'care-service',
        title: 'CARE Service for Seniors',
        videoUrl: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Untitled%20folder/WhatsApp%20Video%202025-12-24%20at%2017.50.54.mp4',
        prompt: 'Create an emotional video presenting a premium care service for seniors, emphasizing trust, warmth, professionalism, and peace of mind.',
      },
      {
        id: 'necklace',
        title: 'Diamond Necklace',
        videoUrl: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Untitled%20folder/Necklacevideo.mp4',
        productImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Untitled%20folder/WhatsApp%20Image%202025-12-28%20at%2011.54.15%20(1).jpeg',
        prompt: 'Create a 15-second ultra-realistic cinematic jewelry video featuring a diamond necklace. Soft daylight reflections on white or marble background, slow elegant camera movements, smooth 360° rotation, macro close-ups revealing sparkle and light refractions. Luxurious minimalism with cinematic depth of field and delicate bokeh sparkles.',
        poster: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Untitled%20folder/WhatsApp%20Image%202025-12-28%20at%2011.54.15%20(1).jpeg',
      },
    ],
    tutorialSteps: [
      {
        step: 1,
        title: 'Upload Your Product',
        description: 'Start by uploading your product image or video. Arcads will analyze the visual to understand your product.',
      },
      {
        step: 2,
        title: 'Select Your Avatar',
        description: 'Choose from hundreds of AI avatars that match your brand voice and target audience.',
      },
      {
        step: 3,
        title: 'Write Your Script',
        description: 'Enter your prompt or script. Be specific about the style, tone, and key selling points you want highlighted.',
      },
      {
        step: 4,
        title: 'Customize Settings',
        description: 'Adjust video length, background music, captions, and other settings to match your ad requirements.',
      },
      {
        step: 5,
        title: 'Generate & Download',
        description: 'Click generate and wait for your AI video. Download in multiple formats optimized for different platforms.',
      },
    ],
  },
  creatify: {
    name: 'Creatify',
    url: 'https://creatify.ai/?via=quantum-scale',
    examples: [
      {
        id: 'dress',
        title: 'Fashion Dress',
        videoUrl: '',
        productImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/COEL-WD492_V3%20(1)%20(1).png',
        prompt: 'Create a UGC-style video showing young women trying on and styling this elegant dress. Include authentic reactions, mirror shots, and lifestyle moments. Keep it natural and relatable for social media ads.',
      },
      {
        id: 'pet-feeder',
        title: 'Smart Pet Feeder',
        videoUrl: '',
        productImage: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-01-02%20at%2011.55.45%20AM.jpeg',
        prompt: 'Create a video demonstrating this WiFi-controlled pet feeder. Show the app interface, a cat happily eating, and emphasize the convenience of feeding your pet remotely from your phone.',
      },
    ],
    tutorialSteps: [
      {
        step: 1,
        title: 'Enter Product URL',
        description: 'Simply paste your product page URL. Creatify will automatically extract product details and images.',
      },
      {
        step: 2,
        title: 'Choose AI Presenter',
        description: 'Select from a diverse library of AI presenters or use the URL-to-video feature for product demos.',
      },
      {
        step: 3,
        title: 'Input Your Prompt',
        description: 'Describe what you want in the video. Creatify supports natural language instructions for easy customization.',
      },
      {
        step: 4,
        title: 'Select Video Style',
        description: 'Pick from UGC, professional, lifestyle, or other video styles that match your brand aesthetic.',
      },
      {
        step: 5,
        title: 'Render & Export',
        description: 'Generate your video and export in formats optimized for TikTok, Meta, YouTube, and other platforms.',
      },
    ],
  },
};

export default function AIVideoAdsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const [activePlatform, setActivePlatform] = useState<Platform>('arcads');
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [expandedPrompt, setExpandedPrompt] = useState<{ title: string; prompt: string } | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const currentPlatform = platformData[activePlatform];

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Header */}
        <header className="page-header mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">AI Video Ads</h1>
          <p className="text-[var(--text-muted)] mt-2">
            Compare AI-generated UGC videos from leading platforms. Same product, same prompt, different results.
          </p>
        </header>

        {/* Platform Tabs - Left aligned, connected to content */}
        <div className="flex items-center justify-between mb-0">
          <div className="inline-flex bg-[var(--bg-secondary)] rounded-t-xl overflow-hidden">
            {(['arcads', 'creatify'] as Platform[]).map((platform) => (
              <button
                key={platform}
                onClick={() => setActivePlatform(platform)}
                className={`px-6 py-3 text-sm transition-all ${
                  activePlatform === platform
                    ? 'bg-white text-[var(--text-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-white/50'
                }`}
                style={{ fontWeight: activePlatform === platform ? 700 : 500 }}
              >
                {platformData[platform].name}
              </button>
            ))}
          </div>
          <a
            href={currentPlatform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary flex items-center gap-2 text-sm"
          >
            Try {currentPlatform.name}
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Video Examples Section - Connected to tabs */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlatform}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-b-2xl rounded-tr-2xl border border-[var(--border-light)] p-6 mb-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {currentPlatform.examples.map((example) => (
                <div key={example.id} className="flex flex-col">
                  {/* Video Player - Smaller, no black background */}
                  <div className="relative aspect-[9/16] rounded-t-xl overflow-hidden bg-[var(--bg-secondary)]">
                    {example.videoUrl ? (
                      <video
                        src={example.videoUrl}
                        controls
                        poster={example.poster}
                        className="w-full h-full object-contain"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-[var(--text-muted)]">
                        <Play size={32} className="mb-2 opacity-50" />
                        <p className="text-xs">Coming soon</p>
                      </div>
                    )}
                  </div>

                  {/* Product Info Card */}
                  <div className="bg-white border border-black rounded-b-xl p-3 flex gap-3">
                    {/* Product Image */}
                    {example.productImage ? (
                      <button
                        onClick={() => setExpandedImage(example.productImage!)}
                        className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-[var(--border-light)] hover:border-[var(--primary)] transition-colors cursor-pointer"
                      >
                        <Image
                          src={example.productImage}
                          alt={example.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain bg-white"
                        />
                      </button>
                    ) : (
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center">
                        <span className="text-xs text-[var(--text-muted)]">N/A</span>
                      </div>
                    )}

                    {/* Prompt */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-[var(--text-primary)] mb-1 truncate" style={{ fontWeight: 700 }}>
                        {example.title}
                      </h3>
                      <button
                        onClick={() => setExpandedPrompt({ title: example.title, prompt: example.prompt })}
                        className="text-left text-xs text-[var(--text-muted)] line-clamp-2 hover:text-[var(--text-secondary)] transition-colors cursor-pointer leading-tight"
                      >
                        {example.prompt}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tutorial Section - Left aligned */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            How to Create Videos with {currentPlatform.name}
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            Follow these steps to create your own AI-generated video ads
          </p>

          <div className="space-y-6">
            {currentPlatform.tutorialSteps.map((step) => (
              <div
                key={step.step}
                className="flex gap-5 items-start"
              >
                {/* Step Number */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold">
                  {step.step}
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-3">
                    {step.description}
                  </p>

                  {/* GIF Placeholder */}
                  {step.gifUrl ? (
                    <div className="rounded-xl overflow-hidden inline-block">
                      <Image
                        src={step.gifUrl}
                        alt={step.title}
                        width={500}
                        height={300}
                        className="max-w-full h-auto"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="bg-[var(--bg-secondary)] rounded-xl p-6 max-w-md border border-dashed border-[var(--border-light)]">
                      <p className="text-xs text-[var(--text-muted)] text-center">
                        Tutorial GIF coming soon
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {expandedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
              onClick={() => setExpandedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-3xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setExpandedImage(null)}
                  className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
                >
                  <X size={28} />
                </button>
                <Image
                  src={expandedImage}
                  alt="Product"
                  width={800}
                  height={800}
                  className="max-w-full max-h-[85vh] object-contain rounded-xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prompt Modal */}
        <AnimatePresence>
          {expandedPrompt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
              onClick={() => setExpandedPrompt(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    {expandedPrompt.title}
                  </h3>
                  <button
                    onClick={() => setExpandedPrompt(null)}
                    className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                  {expandedPrompt.prompt}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(expandedPrompt.prompt);
                  }}
                  className="mt-4 btn btn-secondary w-full"
                >
                  Copy Prompt
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
