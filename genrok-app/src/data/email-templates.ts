// Email Templates Data - Premium HTML Email Templates
// Billion-dollar brand level design with customizable hero images
// Each template uses inline CSS for email client compatibility

export interface EmailTemplate {
  id: string;
  name: string;
  category: 'abandoned-cart' | 'welcome' | 'post-purchase' | 'win-back';
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
  // Welcome
  welcome1,
  // Post-Purchase
  postPurchase1,
  postPurchase2,
  postPurchase3,
  // Win-Back
  winBack1,
  winBack2,
  winBack3,
  winBack4,
];

export const templateCategories = [
  { id: 'abandoned-cart', name: 'Abandoned Cart', count: 7 },
  { id: 'welcome', name: 'Welcome', count: 1 },
  { id: 'post-purchase', name: 'Post-Purchase', count: 3 },
  { id: 'win-back', name: 'Win-Back', count: 4 },
];
