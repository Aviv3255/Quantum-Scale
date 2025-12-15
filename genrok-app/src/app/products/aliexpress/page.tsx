'use client';

import React from 'react';
import { ExternalLink, Store } from 'lucide-react';

interface StoreLink {
  name: string;
  url: string;
}

interface StoreCategories {
  [category: string]: StoreLink[];
}

export default function AliExpress() {
  const stores: StoreCategories = {
    "Men's Accessories": [
      { name: 'Store 1', url: 'https://s.click.aliexpress.com/e/_c4csPNhd' },
      { name: 'Store 2', url: 'https://s.click.aliexpress.com/e/_c4rdHtM7' },
      { name: 'Store 3', url: 'https://s.click.aliexpress.com/e/_c3fqrtsT' },
      { name: 'Store 4', url: 'https://s.click.aliexpress.com/e/_c3rCbdKr' },
      { name: 'Store 5', url: 'https://s.click.aliexpress.com/e/_c3mvBvJh' },
      { name: 'Store 6', url: 'https://s.click.aliexpress.com/e/_c4X1hgRH' },
      { name: 'Store 7', url: 'https://s.click.aliexpress.com/e/_c3MSMJV9' },
    ],
    "Women's Accessories": [
      { name: 'Store 1', url: 'https://s.click.aliexpress.com/e/_c4bUEDtz' },
      { name: 'Store 2', url: 'https://s.click.aliexpress.com/e/_c4VAtfnZ' },
      { name: 'Store 3', url: 'https://s.click.aliexpress.com/e/_c3gVByWb' },
      { name: 'Store 4', url: 'https://s.click.aliexpress.com/e/_c3KzDkB5' },
      { name: 'Store 5', url: 'https://s.click.aliexpress.com/e/_c2JTbFXZ' },
      { name: 'Store 6', url: 'https://s.click.aliexpress.com/e/_c3fEVAbH' },
      { name: 'Store 7', url: 'https://s.click.aliexpress.com/e/_c2JJKDOr' },
      { name: 'Store 8', url: 'https://s.click.aliexpress.com/e/_c2RuEahD' },
    ],
    "Men's Clothing": [
      { name: 'Store 1', url: 'https://s.click.aliexpress.com/e/_c31K3bxh' },
      { name: 'Store 2', url: 'https://s.click.aliexpress.com/e/_c2yJaGVD' },
      { name: 'Store 3', url: 'https://s.click.aliexpress.com/e/_c3AG8VGT' },
      { name: 'Store 4', url: 'https://s.click.aliexpress.com/e/_c3AG8VGT' },
      { name: 'Store 5', url: 'https://s.click.aliexpress.com/e/_c4ELEGuf' },
      { name: 'Store 6', url: 'https://s.click.aliexpress.com/e/_c4P3CK51' },
      { name: 'Store 7', url: 'https://s.click.aliexpress.com/e/_c4P3CK51' },
      { name: 'Store 8', url: 'https://s.click.aliexpress.com/e/_c43FQDKP' },
      { name: 'Store 9', url: 'https://s.click.aliexpress.com/e/_c4Pa5Gl1' },
      { name: 'Store 10', url: 'https://s.click.aliexpress.com/e/_c4e3KSrH' },
      { name: 'Store 11', url: 'https://s.click.aliexpress.com/e/_c3UK6TEX' },
      { name: 'Store 12', url: 'https://s.click.aliexpress.com/e/_c3cmv0R5' },
    ],
    "Women's Clothing": [
      { name: 'Store 1', url: 'https://s.click.aliexpress.com/e/_c3vzdrx1' },
      { name: 'Store 2', url: 'https://s.click.aliexpress.com/e/_c33bd7OJ' },
      { name: 'Store 3', url: 'https://s.click.aliexpress.com/e/_c4B2kJl9' },
      { name: 'Store 4', url: 'https://s.click.aliexpress.com/e/_c2vERtLt' },
      { name: 'Store 5', url: 'https://s.click.aliexpress.com/e/_c4MW016R' },
      { name: 'Store 6', url: 'https://s.click.aliexpress.com/e/_c3H3KwLN' },
      { name: 'Store 7', url: 'https://s.click.aliexpress.com/e/_c4m3qPxD' },
      { name: 'Store 8', url: 'https://s.click.aliexpress.com/e/_c4t8XGNp' },
      { name: 'Store 9', url: 'https://s.click.aliexpress.com/e/_c4BNeKZv' },
      { name: 'Store 10', url: 'https://s.click.aliexpress.com/e/_c2wEZIDh' },
      { name: 'Store 11', url: 'https://s.click.aliexpress.com/e/_c4o473AJ' },
      { name: 'Store 12', url: 'https://s.click.aliexpress.com/e/_c3nTtrld' },
      { name: 'Store 13', url: 'https://s.click.aliexpress.com/e/_c3nwRAb5' },
    ],
    'Home Decor & Garden': [
      { name: 'Store 1', url: 'https://s.click.aliexpress.com/e/_c3rQ1Z4L' },
      { name: 'Store 2', url: 'https://s.click.aliexpress.com/e/_c3VGbJoF' },
      { name: 'Store 3', url: 'https://s.click.aliexpress.com/e/_c3sHsZeX' },
      { name: 'Store 4', url: 'https://s.click.aliexpress.com/e/_c3IY4uJz' },
      { name: 'Store 5', url: 'https://s.click.aliexpress.com/e/_c3DiDmDh' },
    ],
    "Kids' Clothing": [
      { name: 'Store 1', url: 'https://s.click.aliexpress.com/e/_c3VB0zsx' },
      { name: 'Store 2', url: 'https://s.click.aliexpress.com/e/_c4ecl3Xt' },
      { name: 'Store 3', url: 'https://s.click.aliexpress.com/e/_c3Z804I7' },
      { name: 'Store 4', url: 'https://s.click.aliexpress.com/e/_c4WNT9cF' },
      { name: 'Store 5', url: 'https://s.click.aliexpress.com/e/_c32Cay7V' },
      { name: 'Store 6', url: 'https://s.click.aliexpress.com/e/_c3X7sB0b' },
      { name: 'Store 7', url: 'https://s.click.aliexpress.com/e/_c3ikqMj5' },
      { name: 'Store 8', url: 'https://s.click.aliexpress.com/e/_c33YhmYf' },
      { name: 'Store 9', url: 'https://s.click.aliexpress.com/e/_c31TbEgf' },
      { name: 'Store 10', url: 'https://s.click.aliexpress.com/e/_c4n1geLN' },
      { name: 'Store 11', url: 'https://s.click.aliexpress.com/e/_c3pvnxEP' },
    ],
    Toys: [
      { name: 'Store 1', url: 'https://s.click.aliexpress.com/e/_c4lrmYj5' },
      { name: 'Store 2', url: 'https://s.click.aliexpress.com/e/_c3fh6cfN' },
      { name: 'Store 3', url: 'https://s.click.aliexpress.com/e/_c2uifr07' },
      { name: 'Store 4', url: 'https://s.click.aliexpress.com/e/_c4tNjqUB' },
      { name: 'Store 5', url: 'https://s.click.aliexpress.com/e/_c40NXcsJ' },
      { name: 'Store 6', url: 'https://s.click.aliexpress.com/e/_c3pta7jD' },
      { name: 'Store 7', url: 'https://s.click.aliexpress.com/e/_c2JQcYt1' },
      { name: 'Store 8', url: 'https://s.click.aliexpress.com/e/_c3PO9ATV' },
    ],
    Gadgets: [
      { name: 'Store 1', url: 'https://s.click.aliexpress.com/e/_c4dcXNcx' },
      { name: 'Store 2', url: 'https://s.click.aliexpress.com/e/_c34MIWN1' },
      { name: 'Store 3', url: 'https://s.click.aliexpress.com/e/_c2vCHyiF' },
      { name: 'Store 4', url: 'https://s.click.aliexpress.com/e/_c4E4lvxD' },
    ],
  };

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-8">
          <h1
            className="mb-4 text-4xl font-bold"
            style={{
              color: '#1E1E1E',
              fontFamily: 'Poppins, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            Top Recommended AliExpress Stores
          </h1>
          <p className="mb-3 text-lg" style={{ color: '#6B7280' }}>
            Finding a reliable supplier on AliExpress can be a deal breaker - whether it's product
            quality, reliability, or accuracy of photos.
          </p>
          <p style={{ color: '#6B7280' }}>
            After years of experience, we've curated this list of the most trusted stores by niche.
            Each supplier below offers dozens (and sometimes hundreds) of proven products. We highly
            recommend sourcing from these links.
          </p>
        </div>

        <div className="space-y-6">
          {Object.entries(stores).map(([category, storeList]) => (
            <div
              key={category}
              className="rounded-2xl p-6"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              }}
            >
              <h2
                className="mb-4 flex items-center gap-2 text-2xl font-semibold"
                style={{ color: '#1E1E1E' }}
              >
                <Store className="h-6 w-6" style={{ color: '#3B82F6' }} />
                {category}
              </h2>
              <div className="flex flex-wrap gap-3">
                {storeList.map((store, idx) => (
                  <a
                    key={idx}
                    href={store.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full px-4 py-2 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-500"
                    style={{
                      background: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      color: '#1E1E1E',
                    }}
                  >
                    {store.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
