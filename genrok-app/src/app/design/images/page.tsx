'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, Sparkles, Copy, Check, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';

const niches = [
  { id: 'fashion', name: 'Fashion', emoji: '👗' },
  { id: 'kids', name: 'Kids', emoji: '👶' },
  { id: 'homeDecor', name: 'Home Decor', emoji: '🏠' },
  { id: 'sportwear', name: 'Sportwear', emoji: '⚽' },
  { id: 'beauty', name: 'Beauty', emoji: '💄' }
];

const images: Record<string, string[]> = {
  fashion: [
    'https://i.pinimg.com/736x/96/34/d6/9634d6eb6da5d3507c566942c86f1767.jpg',
    'https://i.pinimg.com/736x/b5/07/41/b5074131f220ea813d1bc1cc942f1409.jpg',
    'https://i.pinimg.com/736x/9e/aa/37/9eaa378f6ff05b32f3823a26979ce835.jpg',
    'https://i.pinimg.com/736x/ae/cb/b3/aecbb3776c4b563a751fa5cf90f09896.jpg',
    'https://i.pinimg.com/736x/37/cf/86/37cf865b9a206fc3672ab272907c5768.jpg',
    'https://i.pinimg.com/736x/02/a3/c6/02a3c651da95df5f750ed43d48d276fc.jpg',
    'https://i.pinimg.com/736x/2a/41/c7/2a41c762f5963a6671244a0a4684173e.jpg',
    'https://i.pinimg.com/736x/ff/f5/bb/fff5bb4563c710da85b568e146b04961.jpg',
    'https://i.pinimg.com/736x/15/28/81/15288162f8292b2cfcb8e59027e64526.jpg',
    'https://i.pinimg.com/1200x/c1/80/39/c1803992b5913c8b6e7fb07d9aa4290d.jpg',
    'https://i.pinimg.com/736x/a7/c2/b8/a7c2b8c8a12eea64fd162caebc59d397.jpg',
    'https://i.pinimg.com/736x/5a/1f/a3/5a1fa3333edd80618bb4bc79380d459a.jpg',
    'https://i.pinimg.com/1200x/27/d2/6f/27d26f68d0385fd4610af663571be4f0.jpg',
    'https://i.pinimg.com/736x/ca/94/8c/ca948c59bd8d75fa678a1fd3027f046a.jpg',
    'https://i.pinimg.com/736x/a8/a0/7c/a8a07c2365b318278a90de6dcae46d20.jpg',
    'https://i.pinimg.com/736x/e8/5e/55/e85e555f8abc3114fdb67f8dd07bd35e.jpg',
    'https://i.pinimg.com/1200x/af/1e/96/af1e960a28cf506f1036458b230e90b2.jpg',
    'https://i.pinimg.com/736x/e8/ec/24/e8ec24fe363605ffd6ce04e7b5cd29de.jpg',
    'https://i.pinimg.com/736x/03/c4/42/03c442ba0f84176d5f58b5009890525b.jpg',
    'https://i.pinimg.com/736x/52/0f/cd/520fcd8dae58c640726dcf0f54b5f466.jpg',
    'https://i.pinimg.com/1200x/59/86/86/59868687d1d1da13c764f166701abd9c.jpg',
    'https://i.pinimg.com/736x/c2/92/24/c2922423ed3a544ac4f2072850c67fb4.jpg',
    'https://i.pinimg.com/736x/05/6a/ba/056aba9b2312ed99a57075fa2284890e.jpg',
    'https://i.pinimg.com/736x/c7/1f/9f/c71f9f3d055f2c1876c7e1d3f8f74957.jpg',
    'https://i.pinimg.com/736x/33/86/d4/3386d4986ba9769f4f0dd77947679fc6.jpg',
    'https://i.pinimg.com/736x/fe/71/2a/fe712affd3bde3b3034e0f2c06a28b42.jpg',
    'https://i.pinimg.com/736x/6f/ca/b8/6fcab832df05df9d316afc746ba675ad.jpg',
    'https://i.pinimg.com/736x/07/35/45/073545effdde013315e0d25212fd1970.jpg',
    'https://i.pinimg.com/736x/3e/2c/63/3e2c636199b6aeff3b689c7febd6165b.jpg',
    'https://i.pinimg.com/736x/05/36/7f/05367f534e19245539f9961583b14c53.jpg',
    'https://i.pinimg.com/736x/39/90/60/39906051484fa90c609f56208516e4a8.jpg',
    'https://i.pinimg.com/1200x/6c/5b/ee/6c5beeef696d5813face6c6f16b45b27.jpg',
    'https://i.pinimg.com/736x/b2/27/7b/b2277b6eae1867a678fac9271122f3ba.jpg',
    'https://i.pinimg.com/736x/69/ca/23/69ca23155eb8a2fcc538f81c801a9df2.jpg',
    'https://i.pinimg.com/1200x/e0/85/3c/e0853cabf039edda25577b4b22a789d9.jpg',
    'https://i.pinimg.com/736x/22/64/35/22643551a7ccca116a4e6af03ded35bc.jpg',
    'https://i.pinimg.com/1200x/b1/ff/b4/b1ffb4231d332f6f98dc461f15519ac9.jpg',
    'https://i.pinimg.com/736x/92/39/31/923931d9967a6e8d618545475ef1f175.jpg',
    'https://i.pinimg.com/1200x/dd/64/63/dd6463fb011877d38f5876ea92581339.jpg',
    'https://i.pinimg.com/736x/d1/a3/6c/d1a36ce136f809627a89e0ccd72e3025.jpg'
  ],
  kids: [
    'https://i.pinimg.com/736x/75/d5/92/75d59206719cfec00710435626011a9b.jpg',
    'https://i.pinimg.com/1200x/d4/c1/b8/d4c1b8f422add97a0f3ae73734af308f.jpg',
    'https://i.pinimg.com/1200x/50/43/5a/50435a0b126dad6b082485901afbb2ad.jpg',
    'https://i.pinimg.com/736x/6c/44/07/6c4407981c2bb24a7807cc12824f0779.jpg',
    'https://i.pinimg.com/736x/c2/d6/72/c2d672f83a73f1d71ce9c9690cd4e56d.jpg',
    'https://i.pinimg.com/1200x/4e/93/11/4e931163fd40b9cd6a64a1117eb8f005.jpg',
    'https://i.pinimg.com/736x/1e/7f/e0/1e7fe0fc8e39b31808d4b2a2d770a49a.jpg',
    'https://i.pinimg.com/1200x/06/a3/eb/06a3ebb83d58fffb11d5f0831ed9ba38.jpg',
    'https://i.pinimg.com/736x/55/d0/d3/55d0d3b54478901eecc878fc8ee132df.jpg',
    'https://i.pinimg.com/736x/a9/8d/a7/a98da7c3830730680035f609eb851853.jpg',
    'https://i.pinimg.com/736x/bb/20/79/bb207915b9bc0cf7b89ca51e73af16f5.jpg',
    'https://i.pinimg.com//1200x/1f/a2/03/1fa20344cf853e86afdac3b2093425ca.jpg',
    'https://i.pinimg.com/736x/56/03/34/560334845fe29adb8267ecffddd63ac0.jpg',
    'https://i.pinimg.com/736x/52/c9/d0/52c9d0e56c69d4fbb7429e76df2ea47f.jpg',
    'https://i.pinimg.com/736x/bd/6c/8f/bd6c8f45c1bc760e22359970b3b2e384.jpg',
    'https://i.pinimg.com/736x/94/e2/cc/94e2cc0953cfd054bb543192f3f46ae4.jpg',
    'https://i.pinimg.com/1200x/c8/8e/8b/c88e8b3704a93d19401739e5a380c768.jpg',
    'https://i.pinimg.com/736x/34/b4/3c/34b43c393abcebe490d9306e5b34e043.jpg',
    'https://i.pinimg.com/736x/7c/9d/3f/7c9d3f823e1ba185a169155964f3fec7.jpg',
    'https://i.pinimg.com/736x/b0/49/d5/b049d525e77115da86e18be910a847fa.jpg'
  ],
  homeDecor: [
    'https://i.pinimg.com/736x/47/81/9b/47819bb9253855136a98f620ab71e4eb.jpg',
    'https://i.pinimg.com/736x/98/18/99/9818994c9fba908dfc491c3bd043d743.jpg',
    'https://i.pinimg.com/736x/f5/6d/2f/f56d2fc27a9be18ed1238d3614d97370.jpg',
    'https://i.pinimg.com/1200x/b9/82/38/b98238f2f77ba463bc4801ad061b27fe.jpg',
    'https://i.pinimg.com/736x/56/6c/b8/566cb89ba04c9ad2f327a9b042d68dfc.jpg',
    'https://i.pinimg.com/1200x/56/c7/cd/56c7cd4e65ef1ac469975f7b2ad257ca.jpg',
    'https://i.pinimg.com/736x/0a/71/a2/0a71a2759661213e3d54e3cbfc734255.jpg',
    'https://i.pinimg.com/1200x/09/91/e6/0991e6cbbaf3a1c4f28085415586c305.jpg',
    'https://i.pinimg.com/1200x/f9/be/38/f9be381caeb482fd5827a13a2fbf4b46.jpg',
    'https://i.pinimg.com/1200x/68/4c/e0/684ce072533b261971ca55bd01f85e51.jpg',
    'https://i.pinimg.com/1200x/6f/76/f2/6f76f2c1f2d70d78b2c3e6b220b0da6c.jpg',
    'https://i.pinimg.com/1200x/33/b6/4a/33b64a13e42113d612a9dc78d575550b.jpg',
    'https://i.pinimg.com/736x/fd/06/ae/fd06ae3e8edf3953ca3d35eb3f3f081e.jpg',
    'https://i.pinimg.com/1200x/36/eb/e2/36ebe2df6da4c95a8b188ed1f60d081f.jpg',
    'https://i.pinimg.com/736x/ea/34/44/ea344464902bd124f1c4f32574c10cfe.jpg',
    'https://i.pinimg.com/1200x/b9/5e/6c/b95e6c38b010ed90876ae87b32b808c9.jpg',
    'https://i.pinimg.com/1200x/c2/41/22/c241229a47fd4037e4cad461dd5739c7.jpg',
    'https://i.pinimg.com/736x/9f/69/38/9f693847c807e9a8a6f167ca54e45217.jpg',
    'https://i.pinimg.com/1200x/b6/1e/6e/b61e6e0d1e6c8ddff16a6af3e7b862fc.jpg',
    'https://i.pinimg.com/1200x/af/f8/57/aff85715c46d9b3272e9f2653bdec0f1.jpg'
  ],
  sportwear: [
    'https://i.pinimg.com/1200x/e1/ef/2d/e1ef2dabe9d2ef09807cabfb34f0e6bb.jpg',
    'https://i.pinimg.com/1200x/2d/f1/74/2df174c21bbc8db6cd5ce2d0b96b810e.jpg',
    'https://i.pinimg.com/1200x/14/76/58/1476586b948e8724bf2d706daeaf302d.jpg',
    'https://i.pinimg.com/1200x/c5/67/b1/c567b12eb152eb3c919bb08db4db9911.jpg',
    'https://i.pinimg.com/1200x/ba/9a/61/ba9a61d1c5d154798acda66de7ff404c.jpg',
    'https://i.pinimg.com/1200x/5f/30/78/5f30786f14028a0acc4fda573aa193a9.jpg',
    'https://i.pinimg.com/1200x/e1/aa/b7/e1aab79b7f7b40ac66c30daa54dfd382.jpg',
    'https://i.pinimg.com/1200x/97/fc/5c/97fc5cf66f9d6756e90ef6fdc07895ab.jpg',
    'https://i.pinimg.com/736x/bb/0f/cf/bb0fcf06776bfd80867f308e6c15f547.jpg',
    'https://i.pinimg.com/736x/ba/e4/34/bae43408a64df1639e0b8414e2720c41.jpg',
    'https://i.pinimg.com/736x/dc/e7/f7/dce7f7cfc25410af6dac67c2b6b7523b.jpg',
    'https://i.pinimg.com/1200x/08/37/1b/08371b769351723a549368f9ea81842e.jpg',
    'https://i.pinimg.com/1200x/27/ea/b6/27eab6c4e116ab165ab7040475efa1f6.jpg',
    'https://i.pinimg.com/1200x/d5/07/21/d50721f3736b63a0cef295a865177876.jpg',
    'https://i.pinimg.com/736x/9a/28/10/9a2810ce61bc880f804c250af37e15d6.jpg',
    'https://i.pinimg.com/1200x/22/84/35/228435ad484ab230f3098fe4ab44e8e5.jpg',
    'https://i.pinimg.com/736x/06/b1/12/06b11296e1e4c1be6d7fd38abad6c52b.jpg',
    'https://i.pinimg.com/736x/32/a3/ab/32a3ab87f3177c36448fc78e43476d04.jpg',
    'https://i.pinimg.com/736x/df/60/a3/df60a320e6dc29112f67de91f80302c5.jpg',
    'https://i.pinimg.com/736x/a9/4a/d2/a94ad2e27134f358f2b5d66514b69287.jpg'
  ],
  beauty: [
    'https://i.pinimg.com/736x/e4/4a/3e/e44a3e48e72e61345ae0d050eb900a16.jpg',
    'https://i.pinimg.com/736x/76/6e/bd/766ebd5734ea5d2110bf08bda5180a39.jpg',
    'https://i.pinimg.com/736x/f5/a8/f4/f5a8f4f570a022dbd25793cccf08d899.jpg',
    'https://i.pinimg.com/736x/6d/01/34/6d0134316bb4afeb24197a776283e020.jpg',
    'https://i.pinimg.com/736x/79/b0/b8/79b0b8e2b6c48ef389a313562560eb89.jpg',
    'https://i.pinimg.com/736x/9f/80/f6/9f80f693697217e02bdada230b68a686.jpg',
    'https://i.pinimg.com/1200x/0b/b2/9e/0bb29ed54c5e9b04f43f260eafee4765.jpg',
    'https://i.pinimg.com/736x/b2/02/42/b2024260c1edcc52e46ea858bad58aac.jpg',
    'https://i.pinimg.com/1200x/f6/a7/3d/f6a73d46b17fdbcd8f7efef4b04a3dfd.jpg',
    'https://i.pinimg.com/1200x/5f/d2/49/5fd2495f7665914ea19a24eaf0c323a4.jpg',
    'https://i.pinimg.com/736x/1d/01/af/1d01af48f199c5f75e33abd8b161d56b.jpg',
    'https://i.pinimg.com/1200x/ad/30/52/ad3052dba806447e446b5722a37f4b6a.jpg',
    'https://i.pinimg.com/1200x/4c/5a/17/4c5a179600244250d4c7ef09c4633dbe.jpg',
    'https://i.pinimg.com/1200x/69/e1/e8/69e1e8538d53d0a3acaa350afd3ea334.jpg',
    'https://i.pinimg.com/736x/0d/da/8f/0dda8f159cf6379d846c14f8745b5c79.jpg',
    'https://i.pinimg.com/736x/64/9a/22/649a2288ab5ffd55629f25fe3eeba31e.jpg',
    'https://i.pinimg.com/1200x/52/9d/ce/529dcef9fb09292f0de374c9a2e9b9e7.jpg',
    'https://i.pinimg.com/1200x/b4/45/23/b44523eec6e0549bc6ad68c6e165ede8.jpg',
    'https://i.pinimg.com/736x/03/01/39/03013933c83fa253b438a41da55c67b1.jpg',
    'https://i.pinimg.com/736x/2b/51/85/2b518563b71399ab283e3839c9665646.jpg'
  ]
};

