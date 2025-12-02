
import React, { useState } from 'react';
import { X, ExternalLink, Brain, Palette, TrendingUp, Cog } from 'lucide-react';

export default function AITools() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { name: 'Market Intelligence', icon: Brain },
    { name: 'Creative Power', icon: Palette },
    { name: 'Conversion & Growth', icon: TrendingUp },
    { name: 'Automation & Systems', icon: Cog }
  ];

  const tools = [
    {
      id: 1,
      name: 'ShopHunter',
      category: 'Market Intelligence',
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-09T175924.439.png?v=1760021979',
      description: 'ShopHunter is the private research engine used by top Shopify sellers. It continuously scans tens of thousands of Shopify stores in real time and reveals exactly which products are breaking out, the selling prices, and estimated revenue by brand.',
      videos: [
        'https://cdn.shopify.com/videos/c/o/v/5ce5221afee646b28df4f12e1d705de0.mp4',
        'https://cdn.shopify.com/videos/c/o/v/752f37d5f4a845e3b1b8cb7415ba66d9.mp4',
        'https://cdn.shopify.com/videos/c/o/v/d43538d1b1384270ba5a8c6d889305b1.mp4'
      ],
      website: 'https://www.shophunter.io?afmc=2yk'
    },
    {
      id: 2,
      name: 'AdCreative.ai',
      category: 'Creative Power',
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-09T234055.130.png?v=1760042538',
      description: 'AdCreative.ai fundamentally upgrades how you produce ads. In seconds, it generates dozens of high-converting creatives - premium layouts, persuasive copy, and on-the-fly performance insights.',
      videos: [
        'https://cdn.shopify.com/videos/c/o/v/c761a0b01ace43cca5eed6aa6430f079.mp4',
        'https://cdn.shopify.com/videos/c/o/v/dc892b79122d4b6cbf3cbcedfc93fd2f.mp4'
      ],
      website: 'https://www.adcreative.ai/'
    },
    {
      id: 3,
      name: 'Triple Whale',
      category: 'Conversion & Growth',
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-09T234106.192.png?v=1760042538',
      description: 'Triple Whale is the most advanced analytics OS for eCommerce - uniting Meta, Google, and Shopify data into a single source of truth. Its AI layer highlights what truly drives profit versus what silently burns budget.',
      videos: [
        'https://cdn.shopify.com/videos/c/o/v/ae0f32ec5f0648cbba08158eef38dd8c.mp4',
        'https://cdn.shopify.com/videos/c/o/v/2289999d68154a869a4d386c776c0787.mp4',
        'https://cdn.shopify.com/videos/c/o/v/3302fe2456df4102bf4dbc140517e2cb.mp4'
      ],
      website: 'https://www.triplewhale.com/'
    },
    {
      id: 4,
      name: 'Creatify',
      category: 'Creative Power',
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-09T234113.781.png?v=1760042539',
      description: 'Creatify lets you produce conversion-ready ad videos in minutes - no cameras, crews, or actors. It auto-generates authentic UGC for TikTok, Meta, and Reels, complete with human presenters.',
      videos: [
        'https://cdn.shopify.com/videos/c/o/v/9a9be88fb87f4f5998fabbb8c33d9f70.mp4',
        'https://cdn.shopify.com/videos/c/o/v/c0cd59331c184bbb83e7b20977a082e9.mp4',
        'https://cdn.shopify.com/videos/c/o/v/8d3764a3f822495f8e5f75e26e126faf.mp4'
      ],
      website: 'https://creatify.ai/?via=quantum-scale'
    },
    {
      id: 5,
      name: 'HeyGen',
      category: 'Creative Power',
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-09T234120.055.png?v=1760042540',
      description: 'HeyGen transforms any script into a full video featuring lifelike presenters in the language of your choice. From how-to tutorials and product explainers to high-trust ads.',
      videos: [
        'https://cdn.shopify.com/videos/c/o/v/23f70496bdba4cffb686edfe53e12d53.mp4',
        'https://cdn.shopify.com/videos/c/o/v/b99632a66fb64f76a85a5dc4c6299402.mp4',
        'https://cdn.shopify.com/videos/c/o/v/db8e79a1a44544bb96191889e115bace.mp4',
        'https://cdn.shopify.com/videos/c/o/v/5299bc6b7eac4221a7377cd9b2b0f9d0.mp4'
      ],
      website: 'https://www.heygen.com/'
    },
    {
      id: 6,
      name: 'WinningHunter',
      category: 'Market Intelligence',
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-09T234126.367.png?v=1760042538',
      description: 'WinningHunter is your personal scout for breakout products. It monitors AliExpress, TikTok, and Shopify in real time, detects emerging trends, and scores opportunities.',
      videos: [
        'https://cdn.shopify.com/videos/c/o/v/a5f930501c0a445ebb52c3e1fc2be840.mp4',
        'https://cdn.shopify.com/videos/c/o/v/543ca5fe6ade4284b0beb2dc081cdd10.mp4',
        'https://cdn.shopify.com/videos/c/o/v/978a668443d6494a805c97ebd776227f.mp4',
        'https://cdn.shopify.com/videos/c/o/v/8ccbde788eeb4326ba1639cd0cf87bef.mp4'
      ],
      website: 'https://winninghunter.com/?ref=quantumscale'
    },
    {
      id: 7,
      name: 'Claid.ai',
      category: 'Creative Power',
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-09T234138.469.png?v=1760042538',
      description: 'Claid.ai is the ultimate visual upgrade for product imagery. With a single click it fixes lighting, sharpness, backgrounds, and composition - instantly elevating your store and ads.',
      videos: [
        'https://cdn.shopify.com/videos/c/o/v/6ca4a57656f54e23ad06994848ab9bbc.mp4',
        'https://cdn.shopify.com/videos/c/o/v/88befa4ed30645b18bbd0adce0231544.mp4',
        'https://cdn.shopify.com/videos/c/o/v/6a5e0b2405694d66a804b613643b0e6d.mp4'
      ],
      website: 'https://claid.ai?via=quantum-scale'
    },
    {
      id: 8,
      name: 'Hoppy Copy',
      category: 'Conversion & Growth',
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-09T234146.317.png?v=1760042539',
      description: 'Hoppy Copy is an AI copywriter engineered for persuasion and widely regarded as the best AI copywriter in the world. It crafts sales pages, emails, and ads grounded in buyer psychology - trust, urgency, social proof, and value framing.',
      videos: [
        'https://cdn.shopify.com/videos/c/o/v/871fadb834fc4c848da9074cf28.mp4',
        'https://cdn.shopify.com/videos/c/o/v/b224b7517b28422db7757defe816e573.mp4'
      ],
      website: 'https://www.hoppycopy.co/?via=Quantum'
    },
    {
      id: 9,
      name: 'ElevenLabs',
      category: 'Automation & Systems',
      logo: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/2025-10-09T234153.185.png?v=1760042538',
      description: 'ElevenLabs converts any script into a studio-quality human voice. From performance ads and UGC to courses and brand narrations.',
      videos: [
        'https://cdn.shopify.com/videos/c/o/v/d255848685714e45932ca0e912069409.mp4',
        'https://cdn.shopify.com/videos/c/o/v/59444b6ef2fd4cef9b44e9b9e63818f1.mp4',
        'https://cdn.shopify.com/videos/c/o/v/8faed16352c84129b87d421f6fd40594.mp4'
      ],
      website: 'https://try.elevenlabs.io/np03gr8cgf3u'
    }
  ];

  const filteredTools = selectedCategories.length === 0 
    ? tools 
    : tools.filter(t => selectedCategories.includes(t.category));

  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: '#F9FAFB' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-3" style={{ 
            color: '#1E1E1E',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            AI Tools for eCommerce
          </h1>
          <p className="text-sm md:text-base" style={{ color: '#6B7280' }}>
            Premium AI tools to automate and scale your business
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-6 md:mb-8 flex flex-wrap gap-2 md:gap-3">
          {categories.map(cat => {
            const isActive = selectedCategories.includes(cat.name);
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => toggleCategory(cat.name)}
                className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl transition-all font-medium text-sm md:text-base"
                style={{
                  background: isActive ? 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#6B7280',
                  border: '1px solid ' + (isActive ? '#3B82F6' : '#E5E7EB'),
                  boxShadow: isActive ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
          {selectedCategories.length > 0 && (
            <button
              onClick={() => setSelectedCategories([])}
              className="px-4 md:px-5 py-2.5 md:py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                color: '#6B7280',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Tool Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
          {filteredTools.map(tool => (
            <div
              key={tool.id}
              onClick={() => setSelectedTool(tool)}
              className="cursor-pointer transition-all duration-300 group rounded-2xl overflow-hidden relative"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
              }}
            >
              {/* Category Badge */}
              <div className="absolute left-2 top-2 md:left-4 md:top-4 z-10">
                <div className="px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold"
                     style={{ background: '#EFF6FF', color: '#3B82F6' }}>
                  {tool.category}
                </div>
              </div>

              {/* Logo - Landscape 1:1.2 (wider) */}
              <div style={{ 
                width: '100%',
                aspectRatio: '1.2/1',
                overflow: 'hidden',
                background: '#F9FAFB',
                borderRadius: '16px 16px 0 0' // Match outer border radius
              }}>
                <img 
                  src={tool.logo} 
                  alt={tool.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <div className="p-2 md:p-4">
                <h3 className="font-semibold text-xs md:text-base lg:text-lg line-clamp-2" style={{ color: '#1E1E1E' }}>
                  {tool.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Modal - Compact Size */}
        {selectedTool && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSelectedTool(null)}
          >
            <div 
              className="max-w-xl md:max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl relative"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                background: '#FFFFFF',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
              }}
            >
              <button
                onClick={() => setSelectedTool(null)}
                className="absolute top-4 right-4 p-2 rounded-full transition-all z-10 text-gray-700 hover:bg-gray-100"
                style={{ background: 'rgba(255,255,255,0.7)' }} // Slightly opaque white background for visibility
              >
                <X className="w-4 h-4" />
              </button>

              {/* Tool Image - Compact landscape */}
              <div style={{ 
                width: '100%',
                aspectRatio: '1.2/1',
                maxHeight: '280px', // Adjusted to be slightly larger for better viewing
                overflow: 'hidden',
                background: '#F9FAFB',
                borderRadius: '16px 16px 0 0'
              }}>
                <img 
                  src={selectedTool.logo} 
                  alt={selectedTool.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3" style={{ color: '#1E1E1E' }}>
                  {selectedTool.name}
                </h2>

                <p className="text-sm md:text-base leading-relaxed mb-4 md:mb-5" style={{ color: '#6B7280' }}>
                  {selectedTool.description}
                </p>

                {/* Video Gallery */}
                {selectedTool.videos && selectedTool.videos.length > 0 && (
                  <div className="mb-4 md:mb-5">
                    <h3 className="font-semibold mb-2 md:mb-3 text-xs md:text-sm" style={{ color: '#1E1E1E' }}>Demo Videos</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTool.videos.map((video, idx) => (
                        <video
                          key={idx}
                          src={video}
                          controls
                          playsInline
                          className="rounded-lg object-cover bg-black"
                          style={{ aspectRatio: '9/16', width: '100px', maxWidth: '120px' }} // Adjusted width
                        />
                      ))}
                    </div>
                  </div>
                )}

                <a
                  href={selectedTool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium md:font-semibold transition-all text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
