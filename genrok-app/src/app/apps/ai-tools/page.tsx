'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ExternalLink,
  Play,
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
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const aiTools = [
  {
    id: 1,
    name: 'Midjourney',
    category: 'Image Generation',
    icon: ImageIcon,
    color: 'from-indigo-500 to-purple-500',
    description: 'Create stunning product images, lifestyle shots, and brand visuals with AI. Perfect for ads and product pages.',
    website: 'https://midjourney.com',
    features: ['Product mockups', 'Lifestyle images', 'Brand visuals', 'Ad creatives'],
  },
  {
    id: 2,
    name: 'ChatGPT',
    category: 'Text & Strategy',
    icon: MessageSquare,
    color: 'from-green-500 to-emerald-500',
    description: 'Write product descriptions, email campaigns, ad copy, and develop marketing strategies with AI assistance.',
    website: 'https://chat.openai.com',
    features: ['Product descriptions', 'Email sequences', 'Ad copy', 'Strategy planning'],
  },
  {
    id: 3,
    name: 'Runway ML',
    category: 'Video Generation',
    icon: Video,
    color: 'from-pink-500 to-rose-500',
    description: 'Generate stunning video content for ads, remove backgrounds, and create motion graphics effortlessly.',
    website: 'https://runwayml.com',
    features: ['Video generation', 'Background removal', 'Motion graphics', 'Video editing'],
  },
  {
    id: 4,
    name: 'ElevenLabs',
    category: 'Voice & Audio',
    icon: Mic,
    color: 'from-orange-500 to-amber-500',
    description: 'Create professional voiceovers for video ads, UGC-style content, and product videos with realistic AI voices.',
    website: 'https://elevenlabs.io',
    features: ['Voiceovers', 'Multiple languages', 'Voice cloning', 'Audio content'],
  },
  {
    id: 5,
    name: 'Copy.ai',
    category: 'Copywriting',
    icon: FileText,
    color: 'from-blue-500 to-cyan-500',
    description: 'Generate high-converting copy for product pages, emails, and ads with AI-powered copywriting.',
    website: 'https://copy.ai',
    features: ['Product copy', 'Email templates', 'Ad headlines', 'Social posts'],
  },
  {
    id: 6,
    name: 'Canva AI',
    category: 'Design',
    icon: Palette,
    color: 'from-violet-500 to-purple-500',
    description: 'Design professional graphics, social media posts, and marketing materials with AI-assisted tools.',
    website: 'https://canva.com',
    features: ['Social graphics', 'Ad designs', 'Brand kits', 'Templates'],
  },
  {
    id: 7,
    name: 'Jasper',
    category: 'Marketing AI',
    icon: Bot,
    color: 'from-red-500 to-pink-500',
    description: 'Enterprise-grade AI for marketing teams. Create content at scale with brand voice consistency.',
    website: 'https://jasper.ai',
    features: ['Brand voice', 'Content at scale', 'Team collaboration', 'Templates'],
  },
  {
    id: 8,
    name: 'Synthesia',
    category: 'AI Avatars',
    icon: Wand2,
    color: 'from-teal-500 to-cyan-500',
    description: 'Create professional videos with AI avatars. Perfect for product explainers and training content.',
    website: 'https://synthesia.io',
    features: ['AI presenters', 'Multiple languages', 'Custom avatars', 'Quick videos'],
  },
  {
    id: 9,
    name: 'Descript',
    category: 'Video Editing',
    icon: Code,
    color: 'from-gray-700 to-gray-900',
    description: 'Edit videos by editing text. AI-powered transcription, screen recording, and podcast editing.',
    website: 'https://descript.com',
    features: ['Text-based editing', 'Transcription', 'Screen recording', 'Overdub'],
  },
];

export default function AIToolsPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 mb-6">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-700">AI-Powered</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">AI Tools</span> for eCommerce
            </h1>
            <p className="text-xl text-gray-600">
              Leverage artificial intelligence to create better content, automate tasks, and scale your brand faster
              than ever before.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTools.map((tool) => (
              <StaggerItem key={tool.id}>
                <div className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all overflow-hidden h-full flex flex-col">
                  {/* Header */}
                  <div className={`p-6 bg-gradient-to-br ${tool.color}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <tool.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                        <span className="text-white/80 text-sm">{tool.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-gray-600 mb-4 flex-1">{tool.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tool.features.map((feature, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full"
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
                      className={`flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r ${tool.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all`}
                    >
                      Try {tool.name}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Use AI Effectively</h2>
            <p className="text-gray-600">Tips to get the most out of these AI tools</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Start with Clear Prompts</h3>
              <p className="text-gray-600 text-sm">
                The better your input, the better the output. Be specific about what you want.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Iterate and Refine</h3>
              <p className="text-gray-600 text-sm">
                Don't expect perfection on the first try. Use AI output as a starting point to refine.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Maintain Brand Voice</h3>
              <p className="text-gray-600 text-sm">
                Always review and adjust AI content to match your brand's unique voice and style.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Combine Tools</h3>
              <p className="text-gray-600 text-sm">
                Use multiple AI tools together. Generate images with Midjourney, write copy with ChatGPT.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