export default function ImageInspirationPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [activeNiche, setActiveNiche] = useState('fashion');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleCopyImage = async (imageUrl: string) => {
    try {
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(imageUrl)}`;
      const response = await fetch(proxyUrl);
      const blob = await response.blob();

      const img = new window.Image();
      const imageLoadPromise = new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      img.src = URL.createObjectURL(blob);
      await imageLoadPromise;

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      const finalBlob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), 'image/png', 1.0);
      });

      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': finalBlob
        })
      ]);

      URL.revokeObjectURL(img.src);
      setCopiedId(imageUrl);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
      alert('Unable to copy image. Try downloading it manually or use a different browser.');
    }
  };

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
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
               style={{ background: '#F3E8FF', border: '1px solid #E9D5FF' }}>
            <Sparkles className="w-4 h-4" style={{ color: '#8B5CF6' }} />
            <span className="text-sm font-semibold" style={{ color: '#8B5CF6' }}>IMAGE LIBRARY</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{
            color: '#1E1E1E',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            Image <span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif', fontWeight: '700', letterSpacing: '0.05em' }}>Inspiration</span>
          </h1>

          <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#6B7280' }}>
            A brand destined to be worth a billion dollars must act like a billion-dollar brand, and look like one-from day one. We&apos;ve curated a library of thousands of visuals that will elevate your brand&apos;s appearance to an entirely different level.
          </p>

          {/* Important Notice */}
          <div className="p-5 md:p-6 rounded-xl mb-6" style={{
            background: '#FEF3C7',
            border: '1px solid #FDE68A'
          }}>
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
              <h3 className="font-bold text-base md:text-lg" style={{ color: '#D97706' }}>
                Important!
              </h3>
            </div>
            <div className="text-sm md:text-base leading-relaxed space-y-3" style={{ color: '#78350F' }}>
              <p>
                These images are <strong>NOT for commercial use</strong>—they are for inspiration only. If you want to create a similar image in the same style, use ChatGPT with the following prompt:
              </p>
              <div className="p-4 rounded-lg text-sm" style={{
                background: '#FFFBEB',
                borderLeft: '3px solid #F59E0B',
                fontFamily: 'monospace',
                color: '#78350F'
              }}>
                &quot;Create the exact same image for me, but without any text—remove all text or any small branding that appears. Make sure the model&apos;s face is not 1:1 identical. Other than that, do everything exactly the same, and keep the image in very high resolution.&quot;
              </div>
            </div>
          </div>

          {/* Course CTA */}
          <a
            href="https://quantum-scale.co/products/the-subconscious-switch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 group hover:shadow-lg"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
          >
            <Sparkles className="w-5 h-5" style={{ color: '#3B82F6' }} />
            <span className="font-semibold" style={{ color: '#1E1E1E' }}>
              Unlock the Full Power of Design Psychology
            </span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: '#3B82F6' }} />
          </a>
        </div>

        {/* Niche Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {niches.map(niche => (
            <button
              key={niche.id}
              onClick={() => setActiveNiche(niche.id)}
              className="px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300"
              style={{
                background: activeNiche === niche.id ? '#EFF6FF' : '#FFFFFF',
                border: activeNiche === niche.id ? '1px solid #3B82F6' : '1px solid #E5E7EB',
                color: activeNiche === niche.id ? '#3B82F6' : '#6B7280',
                boxShadow: activeNiche === niche.id ? '0 2px 8px rgba(59, 130, 246, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <span className="mr-2">{niche.emoji}</span>
              {niche.name}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {images[activeNiche]?.map((imageUrl, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden mb-2 break-inside-avoid transition-all duration-300 hover:scale-[1.02]"
              style={{ background: '#FFFFFF' }}
            >
              <img
                src={imageUrl}
                alt={`Inspiration ${idx + 1}`}
                className="w-full h-auto object-cover rounded-lg"
                style={{ display: 'block' }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

              {/* Copy Button */}
              <button
                onClick={() => handleCopyImage(imageUrl)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                style={{
                  background: copiedId === imageUrl ? '#DCFCE7' : '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                {copiedId === imageUrl ? (
                  <Check className="w-5 h-5" style={{ color: '#16A34A' }} />
                ) : (
                  <Copy className="w-5 h-5" style={{ color: '#3B82F6' }} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
