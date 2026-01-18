// Email Templates Data - Premium HTML Email Templates
// Billion-dollar brand level design with customizable hero images
// Each template uses inline CSS for email client compatibility

export interface EmailTemplate {
  id: string;
  name: string;
  category: 'abandoned-cart' | 'welcome' | 'post-purchase' | 'win-back' | 'flash-sale' | 'vip-loyalty';
  timing: string;
  subjectLine: string;
  description: string;
  fields: TemplateField[];
  html: string;
  suggestedImages: string[]; // Suggested hero images for this template type
}

export interface TemplateField {
  key: string;
  label: string;
  type: 'text' | 'color' | 'url' | 'number' | 'select';
  defaultValue: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

// Image library by category
export const imageLibrary = {
  fashion: [
    { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png', label: 'Man in Linen Shirt' },
    { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png', label: 'Woman in Linen Dress' },
    { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png', label: 'Man in Tailored Suit' },
    { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/close-up-shot-of-mans-legs%20(1).png', label: 'Men\'s Shoes Close-up' },
  ],
  beauty: [
    { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Radiant%20Woman%20Portrait.png', label: 'Radiant Woman Portrait' },
    { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Radiant%20Portrait.png', label: 'Beauty Portrait' },
    { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Close-Up%20Portrait%20Duo.png', label: 'Portrait Duo' },
  ],
  lifestyle: [
    { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', label: 'Luxury Flat Lay' },
    { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Solitary%20Cabin%20on%20Hill.png', label: 'Cabin on Hill' },
    { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Farmer%20in%20Strawberry%20Field.png', label: 'Farmer in Field' },
  ],
  jewelry: [
    { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/womans-elegant-hand-with-delicate%20(2).png', label: 'Elegant Hand with Jewelry' },
  ],
  products: [
    { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(11).png', label: 'Product Shot 1' },
    { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(12).png', label: 'Product Shot 2' },
    { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(13).png', label: 'Product Shot 3' },
    { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(14).png', label: 'Product Shot 4' },
    { url: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(15).png', label: 'Product Shot 5' },
  ],
};

// All images flattened for easy access
export const allImages = [
  ...imageLibrary.fashion,
  ...imageLibrary.beauty,
  ...imageLibrary.lifestyle,
  ...imageLibrary.jewelry,
  ...imageLibrary.products,
];

// Common fields used across templates
const commonBrandFields: TemplateField[] = [
  { key: 'brand_name', label: 'Brand Name', type: 'text', defaultValue: 'Your Brand', placeholder: 'e.g., Acme Store' },
  { key: 'logo_url', label: 'Logo URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Quantum%20Scale%20logo%20(12).jpg', placeholder: 'https://...' },
  { key: 'primary_color', label: 'Primary Color', type: 'color', defaultValue: '#000000' },
  { key: 'accent_color', label: 'Accent Color', type: 'color', defaultValue: '#B8860B' },
  { key: 'cta_url', label: 'Button URL', type: 'url', defaultValue: 'https://yourstore.com', placeholder: 'https://yourstore.com' },
];

// Premium email wrapper - billion dollar brand quality
const premiumWrapper = (content: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>{{subject_line}}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style type="text/css">
    body, table, td, p, a {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .fluid { max-width: 100% !important; height: auto !important; }
      .stack-column { display: block !important; width: 100% !important; }
      .mobile-padding { padding: 20px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f8f8f8; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <!-- Preview Text -->
  <div style="display:none; font-size:1px; color:#f8f8f8; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">
    {{preview_text}}
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f8f8f8;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <!-- Email Container -->
        <table role="presentation" class="email-container" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
          ${content}
        </table>

        <!-- Footer -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="margin-top:24px;">
          <tr>
            <td style="padding:24px 40px; text-align:center;">
              <p style="margin:0 0 12px; color:#9ca3af; font-size:13px; line-height:1.6; letter-spacing:0.01em;">
                &copy; 2026 {{brand_name}}. Crafted with care.
              </p>
              <p style="margin:0; font-size:12px;">
                <a href="#" style="color:#6b7280; text-decoration:none; margin:0 8px;">Unsubscribe</a>
                <span style="color:#d1d5db;">|</span>
                <a href="#" style="color:#6b7280; text-decoration:none; margin:0 8px;">View Online</a>
                <span style="color:#d1d5db;">|</span>
                <a href="#" style="color:#6b7280; text-decoration:none; margin:0 8px;">Privacy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// =====================================================
// ABANDONED CART EMAILS (7 templates)
// =====================================================

const abandonedCart1: EmailTemplate = {
  id: 'abandoned-cart-1',
  name: 'Immediate Recovery',
  category: 'abandoned-cart',
  timing: '2 hours after abandonment',
  subjectLine: "Your cart is waiting for you",
  description: 'First touchpoint - reassuring and elegant',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'product_name', label: 'Product Name', type: 'text', defaultValue: 'your selection', placeholder: 'e.g., The Linen Collection' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'We saved your favorites. Complete your order today.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Complete My Order' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="{{brand_name}}" style="display:block; width:100%; height:auto; max-height:400px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h1 style="margin:0 0 16px; font-size:32px; font-weight:600; color:{{primary_color}}; line-height:1.2; letter-spacing:-0.02em;">
                Your cart is waiting
              </h1>
              <p style="margin:0 0 32px; font-size:17px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, we noticed you left {{product_name}} behind. No worries—we've kept everything safe for you.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const abandonedCart2: EmailTemplate = {
  id: 'abandoned-cart-2',
  name: 'Gentle Reminder',
  category: 'abandoned-cart',
  timing: '24 hours after abandonment',
  subjectLine: 'Still thinking about it?',
  description: 'Soft nudge with social proof element',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'product_name', label: 'Product Name', type: 'text', defaultValue: 'your favorites', placeholder: 'e.g., Summer Essentials' },
    { key: 'review_count', label: 'Review Count', type: 'text', defaultValue: '2,500+', placeholder: 'e.g., 1,000+' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your items are selling fast. Don\'t miss out.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Return to Cart' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="{{brand_name}}" style="display:block; width:100%; height:auto; max-height:420px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <p style="margin:0 0 8px; font-size:13px; color:#9ca3af; text-transform:uppercase; letter-spacing:0.1em; font-weight:500;">
                Still on your mind?
              </p>
              <h1 style="margin:0 0 20px; font-size:30px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Your {{product_name}} await
              </h1>
              <p style="margin:0 0 24px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, great taste! These items have {{review_count}} five-star reviews from customers who love them.
              </p>

              <!-- Social Proof -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:20px 24px; background:#fafafa; border-radius:12px;">
                    <p style="margin:0; font-size:14px; color:#6b7280; font-style:italic; line-height:1.6;">
                      "Absolutely love the quality. Worth every penny!" — Verified Buyer ⭐⭐⭐⭐⭐
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const abandonedCart3: EmailTemplate = {
  id: 'abandoned-cart-3',
  name: 'Value Reminder',
  category: 'abandoned-cart',
  timing: '48 hours after abandonment',
  subjectLine: 'There\'s more to love than you think',
  description: 'Highlight product value and benefits',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(11).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'benefit_1', label: 'Benefit 1', type: 'text', defaultValue: 'Premium materials that last', placeholder: 'e.g., Fast shipping' },
    { key: 'benefit_2', label: 'Benefit 2', type: 'text', defaultValue: 'Free shipping on all orders', placeholder: 'e.g., Easy returns' },
    { key: 'benefit_3', label: 'Benefit 3', type: 'text', defaultValue: '30-day hassle-free returns', placeholder: 'e.g., Warranty' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Here\'s why you\'ll love your purchase.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'View My Cart' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="{{brand_name}}" style="display:block; width:100%; height:auto; max-height:380px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h1 style="margin:0 0 16px; font-size:30px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                More than meets the eye
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, here's why you'll love your purchase:
              </p>

              <!-- Benefits List -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:16px 0; border-bottom:1px solid #f3f4f6;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width:32px; vertical-align:top;">
                          <span style="display:inline-block; width:24px; height:24px; background:{{accent_color}}; border-radius:50%; color:#fff; font-size:14px; line-height:24px; text-align:center;">✓</span>
                        </td>
                        <td style="padding-left:12px; font-size:15px; color:#374151; line-height:1.5;">{{benefit_1}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0; border-bottom:1px solid #f3f4f6;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width:32px; vertical-align:top;">
                          <span style="display:inline-block; width:24px; height:24px; background:{{accent_color}}; border-radius:50%; color:#fff; font-size:14px; line-height:24px; text-align:center;">✓</span>
                        </td>
                        <td style="padding-left:12px; font-size:15px; color:#374151; line-height:1.5;">{{benefit_2}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width:32px; vertical-align:top;">
                          <span style="display:inline-block; width:24px; height:24px; background:{{accent_color}}; border-radius:50%; color:#fff; font-size:14px; line-height:24px; text-align:center;">✓</span>
                        </td>
                        <td style="padding-left:12px; font-size:15px; color:#374151; line-height:1.5;">{{benefit_3}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const abandonedCart4: EmailTemplate = {
  id: 'abandoned-cart-4',
  name: 'Special Gift',
  category: 'abandoned-cart',
  timing: '72 hours after abandonment',
  subjectLine: 'A little something for you: {{discount_percent}}% OFF',
  description: 'First discount offer - creates urgency',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '10', placeholder: 'e.g., 15' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'SAVE10', placeholder: 'e.g., WELCOME15' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'We have a special offer just for you.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Claim My Discount' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Discount Banner -->
          <tr>
            <td style="padding:0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:{{primary_color}};">
                <tr>
                  <td style="padding:40px 56px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:14px; color:rgba(255,255,255,0.7); text-transform:uppercase; letter-spacing:0.15em; font-weight:500;">
                      Exclusive Offer
                    </p>
                    <p style="margin:0; font-size:56px; font-weight:700; color:#ffffff; letter-spacing:-0.03em;">
                      {{discount_percent}}% OFF
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="{{brand_name}}" style="display:block; width:100%; height:auto; max-height:300px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                A gift, just for you
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, we really want you to have this. Use code <strong style="color:{{primary_color}};">{{discount_code}}</strong> at checkout.
              </p>

              <!-- Code Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:24px; background:#f9fafb; border:2px dashed #e5e7eb; border-radius:12px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:12px; color:#9ca3af; text-transform:uppercase; letter-spacing:0.1em;">Your Code</p>
                    <p style="margin:0; font-size:28px; font-weight:700; color:{{primary_color}}; letter-spacing:0.05em;">{{discount_code}}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}}; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const abandonedCart5: EmailTemplate = {
  id: 'abandoned-cart-5',
  name: 'Best Sellers',
  category: 'abandoned-cart',
  timing: '3 days after abandonment',
  subjectLine: 'See what others are loving',
  description: 'Social proof with popular products',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Our most-loved items are waiting for you.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Shop Best Sellers' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="{{brand_name}}" style="display:block; width:100%; height:auto; max-height:450px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <p style="margin:0 0 8px; font-size:13px; color:#9ca3af; text-transform:uppercase; letter-spacing:0.1em; font-weight:500;">
                Customer Favorites
              </p>
              <h1 style="margin:0 0 16px; font-size:30px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                What everyone's talking about
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, curious what others are buying? These are our most-loved items this season.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const abandonedCart6: EmailTemplate = {
  id: 'abandoned-cart-6',
  name: 'Friendly Reminder',
  category: 'abandoned-cart',
  timing: '4 days after abandonment',
  subjectLine: 'Your discount is still waiting',
  description: 'Reminder about expiring discount',
  suggestedImages: imageLibrary.beauty.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Radiant%20Woman%20Portrait.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'SAVE10', placeholder: 'e.g., WELCOME15' },
    { key: 'hours_left', label: 'Hours Left', type: 'text', defaultValue: '24', placeholder: 'e.g., 48' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Don\'t let your discount expire.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Use My Discount' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="{{brand_name}}" style="display:block; width:100%; height:auto; max-height:400px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <p style="margin:0 0 8px; font-size:13px; color:#dc2626; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">
                ⏰ Expires in {{hours_left}} hours
              </p>
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Your discount is waiting
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, just a friendly reminder that your code <strong style="color:{{primary_color}};">{{discount_code}}</strong> is about to expire. Don't miss out!
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}}; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const abandonedCart7: EmailTemplate = {
  id: 'abandoned-cart-7',
  name: 'No Pressure Goodbye',
  category: 'abandoned-cart',
  timing: '5 days after abandonment',
  subjectLine: 'No worries, we\'ll be here',
  description: 'Final touchpoint - respectful close',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Solitary%20Cabin%20on%20Hill.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'We\'re here whenever you\'re ready.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Maybe Later' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="{{brand_name}}" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                No pressure at all
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7; max-width:400px; display:inline-block;">
                Hey {{customer_name}}, we understand—timing isn't always right. We'll be here whenever you're ready. No hard feelings. 💛
              </p>

              <!-- Secondary CTA -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; border:2px solid {{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:14px 32px; font-size:14px; font-weight:600; color:{{primary_color}}; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

// =====================================================
// WELCOME EMAIL (1 template)
// =====================================================

const welcome1: EmailTemplate = {
  id: 'welcome-1',
  name: 'The Warm Welcome',
  category: 'welcome',
  timing: 'Immediately after signup',
  subjectLine: 'Welcome to {{brand_name}} ✨',
  description: 'First impression - brand introduction with discount',
  suggestedImages: imageLibrary.beauty.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Radiant%20Woman%20Portrait.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '15', placeholder: 'e.g., 10' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'WELCOME15', placeholder: 'e.g., WELCOME10' },
    { key: 'brand_tagline', label: 'Brand Tagline', type: 'text', defaultValue: 'Crafted for those who appreciate the finer things.', placeholder: 'Your brand tagline' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Welcome to the family. Here\'s a gift for you.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Start Shopping' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Welcome to {{brand_name}}" style="display:block; width:100%; height:auto; max-height:450px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <p style="margin:0 0 8px; font-size:13px; color:{{accent_color}}; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">
                Welcome to the family
              </p>
              <h1 style="margin:0 0 16px; font-size:32px; font-weight:600; color:{{primary_color}}; line-height:1.2; letter-spacing:-0.02em;">
                We're so glad you're here
              </h1>
              <p style="margin:0 0 8px; font-size:17px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, welcome to {{brand_name}}.
              </p>
              <p style="margin:0 0 32px; font-size:16px; color:#6b7280; line-height:1.7; font-style:italic;">
                {{brand_tagline}}
              </p>

              <!-- Discount Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:32px; background:{{primary_color}}; border-radius:16px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:14px; color:rgba(255,255,255,0.7); text-transform:uppercase; letter-spacing:0.1em;">Your Welcome Gift</p>
                    <p style="margin:0 0 16px; font-size:48px; font-weight:700; color:#ffffff; letter-spacing:-0.02em;">{{discount_percent}}% OFF</p>
                    <p style="margin:0; font-size:18px; color:#ffffff; letter-spacing:0.1em; font-weight:600;">{{discount_code}}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}}; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

// =====================================================
// POST-PURCHASE EMAILS (3 templates)
// =====================================================

const postPurchase1: EmailTemplate = {
  id: 'post-purchase-1',
  name: 'Order Confirmation',
  category: 'post-purchase',
  timing: 'Immediately after purchase',
  subjectLine: 'Order confirmed! 🎉',
  description: 'Order confirmation with excitement',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'order_number', label: 'Order Number', type: 'text', defaultValue: '#12345', placeholder: 'e.g., #67890' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your order is confirmed and on its way!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Track My Order' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Success Banner -->
          <tr>
            <td style="padding:48px 56px; background:linear-gradient(135deg, #10b981 0%, #059669 100%); text-align:center;">
              <p style="margin:0 0 8px; font-size:48px;">✓</p>
              <h1 style="margin:0 0 8px; font-size:28px; font-weight:600; color:#ffffff; letter-spacing:-0.01em;">
                Order Confirmed!
              </h1>
              <p style="margin:0; font-size:15px; color:rgba(255,255,255,0.9);">
                Order {{order_number}}
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <p style="margin:0 0 24px; font-size:17px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, great news! Your order has been confirmed and we're getting it ready for you.
              </p>

              <p style="margin:0 0 32px; font-size:15px; color:#6b7280; line-height:1.7;">
                You'll receive another email with tracking information once your order ships. We can't wait for you to receive it!
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const postPurchase2: EmailTemplate = {
  id: 'post-purchase-2',
  name: 'Shipping Notification',
  category: 'post-purchase',
  timing: 'When order ships',
  subjectLine: 'Your order is on its way! 📦',
  description: 'Shipping notification with tracking',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'delivery_date', label: 'Estimated Delivery', type: 'text', defaultValue: 'January 25-27', placeholder: 'e.g., March 15-17' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your package is on its way!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Track Package' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Shipping Banner -->
          <tr>
            <td style="padding:48px 56px; background:{{primary_color}}; text-align:center;">
              <p style="margin:0 0 8px; font-size:40px;">📦</p>
              <h1 style="margin:0 0 8px; font-size:26px; font-weight:600; color:#ffffff; letter-spacing:-0.01em;">
                Your order is on its way!
              </h1>
              <p style="margin:0; font-size:15px; color:rgba(255,255,255,0.8);">
                Estimated delivery: {{delivery_date}}
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <p style="margin:0 0 32px; font-size:17px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, exciting news! Your package has shipped and is headed your way. Track it below to see exactly where it is.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}}; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const postPurchase3: EmailTemplate = {
  id: 'post-purchase-3',
  name: 'Review Request',
  category: 'post-purchase',
  timing: '7 days after delivery',
  subjectLine: 'How are you enjoying your purchase?',
  description: 'Request for product review',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'product_name', label: 'Product Name', type: 'text', defaultValue: 'your recent purchase', placeholder: 'e.g., The Linen Dress' },
    { key: 'review_incentive', label: 'Review Incentive', type: 'text', defaultValue: '10% off your next order', placeholder: 'e.g., Free shipping' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'We\'d love to hear your thoughts!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Write a Review' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="{{brand_name}}" style="display:block; width:100%; height:auto; max-height:400px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                How are you loving it?
              </h1>
              <p style="margin:0 0 24px; font-size:16px; color:#4b5563; line-height:1.7; max-width:420px; display:inline-block;">
                Hey {{customer_name}}, we hope you're enjoying {{product_name}}! Your feedback helps others discover what they'll love.
              </p>

              <!-- Stars -->
              <p style="margin:0 0 24px; font-size:32px; letter-spacing:8px;">⭐⭐⭐⭐⭐</p>

              <!-- Incentive -->
              <p style="margin:0 0 32px; font-size:14px; color:#6b7280;">
                Leave a review and get <strong style="color:{{accent_color}};">{{review_incentive}}</strong>
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

// =====================================================
// WIN-BACK EMAILS (4 templates)
// =====================================================

const winBack1: EmailTemplate = {
  id: 'win-back-1',
  name: 'We Miss You',
  category: 'win-back',
  timing: '30 days inactive',
  subjectLine: 'We miss you! Come back for something special',
  description: 'Warm reconnection message',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '20', placeholder: 'e.g., 15' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'MISSYOU20', placeholder: 'e.g., COMEBACK15' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'It\'s been a while! Here\'s something special.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Reconnect Now' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="{{brand_name}}" style="display:block; width:100%; height:auto; max-height:420px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h1 style="margin:0 0 16px; font-size:30px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                It's been too long
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, we've missed you around here. A lot has changed since your last visit—come see what's new with {{discount_percent}}% off.
              </p>

              <!-- Code Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:24px; background:#fef3c7; border-radius:12px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:12px; color:#92400e; text-transform:uppercase; letter-spacing:0.1em;">Welcome Back Gift</p>
                    <p style="margin:0; font-size:24px; font-weight:700; color:#92400e; letter-spacing:0.03em;">{{discount_code}}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}}; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const winBack2: EmailTemplate = {
  id: 'win-back-2',
  name: 'What\'s New',
  category: 'win-back',
  timing: '45 days inactive',
  subjectLine: 'So much has changed since you\'ve been away',
  description: 'Showcase new arrivals and changes',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(12).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'See what\'s new at {{brand_name}}.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Explore New Arrivals' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="New Arrivals" style="display:block; width:100%; height:auto; max-height:420px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <p style="margin:0 0 8px; font-size:13px; color:{{accent_color}}; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">
                New Arrivals
              </p>
              <h1 style="margin:0 0 16px; font-size:30px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                You won't believe what's new
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, we've been busy! Fresh styles, new favorites, and pieces you'll love. Come see what's waiting for you.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const winBack3: EmailTemplate = {
  id: 'win-back-3',
  name: 'Exclusive Return Offer',
  category: 'win-back',
  timing: '60 days inactive',
  subjectLine: 'Your exclusive offer expires soon',
  description: 'Stronger incentive with urgency',
  suggestedImages: imageLibrary.jewelry.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/womans-elegant-hand-with-delicate%20(2).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '25', placeholder: 'e.g., 20' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'EXCLUSIVE25', placeholder: 'e.g., VIP20' },
    { key: 'days_left', label: 'Days Left', type: 'text', defaultValue: '3', placeholder: 'e.g., 5' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'An exclusive offer just for you—expires soon.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Claim My Offer' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Urgency Banner -->
          <tr>
            <td style="padding:16px 40px; background:#fef2f2; text-align:center;">
              <p style="margin:0; font-size:14px; color:#dc2626; font-weight:600;">
                ⏰ Only {{days_left}} days left to claim your offer
              </p>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="{{brand_name}}" style="display:block; width:100%; height:auto; max-height:380px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <p style="margin:0 0 8px; font-size:13px; color:#dc2626; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">
                Exclusive Offer
              </p>
              <h1 style="margin:0 0 16px; font-size:30px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                {{discount_percent}}% off, just for you
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, we really want you back. This is our best offer yet—use code <strong>{{discount_code}}</strong> before it expires.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:#dc2626; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const winBack4: EmailTemplate = {
  id: 'win-back-4',
  name: 'Last Chance Goodbye',
  category: 'win-back',
  timing: '90 days inactive',
  subjectLine: 'Is this goodbye?',
  description: 'Final attempt before sunset',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Solitary%20Cabin%20on%20Hill.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'We\'ll miss you if you go.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Stay Connected' },
    { key: 'unsubscribe_text', label: 'Unsubscribe Text', type: 'text', defaultValue: 'Unsubscribe', placeholder: 'e.g., Let me go' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="{{brand_name}}" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Is this goodbye?
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7; max-width:420px; display:inline-block;">
                Hey {{customer_name}}, we noticed it's been a while. We'd hate to see you go, but we understand if our emails aren't for you anymore.
              </p>

              <!-- Two Buttons -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="padding-right:12px;">
                    <a href="{{cta_url}}" style="display:inline-block; padding:14px 28px; font-size:14px; font-weight:600; color:#ffffff; background:{{accent_color}}; text-decoration:none; border-radius:8px;">
                      {{cta_text}}
                    </a>
                  </td>
                  <td>
                    <a href="#" style="display:inline-block; padding:14px 28px; font-size:14px; font-weight:600; color:#6b7280; background:#f3f4f6; text-decoration:none; border-radius:8px;">
                      {{unsubscribe_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

// =====================================================
// WELCOME SERIES (7 more templates)
// =====================================================

const welcome2: EmailTemplate = {
  id: 'welcome-2',
  name: 'Our Story',
  category: 'welcome',
  timing: '2 days after signup',
  subjectLine: 'The story behind {{brand_name}}',
  description: 'Brand origin story and values',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Solitary%20Cabin%20on%20Hill.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'founder_name', label: 'Founder Name', type: 'text', defaultValue: 'Sarah', placeholder: 'e.g., John' },
    { key: 'founding_year', label: 'Founding Year', type: 'text', defaultValue: '2020', placeholder: 'e.g., 2018' },
    { key: 'brand_mission', label: 'Brand Mission', type: 'text', defaultValue: 'to create products that make everyday moments extraordinary', placeholder: 'Your mission statement' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'How it all began...', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Explore Our Collection' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Our Story" style="display:block; width:100%; height:auto; max-height:400px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <p style="margin:0 0 8px; font-size:13px; color:{{accent_color}}; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">
                Our Story
              </p>
              <h1 style="margin:0 0 24px; font-size:30px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                How it all began
              </h1>
              <p style="margin:0 0 20px; font-size:16px; color:#4b5563; line-height:1.8;">
                Hey {{customer_name}},
              </p>
              <p style="margin:0 0 20px; font-size:16px; color:#4b5563; line-height:1.8;">
                Back in {{founding_year}}, I started {{brand_name}} with a simple belief: {{brand_mission}}.
              </p>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.8;">
                Every product we create is a reflection of that vision. We're not just building a brand—we're building something meaningful, one customer at a time.
              </p>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.8; font-style:italic;">
                — {{founder_name}}, Founder
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const welcome3: EmailTemplate = {
  id: 'welcome-3',
  name: 'Best Sellers Showcase',
  category: 'welcome',
  timing: '4 days after signup',
  subjectLine: 'Our customers\' favorites',
  description: 'Social proof with top products',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'product_1', label: 'Best Seller #1', type: 'text', defaultValue: 'The Classic Collection', placeholder: 'Product name' },
    { key: 'product_2', label: 'Best Seller #2', type: 'text', defaultValue: 'Summer Essentials', placeholder: 'Product name' },
    { key: 'product_3', label: 'Best Seller #3', type: 'text', defaultValue: 'Limited Edition Set', placeholder: 'Product name' },
    { key: 'review_count', label: 'Total Reviews', type: 'text', defaultValue: '10,000+', placeholder: 'e.g., 5,000+' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'See what everyone is loving right now.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Shop Best Sellers' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Best Sellers" style="display:block; width:100%; height:auto; max-height:400px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <p style="margin:0 0 8px; font-size:13px; color:{{accent_color}}; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">
                Customer Favorites
              </p>
              <h1 style="margin:0 0 16px; font-size:30px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                What everyone's loving
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, with {{review_count}} five-star reviews, these are the products our customers can't stop talking about.
              </p>

              <!-- Products List -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:16px 20px; background:#fafafa; border-radius:12px; margin-bottom:12px;">
                    <p style="margin:0; font-size:15px; color:{{primary_color}}; font-weight:600;">⭐ {{product_1}}</p>
                  </td>
                </tr>
                <tr><td style="height:12px;"></td></tr>
                <tr>
                  <td style="padding:16px 20px; background:#fafafa; border-radius:12px;">
                    <p style="margin:0; font-size:15px; color:{{primary_color}}; font-weight:600;">⭐ {{product_2}}</p>
                  </td>
                </tr>
                <tr><td style="height:12px;"></td></tr>
                <tr>
                  <td style="padding:16px 20px; background:#fafafa; border-radius:12px;">
                    <p style="margin:0; font-size:15px; color:{{primary_color}}; font-weight:600;">⭐ {{product_3}}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}}; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const welcome4: EmailTemplate = {
  id: 'welcome-4',
  name: 'Founder\'s Note',
  category: 'welcome',
  timing: '5 days after signup',
  subjectLine: 'A personal note from our founder',
  description: 'Personal connection from founder',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'founder_name', label: 'Founder Name', type: 'text', defaultValue: 'Sarah', placeholder: 'e.g., John' },
    { key: 'personal_message', label: 'Personal Message', type: 'text', defaultValue: 'I started this company because I believed everyone deserves access to quality products that make them feel confident and inspired.', placeholder: 'Your personal message' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'A message from our founder, just for you.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Get to Know Us' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:56px;">
              <p style="margin:0 0 8px; font-size:13px; color:{{accent_color}}; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">
                From the Founder
              </p>
              <h1 style="margin:0 0 32px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                A personal note for you
              </h1>

              <div style="padding:32px; background:#fafafa; border-radius:16px; border-left:4px solid {{accent_color}};">
                <p style="margin:0 0 20px; font-size:17px; color:#4b5563; line-height:1.8; font-style:italic;">
                  "Hey {{customer_name}},
                </p>
                <p style="margin:0 0 20px; font-size:17px; color:#4b5563; line-height:1.8; font-style:italic;">
                  {{personal_message}}
                </p>
                <p style="margin:0 0 20px; font-size:17px; color:#4b5563; line-height:1.8; font-style:italic;">
                  Thank you for being here. You're not just a customer—you're part of our story now.
                </p>
                <p style="margin:0; font-size:17px; color:#4b5563; line-height:1.8; font-style:italic;">
                  With gratitude,<br>
                  {{founder_name}}"
                </p>
              </div>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:32px;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const welcome5: EmailTemplate = {
  id: 'welcome-5',
  name: 'How to Shop Guide',
  category: 'welcome',
  timing: '6 days after signup',
  subjectLine: 'Your guide to shopping with us',
  description: 'Education and category walkthrough',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(14).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'category_1', label: 'Category 1', type: 'text', defaultValue: 'New Arrivals', placeholder: 'e.g., Dresses' },
    { key: 'category_2', label: 'Category 2', type: 'text', defaultValue: 'Best Sellers', placeholder: 'e.g., Accessories' },
    { key: 'category_3', label: 'Category 3', type: 'text', defaultValue: 'Sale', placeholder: 'e.g., Shoes' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Everything you need to know about shopping with us.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Start Exploring' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="How to Shop" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Your shopping guide
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, let us show you around! Here's how to find exactly what you're looking for.
              </p>

              <!-- Categories -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:20px; background:{{primary_color}}; border-radius:12px; text-align:center; margin-bottom:12px;">
                    <p style="margin:0; font-size:16px; color:#ffffff; font-weight:600;">{{category_1}}</p>
                  </td>
                </tr>
                <tr><td style="height:12px;"></td></tr>
                <tr>
                  <td style="padding:20px; background:{{primary_color}}; border-radius:12px; text-align:center;">
                    <p style="margin:0; font-size:16px; color:#ffffff; font-weight:600;">{{category_2}}</p>
                  </td>
                </tr>
                <tr><td style="height:12px;"></td></tr>
                <tr>
                  <td style="padding:20px; background:{{accent_color}}; border-radius:12px; text-align:center;">
                    <p style="margin:0; font-size:16px; color:#ffffff; font-weight:600;">{{category_3}}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}}; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const welcome6: EmailTemplate = {
  id: 'welcome-6',
  name: 'Quiz Invite',
  category: 'welcome',
  timing: '7 days after signup',
  subjectLine: 'Find your perfect match',
  description: 'Product quiz invitation',
  suggestedImages: imageLibrary.beauty.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Radiant%20Woman%20Portrait.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'product_type', label: 'Product Type', type: 'text', defaultValue: 'products', placeholder: 'e.g., skincare routine' },
    { key: 'quiz_time', label: 'Quiz Duration', type: 'text', defaultValue: '2 minutes', placeholder: 'e.g., 60 seconds' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Take our quick quiz to find your perfect match.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Take the Quiz' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Find Your Match" style="display:block; width:100%; height:auto; max-height:420px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <p style="margin:0 0 8px; font-size:13px; color:{{accent_color}}; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">
                Personalized For You
              </p>
              <h1 style="margin:0 0 16px; font-size:30px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Find your perfect {{product_type}}
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7; max-width:420px; display:inline-block;">
                Hey {{customer_name}}, not sure where to start? Take our {{quiz_time}} quiz and we'll recommend the perfect {{product_type}} just for you.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:50px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:18px 48px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const welcome7: EmailTemplate = {
  id: 'welcome-7',
  name: 'Community Welcome',
  category: 'welcome',
  timing: '8 days after signup',
  subjectLine: 'Join our community',
  description: 'Social media and UGC invitation',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Farmer%20in%20Strawberry%20Field.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'instagram_handle', label: 'Instagram Handle', type: 'text', defaultValue: '@yourbrand', placeholder: '@yourbrand' },
    { key: 'hashtag', label: 'Brand Hashtag', type: 'text', defaultValue: '#YourBrandName', placeholder: '#YourBrandName' },
    { key: 'community_size', label: 'Community Size', type: 'text', defaultValue: '50,000+', placeholder: 'e.g., 25,000+' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Join thousands of others in our community.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Follow Us' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Join Our Community" style="display:block; width:100%; height:auto; max-height:400px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <p style="margin:0 0 8px; font-size:13px; color:{{accent_color}}; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">
                {{community_size}} Strong
              </p>
              <h1 style="margin:0 0 16px; font-size:30px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                You're part of something bigger
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7; max-width:420px; display:inline-block;">
                Hey {{customer_name}}, join {{community_size}} others who share their style with {{hashtag}}. Follow us at {{instagram_handle}} for inspiration, behind-the-scenes, and exclusive drops.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const welcome8: EmailTemplate = {
  id: 'welcome-8',
  name: 'Last Chance First-Timer',
  category: 'welcome',
  timing: '10 days after signup',
  subjectLine: 'Your welcome discount expires soon ⏰',
  description: 'Urgency for expiring welcome discount',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '15', placeholder: 'e.g., 10' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'WELCOME15', placeholder: 'e.g., WELCOME10' },
    { key: 'hours_left', label: 'Hours Left', type: 'text', defaultValue: '24', placeholder: 'e.g., 48' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Don\'t miss your welcome discount!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Use My Discount' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Urgency Banner -->
          <tr>
            <td style="padding:16px 40px; background:#fef2f2; text-align:center;">
              <p style="margin:0; font-size:14px; color:#dc2626; font-weight:600;">
                ⏰ Only {{hours_left}} hours left!
              </p>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Last Chance" style="display:block; width:100%; height:auto; max-height:400px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Your {{discount_percent}}% off is expiring
              </h1>
              <p style="margin:0 0 24px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, this is your last chance to use your welcome discount. Don't let it slip away!
              </p>

              <!-- Code Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:24px; background:#fef2f2; border:2px solid #fecaca; border-radius:12px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:12px; color:#dc2626; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">Expiring Soon</p>
                    <p style="margin:0; font-size:28px; font-weight:700; color:#dc2626; letter-spacing:0.05em;">{{discount_code}}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:#dc2626; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

// =====================================================
// ABANDONED CART (1 more template)
// =====================================================

const abandonedCart8: EmailTemplate = {
  id: 'abandoned-cart-8',
  name: 'Price Drop Alert',
  category: 'abandoned-cart',
  timing: '7 days after abandonment',
  subjectLine: 'Good news: Price dropped on your cart!',
  description: 'Notify about price reduction on cart items',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'product_name', label: 'Product Name', type: 'text', defaultValue: 'your favorites', placeholder: 'e.g., The Classic Tee' },
    { key: 'old_price', label: 'Original Price', type: 'text', defaultValue: '$89', placeholder: 'e.g., $79' },
    { key: 'new_price', label: 'New Price', type: 'text', defaultValue: '$69', placeholder: 'e.g., $59' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'The items in your cart just went on sale!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Get It Now' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Price Drop Banner -->
          <tr>
            <td style="padding:24px 40px; background:linear-gradient(135deg, #10b981 0%, #059669 100%); text-align:center;">
              <p style="margin:0; font-size:18px; color:#ffffff; font-weight:600;">
                💰 Price Drop Alert!
              </p>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Price Drop" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Good news about your cart!
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, {{product_name}} you were looking at just dropped in price!
              </p>

              <!-- Price Comparison -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:24px; background:#f0fdf4; border-radius:12px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:14px; color:#6b7280; text-decoration:line-through;">Was {{old_price}}</p>
                    <p style="margin:0; font-size:36px; font-weight:700; color:#059669;">Now {{new_price}}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:#059669; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

// =====================================================
// POST-PURCHASE (7 more templates)
// =====================================================

const postPurchase4: EmailTemplate = {
  id: 'post-purchase-4',
  name: 'Delivery Celebration',
  category: 'post-purchase',
  timing: 'On delivery',
  subjectLine: 'It\'s here! Your order has arrived 🎉',
  description: 'Celebrate package arrival',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your package has arrived!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Share Your Unboxing' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Celebration Banner -->
          <tr>
            <td style="padding:56px; background:linear-gradient(135deg, {{accent_color}} 0%, {{primary_color}} 100%); text-align:center;">
              <p style="margin:0 0 16px; font-size:56px;">🎉</p>
              <h1 style="margin:0 0 8px; font-size:32px; font-weight:600; color:#ffffff; letter-spacing:-0.01em;">
                It's here!
              </h1>
              <p style="margin:0; font-size:16px; color:rgba(255,255,255,0.9);">
                Your order has been delivered
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <p style="margin:0 0 32px; font-size:17px; color:#4b5563; line-height:1.7; max-width:420px; display:inline-block;">
                Hey {{customer_name}}, your package has arrived! We hope you love everything. Share your unboxing moment with us!
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const postPurchase5: EmailTemplate = {
  id: 'post-purchase-5',
  name: 'How to Use Guide',
  category: 'post-purchase',
  timing: '+2 days after delivery',
  subjectLine: 'Get the most out of your purchase',
  description: 'Product education and tips',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(15).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'product_name', label: 'Product Name', type: 'text', defaultValue: 'your new purchase', placeholder: 'e.g., The Classic Tee' },
    { key: 'tip_1', label: 'Tip 1', type: 'text', defaultValue: 'Machine wash cold, tumble dry low', placeholder: 'Care tip' },
    { key: 'tip_2', label: 'Tip 2', type: 'text', defaultValue: 'Store in a cool, dry place', placeholder: 'Care tip' },
    { key: 'tip_3', label: 'Tip 3', type: 'text', defaultValue: 'Pair with your favorite accessories', placeholder: 'Style tip' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Tips to get the most from your purchase.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'View Full Guide' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="How to Use" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <p style="margin:0 0 8px; font-size:13px; color:{{accent_color}}; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">
                Pro Tips
              </p>
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Get the most from {{product_name}}
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, here are some tips to help you love your purchase even more:
              </p>

              <!-- Tips List -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:16px 20px; background:#fafafa; border-radius:8px; margin-bottom:8px;">
                    <p style="margin:0; font-size:15px; color:#374151;">💡 {{tip_1}}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:16px 20px; background:#fafafa; border-radius:8px;">
                    <p style="margin:0; font-size:15px; color:#374151;">💡 {{tip_2}}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:16px 20px; background:#fafafa; border-radius:8px;">
                    <p style="margin:0; font-size:15px; color:#374151;">💡 {{tip_3}}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const postPurchase6: EmailTemplate = {
  id: 'post-purchase-6',
  name: 'Share & Earn (Referral)',
  category: 'post-purchase',
  timing: '+10 days after delivery',
  subjectLine: 'Share the love, get rewarded',
  description: 'Referral program invitation',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Farmer%20in%20Strawberry%20Field.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'referral_reward', label: 'Your Reward', type: 'text', defaultValue: '$20 credit', placeholder: 'e.g., 15% off' },
    { key: 'friend_reward', label: 'Friend Gets', type: 'text', defaultValue: '$20 off', placeholder: 'e.g., $10 off' },
    { key: 'referral_code', label: 'Referral Code', type: 'text', defaultValue: 'FRIEND20', placeholder: 'e.g., SHARE10' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Refer a friend and you both get rewarded.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Share My Link' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Share & Earn" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <p style="margin:0 0 8px; font-size:13px; color:{{accent_color}}; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">
                Referral Program
              </p>
              <h1 style="margin:0 0 16px; font-size:30px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Share the love, get rewarded
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7; max-width:420px; display:inline-block;">
                Hey {{customer_name}}, love your purchase? Share with friends and you'll both get rewarded!
              </p>

              <!-- Rewards Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td width="48%" style="padding:24px; background:{{primary_color}}; border-radius:12px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:12px; color:rgba(255,255,255,0.7); text-transform:uppercase;">You Get</p>
                    <p style="margin:0; font-size:20px; font-weight:700; color:#ffffff;">{{referral_reward}}</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="padding:24px; background:{{accent_color}}; border-radius:12px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:12px; color:rgba(255,255,255,0.7); text-transform:uppercase;">They Get</p>
                    <p style="margin:0; font-size:20px; font-weight:700; color:#ffffff;">{{friend_reward}}</p>
                  </td>
                </tr>
              </table>

              <!-- Referral Code -->
              <p style="margin:0 0 24px; font-size:14px; color:#6b7280;">
                Your code: <strong style="color:{{primary_color}};">{{referral_code}}</strong>
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const postPurchase7: EmailTemplate = {
  id: 'post-purchase-7',
  name: 'Loyalty Points Update',
  category: 'post-purchase',
  timing: '+14 days after delivery',
  subjectLine: 'You\'ve earned points! Here\'s your balance',
  description: 'Show points earned from purchase',
  suggestedImages: imageLibrary.jewelry.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'points_earned', label: 'Points Earned', type: 'text', defaultValue: '150', placeholder: 'e.g., 200' },
    { key: 'total_points', label: 'Total Points', type: 'text', defaultValue: '350', placeholder: 'e.g., 500' },
    { key: 'points_value', label: 'Points Value', type: 'text', defaultValue: '$17.50', placeholder: 'e.g., $25' },
    { key: 'next_reward', label: 'Next Reward At', type: 'text', defaultValue: '500 points', placeholder: 'e.g., 1000 points' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'See how many points you\'ve earned!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'View My Rewards' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Points Banner -->
          <tr>
            <td style="padding:48px 56px; background:linear-gradient(135deg, {{accent_color}} 0%, {{primary_color}} 100%); text-align:center;">
              <p style="margin:0 0 8px; font-size:14px; color:rgba(255,255,255,0.8); text-transform:uppercase; letter-spacing:0.1em;">Points Earned</p>
              <p style="margin:0 0 8px; font-size:56px; font-weight:700; color:#ffffff;">+{{points_earned}}</p>
              <p style="margin:0; font-size:16px; color:rgba(255,255,255,0.9);">Total balance: {{total_points}} points ({{points_value}})</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <h1 style="margin:0 0 16px; font-size:26px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                You're earning rewards!
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7; max-width:400px; display:inline-block;">
                Hey {{customer_name}}, you just earned {{points_earned}} points from your last purchase! You're only {{next_reward}} away from your next reward.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const postPurchase8: EmailTemplate = {
  id: 'post-purchase-8',
  name: 'Replenishment Reminder',
  category: 'post-purchase',
  timing: '+30 days after delivery',
  subjectLine: 'Time to restock?',
  description: 'Reminder to reorder consumable products',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(13).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'product_name', label: 'Product Name', type: 'text', defaultValue: 'your favorites', placeholder: 'e.g., Daily Serum' },
    { key: 'discount_percent', label: 'Reorder Discount %', type: 'number', defaultValue: '10', placeholder: 'e.g., 15' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'RESTOCK10', placeholder: 'e.g., REFILL15' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Running low? Time to restock.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Reorder Now' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Replenishment" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Running low on {{product_name}}?
              </h1>
              <p style="margin:0 0 24px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, it's been about a month since your last order. Ready for a refill? We've got {{discount_percent}}% off waiting for you.
              </p>

              <!-- Discount Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:20px 24px; background:#f0fdf4; border-radius:12px; text-align:center;">
                    <p style="margin:0 0 4px; font-size:13px; color:#059669; text-transform:uppercase; letter-spacing:0.1em;">Reorder Discount</p>
                    <p style="margin:0; font-size:24px; font-weight:700; color:#059669;">{{discount_code}}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}}; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const postPurchase9: EmailTemplate = {
  id: 'post-purchase-9',
  name: 'Cross-Sell Suggestion',
  category: 'post-purchase',
  timing: '+45 days after delivery',
  subjectLine: 'Pairs perfectly with what you bought',
  description: 'Suggest related products',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'original_product', label: 'Original Product', type: 'text', defaultValue: 'your recent purchase', placeholder: 'e.g., The Classic Tee' },
    { key: 'suggested_product', label: 'Suggested Product', type: 'text', defaultValue: 'The Perfect Pair', placeholder: 'e.g., Matching Shorts' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Complete your look with these picks.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Complete My Look' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Complete Your Look" style="display:block; width:100%; height:auto; max-height:420px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <p style="margin:0 0 8px; font-size:13px; color:{{accent_color}}; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">
                Curated For You
              </p>
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Pairs perfectly with {{original_product}}
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, based on your purchase, we think you'll love <strong>{{suggested_product}}</strong>. It's the perfect complement to what you already have.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const postPurchase10: EmailTemplate = {
  id: 'post-purchase-10',
  name: 'VIP Tier Unlock',
  category: 'post-purchase',
  timing: 'On milestone',
  subjectLine: 'Congratulations! You\'ve unlocked VIP status 🏆',
  description: 'VIP tier upgrade celebration',
  suggestedImages: imageLibrary.jewelry.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/womans-elegant-hand-with-delicate%20(2).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'tier_name', label: 'VIP Tier Name', type: 'text', defaultValue: 'Gold', placeholder: 'e.g., Platinum' },
    { key: 'perk_1', label: 'Perk 1', type: 'text', defaultValue: 'Free shipping on all orders', placeholder: 'VIP benefit' },
    { key: 'perk_2', label: 'Perk 2', type: 'text', defaultValue: 'Early access to new releases', placeholder: 'VIP benefit' },
    { key: 'perk_3', label: 'Perk 3', type: 'text', defaultValue: 'Exclusive VIP-only sales', placeholder: 'VIP benefit' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'You\'ve unlocked exclusive VIP benefits!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Explore VIP Benefits' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- VIP Banner -->
          <tr>
            <td style="padding:48px 56px; background:linear-gradient(135deg, #fbbf24 0%, {{accent_color}} 100%); text-align:center;">
              <p style="margin:0 0 8px; font-size:48px;">🏆</p>
              <p style="margin:0 0 8px; font-size:14px; color:rgba(255,255,255,0.9); text-transform:uppercase; letter-spacing:0.15em;">Welcome to</p>
              <h1 style="margin:0; font-size:36px; font-weight:700; color:#ffffff; letter-spacing:-0.01em;">
                {{tier_name}} VIP
              </h1>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="VIP" style="display:block; width:100%; height:auto; max-height:300px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h2 style="margin:0 0 16px; font-size:24px; font-weight:600; color:{{primary_color}}; line-height:1.25;">
                Your exclusive perks
              </h2>
              <p style="margin:0 0 24px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, you've unlocked VIP status! Here's what you get:
              </p>

              <!-- Perks List -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:14px 20px; background:#fffbeb; border-radius:8px;">
                    <p style="margin:0; font-size:15px; color:#92400e;">⭐ {{perk_1}}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:14px 20px; background:#fffbeb; border-radius:8px;">
                    <p style="margin:0; font-size:15px; color:#92400e;">⭐ {{perk_2}}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:14px 20px; background:#fffbeb; border-radius:8px;">
                    <p style="margin:0; font-size:15px; color:#92400e;">⭐ {{perk_3}}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}}; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

// =====================================================
// WIN-BACK (4 more templates)
// =====================================================

const winBack5: EmailTemplate = {
  id: 'win-back-5',
  name: 'Feedback Request',
  category: 'win-back',
  timing: '75 days inactive',
  subjectLine: 'We\'d love your feedback',
  description: 'Ask for feedback on experience',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'survey_incentive', label: 'Survey Incentive', type: 'text', defaultValue: '15% off your next order', placeholder: 'e.g., $10 credit' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Help us improve and get a reward.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Share My Feedback' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:56px; text-align:center;">
              <p style="margin:0 0 16px; font-size:48px;">💬</p>
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                We'd love to hear from you
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7; max-width:420px; display:inline-block;">
                Hey {{customer_name}}, your opinion matters to us! Share your thoughts and get <strong style="color:{{accent_color}};">{{survey_incentive}}</strong> as a thank you.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const winBack6: EmailTemplate = {
  id: 'win-back-6',
  name: 'Birthday/Anniversary',
  category: 'win-back',
  timing: 'Date-based',
  subjectLine: 'Happy Birthday! Here\'s a gift for you 🎂',
  description: 'Birthday or anniversary celebration',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'discount_percent', label: 'Birthday Discount %', type: 'number', defaultValue: '20', placeholder: 'e.g., 25' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'BDAY20', placeholder: 'e.g., BIRTHDAY25' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'A special birthday gift, just for you!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Claim My Gift' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Birthday Banner -->
          <tr>
            <td style="padding:48px 56px; background:linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); text-align:center;">
              <p style="margin:0 0 8px; font-size:56px;">🎂</p>
              <h1 style="margin:0 0 8px; font-size:32px; font-weight:600; color:#ffffff; letter-spacing:-0.01em;">
                Happy Birthday!
              </h1>
              <p style="margin:0; font-size:18px; color:rgba(255,255,255,0.9);">
                Here's {{discount_percent}}% off to celebrate
              </p>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Birthday Gift" style="display:block; width:100%; height:auto; max-height:300px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <p style="margin:0 0 24px; font-size:17px; color:#4b5563; line-height:1.7; max-width:400px; display:inline-block;">
                Hey {{customer_name}}, it's your special day! Use code <strong style="color:{{primary_color}};">{{discount_code}}</strong> to treat yourself.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const winBack7: EmailTemplate = {
  id: 'win-back-7',
  name: 'Seasonal Re-engagement',
  category: 'win-back',
  timing: 'Holiday-based',
  subjectLine: 'New season, new favorites',
  description: 'Seasonal reconnection email',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'season', label: 'Season Name', type: 'text', defaultValue: 'Spring', placeholder: 'e.g., Summer, Fall, Winter' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Fresh styles for a fresh season.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Shop the New Season' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="{{season}} Collection" style="display:block; width:100%; height:auto; max-height:450px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <p style="margin:0 0 8px; font-size:13px; color:{{accent_color}}; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">
                {{season}} is Here
              </p>
              <h1 style="margin:0 0 16px; font-size:30px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                New season, new favorites
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, {{season}} is here and so are our latest arrivals! We've been busy creating pieces you'll love.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const winBack8: EmailTemplate = {
  id: 'win-back-8',
  name: 'Category Restock Alert',
  category: 'win-back',
  timing: 'On restock',
  subjectLine: 'Back in stock: Items you\'ll love',
  description: 'Notify about restocked products',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(12).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'category_name', label: 'Category Name', type: 'text', defaultValue: 'your favorites', placeholder: 'e.g., Dresses, Shoes' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Items you browsed are back in stock!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Shop Now' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Restock Banner -->
          <tr>
            <td style="padding:20px 40px; background:#f0fdf4; text-align:center;">
              <p style="margin:0; font-size:15px; color:#059669; font-weight:600;">
                ✨ Back in Stock!
              </p>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Back in Stock" style="display:block; width:100%; height:auto; max-height:400px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                {{category_name}} is back!
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, good news! {{category_name}} you were interested in is back in stock. Don't wait—they tend to go fast!
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}}; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

// =====================================================
// FLASH SALE & PROMOTIONS (8 templates - NEW)
// =====================================================

const flashSale1: EmailTemplate = {
  id: 'flash-sale-1',
  name: 'Flash Sale Announcement',
  category: 'flash-sale' as EmailTemplate['category'],
  timing: 'Sale start',
  subjectLine: '⚡ Flash Sale: {{discount_percent}}% OFF Everything',
  description: 'Announce a flash sale',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '30', placeholder: 'e.g., 25' },
    { key: 'sale_duration', label: 'Sale Duration', type: 'text', defaultValue: '24 hours only', placeholder: 'e.g., 48 hours' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Flash sale is LIVE! Don\'t miss out.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Shop the Sale' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Flash Sale Banner -->
          <tr>
            <td style="padding:56px; background:linear-gradient(135deg, #ef4444 0%, #dc2626 100%); text-align:center;">
              <p style="margin:0 0 8px; font-size:18px; color:rgba(255,255,255,0.9);">⚡ FLASH SALE ⚡</p>
              <p style="margin:0 0 8px; font-size:64px; font-weight:700; color:#ffffff; letter-spacing:-0.03em;">{{discount_percent}}% OFF</p>
              <p style="margin:0; font-size:16px; color:rgba(255,255,255,0.9); text-transform:uppercase; letter-spacing:0.1em;">{{sale_duration}}</p>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Flash Sale" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                The sale you've been waiting for
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7; max-width:420px; display:inline-block;">
                Everything you love is {{discount_percent}}% off. But hurry—this sale ends soon!
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; background:#dc2626;">
                    <a href="{{cta_url}}" style="display:inline-block; padding:18px 48px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const flashSale2: EmailTemplate = {
  id: 'flash-sale-2',
  name: 'Early Access VIP',
  category: 'flash-sale' as EmailTemplate['category'],
  timing: 'Before public sale',
  subjectLine: 'VIP Early Access: Sale starts NOW for you',
  description: 'VIP-only early access to sale',
  suggestedImages: imageLibrary.jewelry.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/womans-elegant-hand-with-delicate%20(2).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'VIP', placeholder: 'or use: Friend' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '25', placeholder: 'e.g., 30' },
    { key: 'early_hours', label: 'Early Access Hours', type: 'text', defaultValue: '24 hours', placeholder: 'e.g., 12 hours' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your VIP early access starts now.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Shop Early Access' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- VIP Banner -->
          <tr>
            <td style="padding:40px 56px; background:linear-gradient(135deg, #fbbf24 0%, {{accent_color}} 100%); text-align:center;">
              <p style="margin:0 0 4px; font-size:14px; color:rgba(255,255,255,0.9); text-transform:uppercase; letter-spacing:0.15em;">VIP Early Access</p>
              <h1 style="margin:0; font-size:36px; font-weight:700; color:#ffffff;">{{discount_percent}}% OFF</h1>
              <p style="margin:8px 0 0; font-size:14px; color:rgba(255,255,255,0.8);">{{early_hours}} before everyone else</p>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="VIP Early Access" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                You're first in line, {{customer_name}}
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                As a VIP, you get {{early_hours}} of early access before our sale goes public. Shop the best selection before anyone else!
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}}; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const flashSale3: EmailTemplate = {
  id: 'flash-sale-3',
  name: 'Countdown Timer',
  category: 'flash-sale' as EmailTemplate['category'],
  timing: 'Hours before end',
  subjectLine: '⏰ Only {{hours_left}} hours left!',
  description: 'Urgency countdown for ending sale',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(11).png', placeholder: 'https://...' },
    { key: 'hours_left', label: 'Hours Left', type: 'text', defaultValue: '6', placeholder: 'e.g., 3' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '30', placeholder: 'e.g., 25' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Sale ending soon. Last chance!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Shop Before It Ends' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Urgency Banner -->
          <tr>
            <td style="padding:48px 56px; background:#fef2f2; text-align:center;">
              <p style="margin:0 0 8px; font-size:48px;">⏰</p>
              <p style="margin:0 0 8px; font-size:14px; color:#dc2626; text-transform:uppercase; letter-spacing:0.15em; font-weight:600;">Sale Ending</p>
              <p style="margin:0; font-size:48px; font-weight:700; color:#dc2626;">{{hours_left}} HOURS LEFT</p>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Sale Ending" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Don't miss {{discount_percent}}% off
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7; max-width:400px; display:inline-block;">
                This is your last chance! Our sale ends in {{hours_left}} hours. Once it's gone, it's gone.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; background:#dc2626;">
                    <a href="{{cta_url}}" style="display:inline-block; padding:18px 48px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const flashSale4: EmailTemplate = {
  id: 'flash-sale-4',
  name: 'BFCM Teaser',
  category: 'flash-sale' as EmailTemplate['category'],
  timing: 'Before BFCM',
  subjectLine: 'Black Friday is coming... Get ready',
  description: 'Black Friday/Cyber Monday teaser',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'sale_date', label: 'Sale Date', type: 'text', defaultValue: 'November 29th', placeholder: 'e.g., November 24th' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'The biggest sale of the year is almost here.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Get Early Access' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Teaser Banner -->
          <tr>
            <td style="padding:56px; background:{{primary_color}}; text-align:center;">
              <p style="margin:0 0 16px; font-size:16px; color:rgba(255,255,255,0.8); text-transform:uppercase; letter-spacing:0.15em;">Coming {{sale_date}}</p>
              <h1 style="margin:0; font-size:42px; font-weight:700; color:#ffffff; letter-spacing:-0.02em;">
                BLACK FRIDAY
              </h1>
              <p style="margin:8px 0 0; font-size:18px; color:rgba(255,255,255,0.9);">Our biggest sale of the year</p>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Black Friday" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <h1 style="margin:0 0 16px; font-size:26px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Mark your calendar
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7; max-width:420px; display:inline-block;">
                Hey {{customer_name}}, Black Friday is coming on {{sale_date}}. Sign up for early access to shop before everyone else.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const flashSale5: EmailTemplate = {
  id: 'flash-sale-5',
  name: 'BFCM Live Now',
  category: 'flash-sale' as EmailTemplate['category'],
  timing: 'BFCM start',
  subjectLine: '🔥 BLACK FRIDAY IS LIVE — Up to {{discount_percent}}% OFF',
  description: 'Black Friday sale is live',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(13).png', placeholder: 'https://...' },
    { key: 'discount_percent', label: 'Max Discount %', type: 'number', defaultValue: '50', placeholder: 'e.g., 40' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Black Friday is LIVE. Shop now!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Shop Black Friday' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- BFCM Banner -->
          <tr>
            <td style="padding:56px; background:linear-gradient(135deg, #000000 0%, #1a1a1a 100%); text-align:center;">
              <p style="margin:0 0 8px; font-size:18px; color:#fbbf24;">🔥 IT'S HERE 🔥</p>
              <h1 style="margin:0 0 8px; font-size:42px; font-weight:700; color:#ffffff; letter-spacing:-0.02em;">
                BLACK FRIDAY
              </h1>
              <p style="margin:0; font-size:24px; color:#fbbf24; font-weight:600;">Up to {{discount_percent}}% OFF</p>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Black Friday Sale" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                The wait is over
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7; max-width:400px; display:inline-block;">
                Our biggest sale of the year is LIVE. Up to {{discount_percent}}% off sitewide. Shop now before your favorites sell out!
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:18px 48px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const flashSale6: EmailTemplate = {
  id: 'flash-sale-6',
  name: 'BFCM Extended',
  category: 'flash-sale' as EmailTemplate['category'],
  timing: 'After BFCM',
  subjectLine: 'Good news: Sale extended!',
  description: 'Extended Black Friday/Cyber Monday sale',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(15).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '40', placeholder: 'e.g., 30' },
    { key: 'extension_days', label: 'Extended Days', type: 'text', defaultValue: '48 hours', placeholder: 'e.g., 3 days' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'You asked, we listened. Sale extended!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Shop Extended Sale' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Extended Banner -->
          <tr>
            <td style="padding:40px 56px; background:#f0fdf4; text-align:center;">
              <p style="margin:0 0 8px; font-size:16px; color:#059669; font-weight:600;">🎉 GOOD NEWS!</p>
              <h1 style="margin:0; font-size:28px; font-weight:700; color:#059669;">Sale Extended {{extension_days}}</h1>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Sale Extended" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                You asked, we listened
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, we've extended our sale for {{extension_days}}! That's {{discount_percent}}% off everything—don't miss your second chance.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}}; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const flashSale7: EmailTemplate = {
  id: 'flash-sale-7',
  name: 'Holiday Gift Guide',
  category: 'flash-sale' as EmailTemplate['category'],
  timing: 'Holiday season',
  subjectLine: 'The Perfect Gift Guide 🎁',
  description: 'Holiday gift suggestions',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'gift_category_1', label: 'Gift Category 1', type: 'text', defaultValue: 'Gifts Under $50', placeholder: 'e.g., For Her' },
    { key: 'gift_category_2', label: 'Gift Category 2', type: 'text', defaultValue: 'Luxury Picks', placeholder: 'e.g., For Him' },
    { key: 'gift_category_3', label: 'Gift Category 3', type: 'text', defaultValue: 'Bestseller Bundles', placeholder: 'e.g., For Kids' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Find the perfect gift for everyone on your list.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Shop Gift Guide' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Holiday Banner -->
          <tr>
            <td style="padding:48px 56px; background:linear-gradient(135deg, #dc2626 0%, #16a34a 100%); text-align:center;">
              <p style="margin:0 0 8px; font-size:40px;">🎁</p>
              <h1 style="margin:0; font-size:32px; font-weight:700; color:#ffffff; letter-spacing:-0.01em;">
                Holiday Gift Guide
              </h1>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Gift Guide" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h1 style="margin:0 0 16px; font-size:26px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Find the perfect gift
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, make this holiday season special with thoughtfully curated gifts for everyone on your list.
              </p>

              <!-- Gift Categories -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:16px 20px; background:#fef2f2; border-radius:8px; text-align:center;">
                    <p style="margin:0; font-size:15px; color:#dc2626; font-weight:600;">🎄 {{gift_category_1}}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:16px 20px; background:#f0fdf4; border-radius:8px; text-align:center;">
                    <p style="margin:0; font-size:15px; color:#16a34a; font-weight:600;">🎄 {{gift_category_2}}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:16px 20px; background:#fef2f2; border-radius:8px; text-align:center;">
                    <p style="margin:0; font-size:15px; color:#dc2626; font-weight:600;">🎄 {{gift_category_3}}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}}; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const flashSale8: EmailTemplate = {
  id: 'flash-sale-8',
  name: 'End of Season Sale',
  category: 'flash-sale' as EmailTemplate['category'],
  timing: 'Season end',
  subjectLine: 'End of Season Clearance — Up to {{discount_percent}}% OFF',
  description: 'End of season clearance sale',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png', placeholder: 'https://...' },
    { key: 'discount_percent', label: 'Max Discount %', type: 'number', defaultValue: '60', placeholder: 'e.g., 50' },
    { key: 'season', label: 'Season', type: 'text', defaultValue: 'Summer', placeholder: 'e.g., Winter' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Huge savings on last season\'s favorites.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Shop Clearance' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Clearance Banner -->
          <tr>
            <td style="padding:48px 56px; background:linear-gradient(135deg, #f97316 0%, #ea580c 100%); text-align:center;">
              <p style="margin:0 0 8px; font-size:14px; color:rgba(255,255,255,0.9); text-transform:uppercase; letter-spacing:0.15em;">{{season}} Clearance</p>
              <h1 style="margin:0; font-size:48px; font-weight:700; color:#ffffff; letter-spacing:-0.02em;">
                Up to {{discount_percent}}% OFF
              </h1>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Clearance Sale" style="display:block; width:100%; height:auto; max-height:400px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                End of {{season}} clearance
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                We're making room for new arrivals! Shop up to {{discount_percent}}% off on your favorite {{season}} styles while supplies last.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:#ea580c; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

// =====================================================
// VIP & LOYALTY (8 templates - NEW)
// =====================================================

const vipLoyalty1: EmailTemplate = {
  id: 'vip-loyalty-1',
  name: 'Welcome to VIP',
  category: 'vip-loyalty' as EmailTemplate['category'],
  timing: 'On tier upgrade',
  subjectLine: 'Welcome to the VIP club 👑',
  description: 'VIP tier upgrade welcome',
  suggestedImages: imageLibrary.jewelry.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/womans-elegant-hand-with-delicate%20(2).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'tier_name', label: 'Tier Name', type: 'text', defaultValue: 'Gold', placeholder: 'e.g., Platinum' },
    { key: 'perk_1', label: 'Perk 1', type: 'text', defaultValue: 'Free shipping on every order', placeholder: 'VIP benefit' },
    { key: 'perk_2', label: 'Perk 2', type: 'text', defaultValue: 'Early access to all sales', placeholder: 'VIP benefit' },
    { key: 'perk_3', label: 'Perk 3', type: 'text', defaultValue: 'Exclusive members-only products', placeholder: 'VIP benefit' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'You\'ve unlocked VIP status!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Explore VIP Perks' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- VIP Welcome Banner -->
          <tr>
            <td style="padding:48px 56px; background:linear-gradient(135deg, #fbbf24 0%, {{accent_color}} 100%); text-align:center;">
              <p style="margin:0 0 8px; font-size:48px;">👑</p>
              <p style="margin:0 0 8px; font-size:14px; color:rgba(255,255,255,0.9); text-transform:uppercase; letter-spacing:0.15em;">Welcome to</p>
              <h1 style="margin:0; font-size:36px; font-weight:700; color:#ffffff;">{{tier_name}} VIP</h1>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="VIP Welcome" style="display:block; width:100%; height:auto; max-height:300px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h1 style="margin:0 0 16px; font-size:26px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                You've made it, {{customer_name}}!
              </h1>
              <p style="margin:0 0 24px; font-size:16px; color:#4b5563; line-height:1.7;">
                As a {{tier_name}} VIP member, you now enjoy exclusive perks:
              </p>

              <!-- Perks -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:14px 20px; background:#fffbeb; border-radius:8px;">
                    <p style="margin:0; font-size:15px; color:#92400e;">👑 {{perk_1}}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:14px 20px; background:#fffbeb; border-radius:8px;">
                    <p style="margin:0; font-size:15px; color:#92400e;">👑 {{perk_2}}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:14px 20px; background:#fffbeb; border-radius:8px;">
                    <p style="margin:0; font-size:15px; color:#92400e;">👑 {{perk_3}}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}}; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const vipLoyalty2: EmailTemplate = {
  id: 'vip-loyalty-2',
  name: 'Points Balance Update',
  category: 'vip-loyalty' as EmailTemplate['category'],
  timing: 'Monthly',
  subjectLine: 'Your points update: {{total_points}} points!',
  description: 'Monthly loyalty points summary',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'total_points', label: 'Total Points', type: 'text', defaultValue: '1,250', placeholder: 'e.g., 500' },
    { key: 'points_value', label: 'Points Value', type: 'text', defaultValue: '$62.50', placeholder: 'e.g., $25' },
    { key: 'points_to_next', label: 'Points to Next Reward', type: 'text', defaultValue: '250', placeholder: 'e.g., 100' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Check out your latest points balance!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Redeem Points' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Points Banner -->
          <tr>
            <td style="padding:48px 56px; background:linear-gradient(135deg, {{accent_color}} 0%, {{primary_color}} 100%); text-align:center;">
              <p style="margin:0 0 8px; font-size:14px; color:rgba(255,255,255,0.8); text-transform:uppercase; letter-spacing:0.1em;">Your Balance</p>
              <p style="margin:0; font-size:56px; font-weight:700; color:#ffffff; letter-spacing:-0.02em;">{{total_points}}</p>
              <p style="margin:8px 0 0; font-size:16px; color:rgba(255,255,255,0.9);">points ({{points_value}} value)</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <h1 style="margin:0 0 16px; font-size:26px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Your points are adding up!
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7; max-width:400px; display:inline-block;">
                Hey {{customer_name}}, you have {{total_points}} points ready to redeem. That's {{points_value}} in rewards! You're only {{points_to_next}} points away from your next reward tier.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const vipLoyalty3: EmailTemplate = {
  id: 'vip-loyalty-3',
  name: 'Points Expiring Soon',
  category: 'vip-loyalty' as EmailTemplate['category'],
  timing: 'Before expiry',
  subjectLine: '⚠️ {{expiring_points}} points expiring soon!',
  description: 'Urgency for expiring points',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'expiring_points', label: 'Expiring Points', type: 'text', defaultValue: '500', placeholder: 'e.g., 250' },
    { key: 'expiry_date', label: 'Expiry Date', type: 'text', defaultValue: 'January 31st', placeholder: 'e.g., March 15th' },
    { key: 'points_value', label: 'Points Value', type: 'text', defaultValue: '$25', placeholder: 'e.g., $12.50' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Use your points before they expire!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Use My Points' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Urgency Banner -->
          <tr>
            <td style="padding:40px 56px; background:#fef2f2; text-align:center;">
              <p style="margin:0 0 8px; font-size:40px;">⚠️</p>
              <p style="margin:0 0 8px; font-size:14px; color:#dc2626; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">Expiring {{expiry_date}}</p>
              <p style="margin:0; font-size:36px; font-weight:700; color:#dc2626;">{{expiring_points}} points</p>
              <p style="margin:8px 0 0; font-size:14px; color:#dc2626;">({{points_value}} value)</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <h1 style="margin:0 0 16px; font-size:26px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Don't lose your rewards!
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7; max-width:420px; display:inline-block;">
                Hey {{customer_name}}, you have {{expiring_points}} points ({{points_value}}) that will expire on {{expiry_date}}. Use them before they're gone!
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; background:#dc2626;">
                    <a href="{{cta_url}}" style="display:inline-block; padding:18px 48px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const vipLoyalty4: EmailTemplate = {
  id: 'vip-loyalty-4',
  name: 'Exclusive VIP Sale',
  category: 'vip-loyalty' as EmailTemplate['category'],
  timing: 'VIP events',
  subjectLine: 'VIP-Only: {{discount_percent}}% OFF starts now',
  description: 'Exclusive VIP member sale',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'VIP', placeholder: 'or use: Friend' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '30', placeholder: 'e.g., 25' },
    { key: 'sale_duration', label: 'Sale Duration', type: 'text', defaultValue: '48 hours', placeholder: 'e.g., 24 hours' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Exclusive VIP sale starts now!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Shop VIP Sale' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- VIP Sale Banner -->
          <tr>
            <td style="padding:48px 56px; background:linear-gradient(135deg, #fbbf24 0%, {{primary_color}} 100%); text-align:center;">
              <p style="margin:0 0 8px; font-size:14px; color:rgba(255,255,255,0.9); text-transform:uppercase; letter-spacing:0.15em;">👑 VIP Exclusive</p>
              <h1 style="margin:0; font-size:48px; font-weight:700; color:#ffffff; letter-spacing:-0.02em;">{{discount_percent}}% OFF</h1>
              <p style="margin:8px 0 0; font-size:16px; color:rgba(255,255,255,0.9);">{{sale_duration}} only</p>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="VIP Sale" style="display:block; width:100%; height:auto; max-height:380px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                {{customer_name}}, this sale is just for you
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7;">
                As a VIP member, you get exclusive access to {{discount_percent}}% off sitewide. This private sale lasts {{sale_duration}}—shop now!
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}}; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const vipLoyalty5: EmailTemplate = {
  id: 'vip-loyalty-5',
  name: 'Birthday Reward',
  category: 'vip-loyalty' as EmailTemplate['category'],
  timing: 'Birthday month',
  subjectLine: 'Happy Birthday! 🎂 Your gift is inside',
  description: 'VIP birthday reward',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'birthday_reward', label: 'Birthday Reward', type: 'text', defaultValue: '$25 gift card', placeholder: 'e.g., 25% off' },
    { key: 'valid_until', label: 'Valid Until', type: 'text', defaultValue: 'end of the month', placeholder: 'e.g., 30 days' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'A birthday surprise just for you!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Claim My Gift' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Birthday Banner -->
          <tr>
            <td style="padding:48px 56px; background:linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); text-align:center;">
              <p style="margin:0 0 8px; font-size:56px;">🎂</p>
              <h1 style="margin:0 0 8px; font-size:32px; font-weight:700; color:#ffffff;">Happy Birthday!</h1>
              <p style="margin:0; font-size:18px; color:rgba(255,255,255,0.9);">Here's a gift from us to you</p>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Birthday Gift" style="display:block; width:100%; height:auto; max-height:300px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <h1 style="margin:0 0 16px; font-size:26px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Your VIP birthday reward
              </h1>
              <p style="margin:0 0 24px; font-size:16px; color:#4b5563; line-height:1.7; max-width:400px; display:inline-block;">
                Hey {{customer_name}}, it's your special month! As a VIP member, enjoy {{birthday_reward}}. Valid until {{valid_until}}.
              </p>

              <!-- Gift Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:24px; background:linear-gradient(135deg, #fdf4ff 0%, #faf5ff 100%); border-radius:16px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:14px; color:#9333ea; text-transform:uppercase; letter-spacing:0.1em;">Your Gift</p>
                    <p style="margin:0; font-size:28px; font-weight:700; color:#9333ea;">{{birthday_reward}}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const vipLoyalty6: EmailTemplate = {
  id: 'vip-loyalty-6',
  name: 'Anniversary Celebration',
  category: 'vip-loyalty' as EmailTemplate['category'],
  timing: '1-year customer',
  subjectLine: 'Celebrating 1 year together! 🎉',
  description: 'Customer anniversary celebration',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'anniversary_reward', label: 'Anniversary Reward', type: 'text', defaultValue: '20% off + double points', placeholder: 'e.g., $20 credit' },
    { key: 'total_orders', label: 'Total Orders', type: 'text', defaultValue: '12', placeholder: 'e.g., 8' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'One year of amazing moments together!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Celebrate With Us' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Anniversary Banner -->
          <tr>
            <td style="padding:48px 56px; background:linear-gradient(135deg, {{accent_color}} 0%, {{primary_color}} 100%); text-align:center;">
              <p style="margin:0 0 8px; font-size:48px;">🎉</p>
              <h1 style="margin:0 0 8px; font-size:32px; font-weight:700; color:#ffffff;">Happy Anniversary!</h1>
              <p style="margin:0; font-size:18px; color:rgba(255,255,255,0.9);">1 year of being part of our family</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <h1 style="margin:0 0 16px; font-size:26px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Thank you, {{customer_name}}!
              </h1>
              <p style="margin:0 0 24px; font-size:16px; color:#4b5563; line-height:1.7; max-width:420px; display:inline-block;">
                One year ago, you joined our family. Since then, you've placed {{total_orders}} orders and become a valued member of our community. Here's a special reward to celebrate!
              </p>

              <!-- Reward Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:24px; background:#f0fdf4; border-radius:16px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:14px; color:#059669; text-transform:uppercase; letter-spacing:0.1em;">Anniversary Reward</p>
                    <p style="margin:0; font-size:24px; font-weight:700; color:#059669;">{{anniversary_reward}}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const vipLoyalty7: EmailTemplate = {
  id: 'vip-loyalty-7',
  name: 'Referral Program Invite',
  category: 'vip-loyalty' as EmailTemplate['category'],
  timing: 'Post-purchase',
  subjectLine: 'Give {{friend_reward}}, Get {{your_reward}}',
  description: 'Invite to referral program',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Farmer%20in%20Strawberry%20Field.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'your_reward', label: 'Your Reward', type: 'text', defaultValue: '$20', placeholder: 'e.g., $15' },
    { key: 'friend_reward', label: 'Friend Gets', type: 'text', defaultValue: '$20', placeholder: 'e.g., $15' },
    { key: 'referral_link', label: 'Referral Link', type: 'url', defaultValue: 'https://yourstore.com/refer', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Share the love and earn rewards!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Start Referring' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Referral Program" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px; text-align:center;">
              <p style="margin:0 0 8px; font-size:13px; color:{{accent_color}}; text-transform:uppercase; letter-spacing:0.1em; font-weight:600;">
                Referral Program
              </p>
              <h1 style="margin:0 0 16px; font-size:30px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Give {{friend_reward}}, Get {{your_reward}}
              </h1>
              <p style="margin:0 0 32px; font-size:16px; color:#4b5563; line-height:1.7; max-width:420px; display:inline-block;">
                Hey {{customer_name}}, share the love! When your friends make their first purchase, they get {{friend_reward}} off and you earn {{your_reward}} in credit.
              </p>

              <!-- Rewards Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td width="48%" style="padding:24px; background:{{primary_color}}; border-radius:12px; text-align:center;">
                    <p style="margin:0 0 4px; font-size:12px; color:rgba(255,255,255,0.7); text-transform:uppercase;">They Get</p>
                    <p style="margin:0; font-size:24px; font-weight:700; color:#ffffff;">{{friend_reward}} OFF</p>
                  </td>
                  <td width="4%"></td>
                  <td width="48%" style="padding:24px; background:{{accent_color}}; border-radius:12px; text-align:center;">
                    <p style="margin:0 0 4px; font-size:12px; color:rgba(255,255,255,0.7); text-transform:uppercase;">You Get</p>
                    <p style="margin:0; font-size:24px; font-weight:700; color:#ffffff;">{{your_reward}} CREDIT</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:8px; background:{{accent_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const vipLoyalty8: EmailTemplate = {
  id: 'vip-loyalty-8',
  name: 'Double Points Event',
  category: 'vip-loyalty' as EmailTemplate['category'],
  timing: 'Promotional periods',
  subjectLine: '🔥 Double Points Weekend — Earn 2X rewards!',
  description: 'Double points promotional event',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(14).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'event_duration', label: 'Event Duration', type: 'text', defaultValue: 'This weekend only', placeholder: 'e.g., 48 hours' },
    { key: 'current_points', label: 'Current Points', type: 'text', defaultValue: '500', placeholder: 'e.g., 250' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Earn double points on every purchase!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Earn Double Points' },
  ],
  html: premiumWrapper(`
          <!-- Logo Header -->
          <tr>
            <td style="padding:32px 40px 24px; text-align:center; border-bottom:1px solid #f3f4f6;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:280px; height:auto;">
            </td>
          </tr>

          <!-- Double Points Banner -->
          <tr>
            <td style="padding:48px 56px; background:linear-gradient(135deg, #f97316 0%, #ea580c 100%); text-align:center;">
              <p style="margin:0 0 8px; font-size:18px; color:rgba(255,255,255,0.9);">🔥 Limited Time</p>
              <h1 style="margin:0 0 8px; font-size:48px; font-weight:700; color:#ffffff; letter-spacing:-0.02em;">2X POINTS</h1>
              <p style="margin:0; font-size:16px; color:rgba(255,255,255,0.9);">{{event_duration}}</p>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="Double Points" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding:48px 56px;">
              <h1 style="margin:0 0 16px; font-size:28px; font-weight:600; color:{{primary_color}}; line-height:1.25; letter-spacing:-0.02em;">
                Double your rewards!
              </h1>
              <p style="margin:0 0 24px; font-size:16px; color:#4b5563; line-height:1.7;">
                Hey {{customer_name}}, {{event_duration}}, earn 2X points on every purchase. You currently have {{current_points}} points—imagine doubling your next earn!
              </p>

              <!-- Example Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:20px 24px; background:#fff7ed; border-radius:12px; text-align:center;">
                    <p style="margin:0; font-size:15px; color:#ea580c;">
                      <strong>Example:</strong> $100 purchase = 200 points (normally 100)
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;">
                <tr>
                  <td style="border-radius:8px; background:#ea580c; text-align:center;">
                    <a href="{{cta_url}}" style="display:block; padding:18px 40px; font-size:15px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.02em;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

// =====================================================
// EXPORTS
// =====================================================

export const emailTemplates: EmailTemplate[] = [
  // Abandoned Cart
  abandonedCart1,
  abandonedCart2,
  abandonedCart3,
  abandonedCart4,
  abandonedCart5,
  abandonedCart6,
  abandonedCart7,
  abandonedCart8,
  // Welcome
  welcome1,
  welcome2,
  welcome3,
  welcome4,
  welcome5,
  welcome6,
  welcome7,
  welcome8,
  // Post-Purchase
  postPurchase1,
  postPurchase2,
  postPurchase3,
  postPurchase4,
  postPurchase5,
  postPurchase6,
  postPurchase7,
  postPurchase8,
  postPurchase9,
  postPurchase10,
  // Win-Back
  winBack1,
  winBack2,
  winBack3,
  winBack4,
  winBack5,
  winBack6,
  winBack7,
  winBack8,
  // Flash Sale
  flashSale1,
  flashSale2,
  flashSale3,
  flashSale4,
  flashSale5,
  flashSale6,
  flashSale7,
  flashSale8,
  // VIP & Loyalty
  vipLoyalty1,
  vipLoyalty2,
  vipLoyalty3,
  vipLoyalty4,
  vipLoyalty5,
  vipLoyalty6,
  vipLoyalty7,
  vipLoyalty8,
];

export const templateCategories = [
  { id: 'abandoned-cart', name: 'Abandoned Cart', count: 8 },
  { id: 'welcome', name: 'Welcome', count: 8 },
  { id: 'post-purchase', name: 'Post-Purchase', count: 10 },
  { id: 'win-back', name: 'Win-Back', count: 8 },
  { id: 'flash-sale', name: 'Flash Sale', count: 8 },
  { id: 'vip-loyalty', name: 'VIP & Loyalty', count: 8 },
];
