'use client';

import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import DashboardLayout from '@/components/layout/DashboardLayout';

// AliExpress affiliate products
interface AliExpressProduct {
  id: number;
  name: string;
  image: string;
  affiliateLink: string;
}

const aliExpressProducts: AliExpressProduct[] = [
  {
    id: 1,
    name: 'Product 1',
    image: 'https://ae01.alicdn.com/kf/S5566e7d96d4e4a6186701a2c2ca76fb1B.jpg_350x350.jpg',
    affiliateLink: 'https://s.click.aliexpress.com/e/_c4m7F9T9',
  },
];

export default function SellTheseProductsPage() {
  return (
    <DashboardLayout>
      <div className="min-h-screen" style={{ background: '#FFFFFF', margin: '-40px -48px', padding: '48px' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-3">
              Sell These Products
            </h1>
            <p className="text-[var(--text-muted)] text-lg">
              Handpicked winning products with high profit potential. Click to view on AliExpress.
            </p>
          </div>

          {/* Products Grid - 4 per row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {aliExpressProducts.map((product) => (
              <div key={product.id} className="flex flex-col">
                {/* Product Image */}
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-square rounded-t-lg overflow-hidden bg-[#f5f5f5] transition-all duration-200 hover:shadow-lg"
                  style={{ border: '1px solid #e5e5e5', borderBottom: 'none' }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </a>

                {/* Button Container */}
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-b-lg font-semibold text-sm text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: '#FF6600', border: '1px solid #FF6600' }}
                >
                  <ExternalLink size={16} />
                  See on AliExpress
                </a>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {aliExpressProducts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                No products yet
              </h3>
              <p className="text-[var(--text-muted)]">
                Products will be added soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
