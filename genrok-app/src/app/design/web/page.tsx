'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, Eye, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

const websites = [
  {
    name: 'TRIARE',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/10/68f8b301e261b364943860.jpg',
    url: 'https://www.bob-snail.com/gb/'
  },
  {
    name: 'P&CO',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/09/68cd1f1a0dbf8867744743.png',
    url: 'https://pand.co/'
  },
  {
    name: 'Furnistor',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/08/68a58aa342c84375328054.jpg',
    url: 'https://sites.kaliumtheme.com/elementor/furniture/'
  },
  {
    name: 'MWH',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/08/68a48d9b8237f880847783.jpg',
    url: 'https://www.mwhwear.com/'
  },
  {
    name: 'Oliver Cabell',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/08/689b483758b70823340812.jpg',
    url: 'https://olivercabell.com/'
  },
  {
    name: 'Simple Promise',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/07/68834e1f0b8eb657752989.jpg',
    url: 'https://simplepromise.com/'
  },
  {
    name: 'House of Spoils',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/07/687f666a59170744415000.png',
    url: 'https://houseofspoils.com/'
  },
  {
    name: 'Elle & Riley',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/06/6862530d41ee3054287808.jpg',
    url: 'https://elleandriley.com/'
  },
  {
    name: 'Rocksbox',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/06/684ada9662995242094262.png',
    url: 'https://www.rocksbox.com/'
  },
  {
    name: 'Royce Lingerie',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/06/683eccd2dee97620751745.jpg',
    url: 'https://www.royce-lingerie.co.uk/'
  },
  {
    name: 'Wonder Wellness',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/05/6834708974258264606851.jpg',
    url: 'https://wonder-theme-wellness.myshopify.com/'
  },
  {
    name: 'AEVI',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/05/682f1c96bd6fa687138809.jpg',
    url: 'https://liveaevi.com/'
  },
  {
    name: 'Tanrevel',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/04/68092950cda2e297797633.jpg',
    url: 'https://tanrevel.com/'
  },
  {
    name: 'Consider it Flowers',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/04/680bb7da0cf9a977427720.jpg',
    url: 'https://consideritflowers.com/'
  },
  {
    name: 'Collider',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/04/6810b0a773e21198676723.png',
    url: 'https://www.drinkcollider.com/'
  },
  {
    name: 'Oura Ring',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/04/68028f2197850993875256.jpg',
    url: 'https://ouraring.com/'
  },
  {
    name: 'Ellis Brigham',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/04/67ebc480ed071469933192.jpg',
    url: 'https://www.ellis-brigham.com/'
  },
  {
    name: 'Blue Banana',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/04/67ec0191ca24e052276623.png',
    url: 'https://www.bluebananabrand.com/'
  },
  {
    name: 'CHE',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_11.38.03_8a103a6e.jpg?v=1761471565',
    url: 'https://chestudios.co.uk/'
  },
  {
    name: 'Innerwork',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_11.41.13_1bcf0a7c.jpg?v=1761471711',
    url: 'https://innerworkhealth.com/'
  },
  {
    name: 'Genevieve Sweeney',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_11.42.37_6a334cee.jpg?v=1761471775',
    url: 'https://genevievesweeney.com/'
  },
  {
    name: 'Casablanca Paris',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_11.45.32_34ecbf1e.jpg?v=1761471952',
    url: 'https://casablancaparis.com/'
  },
  {
    name: 'Steady Rack',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_11.47.41_b9d5a96b.jpg?v=1761472074',
    url: 'https://www.steadyrack.com/'
  },
  {
    name: 'Glenmorangie',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/02/67a543b776462536396193.jpg',
    url: 'https://www.glenmorangie.com/'
  },
  {
    name: 'Noka',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_11.50.48_65232f48.jpg?v=1761472267',
    url: 'https://www.nokaorganics.com/'
  },
  {
    name: 'Chantelle',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/01/678e3442ce2f9970529980.png',
    url: 'https://chantelle.com/fr'
  },
  {
    name: 'TRT Concept',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_11.53.17_f9aa759b.jpg?v=1761472421',
    url: 'https://sg.therestyletrait.com/'
  },
  {
    name: 'Osklen',
    image: 'https://assets.awwwards.com/awards/media/cache/thumb_880_660/submissions/2025/12/67607d16f3de0768569941.png',
    url: 'https://www.osklen.com.br/'
  },
  {
    name: 'Polaroid',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_12.00.03_e2988b34.jpg?v=1761472824',
    url: 'https://www.polaroid.com/en_il'
  },
  {
    name: 'Freaks of Nature',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_12.02.50_baf48fef.jpg?v=1761472990',
    url: 'https://freaksofnature.com/'
  },
  {
    name: 'Pangaia',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_12.04.25_3ef7aa5b.jpg?v=1761473081',
    url: 'https://pangaia.com/'
  },
  {
    name: 'Relode',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_12.05.51_601ccbe7.jpg?v=1761473173',
    url: 'https://relode.se/'
  },
  {
    name: 'Halo',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_12.07.53_8e5e1c3f.jpg?v=1761473289',
    url: 'https://www.newlinehalo.com/'
  },
  {
    name: 'Powersheds',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_12.27.53_6341213d.jpg?v=1761474536',
    url: 'https://www.powersheds.com/'
  },
  {
    name: 'Elvine',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_12.33.09_69180178.jpg?v=1761474840',
    url: 'https://www.elvineclothing.com/'
  },
  {
    name: 'Civil Pours',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_12.35.21_554e2935.jpg?v=1761474938',
    url: 'https://civilpours.com/'
  },
  {
    name: 'Shibumi',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_12.38.26_9514c321.jpg?v=1761475122',
    url: 'https://shibumishade.com/'
  },
  {
    name: 'AG1',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_12.39.36_aa3acc5b.jpg?v=1761475192',
    url: 'https://drinkag1.com/en-eu'
  },
  {
    name: 'Warby Parker',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_12.40.59_5dc100da.jpg?v=1761475273',
    url: 'https://www.warbyparker.com/'
  },
  {
    name: 'Glossier',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_12.42.23_973b4981.jpg?v=1761475363',
    url: 'https://www.glossier.com/en-il'
  },
  {
    name: 'Oliver Peoples',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_12.44.59_ed902c0d.jpg?v=1761475517',
    url: 'https://www.oliverpeoples.com/usa/roger-federer-eyewear'
  },
  {
    name: 'Skims',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_12.46.34_4fcc646d.jpg?v=1761475621',
    url: 'https://skims.com/en-il'
  },
  {
    name: 'Gymshark',
    image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/WhatsApp_Image_2025-10-26_at_12.48.05_74985816.jpg?v=1761475707',
    url: 'https://row.gymshark.com/'
  }
];

