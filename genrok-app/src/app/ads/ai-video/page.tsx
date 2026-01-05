'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X, Play, ExternalLink, Copy, Check } from 'lucide-react';
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
  copyText?: string;
  mediaUrl?: string;
  mediaType?: 'video' | 'image';
}

const CHATGPT_PROMPT = `Hey, I sell this product (see image), it is a PRODUCT TYPE/NAME. I need you to create a brief explanation about the product. Answer these questions:
1: How would you describe your product?
2: Who is your target audience?
3: What are the main features? (Here I need 3 main features)`;

const CHATGPT_PROMPT_2 = `Now, I want to create a short video ad for the product using arcads.ai, I need you to write a short description of the product`;

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
        title: 'Ask ChatGPT About Your Product',
        description: 'Go to ChatGPT with an image of your product attached, and write this:',
        copyText: CHATGPT_PROMPT,
      },
      {
        step: 2,
        title: 'Fill in the Answers in Arcads',
        description: 'Copy the answers ChatGPT gave you and fill them in the Arcads form:',
        mediaUrl: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Arcads.mp4',
        mediaType: 'video',
      },
      {
        step: 3,
        title: 'Choose a Preset',
        description: 'Select one or several presets for your video style:',
        mediaUrl: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Recording%202026-01-04%20172016.mp4',
        mediaType: 'video',
      },
      {
        step: 4,
        title: 'Upload Product Images',
        description: 'Upload a reference image of your product:',
        mediaUrl: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Screenshot%202026-01-04%20172212.png',
        mediaType: 'image',
      },
      {
        step: 5,
        title: 'Choose Aspect Ratio',
        description: 'Select the aspect ratio for your video (9:16 for TikTok/Reels, 1:1 for Feed):',
        mediaUrl: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Joy%20screenshots/Recording%202026-01-05%20135235.mp4',
        mediaType: 'video',
      },
      {
        step: 6,
        title: 'Generate the Prompt',
        description: 'Write this in the same ChatGPT chat, then paste the response into Arcads:',
        copyText: CHATGPT_PROMPT_2,
      },
      {
        step: 7,
        title: 'Click Create',
        description: 'Hit the Create button and wait for your AI video to generate.',
      },
      {
        step: 8,
        title: 'Here is the Result!',
        description: 'Your AI-generated video ad is ready to use:',
        mediaUrl: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Cat%20Feeder%20Tool.mp4',
        mediaType: 'video',
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
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const copyToClipboard = (text: string, stepNum: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepNum);
    setTimeout(() => setCopiedStep(null), 2000);
  };

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

        {/* Tutorial Section - Luxurious design */}
        <div className="mb-16">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">
              How to Create Videos with {currentPlatform.name}
            </h2>
            <p className="text-lg text-[var(--text-muted)]">
              Follow these simple steps to create your own AI-generated video ads
            </p>
          </div>

          <div className="space-y-16">
            {currentPlatform.tutorialSteps.map((step) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: step.step * 0.1 }}
                className="relative"
              >
                {/* Step Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-bold">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                      {step.title}
                    </h3>
                    <p className="text-[var(--text-muted)] mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Copyable Text Block */}
                {step.copyText && (
                  <div className="ml-16 mb-6">
                    <div className="bg-[#1a1a1a] rounded-xl p-5 max-w-2xl relative group">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                        {step.copyText}
                      </pre>
                      <button
                        onClick={() => copyToClipboard(step.copyText!, step.step)}
                        className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          copiedStep === step.step
                            ? 'bg-green-500 text-white'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {copiedStep === step.step ? (
                          <>
                            <Check size={12} />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Video - Autoplay like GIF, original size */}
                {step.mediaUrl && step.mediaType === 'video' && (
                  <div className="ml-16">
                    <video
                      src={step.mediaUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="rounded-xl max-w-full"
                      style={{ maxHeight: '500px' }}
                    />
                  </div>
                )}

                {/* Image - original size */}
                {step.mediaUrl && step.mediaType === 'image' && (
                  <div className="ml-16">
                    <Image
                      src={step.mediaUrl}
                      alt={step.title}
                      width={800}
                      height={600}
                      className="rounded-xl max-w-full h-auto"
                      style={{ maxHeight: '500px', width: 'auto' }}
                      unoptimized
                    />
                  </div>
                )}
              </motion.div>
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
