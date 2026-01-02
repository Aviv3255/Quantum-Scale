'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X, Play, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Platform data
type Platform = 'arcads' | 'creatify';

interface VideoExample {
  id: string;
  title: string;
  videoUrl: string;
  productImage: string;
  prompt: string;
}

interface TutorialStep {
  step: number;
  title: string;
  description: string;
  gifUrl?: string;
}

const platformData: Record<Platform, {
  name: string;
  logo?: string;
  examples: VideoExample[];
  tutorialSteps: TutorialStep[];
}> = {
  arcads: {
    name: 'Arcads',
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
        <header className="page-header mb-12">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">AI Video Ads</h1>
          <p className="text-[var(--text-muted)] mt-2">
            Compare AI-generated UGC videos from leading platforms. Same product, same prompt, different results.
          </p>
        </header>

        {/* Platform Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[var(--bg-secondary)] rounded-xl p-1.5">
            {(['arcads', 'creatify'] as Platform[]).map((platform) => (
              <button
                key={platform}
                onClick={() => setActivePlatform(platform)}
                className={`px-8 py-3 rounded-lg text-sm font-semibold transition-all ${
                  activePlatform === platform
                    ? 'bg-white text-[var(--text-primary)] shadow-sm'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {platformData[platform].name}
              </button>
            ))}
          </div>
        </div>

        {/* Video Examples */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePlatform}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {currentPlatform.examples.map((example) => (
                <div key={example.id} className="flex flex-col">
                  {/* Video Player */}
                  <div className="relative aspect-[9/16] max-h-[500px] bg-black rounded-t-2xl overflow-hidden">
                    {example.videoUrl ? (
                      <video
                        src={example.videoUrl}
                        controls
                        className="w-full h-full object-contain"
                        poster=""
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-white/60">
                        <Play size={48} className="mb-4 opacity-50" />
                        <p className="text-sm">Video coming soon</p>
                      </div>
                    )}
                  </div>

                  {/* Product Info Card */}
                  <div className="bg-white border-2 border-black rounded-b-2xl p-5 flex gap-5">
                    {/* Product Image */}
                    <button
                      onClick={() => setExpandedImage(example.productImage)}
                      className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-[var(--border-light)] hover:border-[var(--primary)] transition-colors cursor-pointer"
                    >
                      <Image
                        src={example.productImage}
                        alt={example.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain bg-white"
                      />
                    </button>

                    {/* Prompt */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[var(--text-primary)] mb-1.5">
                        {example.title}
                      </h3>
                      <button
                        onClick={() => setExpandedPrompt({ title: example.title, prompt: example.prompt })}
                        className="text-left text-sm text-[var(--text-muted)] line-clamp-2 hover:text-[var(--text-secondary)] transition-colors cursor-pointer"
                      >
                        {example.prompt}
                      </button>
                      <button
                        onClick={() => setExpandedPrompt({ title: example.title, prompt: example.prompt })}
                        className="mt-2 text-xs font-medium text-[var(--primary)] flex items-center gap-1 hover:underline"
                      >
                        View full prompt <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tutorial Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-3">
                How to Create Videos with {currentPlatform.name}
              </h2>
              <p className="text-[var(--text-muted)] text-center mb-10 max-w-2xl mx-auto">
                Follow these steps to create your own AI-generated video ads
              </p>

              <div className="space-y-8">
                {currentPlatform.tutorialSteps.map((step) => (
                  <div
                    key={step.step}
                    className="flex gap-6 items-start"
                  >
                    {/* Step Number */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[var(--text-muted)] mb-4">
                        {step.description}
                      </p>

                      {/* GIF Placeholder */}
                      {step.gifUrl ? (
                        <div className="rounded-xl overflow-hidden inline-block">
                          <Image
                            src={step.gifUrl}
                            alt={step.title}
                            width={600}
                            height={400}
                            className="max-w-full h-auto"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="bg-[var(--bg-secondary)] rounded-xl p-8 max-w-xl border-2 border-dashed border-[var(--border-light)]">
                          <p className="text-sm text-[var(--text-muted)] text-center">
                            Tutorial GIF coming soon
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

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
                    {expandedPrompt.title} - Prompt
                  </h3>
                  <button
                    onClick={() => setExpandedPrompt(null)}
                    className="p-2 hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-[var(--text-secondary)] leading-relaxed">
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
