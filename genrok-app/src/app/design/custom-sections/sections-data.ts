import { Section } from './types';

// Helper to generate unique IDs for scoped CSS
const uid = (prefix: string) => `qs-${prefix}`;

const baseSections: Section[] = [
  // ========== HERO SECTIONS (1-12) ==========
  {
    id: 'hero-1',
    name: 'Hero - Split Content',
    category: 'Hero',
    description: 'Clean split layout with image and text side by side',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Elevate Your Everyday' },
      { id: 'subheadline', label: 'Subheadline', type: 'textarea', defaultValue: 'Discover our premium collection designed for modern living. Quality craftsmanship meets timeless design.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Shop Now' },
      { id: 'buttonUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
      { id: 'image', label: 'Image URL', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#ffffff' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#1a1a1a' },
      { id: 'buttonBg', label: 'Button Color', type: 'color', defaultValue: '#000000' },
    ],
    generateHtml: (v) => `<div class="${uid('hero1')}" style="background:${v.bgColor};padding:80px 40px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('hero1')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hero1')}-wrap { display: flex; align-items: center; gap: 60px; max-width: 1200px; margin: 0 auto; }
    .${uid('hero1')}-content { flex: 1; }
    .${uid('hero1')}-img { flex: 1; }
    .${uid('hero1')}-img img { width: 100%; height: auto; border-radius: 12px; }
    .${uid('hero1')} h1 { font-size: 48px; font-weight: 700; line-height: 1.1; margin-bottom: 20px; color: ${v.textColor}; }
    .${uid('hero1')} p { font-size: 18px; line-height: 1.6; color: ${v.textColor}; opacity: 0.8; margin-bottom: 32px; }
    .${uid('hero1')} a { display: inline-block; background: ${v.buttonBg}; color: #fff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; transition: transform 0.2s, box-shadow 0.2s; }
    .${uid('hero1')} a:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
    @media (max-width: 768px) { .${uid('hero1')}-wrap { flex-direction: column-reverse; gap: 40px; } .${uid('hero1')} h1 { font-size: 36px; } }
  </style>
  <div class="${uid('hero1')}-wrap">
    <div class="${uid('hero1')}-content">
      <h1>${v.headline}</h1>
      <p>${v.subheadline}</p>
      <a href="${v.buttonUrl}">${v.buttonText}</a>
    </div>
    <div class="${uid('hero1')}-img">
      <img src="${v.image}" alt="Hero">
    </div>
  </div>
</div>`
  },
  {
    id: 'hero-2',
    name: 'Hero - Centered Minimal',
    category: 'Hero',
    description: 'Clean centered hero with overlay text on image',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'New Season Arrivals' },
      { id: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Explore our latest collection' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Discover More' },
      { id: 'buttonUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
      { id: 'image', label: 'Background Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop' },
      { id: 'overlayOpacity', label: 'Overlay Opacity (0-100)', type: 'number', defaultValue: '40' },
    ],
    generateHtml: (v) => `<div class="${uid('hero2')}" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('hero2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hero2')}-wrap { position: relative; min-height: 500px; display: flex; align-items: center; justify-content: center; text-align: center; background-image: url('${v.image}'); background-size: cover; background-position: center; }
    .${uid('hero2')}-overlay { position: absolute; inset: 0; background: rgba(0,0,0,${parseInt(v.overlayOpacity)/100}); }
    .${uid('hero2')}-content { position: relative; z-index: 1; padding: 40px; color: #fff; }
    .${uid('hero2')} h1 { font-size: 56px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 16px; }
    .${uid('hero2')} p { font-size: 20px; opacity: 0.9; margin-bottom: 32px; }
    .${uid('hero2')} a { display: inline-block; background: #fff; color: #000; padding: 16px 40px; border-radius: 4px; text-decoration: none; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.2s; }
    .${uid('hero2')} a:hover { background: #000; color: #fff; }
    @media (max-width: 768px) { .${uid('hero2')} h1 { font-size: 36px; } .${uid('hero2')}-wrap { min-height: 400px; } }
  </style>
  <div class="${uid('hero2')}-wrap">
    <div class="${uid('hero2')}-overlay"></div>
    <div class="${uid('hero2')}-content">
      <h1>${v.headline}</h1>
      <p>${v.subheadline}</p>
      <a href="${v.buttonUrl}">${v.buttonText}</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'hero-3',
    name: 'Hero - Video Background Style',
    category: 'Hero',
    description: 'Bold hero with large typography and subtle animation',
    thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'PREMIUM QUALITY' },
      { id: 'subheadline', label: 'Subheadline', type: 'textarea', defaultValue: 'Crafted with precision, designed for excellence' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Shop Collection' },
      { id: 'buttonUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#0a0a0a' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#d4af37' },
    ],
    generateHtml: (v) => `<div class="${uid('hero3')}" style="background:${v.bgColor};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('hero3')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hero3')}-wrap { min-height: 600px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 80px 40px; }
    .${uid('hero3')} h1 { font-size: 72px; font-weight: 800; letter-spacing: 0.2em; color: #fff; margin-bottom: 24px; }
    .${uid('hero3')} p { font-size: 18px; color: rgba(255,255,255,0.7); max-width: 500px; margin-bottom: 40px; line-height: 1.6; }
    .${uid('hero3')} a { display: inline-block; border: 2px solid ${v.accentColor}; color: ${v.accentColor}; padding: 18px 48px; text-decoration: none; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.15em; transition: all 0.3s; }
    .${uid('hero3')} a:hover { background: ${v.accentColor}; color: #000; }
    @media (max-width: 768px) { .${uid('hero3')} h1 { font-size: 40px; letter-spacing: 0.1em; } }
  </style>
  <div class="${uid('hero3')}-wrap">
    <h1>${v.headline}</h1>
    <p>${v.subheadline}</p>
    <a href="${v.buttonUrl}">${v.buttonText}</a>
  </div>
</div>`
  },
  {
    id: 'hero-4',
    name: 'Hero - Product Showcase',
    category: 'Hero',
    description: 'Hero with featured product image and details',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    fields: [
      { id: 'tagline', label: 'Tagline', type: 'text', defaultValue: 'Bestseller' },
      { id: 'headline', label: 'Product Name', type: 'text', defaultValue: 'Classic Watch Collection' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Timeless elegance meets modern precision. Swiss movement, sapphire crystal, water resistant to 100m.' },
      { id: 'price', label: 'Price', type: 'text', defaultValue: '$299' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Add to Cart' },
      { id: 'buttonUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
      { id: 'image', label: 'Product Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop' },
    ],
    generateHtml: (v) => `<div class="${uid('hero4')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('hero4')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hero4')}-wrap { display: flex; align-items: center; gap: 80px; max-width: 1200px; margin: 0 auto; padding: 80px 40px; }
    .${uid('hero4')}-img { flex: 1; text-align: center; }
    .${uid('hero4')}-img img { max-width: 100%; height: auto; }
    .${uid('hero4')}-content { flex: 1; }
    .${uid('hero4')}-tag { display: inline-block; background: #f5f5f5; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #666; margin-bottom: 20px; }
    .${uid('hero4')} h1 { font-size: 42px; font-weight: 700; color: #1a1a1a; margin-bottom: 16px; }
    .${uid('hero4')} p { font-size: 16px; color: #666; line-height: 1.7; margin-bottom: 24px; }
    .${uid('hero4')}-price { font-size: 32px; font-weight: 700; color: #1a1a1a; margin-bottom: 32px; }
    .${uid('hero4')} a { display: inline-block; background: #000; color: #fff; padding: 18px 48px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; transition: all 0.2s; }
    .${uid('hero4')} a:hover { background: #333; transform: translateY(-2px); }
    @media (max-width: 768px) { .${uid('hero4')}-wrap { flex-direction: column; gap: 40px; } .${uid('hero4')} h1 { font-size: 32px; } }
  </style>
  <div class="${uid('hero4')}-wrap">
    <div class="${uid('hero4')}-img"><img src="${v.image}" alt="Product"></div>
    <div class="${uid('hero4')}-content">
      <span class="${uid('hero4')}-tag">${v.tagline}</span>
      <h1>${v.headline}</h1>
      <p>${v.description}</p>
      <div class="${uid('hero4')}-price">${v.price}</div>
      <a href="${v.buttonUrl}">${v.buttonText}</a>
    </div>
  </div>
</div>`
  },
  {
    id: 'hero-5',
    name: 'Hero - Collection Grid',
    category: 'Hero',
    description: 'Hero with multiple collection images in a grid',
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Shop by Category' },
      { id: 'image1', label: 'Image 1 URL', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop' },
      { id: 'label1', label: 'Label 1', type: 'text', defaultValue: 'Women' },
      { id: 'link1', label: 'Link 1', type: 'url', defaultValue: '#' },
      { id: 'image2', label: 'Image 2 URL', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=500&fit=crop' },
      { id: 'label2', label: 'Label 2', type: 'text', defaultValue: 'Men' },
      { id: 'link2', label: 'Link 2', type: 'url', defaultValue: '#' },
      { id: 'image3', label: 'Image 3 URL', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=500&fit=crop' },
      { id: 'label3', label: 'Label 3', type: 'text', defaultValue: 'Accessories' },
      { id: 'link3', label: 'Link 3', type: 'url', defaultValue: '#' },
    ],
    generateHtml: (v) => `<div class="${uid('hero5')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('hero5')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('hero5')}-wrap { max-width: 1400px; margin: 0 auto; padding: 60px 40px; }
    .${uid('hero5')} h2 { font-size: 36px; font-weight: 700; text-align: center; margin-bottom: 48px; color: #1a1a1a; }
    .${uid('hero5')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .${uid('hero5')}-item { position: relative; overflow: hidden; border-radius: 12px; aspect-ratio: 4/5; }
    .${uid('hero5')}-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    .${uid('hero5')}-item:hover img { transform: scale(1.05); }
    .${uid('hero5')}-item a { position: absolute; inset: 0; display: flex; align-items: flex-end; padding: 24px; text-decoration: none; background: linear-gradient(transparent 50%, rgba(0,0,0,0.7)); }
    .${uid('hero5')}-item span { color: #fff; font-size: 24px; font-weight: 600; }
    @media (max-width: 768px) { .${uid('hero5')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('hero5')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('hero5')}-grid">
      <div class="${uid('hero5')}-item"><img src="${v.image1}" alt="${v.label1}"><a href="${v.link1}"><span>${v.label1}</span></a></div>
      <div class="${uid('hero5')}-item"><img src="${v.image2}" alt="${v.label2}"><a href="${v.link2}"><span>${v.label2}</span></a></div>
      <div class="${uid('hero5')}-item"><img src="${v.image3}" alt="${v.label3}"><a href="${v.link3}"><span>${v.label3}</span></a></div>
    </div>
  </div>
</div>`
  },
  // ========== TESTIMONIALS (6-17) ==========
  {
    id: 'testimonial-1',
    name: 'Testimonial - Single Quote',
    category: 'Testimonials',
    description: 'Clean single testimonial with large quote',
    thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop',
    fields: [
      { id: 'quote', label: 'Quote', type: 'textarea', defaultValue: 'This product has completely transformed my daily routine. The quality is exceptional and the customer service is outstanding. I cannot recommend it enough!' },
      { id: 'name', label: 'Customer Name', type: 'text', defaultValue: 'Sarah Johnson' },
      { id: 'title', label: 'Title/Location', type: 'text', defaultValue: 'Verified Buyer, New York' },
      { id: 'avatar', label: 'Avatar URL', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
      { id: 'rating', label: 'Rating (1-5)', type: 'number', defaultValue: '5' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#fafafa' },
    ],
    generateHtml: (v) => `<div class="${uid('test1')}" style="background:${v.bgColor};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('test1')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('test1')}-wrap { max-width: 800px; margin: 0 auto; padding: 80px 40px; text-align: center; }
    .${uid('test1')}-stars { margin-bottom: 24px; color: #fbbf24; font-size: 24px; }
    .${uid('test1')} blockquote { font-size: 24px; line-height: 1.6; color: #1a1a1a; margin-bottom: 32px; font-style: italic; }
    .${uid('test1')}-author { display: flex; align-items: center; justify-content: center; gap: 16px; }
    .${uid('test1')}-avatar { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; }
    .${uid('test1')}-name { font-weight: 600; color: #1a1a1a; }
    .${uid('test1')}-title { font-size: 14px; color: #666; }
  </style>
  <div class="${uid('test1')}-wrap">
    <div class="${uid('test1')}-stars">${'★'.repeat(parseInt(v.rating))}${'☆'.repeat(5-parseInt(v.rating))}</div>
    <blockquote>"${v.quote}"</blockquote>
    <div class="${uid('test1')}-author">
      <img class="${uid('test1')}-avatar" src="${v.avatar}" alt="${v.name}">
      <div>
        <div class="${uid('test1')}-name">${v.name}</div>
        <div class="${uid('test1')}-title">${v.title}</div>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'testimonial-2',
    name: 'Testimonial - Three Cards',
    category: 'Testimonials',
    description: 'Three testimonial cards in a row',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Section Title', type: 'text', defaultValue: 'What Our Customers Say' },
      { id: 'quote1', label: 'Quote 1', type: 'textarea', defaultValue: 'Absolutely love this product! Fast shipping and exactly as described.' },
      { id: 'name1', label: 'Name 1', type: 'text', defaultValue: 'Michael Chen' },
      { id: 'avatar1', label: 'Avatar 1', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
      { id: 'quote2', label: 'Quote 2', type: 'textarea', defaultValue: 'Best purchase I have made this year. The quality exceeded my expectations.' },
      { id: 'name2', label: 'Name 2', type: 'text', defaultValue: 'Emma Wilson' },
      { id: 'avatar2', label: 'Avatar 2', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
      { id: 'quote3', label: 'Quote 3', type: 'textarea', defaultValue: 'Customer service was incredible. They went above and beyond!' },
      { id: 'name3', label: 'Name 3', type: 'text', defaultValue: 'James Miller' },
      { id: 'avatar3', label: 'Avatar 3', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    ],
    generateHtml: (v) => `<div class="${uid('test2')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('test2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('test2')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 40px; }
    .${uid('test2')} h2 { font-size: 36px; font-weight: 700; text-align: center; margin-bottom: 48px; color: #1a1a1a; }
    .${uid('test2')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
    .${uid('test2')}-card { background: #fafafa; padding: 32px; border-radius: 16px; }
    .${uid('test2')}-stars { color: #fbbf24; margin-bottom: 16px; }
    .${uid('test2')}-card p { font-size: 16px; line-height: 1.6; color: #444; margin-bottom: 24px; }
    .${uid('test2')}-author { display: flex; align-items: center; gap: 12px; }
    .${uid('test2')}-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
    .${uid('test2')}-name { font-weight: 600; color: #1a1a1a; }
    @media (max-width: 768px) { .${uid('test2')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('test2')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('test2')}-grid">
      <div class="${uid('test2')}-card">
        <div class="${uid('test2')}-stars">★★★★★</div>
        <p>"${v.quote1}"</p>
        <div class="${uid('test2')}-author">
          <img class="${uid('test2')}-avatar" src="${v.avatar1}" alt="${v.name1}">
          <span class="${uid('test2')}-name">${v.name1}</span>
        </div>
      </div>
      <div class="${uid('test2')}-card">
        <div class="${uid('test2')}-stars">★★★★★</div>
        <p>"${v.quote2}"</p>
        <div class="${uid('test2')}-author">
          <img class="${uid('test2')}-avatar" src="${v.avatar2}" alt="${v.name2}">
          <span class="${uid('test2')}-name">${v.name2}</span>
        </div>
      </div>
      <div class="${uid('test2')}-card">
        <div class="${uid('test2')}-stars">★★★★★</div>
        <p>"${v.quote3}"</p>
        <div class="${uid('test2')}-author">
          <img class="${uid('test2')}-avatar" src="${v.avatar3}" alt="${v.name3}">
          <span class="${uid('test2')}-name">${v.name3}</span>
        </div>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'testimonial-3',
    name: 'Testimonial - Trustpilot Style',
    category: 'Testimonials',
    description: 'Trustpilot-inspired review display with rating badge',
    thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Our customers tell it better than we do!' },
      { id: 'rating', label: 'Overall Rating', type: 'text', defaultValue: '4.7' },
      { id: 'reviewCount', label: 'Review Count', type: 'text', defaultValue: '12,847' },
      { id: 'quote1', label: 'Review 1', type: 'textarea', defaultValue: 'I have very sensitive gums but this toothbrush is gentle yet effective. Best purchase ever!' },
      { id: 'name1', label: 'Reviewer 1', type: 'text', defaultValue: 'Robert K.' },
      { id: 'quote2', label: 'Review 2', type: 'textarea', defaultValue: 'I adopted it! Been using it for years now and love it. Great quality and amazing customer support.' },
      { id: 'name2', label: 'Reviewer 2', type: 'text', defaultValue: 'Catherine L.' },
      { id: 'quote3', label: 'Review 3', type: 'textarea', defaultValue: 'Very good toothbrush! Works perfectly and the battery lasts forever.' },
      { id: 'name3', label: 'Reviewer 3', type: 'text', defaultValue: 'David M.' },
    ],
    generateHtml: (v) => `<div class="${uid('test3')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('test3')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('test3')}-wrap { max-width: 1200px; margin: 0 auto; padding: 60px 40px; }
    .${uid('test3')}-header { text-align: center; margin-bottom: 48px; }
    .${uid('test3')} h2 { font-size: 32px; font-weight: 700; color: #1a1a1a; margin-bottom: 12px; }
    .${uid('test3')}-badge { display: inline-flex; align-items: center; gap: 8px; background: #00b67a; color: #fff; padding: 8px 16px; border-radius: 4px; font-weight: 600; }
    .${uid('test3')}-count { color: #666; font-size: 14px; margin-top: 8px; }
    .${uid('test3')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .${uid('test3')}-card { border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px; }
    .${uid('test3')}-stars { display: flex; gap: 2px; margin-bottom: 12px; }
    .${uid('test3')}-star { width: 24px; height: 24px; background: #00b67a; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; }
    .${uid('test3')}-card p { font-size: 15px; line-height: 1.5; color: #333; margin-bottom: 16px; }
    .${uid('test3')}-name { font-weight: 600; color: #1a1a1a; font-size: 14px; }
    @media (max-width: 768px) { .${uid('test3')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('test3')}-wrap">
    <div class="${uid('test3')}-header">
      <h2>${v.headline}</h2>
      <div class="${uid('test3')}-badge"><span>Excellent</span> <span>${v.rating}</span> ★</div>
      <div class="${uid('test3')}-count">Based on ${v.reviewCount} reviews</div>
    </div>
    <div class="${uid('test3')}-grid">
      <div class="${uid('test3')}-card">
        <div class="${uid('test3')}-stars"><span class="${uid('test3')}-star">★</span><span class="${uid('test3')}-star">★</span><span class="${uid('test3')}-star">★</span><span class="${uid('test3')}-star">★</span><span class="${uid('test3')}-star">★</span></div>
        <p>"${v.quote1}"</p>
        <div class="${uid('test3')}-name">${v.name1}</div>
      </div>
      <div class="${uid('test3')}-card">
        <div class="${uid('test3')}-stars"><span class="${uid('test3')}-star">★</span><span class="${uid('test3')}-star">★</span><span class="${uid('test3')}-star">★</span><span class="${uid('test3')}-star">★</span><span class="${uid('test3')}-star">★</span></div>
        <p>"${v.quote2}"</p>
        <div class="${uid('test3')}-name">${v.name2}</div>
      </div>
      <div class="${uid('test3')}-card">
        <div class="${uid('test3')}-stars"><span class="${uid('test3')}-star">★</span><span class="${uid('test3')}-star">★</span><span class="${uid('test3')}-star">★</span><span class="${uid('test3')}-star">★</span><span class="${uid('test3')}-star">★</span></div>
        <p>"${v.quote3}"</p>
        <div class="${uid('test3')}-name">${v.name3}</div>
      </div>
    </div>
  </div>
</div>`
  },
  // ========== FEATURES & BENEFITS (8-19) ==========
  {
    id: 'features-1',
    name: 'Features - Icon Grid',
    category: 'Features',
    description: 'Four features with icons in a grid layout',
    thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Why Choose Us' },
      { id: 'feature1', label: 'Feature 1 Title', type: 'text', defaultValue: 'Free Shipping' },
      { id: 'desc1', label: 'Feature 1 Description', type: 'text', defaultValue: 'Free shipping on all orders over $50' },
      { id: 'feature2', label: 'Feature 2 Title', type: 'text', defaultValue: '30-Day Returns' },
      { id: 'desc2', label: 'Feature 2 Description', type: 'text', defaultValue: 'Easy returns within 30 days' },
      { id: 'feature3', label: 'Feature 3 Title', type: 'text', defaultValue: 'Secure Payment' },
      { id: 'desc3', label: 'Feature 3 Description', type: 'text', defaultValue: '100% secure payment processing' },
      { id: 'feature4', label: 'Feature 4 Title', type: 'text', defaultValue: '24/7 Support' },
      { id: 'desc4', label: 'Feature 4 Description', type: 'text', defaultValue: 'Round the clock customer support' },
      { id: 'iconColor', label: 'Icon Color', type: 'color', defaultValue: '#000000' },
    ],
    generateHtml: (v) => `<div class="${uid('feat1')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('feat1')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('feat1')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 40px; }
    .${uid('feat1')} h2 { font-size: 36px; font-weight: 700; text-align: center; margin-bottom: 48px; color: #1a1a1a; }
    .${uid('feat1')}-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
    .${uid('feat1')}-item { text-align: center; padding: 24px; }
    .${uid('feat1')}-icon { width: 64px; height: 64px; margin: 0 auto 20px; background: ${v.iconColor}10; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
    .${uid('feat1')}-icon svg { width: 32px; height: 32px; stroke: ${v.iconColor}; fill: none; stroke-width: 1.5; }
    .${uid('feat1')}-item h3 { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-bottom: 8px; }
    .${uid('feat1')}-item p { font-size: 14px; color: #666; line-height: 1.5; }
    @media (max-width: 768px) { .${uid('feat1')}-grid { grid-template-columns: repeat(2, 1fr); } }
  </style>
  <div class="${uid('feat1')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('feat1')}-grid">
      <div class="${uid('feat1')}-item">
        <div class="${uid('feat1')}-icon"><svg viewBox="0 0 24 24"><path d="M5 18H19A2 2 0 0 0 21 16V8A2 2 0 0 0 19 6H5A2 2 0 0 0 3 8V16A2 2 0 0 0 5 18ZM9 6V18M15 6V18"/></svg></div>
        <h3>${v.feature1}</h3>
        <p>${v.desc1}</p>
      </div>
      <div class="${uid('feat1')}-item">
        <div class="${uid('feat1')}-icon"><svg viewBox="0 0 24 24"><path d="M3 12L9 6L12 9L15 6L21 12M3 12V18A2 2 0 0 0 5 20H19A2 2 0 0 0 21 18V12M3 12H21"/></svg></div>
        <h3>${v.feature2}</h3>
        <p>${v.desc2}</p>
      </div>
      <div class="${uid('feat1')}-item">
        <div class="${uid('feat1')}-icon"><svg viewBox="0 0 24 24"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/><path d="M9 12L11 14L15 10"/></svg></div>
        <h3>${v.feature3}</h3>
        <p>${v.desc3}</p>
      </div>
      <div class="${uid('feat1')}-item">
        <div class="${uid('feat1')}-icon"><svg viewBox="0 0 24 24"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/><path d="M12 6V12L16 14"/></svg></div>
        <h3>${v.feature4}</h3>
        <p>${v.desc4}</p>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'features-2',
    name: 'Features - Image Left',
    category: 'Features',
    description: 'Feature list with image on the left side',
    thumbnail: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Pure Ceremonial Energy.' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Experience the vibrant flavor and focused calm that sets our stone-ground ceremonial grade matcha apart.' },
      { id: 'image', label: 'Image URL', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=700&fit=crop' },
      { id: 'feature1', label: 'Feature 1', type: 'text', defaultValue: 'Authentic Japanese Origin' },
      { id: 'desc1', label: 'Description 1', type: 'text', defaultValue: 'Sourced directly from heritage organic farms in Uji, Japan.' },
      { id: 'feature2', label: 'Feature 2', type: 'text', defaultValue: 'Sustained Energy & Focus' },
      { id: 'desc2', label: 'Description 2', type: 'text', defaultValue: 'Rich in L-Theanine to promote relaxation and mental clarity.' },
      { id: 'feature3', label: 'Feature 3', type: 'text', defaultValue: 'Ceremonial Grade Quality' },
      { id: 'desc3', label: 'Description 3', type: 'text', defaultValue: 'Only the youngest, shade-grown tea leaves are stone-ground.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Shop Matcha' },
      { id: 'buttonUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#4a5d23' },
    ],
    generateHtml: (v) => `<div class="${uid('feat2')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('feat2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('feat2')}-wrap { display: flex; align-items: center; gap: 80px; max-width: 1200px; margin: 0 auto; padding: 80px 40px; }
    .${uid('feat2')}-img { flex: 1; }
    .${uid('feat2')}-img img { width: 100%; border-radius: 16px; }
    .${uid('feat2')}-content { flex: 1; }
    .${uid('feat2')} h2 { font-size: 42px; font-weight: 700; color: #1a1a1a; margin-bottom: 16px; }
    .${uid('feat2')}-desc { font-size: 18px; color: #666; margin-bottom: 40px; line-height: 1.6; }
    .${uid('feat2')}-list { display: flex; flex-direction: column; gap: 24px; margin-bottom: 40px; }
    .${uid('feat2')}-item { display: flex; gap: 16px; }
    .${uid('feat2')}-check { width: 24px; height: 24px; background: ${v.accentColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; }
    .${uid('feat2')}-item h4 { font-size: 16px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
    .${uid('feat2')}-item p { font-size: 14px; color: #666; }
    .${uid('feat2')} a { display: inline-block; background: ${v.accentColor}; color: #fff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    @media (max-width: 768px) { .${uid('feat2')}-wrap { flex-direction: column; } .${uid('feat2')} h2 { font-size: 32px; } }
  </style>
  <div class="${uid('feat2')}-wrap">
    <div class="${uid('feat2')}-img"><img src="${v.image}" alt="Feature"></div>
    <div class="${uid('feat2')}-content">
      <h2>${v.headline}</h2>
      <p class="${uid('feat2')}-desc">${v.description}</p>
      <div class="${uid('feat2')}-list">
        <div class="${uid('feat2')}-item">
          <div class="${uid('feat2')}-check">✓</div>
          <div><h4>${v.feature1}</h4><p>${v.desc1}</p></div>
        </div>
        <div class="${uid('feat2')}-item">
          <div class="${uid('feat2')}-check">✓</div>
          <div><h4>${v.feature2}</h4><p>${v.desc2}</p></div>
        </div>
        <div class="${uid('feat2')}-item">
          <div class="${uid('feat2')}-check">✓</div>
          <div><h4>${v.feature3}</h4><p>${v.desc3}</p></div>
        </div>
      </div>
      <a href="${v.buttonUrl}">${v.buttonText}</a>
    </div>
  </div>
</div>`
  },
  // ========== TRUST & SOCIAL PROOF (10-21) ==========
  {
    id: 'trust-1',
    name: 'Trust - Payment Icons',
    category: 'Trust',
    description: 'Payment method icons with security message',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Safe payment on our website' },
      { id: 'showVisa', label: 'Show Visa (yes/no)', type: 'text', defaultValue: 'yes' },
      { id: 'showMastercard', label: 'Show Mastercard (yes/no)', type: 'text', defaultValue: 'yes' },
      { id: 'showAmex', label: 'Show Amex (yes/no)', type: 'text', defaultValue: 'yes' },
      { id: 'showPaypal', label: 'Show PayPal (yes/no)', type: 'text', defaultValue: 'yes' },
      { id: 'showApplePay', label: 'Show Apple Pay (yes/no)', type: 'text', defaultValue: 'yes' },
      { id: 'showGooglePay', label: 'Show Google Pay (yes/no)', type: 'text', defaultValue: 'yes' },
    ],
    generateHtml: (v) => `<div class="${uid('trust1')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('trust1')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('trust1')}-wrap { max-width: 600px; margin: 0 auto; padding: 40px; text-align: center; }
    .${uid('trust1')} h3 { font-size: 16px; font-weight: 500; color: #1a1a1a; margin-bottom: 20px; }
    .${uid('trust1')}-icons { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
    .${uid('trust1')}-icon { background: #f5f5f5; padding: 10px 16px; border-radius: 8px; font-size: 14px; font-weight: 600; color: #333; }
    .${uid('trust1')}-visa { background: #1a1f71; color: #fff; }
    .${uid('trust1')}-mc { background: #eb001b; color: #fff; }
    .${uid('trust1')}-amex { background: #006fcf; color: #fff; }
    .${uid('trust1')}-pp { background: #003087; color: #fff; }
    .${uid('trust1')}-ap { background: #000; color: #fff; }
    .${uid('trust1')}-gp { background: #4285f4; color: #fff; }
  </style>
  <div class="${uid('trust1')}-wrap">
    <h3>${v.headline}</h3>
    <div class="${uid('trust1')}-icons">
      ${v.showVisa === 'yes' ? `<span class="${uid('trust1')}-icon ${uid('trust1')}-visa">VISA</span>` : ''}
      ${v.showMastercard === 'yes' ? `<span class="${uid('trust1')}-icon ${uid('trust1')}-mc">Mastercard</span>` : ''}
      ${v.showAmex === 'yes' ? `<span class="${uid('trust1')}-icon ${uid('trust1')}-amex">AMEX</span>` : ''}
      ${v.showPaypal === 'yes' ? `<span class="${uid('trust1')}-icon ${uid('trust1')}-pp">PayPal</span>` : ''}
      ${v.showApplePay === 'yes' ? `<span class="${uid('trust1')}-icon ${uid('trust1')}-ap">Apple Pay</span>` : ''}
      ${v.showGooglePay === 'yes' ? `<span class="${uid('trust1')}-icon ${uid('trust1')}-gp">Google Pay</span>` : ''}
    </div>
  </div>
</div>`
  },
  {
    id: 'trust-2',
    name: 'Trust - Logo Cloud',
    category: 'Trust',
    description: 'Scrolling trusted by logos section',
    thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Trusted by' },
      { id: 'logo1', label: 'Logo 1 Text', type: 'text', defaultValue: 'Forbes' },
      { id: 'logo2', label: 'Logo 2 Text', type: 'text', defaultValue: 'TechCrunch' },
      { id: 'logo3', label: 'Logo 3 Text', type: 'text', defaultValue: 'Bloomberg' },
      { id: 'logo4', label: 'Logo 4 Text', type: 'text', defaultValue: 'Business Insider' },
      { id: 'logo5', label: 'Logo 5 Text', type: 'text', defaultValue: 'The Verge' },
      { id: 'logo6', label: 'Logo 6 Text', type: 'text', defaultValue: 'Wired' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#000000' },
    ],
    generateHtml: (v) => `<div class="${uid('trust2')}" style="background:${v.bgColor};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('trust2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('trust2')}-wrap { padding: 40px 0; overflow: hidden; }
    .${uid('trust2')} h4 { text-align: center; color: rgba(255,255,255,0.6); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px; }
    .${uid('trust2')}-track { display: flex; animation: ${uid('trust2')}-scroll 20s linear infinite; }
    .${uid('trust2')}-logos { display: flex; gap: 60px; padding: 0 30px; }
    .${uid('trust2')}-logo { color: rgba(255,255,255,0.8); font-size: 20px; font-weight: 700; white-space: nowrap; }
    @keyframes ${uid('trust2')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  </style>
  <div class="${uid('trust2')}-wrap">
    <h4>${v.headline}</h4>
    <div class="${uid('trust2')}-track">
      <div class="${uid('trust2')}-logos">
        <span class="${uid('trust2')}-logo">${v.logo1}</span>
        <span class="${uid('trust2')}-logo">${v.logo2}</span>
        <span class="${uid('trust2')}-logo">${v.logo3}</span>
        <span class="${uid('trust2')}-logo">${v.logo4}</span>
        <span class="${uid('trust2')}-logo">${v.logo5}</span>
        <span class="${uid('trust2')}-logo">${v.logo6}</span>
      </div>
      <div class="${uid('trust2')}-logos">
        <span class="${uid('trust2')}-logo">${v.logo1}</span>
        <span class="${uid('trust2')}-logo">${v.logo2}</span>
        <span class="${uid('trust2')}-logo">${v.logo3}</span>
        <span class="${uid('trust2')}-logo">${v.logo4}</span>
        <span class="${uid('trust2')}-logo">${v.logo5}</span>
        <span class="${uid('trust2')}-logo">${v.logo6}</span>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'trust-3',
    name: 'Trust - Social Proof Banner',
    category: 'Trust',
    description: 'Social proof with customer count and avatars',
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop',
    fields: [
      { id: 'count', label: 'Customer Count', type: 'text', defaultValue: '1500+' },
      { id: 'message', label: 'Message', type: 'text', defaultValue: 'others love our products and purchased more than once!' },
      { id: 'avatar1', label: 'Avatar 1', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop' },
      { id: 'avatar2', label: 'Avatar 2', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop' },
      { id: 'avatar3', label: 'Avatar 3', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#f0f9ff' },
    ],
    generateHtml: (v) => `<div class="${uid('trust3')}" style="background:${v.bgColor};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('trust3')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('trust3')}-wrap { display: flex; align-items: center; justify-content: center; gap: 16px; padding: 24px 40px; }
    .${uid('trust3')}-avatars { display: flex; }
    .${uid('trust3')}-avatar { width: 40px; height: 40px; border-radius: 50%; border: 3px solid #fff; margin-left: -12px; object-fit: cover; }
    .${uid('trust3')}-avatar:first-child { margin-left: 0; }
    .${uid('trust3')}-text { font-size: 15px; color: #1a1a1a; }
    .${uid('trust3')}-text strong { color: #2563eb; }
  </style>
  <div class="${uid('trust3')}-wrap">
    <div class="${uid('trust3')}-avatars">
      <img class="${uid('trust3')}-avatar" src="${v.avatar1}" alt="">
      <img class="${uid('trust3')}-avatar" src="${v.avatar2}" alt="">
      <img class="${uid('trust3')}-avatar" src="${v.avatar3}" alt="">
    </div>
    <p class="${uid('trust3')}-text"><strong>David</strong> and <strong>${v.count}</strong> ${v.message}</p>
  </div>
</div>`
  },
];

// ========== FAQ SECTIONS ==========
const faqSections: Section[] = [
  {
    id: 'faq-1',
    name: 'FAQ - Accordion',
    category: 'FAQ',
    description: 'Clean accordion-style FAQ section',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Frequently Asked Questions' },
      { id: 'q1', label: 'Question 1', type: 'text', defaultValue: 'What is your return policy?' },
      { id: 'a1', label: 'Answer 1', type: 'textarea', defaultValue: 'We offer a 30-day money-back guarantee on all purchases. If you are not satisfied, simply return the product in its original packaging for a full refund.' },
      { id: 'q2', label: 'Question 2', type: 'text', defaultValue: 'How long does shipping take?' },
      { id: 'a2', label: 'Answer 2', type: 'textarea', defaultValue: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days delivery.' },
      { id: 'q3', label: 'Question 3', type: 'text', defaultValue: 'Do you ship internationally?' },
      { id: 'a3', label: 'Answer 3', type: 'textarea', defaultValue: 'Yes! We ship to over 50 countries worldwide. International shipping typically takes 10-14 business days.' },
      { id: 'q4', label: 'Question 4', type: 'text', defaultValue: 'How can I track my order?' },
      { id: 'a4', label: 'Answer 4', type: 'textarea', defaultValue: 'Once your order ships, you will receive an email with a tracking number. You can use this to track your package on our website or the carrier site.' },
    ],
    generateHtml: (v) => `<div class="${uid('faq1')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('faq1')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('faq1')}-wrap { max-width: 800px; margin: 0 auto; padding: 80px 40px; }
    .${uid('faq1')} h2 { font-size: 36px; font-weight: 700; text-align: center; margin-bottom: 48px; color: #1a1a1a; }
    .${uid('faq1')}-item { border-bottom: 1px solid #e5e5e5; }
    .${uid('faq1')}-q { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 24px 0; font-size: 18px; font-weight: 600; color: #1a1a1a; background: none; border: none; cursor: pointer; text-align: left; }
    .${uid('faq1')}-q:after { content: '+'; font-size: 24px; color: #666; }
    .${uid('faq1')}-a { padding: 0 0 24px; font-size: 16px; color: #666; line-height: 1.6; display: none; }
    .${uid('faq1')}-item.open .${uid('faq1')}-a { display: block; }
    .${uid('faq1')}-item.open .${uid('faq1')}-q:after { content: '−'; }
  </style>
  <div class="${uid('faq1')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('faq1')}-item open"><button class="${uid('faq1')}-q">${v.q1}</button><div class="${uid('faq1')}-a">${v.a1}</div></div>
    <div class="${uid('faq1')}-item"><button class="${uid('faq1')}-q">${v.q2}</button><div class="${uid('faq1')}-a">${v.a2}</div></div>
    <div class="${uid('faq1')}-item"><button class="${uid('faq1')}-q">${v.q3}</button><div class="${uid('faq1')}-a">${v.a3}</div></div>
    <div class="${uid('faq1')}-item"><button class="${uid('faq1')}-q">${v.q4}</button><div class="${uid('faq1')}-a">${v.a4}</div></div>
  </div>
  <script>(function(){document.querySelectorAll('.${uid('faq1')}-q').forEach(b=>b.addEventListener('click',()=>b.parentElement.classList.toggle('open')))})();</script>
</div>`
  },
  {
    id: 'faq-2',
    name: 'FAQ - Two Column',
    category: 'FAQ',
    description: 'FAQ in a two-column grid layout',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Common Questions' },
      { id: 'q1', label: 'Question 1', type: 'text', defaultValue: 'Is there a warranty?' },
      { id: 'a1', label: 'Answer 1', type: 'text', defaultValue: 'Yes, all products come with a 2-year manufacturer warranty.' },
      { id: 'q2', label: 'Question 2', type: 'text', defaultValue: 'Can I cancel my order?' },
      { id: 'a2', label: 'Answer 2', type: 'text', defaultValue: 'Orders can be cancelled within 24 hours of placement.' },
      { id: 'q3', label: 'Question 3', type: 'text', defaultValue: 'Do you offer gift wrapping?' },
      { id: 'a3', label: 'Answer 3', type: 'text', defaultValue: 'Yes! Select gift wrapping at checkout for $5.' },
      { id: 'q4', label: 'Question 4', type: 'text', defaultValue: 'How do I contact support?' },
      { id: 'a4', label: 'Answer 4', type: 'text', defaultValue: 'Email us at support@example.com or use live chat.' },
    ],
    generateHtml: (v) => `<div class="${uid('faq2')}" style="background:#fafafa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('faq2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('faq2')}-wrap { max-width: 1000px; margin: 0 auto; padding: 80px 40px; }
    .${uid('faq2')} h2 { font-size: 36px; font-weight: 700; text-align: center; margin-bottom: 48px; color: #1a1a1a; }
    .${uid('faq2')}-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
    .${uid('faq2')}-item { background: #fff; padding: 24px; border-radius: 12px; }
    .${uid('faq2')}-item h3 { font-size: 16px; font-weight: 600; color: #1a1a1a; margin-bottom: 8px; }
    .${uid('faq2')}-item p { font-size: 14px; color: #666; line-height: 1.5; }
    @media (max-width: 768px) { .${uid('faq2')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('faq2')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('faq2')}-grid">
      <div class="${uid('faq2')}-item"><h3>${v.q1}</h3><p>${v.a1}</p></div>
      <div class="${uid('faq2')}-item"><h3>${v.q2}</h3><p>${v.a2}</p></div>
      <div class="${uid('faq2')}-item"><h3>${v.q3}</h3><p>${v.a3}</p></div>
      <div class="${uid('faq2')}-item"><h3>${v.q4}</h3><p>${v.a4}</p></div>
    </div>
  </div>
</div>`
  },
];

// ========== CTA SECTIONS ==========
const ctaSections: Section[] = [
  {
    id: 'cta-1',
    name: 'CTA - Newsletter',
    category: 'CTA',
    description: 'Email newsletter signup section',
    thumbnail: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Join Our Newsletter' },
      { id: 'description', label: 'Description', type: 'text', defaultValue: 'Subscribe to get special offers, free giveaways, and exclusive deals.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Subscribe' },
      { id: 'placeholder', label: 'Input Placeholder', type: 'text', defaultValue: 'Enter your email' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#000000' },
      { id: 'buttonColor', label: 'Button Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('cta1')}" style="background:${v.bgColor};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('cta1')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('cta1')}-wrap { max-width: 600px; margin: 0 auto; padding: 80px 40px; text-align: center; }
    .${uid('cta1')} h2 { font-size: 32px; font-weight: 700; color: #fff; margin-bottom: 12px; }
    .${uid('cta1')} p { font-size: 16px; color: rgba(255,255,255,0.8); margin-bottom: 32px; }
    .${uid('cta1')}-form { display: flex; gap: 12px; max-width: 450px; margin: 0 auto; }
    .${uid('cta1')} input { flex: 1; padding: 16px 20px; border: none; border-radius: 8px; font-size: 16px; }
    .${uid('cta1')} button { background: ${v.buttonColor}; color: ${v.bgColor}; padding: 16px 32px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: opacity 0.2s; }
    .${uid('cta1')} button:hover { opacity: 0.9; }
    @media (max-width: 480px) { .${uid('cta1')}-form { flex-direction: column; } }
  </style>
  <div class="${uid('cta1')}-wrap">
    <h2>${v.headline}</h2>
    <p>${v.description}</p>
    <form class="${uid('cta1')}-form" onsubmit="return false;">
      <input type="email" placeholder="${v.placeholder}">
      <button type="submit">${v.buttonText}</button>
    </form>
  </div>
</div>`
  },
  {
    id: 'cta-2',
    name: 'CTA - Split with Image',
    category: 'CTA',
    description: 'Call to action with image on the side',
    thumbnail: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Ready to Get Started?' },
      { id: 'description', label: 'Description', type: 'textarea', defaultValue: 'Join thousands of satisfied customers and transform your business today. Start your free trial now.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Start Free Trial' },
      { id: 'buttonUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
      { id: 'image', label: 'Image URL', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&h=400&fit=crop' },
      { id: 'buttonColor', label: 'Button Color', type: 'color', defaultValue: '#000000' },
    ],
    generateHtml: (v) => `<div class="${uid('cta2')}" style="background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('cta2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('cta2')}-wrap { display: flex; align-items: center; gap: 60px; max-width: 1200px; margin: 0 auto; padding: 80px 40px; }
    .${uid('cta2')}-content { flex: 1; }
    .${uid('cta2')}-img { flex: 1; }
    .${uid('cta2')}-img img { width: 100%; border-radius: 16px; }
    .${uid('cta2')} h2 { font-size: 40px; font-weight: 700; color: #1a1a1a; margin-bottom: 16px; }
    .${uid('cta2')} p { font-size: 18px; color: #666; line-height: 1.6; margin-bottom: 32px; }
    .${uid('cta2')} a { display: inline-block; background: ${v.buttonColor}; color: #fff; padding: 18px 40px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    @media (max-width: 768px) { .${uid('cta2')}-wrap { flex-direction: column; } }
  </style>
  <div class="${uid('cta2')}-wrap">
    <div class="${uid('cta2')}-content">
      <h2>${v.headline}</h2>
      <p>${v.description}</p>
      <a href="${v.buttonUrl}">${v.buttonText}</a>
    </div>
    <div class="${uid('cta2')}-img"><img src="${v.image}" alt="CTA"></div>
  </div>
</div>`
  },
  {
    id: 'cta-3',
    name: 'Announcement Bar',
    category: 'CTA',
    description: 'Scrolling announcement bar for promotions',
    thumbnail: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&h=300&fit=crop',
    fields: [
      { id: 'text1', label: 'Text 1', type: 'text', defaultValue: 'FREE SHIPPING ON ORDERS $50+' },
      { id: 'text2', label: 'Text 2', type: 'text', defaultValue: '30-DAY RETURNS' },
      { id: 'text3', label: 'Text 3', type: 'text', defaultValue: 'SECURE CHECKOUT' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#000000' },
      { id: 'textColor', label: 'Text Color', type: 'color', defaultValue: '#ffffff' },
    ],
    generateHtml: (v) => `<div class="${uid('cta3')}" style="background:${v.bgColor};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('cta3')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('cta3')}-wrap { overflow: hidden; padding: 12px 0; }
    .${uid('cta3')}-track { display: flex; animation: ${uid('cta3')}-scroll 15s linear infinite; }
    .${uid('cta3')}-items { display: flex; gap: 48px; padding: 0 24px; }
    .${uid('cta3')}-item { color: ${v.textColor}; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; white-space: nowrap; display: flex; align-items: center; gap: 8px; }
    .${uid('cta3')}-dot { width: 4px; height: 4px; background: ${v.textColor}; border-radius: 50%; }
    @keyframes ${uid('cta3')}-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  </style>
  <div class="${uid('cta3')}-wrap">
    <div class="${uid('cta3')}-track">
      <div class="${uid('cta3')}-items">
        <span class="${uid('cta3')}-item">${v.text1}</span><span class="${uid('cta3')}-dot"></span>
        <span class="${uid('cta3')}-item">${v.text2}</span><span class="${uid('cta3')}-dot"></span>
        <span class="${uid('cta3')}-item">${v.text3}</span><span class="${uid('cta3')}-dot"></span>
      </div>
      <div class="${uid('cta3')}-items">
        <span class="${uid('cta3')}-item">${v.text1}</span><span class="${uid('cta3')}-dot"></span>
        <span class="${uid('cta3')}-item">${v.text2}</span><span class="${uid('cta3')}-dot"></span>
        <span class="${uid('cta3')}-item">${v.text3}</span><span class="${uid('cta3')}-dot"></span>
      </div>
    </div>
  </div>
</div>`
  },
];

// ========== COMPARISON SECTIONS ==========
const comparisonSections: Section[] = [
  {
    id: 'compare-1',
    name: 'Comparison - Us vs Them',
    category: 'Comparison',
    description: 'Compare your product against competitors',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'US vs Other Brands' },
      { id: 'ourBrand', label: 'Our Brand Name', type: 'text', defaultValue: 'Our Product' },
      { id: 'theirBrand', label: 'Their Brand Name', type: 'text', defaultValue: 'Other Brands' },
      { id: 'feature1', label: 'Feature 1', type: 'text', defaultValue: 'Price' },
      { id: 'our1', label: 'Our Value 1', type: 'text', defaultValue: 'From $129' },
      { id: 'their1', label: 'Their Value 1', type: 'text', defaultValue: '$450+' },
      { id: 'feature2', label: 'Feature 2', type: 'text', defaultValue: 'Warranty' },
      { id: 'our2', label: 'Our Value 2', type: 'text', defaultValue: 'Lifetime' },
      { id: 'their2', label: 'Their Value 2', type: 'text', defaultValue: '1 Year' },
      { id: 'feature3', label: 'Feature 3', type: 'text', defaultValue: 'Free Shipping' },
      { id: 'our3', label: 'Our Value 3', type: 'text', defaultValue: 'Yes' },
      { id: 'their3', label: 'Their Value 3', type: 'text', defaultValue: 'No' },
      { id: 'accentColor', label: 'Accent Color', type: 'color', defaultValue: '#6366f1' },
    ],
    generateHtml: (v) => `<div class="${uid('cmp1')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('cmp1')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('cmp1')}-wrap { max-width: 800px; margin: 0 auto; padding: 80px 40px; }
    .${uid('cmp1')} h2 { font-size: 32px; font-weight: 700; text-align: center; margin-bottom: 48px; color: #1a1a1a; }
    .${uid('cmp1')}-table { width: 100%; border-collapse: collapse; }
    .${uid('cmp1')}-table th { padding: 16px; text-align: center; font-weight: 600; }
    .${uid('cmp1')}-table th:first-child { text-align: left; }
    .${uid('cmp1')}-ours { background: ${v.accentColor}; color: #fff; border-radius: 8px 8px 0 0; }
    .${uid('cmp1')}-table td { padding: 16px; border-bottom: 1px solid #e5e5e5; }
    .${uid('cmp1')}-table td:first-child { font-weight: 500; color: #1a1a1a; }
    .${uid('cmp1')}-table td:nth-child(2) { text-align: center; color: ${v.accentColor}; font-weight: 600; }
    .${uid('cmp1')}-table td:nth-child(3) { text-align: center; color: #999; }
    .${uid('cmp1')}-check { color: #22c55e; }
    .${uid('cmp1')}-x { color: #ef4444; }
  </style>
  <div class="${uid('cmp1')}-wrap">
    <h2>${v.headline}</h2>
    <table class="${uid('cmp1')}-table">
      <thead><tr><th></th><th class="${uid('cmp1')}-ours">${v.ourBrand}</th><th>${v.theirBrand}</th></tr></thead>
      <tbody>
        <tr><td>${v.feature1}</td><td><span class="${uid('cmp1')}-check">✓</span> ${v.our1}</td><td><span class="${uid('cmp1')}-x">✗</span> ${v.their1}</td></tr>
        <tr><td>${v.feature2}</td><td><span class="${uid('cmp1')}-check">✓</span> ${v.our2}</td><td><span class="${uid('cmp1')}-x">✗</span> ${v.their2}</td></tr>
        <tr><td>${v.feature3}</td><td><span class="${uid('cmp1')}-check">✓</span> ${v.our3}</td><td><span class="${uid('cmp1')}-x">✗</span> ${v.their3}</td></tr>
      </tbody>
    </table>
  </div>
</div>`
  },
];

// ========== PRODUCT SECTIONS ==========
const productSections: Section[] = [
  {
    id: 'product-1',
    name: 'Product Card Grid',
    category: 'Product',
    description: 'Display products in a clean grid',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Best Sellers' },
      { id: 'product1Name', label: 'Product 1 Name', type: 'text', defaultValue: 'Classic Watch' },
      { id: 'product1Price', label: 'Product 1 Price', type: 'text', defaultValue: '$199' },
      { id: 'product1Image', label: 'Product 1 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
      { id: 'product2Name', label: 'Product 2 Name', type: 'text', defaultValue: 'Leather Bag' },
      { id: 'product2Price', label: 'Product 2 Price', type: 'text', defaultValue: '$149' },
      { id: 'product2Image', label: 'Product 2 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop' },
      { id: 'product3Name', label: 'Product 3 Name', type: 'text', defaultValue: 'Sunglasses' },
      { id: 'product3Price', label: 'Product 3 Price', type: 'text', defaultValue: '$89' },
      { id: 'product3Image', label: 'Product 3 Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop' },
    ],
    generateHtml: (v) => `<div class="${uid('prod1')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('prod1')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('prod1')}-wrap { max-width: 1200px; margin: 0 auto; padding: 80px 40px; }
    .${uid('prod1')} h2 { font-size: 36px; font-weight: 700; text-align: center; margin-bottom: 48px; color: #1a1a1a; }
    .${uid('prod1')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
    .${uid('prod1')}-card { text-align: center; }
    .${uid('prod1')}-img { aspect-ratio: 1; background: #f5f5f5; border-radius: 16px; overflow: hidden; margin-bottom: 16px; }
    .${uid('prod1')}-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
    .${uid('prod1')}-card:hover .${uid('prod1')}-img img { transform: scale(1.05); }
    .${uid('prod1')}-card h3 { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-bottom: 8px; }
    .${uid('prod1')}-card p { font-size: 16px; color: #666; }
    @media (max-width: 768px) { .${uid('prod1')}-grid { grid-template-columns: repeat(2, 1fr); } }
  </style>
  <div class="${uid('prod1')}-wrap">
    <h2>${v.headline}</h2>
    <div class="${uid('prod1')}-grid">
      <div class="${uid('prod1')}-card"><div class="${uid('prod1')}-img"><img src="${v.product1Image}" alt="${v.product1Name}"></div><h3>${v.product1Name}</h3><p>${v.product1Price}</p></div>
      <div class="${uid('prod1')}-card"><div class="${uid('prod1')}-img"><img src="${v.product2Image}" alt="${v.product2Name}"></div><h3>${v.product2Name}</h3><p>${v.product2Price}</p></div>
      <div class="${uid('prod1')}-card"><div class="${uid('prod1')}-img"><img src="${v.product3Image}" alt="${v.product3Name}"></div><h3>${v.product3Name}</h3><p>${v.product3Price}</p></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'product-2',
    name: 'Product Tabs',
    category: 'Product',
    description: 'Product information in expandable tabs',
    thumbnail: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=300&fit=crop',
    fields: [
      { id: 'tab1Title', label: 'Tab 1 Title', type: 'text', defaultValue: 'Product Description' },
      { id: 'tab1Content', label: 'Tab 1 Content', type: 'textarea', defaultValue: 'This organic cotton swing shirt is the coziest way to stay warm and stylish! Its long sleeves protect you from the chill while its swing silhouette adds an effortless touch of fashion.' },
      { id: 'tab2Title', label: 'Tab 2 Title', type: 'text', defaultValue: 'Shipping' },
      { id: 'tab2Content', label: 'Tab 2 Content', type: 'textarea', defaultValue: 'Free standard shipping on all orders. Express shipping available for $9.99. Orders ship within 1-2 business days.' },
      { id: 'tab3Title', label: 'Tab 3 Title', type: 'text', defaultValue: 'Returns' },
      { id: 'tab3Content', label: 'Tab 3 Content', type: 'textarea', defaultValue: '30-day free returns. Items must be unworn with tags attached. Refunds processed within 5-7 business days.' },
    ],
    generateHtml: (v) => `<div class="${uid('prod2')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('prod2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('prod2')}-wrap { max-width: 600px; margin: 0 auto; padding: 40px; }
    .${uid('prod2')}-tab { border-bottom: 1px solid #e5e5e5; }
    .${uid('prod2')}-header { display: flex; align-items: center; gap: 12px; padding: 20px 0; cursor: pointer; }
    .${uid('prod2')}-icon { font-size: 20px; }
    .${uid('prod2')}-title { flex: 1; font-size: 16px; font-weight: 500; color: #1a1a1a; }
    .${uid('prod2')}-arrow { color: #666; transition: transform 0.2s; }
    .${uid('prod2')}-content { display: none; padding: 0 0 20px 32px; font-size: 14px; color: #666; line-height: 1.6; }
    .${uid('prod2')}-tab.open .${uid('prod2')}-content { display: block; }
    .${uid('prod2')}-tab.open .${uid('prod2')}-arrow { transform: rotate(180deg); }
  </style>
  <div class="${uid('prod2')}-wrap">
    <div class="${uid('prod2')}-tab open">
      <div class="${uid('prod2')}-header"><span class="${uid('prod2')}-icon">♡</span><span class="${uid('prod2')}-title">${v.tab1Title}</span><span class="${uid('prod2')}-arrow">▼</span></div>
      <div class="${uid('prod2')}-content">${v.tab1Content}</div>
    </div>
    <div class="${uid('prod2')}-tab">
      <div class="${uid('prod2')}-header"><span class="${uid('prod2')}-icon">📦</span><span class="${uid('prod2')}-title">${v.tab2Title}</span><span class="${uid('prod2')}-arrow">▼</span></div>
      <div class="${uid('prod2')}-content">${v.tab2Content}</div>
    </div>
    <div class="${uid('prod2')}-tab">
      <div class="${uid('prod2')}-header"><span class="${uid('prod2')}-icon">↩</span><span class="${uid('prod2')}-title">${v.tab3Title}</span><span class="${uid('prod2')}-arrow">▼</span></div>
      <div class="${uid('prod2')}-content">${v.tab3Content}</div>
    </div>
  </div>
  <script>(function(){document.querySelectorAll('.${uid('prod2')}-header').forEach(h=>h.addEventListener('click',()=>h.parentElement.classList.toggle('open')))})();</script>
</div>`
  },
  {
    id: 'product-3',
    name: 'Countdown Timer',
    category: 'Product',
    description: 'Urgency countdown for limited offers',
    thumbnail: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Limited Time Offer' },
      { id: 'description', label: 'Description', type: 'text', defaultValue: 'Sale ends in:' },
      { id: 'days', label: 'Days', type: 'number', defaultValue: '2' },
      { id: 'hours', label: 'Hours', type: 'number', defaultValue: '14' },
      { id: 'minutes', label: 'Minutes', type: 'number', defaultValue: '32' },
      { id: 'seconds', label: 'Seconds', type: 'number', defaultValue: '45' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#dc2626' },
    ],
    generateHtml: (v) => `<div class="${uid('prod3')}" style="background:${v.bgColor};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('prod3')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('prod3')}-wrap { max-width: 800px; margin: 0 auto; padding: 40px; text-align: center; }
    .${uid('prod3')} h3 { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 8px; }
    .${uid('prod3')} p { font-size: 14px; color: rgba(255,255,255,0.9); margin-bottom: 20px; }
    .${uid('prod3')}-timer { display: flex; justify-content: center; gap: 16px; }
    .${uid('prod3')}-unit { background: rgba(0,0,0,0.2); padding: 16px 24px; border-radius: 8px; }
    .${uid('prod3')}-num { font-size: 36px; font-weight: 700; color: #fff; display: block; }
    .${uid('prod3')}-label { font-size: 11px; color: rgba(255,255,255,0.8); text-transform: uppercase; letter-spacing: 0.1em; }
  </style>
  <div class="${uid('prod3')}-wrap">
    <h3>${v.headline}</h3>
    <p>${v.description}</p>
    <div class="${uid('prod3')}-timer">
      <div class="${uid('prod3')}-unit"><span class="${uid('prod3')}-num">${v.days}</span><span class="${uid('prod3')}-label">Days</span></div>
      <div class="${uid('prod3')}-unit"><span class="${uid('prod3')}-num">${v.hours}</span><span class="${uid('prod3')}-label">Hours</span></div>
      <div class="${uid('prod3')}-unit"><span class="${uid('prod3')}-num">${v.minutes}</span><span class="${uid('prod3')}-label">Mins</span></div>
      <div class="${uid('prod3')}-unit"><span class="${uid('prod3')}-num">${v.seconds}</span><span class="${uid('prod3')}-label">Secs</span></div>
    </div>
  </div>
</div>`
  },
];

// ========== IMAGE SECTIONS ==========
const imageSections: Section[] = [
  {
    id: 'image-1',
    name: 'Image Gallery Grid',
    category: 'Gallery',
    description: 'Lifestyle image gallery in a grid',
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    fields: [
      { id: 'image1', label: 'Image 1', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop' },
      { id: 'label1', label: 'Label 1', type: 'text', defaultValue: 'Soft to the touch' },
      { id: 'cta1', label: 'CTA 1', type: 'text', defaultValue: 'SHOP THROWS' },
      { id: 'link1', label: 'Link 1', type: 'url', defaultValue: '#' },
      { id: 'image2', label: 'Image 2', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop' },
      { id: 'label2', label: 'Label 2', type: 'text', defaultValue: 'Bedsheet' },
      { id: 'cta2', label: 'CTA 2', type: 'text', defaultValue: 'USAGE GUIDE' },
      { id: 'link2', label: 'Link 2', type: 'url', defaultValue: '#' },
      { id: 'image3', label: 'Image 3', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop' },
      { id: 'label3', label: 'Label 3', type: 'text', defaultValue: 'Thick as a towel' },
      { id: 'cta3', label: 'CTA 3', type: 'text', defaultValue: 'SHOP RUGS' },
      { id: 'link3', label: 'Link 3', type: 'url', defaultValue: '#' },
    ],
    generateHtml: (v) => `<div class="${uid('img1')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('img1')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('img1')}-wrap { padding: 40px; }
    .${uid('img1')}-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .${uid('img1')}-item { position: relative; aspect-ratio: 4/3; overflow: hidden; border-radius: 8px; }
    .${uid('img1')}-item img { width: 100%; height: 100%; object-fit: cover; }
    .${uid('img1')}-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; background: linear-gradient(transparent 40%, rgba(0,0,0,0.6)); }
    .${uid('img1')}-label { color: #fff; font-size: 22px; font-weight: 600; font-style: italic; margin-bottom: 8px; }
    .${uid('img1')}-cta { display: inline-block; background: #c4a77d; color: #fff; padding: 8px 16px; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-decoration: none; border-radius: 4px; }
    @media (max-width: 768px) { .${uid('img1')}-grid { grid-template-columns: 1fr; } }
  </style>
  <div class="${uid('img1')}-wrap">
    <div class="${uid('img1')}-grid">
      <div class="${uid('img1')}-item"><img src="${v.image1}" alt=""><div class="${uid('img1')}-overlay"><span class="${uid('img1')}-label">${v.label1}</span><a href="${v.link1}" class="${uid('img1')}-cta">${v.cta1}</a></div></div>
      <div class="${uid('img1')}-item"><img src="${v.image2}" alt=""><div class="${uid('img1')}-overlay"><span class="${uid('img1')}-label">${v.label2}</span><a href="${v.link2}" class="${uid('img1')}-cta">${v.cta2}</a></div></div>
      <div class="${uid('img1')}-item"><img src="${v.image3}" alt=""><div class="${uid('img1')}-overlay"><span class="${uid('img1')}-label">${v.label3}</span><a href="${v.link3}" class="${uid('img1')}-cta">${v.cta3}</a></div></div>
    </div>
  </div>
</div>`
  },
  {
    id: 'image-2',
    name: 'Image with Text Overlay',
    category: 'Gallery',
    description: 'Full width image with centered text',
    thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop',
    fields: [
      { id: 'image', label: 'Background Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&h=600&fit=crop' },
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'New Linen Collection' },
      { id: 'description', label: 'Description', type: 'text', defaultValue: 'Soft, breathable, and beautifully designed for your home' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Shop Now' },
      { id: 'buttonUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
      { id: 'overlayColor', label: 'Overlay Color', type: 'color', defaultValue: '#000000' },
      { id: 'overlayOpacity', label: 'Overlay Opacity (0-100)', type: 'number', defaultValue: '30' },
    ],
    generateHtml: (v) => `<div class="${uid('img2')}" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('img2')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('img2')}-wrap { position: relative; min-height: 500px; display: flex; align-items: center; justify-content: center; text-align: center; background-image: url('${v.image}'); background-size: cover; background-position: center; }
    .${uid('img2')}-overlay { position: absolute; inset: 0; background: ${v.overlayColor}; opacity: ${parseInt(v.overlayOpacity)/100}; }
    .${uid('img2')}-content { position: relative; z-index: 1; padding: 40px; color: #fff; max-width: 700px; }
    .${uid('img2')} h2 { font-size: 48px; font-weight: 700; margin-bottom: 16px; }
    .${uid('img2')} p { font-size: 18px; opacity: 0.9; margin-bottom: 32px; }
    .${uid('img2')} a { display: inline-block; background: #fff; color: #000; padding: 16px 40px; text-decoration: none; font-weight: 600; border-radius: 4px; }
    @media (max-width: 768px) { .${uid('img2')} h2 { font-size: 32px; } }
  </style>
  <div class="${uid('img2')}-wrap">
    <div class="${uid('img2')}-overlay"></div>
    <div class="${uid('img2')}-content">
      <h2>${v.headline}</h2>
      <p>${v.description}</p>
      <a href="${v.buttonUrl}">${v.buttonText}</a>
    </div>
  </div>
</div>`
  },
];

// ========== FOOTER SECTIONS ==========
const footerSections: Section[] = [
  {
    id: 'footer-1',
    name: 'Footer - Simple',
    category: 'Footer',
    description: 'Clean minimal footer with links',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    fields: [
      { id: 'brandName', label: 'Brand Name', type: 'text', defaultValue: 'Brand Name' },
      { id: 'link1', label: 'Link 1', type: 'text', defaultValue: 'Shop' },
      { id: 'link2', label: 'Link 2', type: 'text', defaultValue: 'About' },
      { id: 'link3', label: 'Link 3', type: 'text', defaultValue: 'Contact' },
      { id: 'link4', label: 'Link 4', type: 'text', defaultValue: 'FAQ' },
      { id: 'copyright', label: 'Copyright', type: 'text', defaultValue: '2024 Brand Name. All rights reserved.' },
      { id: 'bgColor', label: 'Background Color', type: 'color', defaultValue: '#0a0a0a' },
    ],
    generateHtml: (v) => `<div class="${uid('foot1')}" style="background:${v.bgColor};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>
    .${uid('foot1')} * { box-sizing: border-box; margin: 0; padding: 0; }
    .${uid('foot1')}-wrap { max-width: 1200px; margin: 0 auto; padding: 60px 40px; }
    .${uid('foot1')}-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 40px; }
    .${uid('foot1')}-brand { font-size: 24px; font-weight: 700; color: #fff; }
    .${uid('foot1')}-links { display: flex; gap: 32px; }
    .${uid('foot1')}-links a { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 14px; transition: color 0.2s; }
    .${uid('foot1')}-links a:hover { color: #fff; }
    .${uid('foot1')}-bottom { text-align: center; color: rgba(255,255,255,0.5); font-size: 13px; }
    @media (max-width: 768px) { .${uid('foot1')}-top { flex-direction: column; gap: 24px; } }
  </style>
  <div class="${uid('foot1')}-wrap">
    <div class="${uid('foot1')}-top">
      <div class="${uid('foot1')}-brand">${v.brandName}</div>
      <nav class="${uid('foot1')}-links">
        <a href="#">${v.link1}</a>
        <a href="#">${v.link2}</a>
        <a href="#">${v.link3}</a>
        <a href="#">${v.link4}</a>
      </nav>
    </div>
    <div class="${uid('foot1')}-bottom">${v.copyright}</div>
  </div>
</div>`
  },
];

// ========== MORE HERO SECTIONS ==========
const moreHeroSections: Section[] = [
  {
    id: 'hero-6',
    name: 'Hero - Minimal Text',
    category: 'Hero',
    description: 'Ultra minimal hero with just headline',
    thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Less is More' },
      { id: 'subtext', label: 'Subtext', type: 'text', defaultValue: 'Discover simplicity' },
      { id: 'link', label: 'Link URL', type: 'url', defaultValue: '#' },
      { id: 'bgColor', label: 'Background', type: 'color', defaultValue: '#f8f8f8' },
    ],
    generateHtml: (v) => `<div class="${uid('hero6')}" style="background:${v.bgColor};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>.${uid('hero6')} * { box-sizing: border-box; margin: 0; padding: 0; } .${uid('hero6')}-wrap { min-height: 60vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 80px 40px; } .${uid('hero6')} h1 { font-size: 64px; font-weight: 300; color: #1a1a1a; letter-spacing: -0.02em; margin-bottom: 16px; } .${uid('hero6')} a { font-size: 14px; color: #666; text-decoration: underline; text-underline-offset: 4px; }</style>
  <div class="${uid('hero6')}-wrap"><h1>${v.headline}</h1><a href="${v.link}">${v.subtext}</a></div>
</div>`
  },
  {
    id: 'hero-7',
    name: 'Hero - Side by Side Images',
    category: 'Hero',
    description: 'Two images side by side with center text',
    thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Spring Collection' },
      { id: 'image1', label: 'Image 1', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=600&fit=crop' },
      { id: 'image2', label: 'Image 2', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=600&fit=crop' },
      { id: 'buttonText', label: 'Button', type: 'text', defaultValue: 'View Collection' },
      { id: 'buttonUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
    ],
    generateHtml: (v) => `<div class="${uid('hero7')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>.${uid('hero7')} * { box-sizing: border-box; margin: 0; padding: 0; } .${uid('hero7')}-wrap { display: flex; align-items: stretch; min-height: 600px; } .${uid('hero7')}-img { flex: 1; } .${uid('hero7')}-img img { width: 100%; height: 100%; object-fit: cover; } .${uid('hero7')}-center { width: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; } .${uid('hero7')} h2 { font-size: 28px; font-weight: 600; margin-bottom: 24px; } .${uid('hero7')} a { background: #000; color: #fff; padding: 14px 28px; text-decoration: none; font-size: 14px; font-weight: 500; } @media (max-width: 768px) { .${uid('hero7')}-wrap { flex-direction: column; } .${uid('hero7')}-center { width: 100%; order: -1; } }</style>
  <div class="${uid('hero7')}-wrap"><div class="${uid('hero7')}-img"><img src="${v.image1}" alt=""></div><div class="${uid('hero7')}-center"><h2>${v.headline}</h2><a href="${v.buttonUrl}">${v.buttonText}</a></div><div class="${uid('hero7')}-img"><img src="${v.image2}" alt=""></div></div>
</div>`
  },
];

// ========== MORE TESTIMONIALS ==========
const moreTestimonials: Section[] = [
  {
    id: 'testimonial-4',
    name: 'Testimonial - Video Style',
    category: 'Testimonials',
    description: 'Video testimonial thumbnails grid',
    thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'In your own words' },
      { id: 'image1', label: 'Video Thumb 1', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop' },
      { id: 'image2', label: 'Video Thumb 2', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop' },
      { id: 'image3', label: 'Video Thumb 3', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop' },
      { id: 'bgColor', label: 'Background', type: 'color', defaultValue: '#fef3c7' },
    ],
    generateHtml: (v) => `<div class="${uid('test4')}" style="background:${v.bgColor};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>.${uid('test4')} * { box-sizing: border-box; margin: 0; padding: 0; } .${uid('test4')}-wrap { padding: 60px 40px; } .${uid('test4')} h2 { text-align: center; font-size: 28px; margin-bottom: 40px; } .${uid('test4')}-grid { display: flex; justify-content: center; gap: 20px; } .${uid('test4')}-item { position: relative; width: 200px; border-radius: 12px; overflow: hidden; } .${uid('test4')}-item img { width: 100%; height: 280px; object-fit: cover; } .${uid('test4')}-play { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.3); } .${uid('test4')}-play span { width: 50px; height: 50px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; } @media (max-width: 768px) { .${uid('test4')}-grid { flex-wrap: wrap; } }</style>
  <div class="${uid('test4')}-wrap"><h2>${v.headline}</h2><div class="${uid('test4')}-grid"><div class="${uid('test4')}-item"><img src="${v.image1}" alt=""><div class="${uid('test4')}-play"><span>▶</span></div></div><div class="${uid('test4')}-item"><img src="${v.image2}" alt=""><div class="${uid('test4')}-play"><span>▶</span></div></div><div class="${uid('test4')}-item"><img src="${v.image3}" alt=""><div class="${uid('test4')}-play"><span>▶</span></div></div></div></div>
</div>`
  },
  {
    id: 'testimonial-5',
    name: 'Testimonial - Big Quote',
    category: 'Testimonials',
    description: 'Large featured testimonial quote',
    thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop',
    fields: [
      { id: 'quote', label: 'Quote', type: 'textarea', defaultValue: 'We have tried about five different platforms before landing on this one. It strikes the perfect balance between having advanced features and keeping it simple enough for new hires to learn in a day.' },
      { id: 'name', label: 'Name', type: 'text', defaultValue: 'Marcus Thorne' },
      { id: 'title', label: 'Title', type: 'text', defaultValue: 'Founder & CEO, Thorne Industries' },
      { id: 'avatar', label: 'Avatar', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop' },
    ],
    generateHtml: (v) => `<div class="${uid('test5')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>.${uid('test5')} * { box-sizing: border-box; margin: 0; padding: 0; } .${uid('test5')}-wrap { max-width: 900px; margin: 0 auto; padding: 100px 40px; text-align: center; } .${uid('test5')} blockquote { font-size: 28px; line-height: 1.5; color: #1a1a1a; margin-bottom: 40px; font-weight: 400; } .${uid('test5')}-author { display: flex; align-items: center; justify-content: center; gap: 16px; } .${uid('test5')}-avatar { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; } .${uid('test5')}-name { font-weight: 600; color: #1a1a1a; } .${uid('test5')}-title { font-size: 14px; color: #666; }</style>
  <div class="${uid('test5')}-wrap"><blockquote>"${v.quote}"</blockquote><div class="${uid('test5')}-author"><img class="${uid('test5')}-avatar" src="${v.avatar}" alt=""><div><div class="${uid('test5')}-name">${v.name}</div><div class="${uid('test5')}-title">${v.title}</div></div></div></div>
</div>`
  },
];

// ========== MORE FEATURES ==========
const moreFeatures: Section[] = [
  {
    id: 'features-3',
    name: 'Features - Stats',
    category: 'Features',
    description: 'Display key statistics',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    fields: [
      { id: 'stat1', label: 'Stat 1 Number', type: 'text', defaultValue: '50K+' },
      { id: 'label1', label: 'Stat 1 Label', type: 'text', defaultValue: 'Happy Customers' },
      { id: 'stat2', label: 'Stat 2 Number', type: 'text', defaultValue: '4.9' },
      { id: 'label2', label: 'Stat 2 Label', type: 'text', defaultValue: 'Average Rating' },
      { id: 'stat3', label: 'Stat 3 Number', type: 'text', defaultValue: '100%' },
      { id: 'label3', label: 'Stat 3 Label', type: 'text', defaultValue: 'Satisfaction' },
      { id: 'stat4', label: 'Stat 4 Number', type: 'text', defaultValue: '24/7' },
      { id: 'label4', label: 'Stat 4 Label', type: 'text', defaultValue: 'Support' },
    ],
    generateHtml: (v) => `<div class="${uid('feat3')}" style="background:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>.${uid('feat3')} * { box-sizing: border-box; margin: 0; padding: 0; } .${uid('feat3')}-wrap { display: flex; justify-content: center; gap: 80px; padding: 60px 40px; max-width: 1200px; margin: 0 auto; } .${uid('feat3')}-stat { text-align: center; } .${uid('feat3')}-num { font-size: 48px; font-weight: 700; color: #fff; margin-bottom: 8px; } .${uid('feat3')}-label { font-size: 14px; color: rgba(255,255,255,0.7); } @media (max-width: 768px) { .${uid('feat3')}-wrap { flex-wrap: wrap; gap: 40px; } .${uid('feat3')}-stat { width: 45%; } }</style>
  <div class="${uid('feat3')}-wrap"><div class="${uid('feat3')}-stat"><div class="${uid('feat3')}-num">${v.stat1}</div><div class="${uid('feat3')}-label">${v.label1}</div></div><div class="${uid('feat3')}-stat"><div class="${uid('feat3')}-num">${v.stat2}</div><div class="${uid('feat3')}-label">${v.label2}</div></div><div class="${uid('feat3')}-stat"><div class="${uid('feat3')}-num">${v.stat3}</div><div class="${uid('feat3')}-label">${v.label3}</div></div><div class="${uid('feat3')}-stat"><div class="${uid('feat3')}-num">${v.stat4}</div><div class="${uid('feat3')}-label">${v.label4}</div></div></div>
</div>`
  },
  {
    id: 'features-4',
    name: 'Features - Horizontal Icons',
    category: 'Features',
    description: 'Horizontal strip of feature icons',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    fields: [
      { id: 'feat1', label: 'Feature 1', type: 'text', defaultValue: 'EASY RETURNS' },
      { id: 'feat2', label: 'Feature 2', type: 'text', defaultValue: 'TRUSTED BY 1000+' },
      { id: 'feat3', label: 'Feature 3', type: 'text', defaultValue: 'FREE SHIPPING' },
      { id: 'bgColor', label: 'Background', type: 'color', defaultValue: '#f5f5f5' },
    ],
    generateHtml: (v) => `<div class="${uid('feat4')}" style="background:${v.bgColor};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>.${uid('feat4')} * { box-sizing: border-box; margin: 0; padding: 0; } .${uid('feat4')}-wrap { display: flex; justify-content: center; gap: 60px; padding: 20px 40px; } .${uid('feat4')}-item { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; letter-spacing: 0.05em; color: #333; } .${uid('feat4')}-dot { width: 6px; height: 6px; background: #333; border-radius: 50%; } @media (max-width: 768px) { .${uid('feat4')}-wrap { flex-direction: column; align-items: center; gap: 16px; } }</style>
  <div class="${uid('feat4')}-wrap"><span class="${uid('feat4')}-item"><span class="${uid('feat4')}-dot"></span>${v.feat1}</span><span class="${uid('feat4')}-item"><span class="${uid('feat4')}-dot"></span>${v.feat2}</span><span class="${uid('feat4')}-item"><span class="${uid('feat4')}-dot"></span>${v.feat3}</span></div>
</div>`
  },
];

// ========== MORE PRODUCT SECTIONS ==========
const moreProducts: Section[] = [
  {
    id: 'product-4',
    name: 'Product - Upsell Card',
    category: 'Product',
    description: 'Cross-sell product recommendation',
    thumbnail: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'PAIR IT WITH:' },
      { id: 'productName', label: 'Product Name', type: 'text', defaultValue: 'Camp Stool' },
      { id: 'discount', label: 'Discount', type: 'text', defaultValue: '20% off' },
      { id: 'message', label: 'Message', type: 'text', defaultValue: 'of this product when pairing' },
      { id: 'price', label: 'Price', type: 'text', defaultValue: 'Add $76.00' },
      { id: 'image', label: 'Product Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=100&h=100&fit=crop' },
    ],
    generateHtml: (v) => `<div class="${uid('prod4')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>.${uid('prod4')} * { box-sizing: border-box; margin: 0; padding: 0; } .${uid('prod4')}-wrap { border: 1px solid #e5e5e5; border-radius: 8px; padding: 20px; max-width: 400px; margin: 20px auto; } .${uid('prod4')}-head { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: #666; margin-bottom: 16px; } .${uid('prod4')}-body { display: flex; gap: 16px; align-items: center; } .${uid('prod4')}-img { width: 80px; height: 80px; border-radius: 8px; object-fit: cover; } .${uid('prod4')}-info { flex: 1; } .${uid('prod4')}-name { font-weight: 600; color: #1a1a1a; margin-bottom: 4px; } .${uid('prod4')}-disc { font-size: 13px; color: #666; } .${uid('prod4')}-disc strong { color: #16a34a; } .${uid('prod4')}-btn { background: #000; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; }</style>
  <div class="${uid('prod4')}-wrap"><div class="${uid('prod4')}-head">${v.headline}</div><div class="${uid('prod4')}-body"><img class="${uid('prod4')}-img" src="${v.image}" alt=""><div class="${uid('prod4')}-info"><div class="${uid('prod4')}-name">${v.productName}</div><div class="${uid('prod4')}-disc"><strong>${v.discount}</strong> ${v.message}</div></div><button class="${uid('prod4')}-btn">${v.price}</button></div></div>
</div>`
  },
  {
    id: 'product-5',
    name: 'Product - Stock Scarcity',
    category: 'Product',
    description: 'Low stock urgency message',
    thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    fields: [
      { id: 'message', label: 'Message', type: 'text', defaultValue: 'Only 3 left in stock - order soon' },
      { id: 'barPercent', label: 'Bar Fill %', type: 'number', defaultValue: '15' },
      { id: 'barColor', label: 'Bar Color', type: 'color', defaultValue: '#ef4444' },
    ],
    generateHtml: (v) => `<div class="${uid('prod5')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>.${uid('prod5')} * { box-sizing: border-box; margin: 0; padding: 0; } .${uid('prod5')}-wrap { padding: 16px 20px; max-width: 400px; margin: 0 auto; } .${uid('prod5')}-msg { font-size: 14px; color: ${v.barColor}; font-weight: 500; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; } .${uid('prod5')}-bar { height: 4px; background: #e5e5e5; border-radius: 2px; overflow: hidden; } .${uid('prod5')}-fill { height: 100%; background: ${v.barColor}; width: ${v.barPercent}%; }</style>
  <div class="${uid('prod5')}-wrap"><div class="${uid('prod5')}-msg">🔥 ${v.message}</div><div class="${uid('prod5')}-bar"><div class="${uid('prod5')}-fill"></div></div></div>
</div>`
  },
  {
    id: 'product-6',
    name: 'Product - Delivery Timer',
    category: 'Product',
    description: 'Estimated delivery date display',
    thumbnail: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop',
    fields: [
      { id: 'orderDate', label: 'Order By Date', type: 'text', defaultValue: '26 Feb - 28 Feb' },
      { id: 'dispatchDate', label: 'Dispatch Date', type: 'text', defaultValue: '23 Feb - 24 Feb' },
      { id: 'deliveryDate', label: 'Delivery Date', type: 'text', defaultValue: '26 Feb - 28 Feb' },
    ],
    generateHtml: (v) => `<div class="${uid('prod6')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>.${uid('prod6')} * { box-sizing: border-box; margin: 0; padding: 0; } .${uid('prod6')}-wrap { padding: 20px; max-width: 500px; margin: 0 auto; } .${uid('prod6')}-est { font-size: 13px; color: #666; margin-bottom: 16px; } .${uid('prod6')}-est strong { color: #1a1a1a; } .${uid('prod6')}-steps { display: flex; justify-content: space-between; position: relative; } .${uid('prod6')}-steps:before { content: ''; position: absolute; top: 12px; left: 40px; right: 40px; height: 2px; background: #e5e5e5; } .${uid('prod6')}-step { text-align: center; position: relative; z-index: 1; } .${uid('prod6')}-icon { width: 24px; height: 24px; background: #22c55e; border-radius: 50%; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 12px; } .${uid('prod6')}-label { font-size: 11px; color: #666; margin-bottom: 4px; } .${uid('prod6')}-date { font-size: 12px; font-weight: 600; color: #1a1a1a; }</style>
  <div class="${uid('prod6')}-wrap"><div class="${uid('prod6')}-est"><strong>${v.deliveryDate}</strong> Estimated arrival</div><div class="${uid('prod6')}-steps"><div class="${uid('prod6')}-step"><div class="${uid('prod6')}-icon">✓</div><div class="${uid('prod6')}-label">Order placed</div><div class="${uid('prod6')}-date">22 Feb</div></div><div class="${uid('prod6')}-step"><div class="${uid('prod6')}-icon">✓</div><div class="${uid('prod6')}-label">Dispatched</div><div class="${uid('prod6')}-date">${v.dispatchDate}</div></div><div class="${uid('prod6')}-step"><div class="${uid('prod6')}-icon">📦</div><div class="${uid('prod6')}-label">Delivered</div><div class="${uid('prod6')}-date">${v.deliveryDate}</div></div></div></div>
</div>`
  },
];

// ========== MORE TRUST SECTIONS ==========
const moreTrust: Section[] = [
  {
    id: 'trust-4',
    name: 'Trust - Guarantee Badge',
    category: 'Trust',
    description: 'Money back guarantee badge',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    fields: [
      { id: 'days', label: 'Days', type: 'text', defaultValue: '30' },
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Money Back Guarantee' },
      { id: 'description', label: 'Description', type: 'text', defaultValue: 'Not satisfied? Return within 30 days for a full refund.' },
    ],
    generateHtml: (v) => `<div class="${uid('trust4')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>.${uid('trust4')} * { box-sizing: border-box; margin: 0; padding: 0; } .${uid('trust4')}-wrap { display: flex; align-items: center; gap: 20px; padding: 24px; max-width: 500px; margin: 0 auto; border: 2px solid #e5e5e5; border-radius: 12px; } .${uid('trust4')}-badge { width: 70px; height: 70px; background: #000; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; } .${uid('trust4')}-days { font-size: 24px; font-weight: 700; line-height: 1; } .${uid('trust4')}-label { font-size: 9px; text-transform: uppercase; } .${uid('trust4')}-content h3 { font-size: 18px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; } .${uid('trust4')}-content p { font-size: 14px; color: #666; }</style>
  <div class="${uid('trust4')}-wrap"><div class="${uid('trust4')}-badge"><span class="${uid('trust4')}-days">${v.days}</span><span class="${uid('trust4')}-label">Day</span></div><div class="${uid('trust4')}-content"><h3>${v.headline}</h3><p>${v.description}</p></div></div>
</div>`
  },
];

// ========== MORE CTA SECTIONS ==========
const moreCTA: Section[] = [
  {
    id: 'cta-4',
    name: 'CTA - Contact Support',
    category: 'CTA',
    description: 'Have questions support CTA',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'Have Questions? We Have Answers.' },
      { id: 'buttonText', label: 'Button Text', type: 'text', defaultValue: 'Contact Us' },
      { id: 'buttonUrl', label: 'Button URL', type: 'url', defaultValue: '#' },
      { id: 'image', label: 'Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop' },
    ],
    generateHtml: (v) => `<div class="${uid('cta4')}" style="background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>.${uid('cta4')} * { box-sizing: border-box; margin: 0; padding: 0; } .${uid('cta4')}-wrap { display: flex; align-items: center; gap: 40px; max-width: 900px; margin: 0 auto; padding: 60px 40px; } .${uid('cta4')}-content { flex: 1; } .${uid('cta4')} h2 { font-size: 32px; font-weight: 700; color: #1a1a1a; margin-bottom: 24px; } .${uid('cta4')} a { display: inline-block; background: #000; color: #fff; padding: 14px 28px; text-decoration: none; font-weight: 500; border-radius: 8px; } .${uid('cta4')}-img { flex: 1; } .${uid('cta4')}-img img { width: 100%; border-radius: 12px; } @media (max-width: 768px) { .${uid('cta4')}-wrap { flex-direction: column; } }</style>
  <div class="${uid('cta4')}-wrap"><div class="${uid('cta4')}-content"><h2>${v.headline}</h2><a href="${v.buttonUrl}">${v.buttonText}</a></div><div class="${uid('cta4')}-img"><img src="${v.image}" alt=""></div></div>
</div>`
  },
];

// ========== MORE COMPARISON ==========
const moreComparison: Section[] = [
  {
    id: 'compare-2',
    name: 'Comparison - Features Check',
    category: 'Comparison',
    description: 'Feature checklist comparison',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    fields: [
      { id: 'headline', label: 'Headline', type: 'text', defaultValue: 'What makes it special?' },
      { id: 'feature1', label: 'Feature 1', type: 'text', defaultValue: 'Soft as a cloud' },
      { id: 'feature2', label: 'Feature 2', type: 'text', defaultValue: 'Optimal Support' },
      { id: 'feature3', label: 'Feature 3', type: 'text', defaultValue: 'Sustainability' },
      { id: 'feature4', label: 'Feature 4', type: 'text', defaultValue: 'Easy care' },
      { id: 'image', label: 'Image', type: 'image', defaultValue: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&h=400&fit=crop' },
    ],
    generateHtml: (v) => `<div class="${uid('cmp2')}" style="background:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <style>.${uid('cmp2')} * { box-sizing: border-box; margin: 0; padding: 0; } .${uid('cmp2')}-wrap { display: flex; align-items: center; gap: 60px; max-width: 1100px; margin: 0 auto; padding: 80px 40px; } .${uid('cmp2')}-content { flex: 1; } .${uid('cmp2')} h2 { font-size: 36px; font-weight: 700; color: #1a1a1a; margin-bottom: 32px; } .${uid('cmp2')}-tabs { display: flex; gap: 12px; margin-bottom: 24px; } .${uid('cmp2')}-tab { padding: 8px 16px; border-radius: 20px; font-size: 13px; background: #f5f5f5; color: #666; } .${uid('cmp2')}-tab.active { background: #000; color: #fff; } .${uid('cmp2')}-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; } .${uid('cmp2')}-item { display: flex; align-items: center; gap: 10px; font-size: 15px; color: #333; } .${uid('cmp2')}-check { color: #22c55e; } .${uid('cmp2')}-img { flex: 1; } .${uid('cmp2')}-img img { width: 100%; border-radius: 16px; } @media (max-width: 768px) { .${uid('cmp2')}-wrap { flex-direction: column; } }</style>
  <div class="${uid('cmp2')}-wrap"><div class="${uid('cmp2')}-content"><div class="${uid('cmp2')}-tabs"><span class="${uid('cmp2')}-tab active">Soft as a cloud</span><span class="${uid('cmp2')}-tab">Optimal Support</span></div><h2>${v.headline}</h2><div class="${uid('cmp2')}-list"><div class="${uid('cmp2')}-item"><span class="${uid('cmp2')}-check">✓</span>${v.feature1}</div><div class="${uid('cmp2')}-item"><span class="${uid('cmp2')}-check">✓</span>${v.feature2}</div><div class="${uid('cmp2')}-item"><span class="${uid('cmp2')}-check">✓</span>${v.feature3}</div><div class="${uid('cmp2')}-item"><span class="${uid('cmp2')}-check">✓</span>${v.feature4}</div></div></div><div class="${uid('cmp2')}-img"><img src="${v.image}" alt=""></div></div>
</div>`
  },
];

// Combine all sections
export const sectionsData: Section[] = [
  ...baseSections,
  ...faqSections,
  ...ctaSections,
  ...comparisonSections,
  ...productSections,
  ...imageSections,
  ...footerSections,
  ...moreHeroSections,
  ...moreTestimonials,
  ...moreFeatures,
  ...moreProducts,
  ...moreTrust,
  ...moreCTA,
  ...moreComparison,
];

export const categories = [
  { id: 'all', name: 'All Sections', count: sectionsData.length },
  { id: 'Hero', name: 'Hero', count: sectionsData.filter(s => s.category === 'Hero').length },
  { id: 'Testimonials', name: 'Testimonials', count: sectionsData.filter(s => s.category === 'Testimonials').length },
  { id: 'Features', name: 'Features', count: sectionsData.filter(s => s.category === 'Features').length },
  { id: 'Trust', name: 'Trust & Social Proof', count: sectionsData.filter(s => s.category === 'Trust').length },
  { id: 'FAQ', name: 'FAQ', count: sectionsData.filter(s => s.category === 'FAQ').length },
  { id: 'CTA', name: 'CTA & Newsletter', count: sectionsData.filter(s => s.category === 'CTA').length },
  { id: 'Comparison', name: 'Comparison', count: sectionsData.filter(s => s.category === 'Comparison').length },
  { id: 'Product', name: 'Product', count: sectionsData.filter(s => s.category === 'Product').length },
  { id: 'Gallery', name: 'Gallery', count: sectionsData.filter(s => s.category === 'Gallery').length },
  { id: 'Footer', name: 'Footer', count: sectionsData.filter(s => s.category === 'Footer').length },
];
