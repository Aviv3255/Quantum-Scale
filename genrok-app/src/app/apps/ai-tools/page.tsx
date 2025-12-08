'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ExternalLink,
  Wand2,
  Image as ImageIcon,
  Video,
  FileText,
  MessageSquare,
  Mic,
  Code,
  Palette,
  Bot,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

const aiTools = [
  {
    id: 1,
    name: 'Midjourney',
    category: 'Image Generation',
    icon: ImageIcon,
    description: 'Create stunning product images, lifestyle shots, and brand visuals with AI. Perfect for ads and product pages.',
    website: 'https://midjourney.com',
    features: ['Product mockups', 'Lifestyle images', 'Brand visuals', 'Ad creatives'],
  },
  {
    id: 2,
    name: 'ChatGPT',
    category: 'Text & Strategy',
    icon: MessageSquare,
    description: 'Write product descriptions, email campaigns, ad copy, and develop marketing strategies with AI assistance.',
    website: 'https://chat.openai.com',
    features: ['Product descriptions', 'Email sequences', 'Ad copy', 'Strategy planning'],
  },
  {
    id: 3,
    name: 'Runway ML',
    category: 'Video Generation',
    icon: Video,
    description: 'Generate stunning video content for ads, remove backgrounds, and create motion graphics effortlessly.',
    website: 'https://runwayml.com',
    features: ['Video generation', 'Background removal', 'Motion graphics', 'Video editing'],
  },
  {
    id: 4,
    name: 'ElevenLabs',
    category: 'Voice & Audio',
    icon: Mic,
    description: 'Create professional voiceovers for video ads, UGC-style content, and product videos with realistic AI voices.',
    website: 'https://elevenlabs.io',
    features: ['Voiceovers', 'Multiple languages', 'Voice cloning', 'Audio content'],
  },
  {
    id: 5,
    name: 'Copy.ai',
    category: 'Copywriting',
    icon: FileText,
    description: 'Generate high-converting copy for product pages, emails, and ads with AI-powered copywriting.',
    website: 'https://copy.ai',
    features: ['Product copy', 'Email templates', 'Ad headlines', 'Social posts'],
  },
  {
    id: 6,
    name: 'Canva AI',
    category: 'Design',
    icon: Palette,
    description: 'Design professional graphics, social media posts, and marketing materials with AI-assisted tools.',
    website: 'https://canva.com',
    features: ['Social graphics', 'Ad designs', 'Brand kits', 'Templates'],
  },
  {
    id: 7,
    name: 'Jasper',
    category: 'Marketing AI',
    icon: Bot,
    description: 'Enterprise-grade AI for marketing teams. Create content at scale with brand voice consistency.',
    website: 'https://jasper.ai',
    features: ['Brand voice', 'Content at scale', 'Team collaboration', 'Templates'],
  },
  {
    id: 8,
    name: 'Synthesia',
    category: 'AI Avatars',
    icon: Wand2,
    description: 'Create professional videos with AI avatars. Perfect for product explainers and training content.',
    website: 'https://synthesia.io',
    features: ['AI presenters', 'Multiple languages', 'Custom avatars', 'Quick videos'],
  },
  {
    id: 9,
    name: 'Descript',
    category: 'Video Editing',
    icon: Code,
    description: 'Edit videos by editing text. AI-powered transcription, screen recording, and podcast editing.',
    website: 'https://descript.com',
    features: ['Text-based editing', 'Transcription', 'Screen recording', 'Overdub'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const tips = [
  {
    number: '1',
    title: 'Start with Clear Prompts',
    description: 'The better your input, the better the output. Be specific about what you want.',
  },
  {
    number: '2',
    title: 'Iterate and Refine',
    description: 'Don\'t expect perfection on the first try. Use AI output as a starting point to refine.',
  },
  {
    number: '3',
    title: 'Maintain Brand Voice',
    description: 'Always review and adjust AI content to match your brand\'s unique voice and style.',
  },
  {
    number: '4',
    title: 'Combine Tools',
    description: 'Use multiple AI tools together. Generate images with Midjourney, write copy with ChatGPT.',
  },
];

export default function AIToolsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1>AI Tools for eCommerce</h1>
              <p>Leverage artificial intelligence to create better content and scale faster</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-gold-bg)]">
              <Sparkles size={16} className="text-[var(--text-primary)]" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[var(--text-primary)]">AI-Powered</span>
            </div>
          </div>
        </header>

        {/* Tools Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid-3 mb-12"
        >
          {aiTools.map((tool) => (
            <motion.div key={tool.id} variants={itemVariants}>
              <div className="card card-hover h-full flex flex-col overflow-hidden" style={{ padding: 0 }}>
                {/* Header */}
                <div className="p-6 bg-[var(--accent-gold-bg)]">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[var(--accent-gold)]/20 flex items-center justify-center">
                      <tool.icon size={28} className="text-[var(--text-primary)]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{tool.name}</h3>
                      <span className="text-sm text-[var(--text-primary)]">{tool.category}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-[var(--text-muted)] mb-4 flex-1">{tool.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tool.features.map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium px-2.5 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full justify-center"
                  >
                    Try {tool.name}
                    <ExternalLink size={16} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Tips Section */}
        <section className="card p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">How to Use AI Effectively</h2>
            <p className="text-[var(--text-muted)]">Tips to get the most out of these AI tools</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip) => (
              <div key={tip.number} className="p-4 rounded-xl bg-[var(--bg-secondary)]">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-gold-bg)] flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-[var(--text-primary)]">{tip.number}</span>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{tip.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