export default function WebInspirationPage() {
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
        <div className="animate-spin w-8 h-8 border-2 border-[var(--accent-gold)] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
               style={{ background: '#F3E8FF', border: '1px solid #E9D5FF' }}>
            <Sparkles className="w-4 h-4" style={{ color: '#8B5CF6' }} />
            <span className="text-sm font-semibold" style={{ color: '#8B5CF6' }}>DESIGN INSPIRATION</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-3 md:mb-4" style={{
            color: '#1E1E1E',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            Need Some <span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif', fontWeight: '700', letterSpacing: '0.05em' }}>Inspiration</span>?
          </h1>
          <p className="text-base md:text-lg" style={{ color: '#6B7280' }}>
            Award-winning eCommerce designs to inspire your next project
          </p>
        </div>

        {/* Websites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {websites.map((site, idx) => (
            <a
              key={idx}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden transition-all duration-300 rounded-2xl hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src={site.image}
                  alt={site.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-6 py-3 rounded-xl"
                       style={{
                         background: '#FFFFFF',
                         boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                       }}>
                    <Eye className="w-5 h-5" style={{ color: '#3B82F6' }} />
                    <span className="font-semibold" style={{ color: '#1E1E1E' }}>View Site</span>
                    <ExternalLink className="w-4 h-4" style={{ color: '#3B82F6' }} />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg mb-1" style={{ color: '#1E1E1E' }}>
                  {site.name}
                </h3>
                <p className="text-sm flex items-center gap-1" style={{ color: '#6B7280' }}>
                  <ExternalLink className="w-3 h-3" />
                  {new URL(site.url).hostname}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
