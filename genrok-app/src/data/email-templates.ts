// Email Templates Data - Premium HTML Email Templates
// Billion-dollar brand level design with customizable hero images
// Each template uses inline CSS for email client compatibility

export interface EmailTemplate {
  id: string;
  name: string;
  category: 'abandoned-cart' | 'welcome' | 'post-purchase' | 'win-back' | 'flash-sale' | 'vip-loyalty' | 'quiz-skincare' | 'quiz-fashion' | 'quiz-supplements';
  timing: string;
  subjectLine: string;
  description: string;
  fields: TemplateField[];
  html: string;
  suggestedImages: string[]; // Suggested hero images for this template type
  niche?: string; // For quiz funnel templates - the specific niche
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

// Premium email wrapper - $10,000 elite designer level
// Based on top-tier brands like GOED, ARCADY - magazine-style emails that sell
// Updated with Klaviyo hybrid markup for full drag-and-drop editing
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
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .fluid { max-width: 100% !important; height: auto !important; }
      .stack-column { display: block !important; width: 100% !important; }
      .mobile-padding { padding: 20px !important; }
      .mobile-headline { font-size: 32px !important; }
      .mobile-subhead { font-size: 16px !important; }
    }
    /* Klaviyo block styles for drag-and-drop editing */
    .klaviyo-block { display: block; }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#ffffff; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <!-- Preview Text -->
  <div style="display:none; font-size:1px; color:#ffffff; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">
    {{preview_text}}
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff;">
    <tr>
      <td align="center">
        <!-- Email Container - No border radius for edge-to-edge design -->
        <table role="presentation" class="email-container" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff;">

          <!-- LOGO HEADER - Klaviyo Editable Region -->
          <tr>
            <td data-klaviyo-region="true" data-klaviyo-region-width-pixels="600" style="padding:0;">
              <div class="klaviyo-block klaviyo-image-block">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="padding:24px 0; text-align:center; border-bottom:1px solid #f0f0f0;">
                      <img src="{{logo_url}}" alt="{{brand_name}}" style="max-width:100%; width:600px; height:auto; display:block;" />
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          ${content}
        </table>

        <!-- FOOTER - Klaviyo Editable Region -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td data-klaviyo-region="true" data-klaviyo-region-width-pixels="600" style="padding:32px 24px; text-align:center; border-top:1px solid #f0f0f0;">
              <div class="klaviyo-block klaviyo-text-block">
                <p style="margin:0 0 8px; color:#666666; font-size:12px; line-height:1.5; letter-spacing:0.02em; text-transform:uppercase;">
                  &copy; 2026 {{brand_name}}
                </p>
                <p style="margin:0; font-size:11px;">
                  <a href="{% unsubscribe %}" style="color:#999999; text-decoration:underline; margin:0 12px;">Unsubscribe</a>
                  <a href="{{ organization.url }}" style="color:#999999; text-decoration:underline; margin:0 12px;">View Online</a>
                  <a href="{{ organization.url }}/privacy" style="color:#999999; text-decoration:underline; margin:0 12px;">Privacy</a>
                </p>
              </div>
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
  subjectLine: "You left something behind",
  description: 'First touchpoint - editorial style with full-bleed hero',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'STILL YOURS', placeholder: 'Main headline' },
    { key: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Your cart is waiting', placeholder: 'Secondary text' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Complete your order before it sells out.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'COMPLETE ORDER', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- HERO IMAGE - Klaviyo Editable Region -->
          <tr>
            <td data-klaviyo-region="true" data-klaviyo-region-width-pixels="600" style="padding:0; position:relative;">
              <div class="klaviyo-block klaviyo-image-block" style="position:relative;">
                <!-- Hero Image -->
                <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:450px; object-fit:cover;">

                <!-- Text Overlay -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                  <tr>
                    <td style="padding:60px 40px; vertical-align:center; text-align:center;">
                      <div class="klaviyo-block klaviyo-text-block">
                        <p style="margin:0 0 8px; font-size:14px; color:#ffffff; text-transform:uppercase; letter-spacing:0.2em; font-weight:500; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                          Don't miss out
                        </p>
                        <h1 class="mobile-headline" style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:52px; font-weight:600; color:#ffffff; line-height:1.1; letter-spacing:-0.02em; text-shadow:0 2px 8px rgba(0,0,0,0.4);">
                          {{headline}}
                        </h1>
                        <p class="mobile-subhead" style="margin:0 0 32px; font-size:18px; color:#ffffff; line-height:1.5; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                          {{subheadline}}
                        </p>
                      </div>

                      <!-- CTA Button - Pill style -->
                      <div class="klaviyo-block klaviyo-button-block">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                          <tr>
                            <td style="border-radius:50px; background:#ffffff;">
                              <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#000000; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                                {{cta_text}}
                              </a>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- CONTENT SECTION - Klaviyo Editable Region -->
          <tr>
            <td data-klaviyo-region="true" data-klaviyo-region-width-pixels="600" style="padding:48px 40px; text-align:center; background:#fafafa;">
              <div class="klaviyo-block klaviyo-text-block">
                <h2 style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:28px; font-weight:500; color:#1a1a1a; line-height:1.3;">
                  Cart Mode: Activated
                </h2>
                <p style="margin:0 0 24px; font-size:16px; color:#666666; line-height:1.7; max-width:420px; margin-left:auto; margin-right:auto;">
                  Hey {{customer_name}}, your curated selection is ready and waiting. Complete your order before these items sell out.
                </p>
              </div>
              <div class="klaviyo-block klaviyo-button-block">
                <a href="{{cta_url}}" style="display:inline-block; font-size:14px; font-weight:600; color:#000000; text-decoration:underline; letter-spacing:0.05em;">
                  View My Cart →
                </a>
              </div>
            </td>
          </tr>

          <!-- DYNAMIC PRODUCT BLOCK PLACEHOLDER - Klaviyo Editable Region -->
          <tr>
            <td data-klaviyo-region="true" data-klaviyo-region-width-pixels="600" style="padding:24px 40px; background:#ffffff;">
              <div class="klaviyo-block klaviyo-text-block" style="text-align:center; padding:40px 20px; border:2px dashed #e0e0e0; border-radius:8px; color:#999;">
                <p style="margin:0; font-size:14px;">
                  ✨ Drag a Dynamic Product Block here in Klaviyo to show cart items
                </p>
              </div>
            </td>
          </tr>
  `),
};

const abandonedCart2: EmailTemplate = {
  id: 'abandoned-cart-2',
  name: 'Gentle Reminder',
  category: 'abandoned-cart',
  timing: '24 hours after abandonment',
  subjectLine: 'Good things come to those who click.',
  description: 'Bold color block style with compelling copy',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Good things come to those who click.', placeholder: 'Main headline' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FF6B5B' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your cart is getting lonely. Complete your order today.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Complete my order' },
  ],
  html: premiumWrapper(`
          <!-- COLOR BLOCK HERO - ARCADY STYLE -->
          <tr>
            <td style="padding:0;">
              <!-- Coral/Orange Color Block -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px 50px; background:{{block_color}}; text-align:center;">
                    <h1 class="mobile-headline" style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:42px; font-weight:500; color:#ffffff; line-height:1.15; letter-spacing:-0.01em; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 32px; font-size:16px; color:#ffffff; line-height:1.7; opacity:0.9; max-width:400px; margin-left:auto; margin-right:auto;">
                      We're holding your items, but they won't wait forever. Complete your order and make them yours.
                    </p>

                    <!-- CTA Button - White pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#ffffff;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:14px; font-weight:600; color:#1a1a1a; text-decoration:none; letter-spacing:0.02em;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO IMAGE -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>

          <!-- BOTTOM CONTENT -->
          <tr>
            <td style="padding:48px 40px; text-align:center; background:#fafafa;">
              <p style="margin:0 0 8px; font-size:12px; color:#999999; text-transform:uppercase; letter-spacing:0.15em; font-weight:500;">
                Your cart summary
              </p>
              <h2 style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:24px; font-weight:500; color:#1a1a1a;">
                Ready when you are
              </h2>
              <p style="margin:0; font-size:15px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, your curated selection is saved and waiting.
              </p>
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
  description: 'Split design with sage green accent - editorial style',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(11).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Worth the wait.', placeholder: 'Main headline' },
    { key: 'benefit_1', label: 'Benefit 1', type: 'text', defaultValue: 'Premium materials that last', placeholder: 'e.g., Fast shipping' },
    { key: 'benefit_2', label: 'Benefit 2', type: 'text', defaultValue: 'Free shipping on all orders', placeholder: 'e.g., Easy returns' },
    { key: 'benefit_3', label: 'Benefit 3', type: 'text', defaultValue: '30-day hassle-free returns', placeholder: 'e.g., Warranty' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#86EFAC' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Here\'s why you\'ll love your purchase.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'COMPLETE ORDER' },
  ],
  html: premiumWrapper(`
          <!-- SAGE GREEN COLOR BLOCK -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:50px 40px; text-align:center;">
                    <p style="margin:0 0 12px; font-size:12px; color:#166534; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                      Why you'll love it
                    </p>
                    <h1 class="mobile-headline" style="margin:0; font-family:'Playfair Display',Georgia,serif; font-size:46px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO IMAGE -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; max-height:380px; object-fit:cover;">
            </td>
          </tr>

          <!-- BENEFITS SECTION -->
          <tr>
            <td style="padding:48px 40px; background:#fafafa;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:20px 0; border-bottom:1px solid #e5e5e5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width:40px; vertical-align:top;">
                          <span style="font-family:'Playfair Display',Georgia,serif; font-size:24px; color:#166534; font-style:italic;">01</span>
                        </td>
                        <td style="padding-left:16px; font-size:16px; color:#1a1a1a; line-height:1.5; font-weight:500;">{{benefit_1}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 0; border-bottom:1px solid #e5e5e5;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width:40px; vertical-align:top;">
                          <span style="font-family:'Playfair Display',Georgia,serif; font-size:24px; color:#166534; font-style:italic;">02</span>
                        </td>
                        <td style="padding-left:16px; font-size:16px; color:#1a1a1a; line-height:1.5; font-weight:500;">{{benefit_2}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="width:40px; vertical-align:top;">
                          <span style="font-family:'Playfair Display',Georgia,serif; font-size:24px; color:#166534; font-style:italic;">03</span>
                        </td>
                        <td style="padding-left:16px; font-size:16px; color:#1a1a1a; line-height:1.5; font-weight:500;">{{benefit_3}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button - Dark pill -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:32px auto 0;">
                <tr>
                  <td style="border-radius:50px; background:#1a1a1a;">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
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
  description: 'Peach/blush color block with bold discount - magazine style',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'A gift, just for you.', placeholder: 'Main headline' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '10', placeholder: 'e.g., 15' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'SAVE10', placeholder: 'e.g., WELCOME15' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FECACA' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'We have a special offer just for you.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'CLAIM OFFER' },
  ],
  html: premiumWrapper(`
          <!-- BLUSH/PEACH COLOR BLOCK WITH DISCOUNT -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:50px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:72px; font-weight:700; color:#1a1a1a; letter-spacing:-0.03em; line-height:1;">
                      {{discount_percent}}%
                    </p>
                    <p style="margin:0 0 20px; font-size:14px; color:#991b1b; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                      OFF YOUR ORDER
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 24px; font-family:'Playfair Display',Georgia,serif; font-size:38px; font-weight:400; color:#1a1a1a; line-height:1.2; font-style:italic;">
                      {{headline}}
                    </h1>

                    <!-- CODE PILL -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 28px;">
                      <tr>
                        <td style="padding:12px 32px; background:#ffffff; border-radius:50px;">
                          <span style="font-size:16px; font-weight:700; color:#1a1a1a; letter-spacing:0.15em;">{{discount_code}}</span>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button - Dark pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#1a1a1a;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO IMAGE -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; max-height:360px; object-fit:cover;">
            </td>
          </tr>

          <!-- BOTTOM CONTENT -->
          <tr>
            <td style="padding:40px; text-align:center; background:#fafafa;">
              <p style="margin:0; font-size:15px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, we really want you to have this.
              </p>
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
  description: 'Full-bleed hero with text overlay - GOED style social proof',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'CUSTOMER FAVORITES', placeholder: 'Main headline' },
    { key: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'What everyone\'s talking about', placeholder: 'Secondary text' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Our most-loved items are waiting for you.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP BEST SELLERS' },
  ],
  html: premiumWrapper(`
          <!-- FULL BLEED HERO WITH TEXT OVERLAY -->
          <tr>
            <td style="padding:0; position:relative;">
              <div style="position:relative;">
                <!-- Hero Image -->
                <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:480px; object-fit:cover;">

                <!-- Text Overlay -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                  <tr>
                    <td style="padding:60px 40px; vertical-align:center; text-align:center;">
                      <p style="margin:0 0 8px; font-size:12px; color:#ffffff; text-transform:uppercase; letter-spacing:0.25em; font-weight:500; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                        Trending Now
                      </p>
                      <h1 class="mobile-headline" style="margin:0 0 12px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:600; color:#ffffff; line-height:1.1; letter-spacing:-0.02em; text-shadow:0 2px 8px rgba(0,0,0,0.4);">
                        {{headline}}
                      </h1>
                      <p class="mobile-subhead" style="margin:0 0 32px; font-size:18px; color:#ffffff; line-height:1.5; text-shadow:0 1px 3px rgba(0,0,0,0.3); font-style:italic;">
                        {{subheadline}}
                      </p>

                      <!-- CTA Button - White pill -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                        <tr>
                          <td style="border-radius:50px; background:#ffffff;">
                            <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#000000; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                              {{cta_text}}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- CONTENT SECTION -->
          <tr>
            <td style="padding:40px; text-align:center; background:#fafafa;">
              <p style="margin:0; font-size:15px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, these are what everyone's loving this season.
              </p>
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
  description: 'Urgency red color block - time-sensitive offer',
  suggestedImages: imageLibrary.beauty.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Radiant%20Woman%20Portrait.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Time is ticking.', placeholder: 'Main headline' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'SAVE10', placeholder: 'e.g., WELCOME15' },
    { key: 'hours_left', label: 'Hours Left', type: 'text', defaultValue: '24', placeholder: 'e.g., 48' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FEE2E2' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Don\'t let your discount expire.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'USE MY DISCOUNT' },
  ],
  html: premiumWrapper(`
          <!-- URGENCY COLOR BLOCK -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:50px 40px; text-align:center;">
                    <p style="margin:0 0 12px; font-size:14px; color:#991b1b; text-transform:uppercase; letter-spacing:0.2em; font-weight:700;">
                      Expires in {{hours_left}} hours
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:44px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>

                    <!-- CODE PILL -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 28px;">
                      <tr>
                        <td style="padding:12px 32px; background:#ffffff; border-radius:50px; border:2px solid #991b1b;">
                          <span style="font-size:16px; font-weight:700; color:#991b1b; letter-spacing:0.15em;">{{discount_code}}</span>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button - Red pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#991b1b;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO IMAGE -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; max-height:400px; object-fit:cover;">
            </td>
          </tr>

          <!-- BOTTOM CONTENT -->
          <tr>
            <td style="padding:40px; text-align:center; background:#fafafa;">
              <p style="margin:0; font-size:15px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, your discount is about to expire. Don't miss out!
              </p>
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
  description: 'Minimal editorial with muted tones - respectful close',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Solitary%20Cabin%20on%20Hill.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'No rush, we\'ll be here.', placeholder: 'Main headline' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#F5F5F4' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'We\'re here whenever you\'re ready.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'EXPLORE LATER' },
  ],
  html: premiumWrapper(`
          <!-- HERO IMAGE FIRST -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; max-height:380px; object-fit:cover;">
            </td>
          </tr>

          <!-- MUTED COLOR BLOCK -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:50px 40px; text-align:center;">
                    <h1 class="mobile-headline" style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:40px; font-weight:400; color:#1a1a1a; line-height:1.2; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 28px; font-size:16px; color:#666666; line-height:1.7; max-width:380px; margin-left:auto; margin-right:auto;">
                      Hey {{customer_name}}, we understand—timing isn't always right. Your cart will be waiting whenever you're ready. No pressure.
                    </p>

                    <!-- CTA Button - Outline pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; border:2px solid #1a1a1a;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:14px 40px; font-size:13px; font-weight:600; color:#1a1a1a; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
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
  subjectLine: 'Welcome to {{brand_name}}',
  description: 'Full-bleed hero with text overlay - impactful first impression',
  suggestedImages: imageLibrary.beauty.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Radiant%20Woman%20Portrait.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'WELCOME', placeholder: 'Main headline' },
    { key: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'You\'re one of us now.', placeholder: 'Secondary text' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '15', placeholder: 'e.g., 10' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'WELCOME15', placeholder: 'e.g., WELCOME10' },
    { key: 'brand_tagline', label: 'Brand Tagline', type: 'text', defaultValue: 'Crafted for those who appreciate the finer things.', placeholder: 'Your brand tagline' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Welcome to the family. Here\'s a gift for you.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'START SHOPPING' },
  ],
  html: premiumWrapper(`
          <!-- FULL BLEED HERO WITH TEXT OVERLAY -->
          <tr>
            <td style="padding:0; position:relative;">
              <div style="position:relative;">
                <!-- Hero Image -->
                <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:500px; object-fit:cover;">

                <!-- Text Overlay -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                  <tr>
                    <td style="padding:60px 40px; vertical-align:center; text-align:center;">
                      <h1 class="mobile-headline" style="margin:0 0 12px; font-family:'Playfair Display',Georgia,serif; font-size:56px; font-weight:600; color:#ffffff; line-height:1.0; letter-spacing:0.1em; text-shadow:0 2px 8px rgba(0,0,0,0.4);">
                        {{headline}}
                      </h1>
                      <p class="mobile-subhead" style="margin:0 0 32px; font-size:20px; color:#ffffff; line-height:1.5; text-shadow:0 1px 3px rgba(0,0,0,0.3); font-style:italic;">
                        {{subheadline}}
                      </p>

                      <!-- CTA Button - White pill -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                        <tr>
                          <td style="border-radius:50px; background:#ffffff;">
                            <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#000000; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                              {{cta_text}}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- WELCOME GIFT SECTION -->
          <tr>
            <td style="padding:0; background:#1a1a1a;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:48px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:12px; color:#ffffff; text-transform:uppercase; letter-spacing:0.2em; opacity:0.7;">
                      Your Welcome Gift
                    </p>
                    <p style="margin:0 0 16px; font-size:64px; font-weight:700; color:#ffffff; letter-spacing:-0.02em; line-height:1;">
                      {{discount_percent}}%
                    </p>
                    <p style="margin:0 0 20px; font-size:14px; color:#ffffff; text-transform:uppercase; letter-spacing:0.15em;">
                      OFF YOUR FIRST ORDER
                    </p>

                    <!-- CODE PILL -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="padding:12px 32px; background:#ffffff; border-radius:50px;">
                          <span style="font-size:16px; font-weight:700; color:#1a1a1a; letter-spacing:0.15em;">{{discount_code}}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- TAGLINE -->
          <tr>
            <td style="padding:40px; text-align:center; background:#fafafa;">
              <p style="margin:0; font-family:'Playfair Display',Georgia,serif; font-size:18px; color:#666666; line-height:1.6; font-style:italic;">
                {{brand_tagline}}
              </p>
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
  subjectLine: 'Order confirmed',
  description: 'Elegant order confirmation - mint green color block',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'order_number', label: 'Order Number', type: 'text', defaultValue: '#12345', placeholder: 'e.g., #67890' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Thank You', placeholder: 'Main headline' },
    { key: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Your order is confirmed', placeholder: 'Secondary text' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#D1FAE5' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your order is confirmed and on its way!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'TRACK ORDER', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- MINT GREEN COLOR BLOCK - ORDER CONFIRMED -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:13px; color:#059669; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      Order {{order_number}}
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 12px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p class="mobile-subhead" style="margin:0 0 32px; font-size:18px; color:#374151; line-height:1.5;">
                      {{subheadline}}
                    </p>
                    <!-- CTA Button - Dark pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#1a1a1a;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Section -->
          <tr>
            <td class="mobile-padding" style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 16px; font-size:16px; color:#4b5563; line-height:1.7; max-width:420px; display:inline-block;">
                Hey {{customer_name}}, we're getting your order ready. You'll receive tracking info once it ships.
              </p>
            </td>
          </tr>
  `),
};

const postPurchase2: EmailTemplate = {
  id: 'post-purchase-2',
  name: 'Shipping Notification',
  category: 'post-purchase',
  timing: 'When order ships',
  subjectLine: 'Your order is on its way',
  description: 'Elegant shipping notification - lavender color block',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'delivery_date', label: 'Estimated Delivery', type: 'text', defaultValue: 'January 25-27', placeholder: 'e.g., March 15-17' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'On Its Way', placeholder: 'Main headline' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#E9D5FF' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your package is on its way!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'TRACK PACKAGE', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- LAVENDER COLOR BLOCK - SHIPPING -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:13px; color:#7c3aed; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      Shipping Update
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 12px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p class="mobile-subhead" style="margin:0 0 32px; font-size:16px; color:#374151; line-height:1.5;">
                      Arriving {{delivery_date}}
                    </p>
                    <!-- CTA Button - Dark pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#1a1a1a;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Section -->
          <tr>
            <td class="mobile-padding" style="padding:40px; text-align:center;">
              <p style="margin:0; font-size:15px; color:#6b7280; line-height:1.7; max-width:380px; display:inline-block;">
                Hey {{customer_name}}, your package has shipped and is on its way to you.
              </p>
            </td>
          </tr>
  `),
};

const postPurchase3: EmailTemplate = {
  id: 'post-purchase-3',
  name: 'Review Request',
  category: 'post-purchase',
  timing: '7 days after delivery',
  subjectLine: 'How are you enjoying it?',
  description: 'Elegant review request - full-bleed hero with overlay',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Share Your Story', placeholder: 'Main headline' },
    { key: 'review_incentive', label: 'Review Incentive', type: 'text', defaultValue: '10% off', placeholder: 'e.g., Free shipping' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'We\'d love to hear your thoughts!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'LEAVE REVIEW', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- FULL BLEED HERO WITH TEXT OVERLAY -->
          <tr>
            <td style="padding:0; position:relative;">
              <div style="position:relative;">
                <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:450px; object-fit:cover;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                  <tr>
                    <td style="padding:60px 40px; vertical-align:center; text-align:center;">
                      <p style="margin:0 0 8px; font-size:13px; color:#ffffff; text-transform:uppercase; letter-spacing:0.2em; font-weight:500; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                        Your Opinion Matters
                      </p>
                      <h1 class="mobile-headline" style="margin:0 0 24px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:400; color:#ffffff; line-height:1.1; font-style:italic; text-shadow:0 2px 8px rgba(0,0,0,0.4);">
                        {{headline}}
                      </h1>
                      <!-- CTA Button - White pill -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                        <tr>
                          <td style="border-radius:50px; background:#ffffff;">
                            <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#1a1a1a; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                              {{cta_text}}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Incentive Section -->
          <tr>
            <td style="padding:40px; background:#1a1a1a; text-align:center;">
              <p style="margin:0 0 4px; font-size:13px; color:rgba(255,255,255,0.7); text-transform:uppercase; letter-spacing:0.15em;">
                As a thank you
              </p>
              <p style="margin:0; font-size:24px; font-weight:600; color:#ffffff; letter-spacing:-0.02em;">
                Get {{review_incentive}} after your review
              </p>
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
  subjectLine: 'We miss you',
  description: 'Elegant reconnection - full-bleed hero with overlay',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'We Miss You', placeholder: 'Main headline' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '20', placeholder: 'e.g., 15' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'MISSYOU20', placeholder: 'e.g., COMEBACK15' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'It\'s been a while! Here\'s something special.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'COME BACK', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- FULL BLEED HERO WITH TEXT OVERLAY -->
          <tr>
            <td style="padding:0; position:relative;">
              <div style="position:relative;">
                <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:450px; object-fit:cover;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                  <tr>
                    <td style="padding:60px 40px; vertical-align:center; text-align:center;">
                      <p style="margin:0 0 8px; font-size:13px; color:#ffffff; text-transform:uppercase; letter-spacing:0.2em; font-weight:500; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                        It's been a while
                      </p>
                      <h1 class="mobile-headline" style="margin:0 0 24px; font-family:'Playfair Display',Georgia,serif; font-size:52px; font-weight:400; color:#ffffff; line-height:1.1; font-style:italic; text-shadow:0 2px 8px rgba(0,0,0,0.4);">
                        {{headline}}
                      </h1>
                      <!-- CTA Button - White pill -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                        <tr>
                          <td style="border-radius:50px; background:#ffffff;">
                            <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#1a1a1a; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                              {{cta_text}}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Dark Discount Section -->
          <tr>
            <td style="padding:40px; background:#1a1a1a; text-align:center;">
              <p style="margin:0 0 4px; font-size:11px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:0.15em;">
                Welcome Back Gift
              </p>
              <p style="margin:0 0 8px; font-size:32px; font-weight:600; color:#ffffff;">
                {{discount_percent}}% OFF
              </p>
              <p style="margin:0; font-size:14px; color:rgba(255,255,255,0.7);">
                Code: <span style="color:#ffffff; font-weight:600;">{{discount_code}}</span>
              </p>
            </td>
          </tr>
  `),
};

const winBack2: EmailTemplate = {
  id: 'win-back-2',
  name: 'What\'s New',
  category: 'win-back',
  timing: '45 days inactive',
  subjectLine: 'See what\'s new',
  description: 'Elegant new arrivals - lavender color block',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(12).png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'What\'s New', placeholder: 'Main headline' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#E9D5FF' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'See what\'s new.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'EXPLORE NOW', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- LAVENDER COLOR BLOCK - NEW ARRIVALS -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:50px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:13px; color:#7c3aed; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      New Arrivals
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 32px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <!-- CTA Button - Dark pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#1a1a1a;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; max-height:400px; object-fit:cover;">
            </td>
          </tr>
  `),
};

const winBack3: EmailTemplate = {
  id: 'win-back-3',
  name: 'Exclusive Return Offer',
  category: 'win-back',
  timing: '60 days inactive',
  subjectLine: 'Your exclusive offer',
  description: 'Elegant urgency - coral red color block',
  suggestedImages: imageLibrary.jewelry.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Just For You', placeholder: 'Main headline' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '25', placeholder: 'e.g., 20' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'EXCLUSIVE25', placeholder: 'e.g., VIP20' },
    { key: 'days_left', label: 'Days Left', type: 'text', defaultValue: '3', placeholder: 'e.g., 5' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FEE2E2' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'An exclusive offer just for you—expires soon.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'CLAIM OFFER', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- CORAL RED COLOR BLOCK - URGENCY -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:13px; color:#dc2626; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      Expires in {{days_left}} days
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 12px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 8px; font-size:56px; font-weight:700; color:#1a1a1a; letter-spacing:-0.03em;">
                      {{discount_percent}}%
                    </p>
                    <p style="margin:0 0 32px; font-size:16px; color:#374151;">
                      Code: <strong>{{discount_code}}</strong>
                    </p>
                    <!-- CTA Button - Dark pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#dc2626;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
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
  description: 'Elegant farewell - full-bleed hero with muted overlay',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Solitary%20Cabin%20on%20Hill.png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Is This Goodbye?', placeholder: 'Main headline' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'We\'ll miss you if you go.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'STAY WITH US', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- FULL BLEED HERO WITH TEXT OVERLAY -->
          <tr>
            <td style="padding:0; position:relative;">
              <div style="position:relative;">
                <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:450px; object-fit:cover;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                  <tr>
                    <td style="padding:60px 40px; vertical-align:center; text-align:center;">
                      <p style="margin:0 0 8px; font-size:13px; color:#ffffff; text-transform:uppercase; letter-spacing:0.2em; font-weight:500; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                        Before you go
                      </p>
                      <h1 class="mobile-headline" style="margin:0 0 24px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:400; color:#ffffff; line-height:1.1; font-style:italic; text-shadow:0 2px 8px rgba(0,0,0,0.4);">
                        {{headline}}
                      </h1>
                      <!-- CTA Button - White pill -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                        <tr>
                          <td style="border-radius:50px; background:#ffffff;">
                            <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#1a1a1a; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                              {{cta_text}}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Muted Text Section -->
          <tr>
            <td style="padding:32px 40px; text-align:center;">
              <p style="margin:0; font-size:14px; color:#9ca3af; line-height:1.7;">
                We'd hate to see you go. If you'd like to unsubscribe, click below.
              </p>
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
  description: 'Warm beige color block - brand storytelling',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Solitary%20Cabin%20on%20Hill.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Our story begins with you.', placeholder: 'Main headline' },
    { key: 'founder_name', label: 'Founder Name', type: 'text', defaultValue: 'Sarah', placeholder: 'e.g., John' },
    { key: 'founding_year', label: 'Founding Year', type: 'text', defaultValue: '2020', placeholder: 'e.g., 2018' },
    { key: 'brand_mission', label: 'Brand Mission', type: 'text', defaultValue: 'to create products that make everyday moments extraordinary', placeholder: 'Your mission statement' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FEF3C7' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'How it all began...', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'EXPLORE' },
  ],
  html: premiumWrapper(`
          <!-- WARM BEIGE COLOR BLOCK -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:50px 40px; text-align:center;">
                    <p style="margin:0 0 12px; font-size:12px; color:#92400E; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                      Our Story
                    </p>
                    <h1 class="mobile-headline" style="margin:0; font-family:'Playfair Display',Georgia,serif; font-size:42px; font-weight:400; color:#1a1a1a; line-height:1.2; font-style:italic;">
                      {{headline}}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO IMAGE -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; max-height:400px; object-fit:cover;">
            </td>
          </tr>

          <!-- STORY CONTENT -->
          <tr>
            <td style="padding:48px 40px; background:#fafafa;">
              <p style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:18px; color:#1a1a1a; line-height:1.8; font-style:italic;">
                "Back in {{founding_year}}, I started {{brand_name}} with a simple belief: {{brand_mission}}."
              </p>
              <p style="margin:0 0 28px; font-size:16px; color:#666666; line-height:1.7;">
                Every product we create is a reflection of that vision. We're not just building a brand—we're building something meaningful, one customer at a time.
              </p>
              <p style="margin:0 0 32px; font-size:16px; color:#1a1a1a; font-weight:500;">
                — {{founder_name}}, Founder
              </p>

              <!-- CTA Button - Dark pill -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:50px; background:#1a1a1a;">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
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
  description: 'Full-bleed hero with text overlay - social proof',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'BEST SELLERS', placeholder: 'Main headline' },
    { key: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'What everyone\'s loving', placeholder: 'Secondary text' },
    { key: 'product_1', label: 'Best Seller #1', type: 'text', defaultValue: 'The Classic Collection', placeholder: 'Product name' },
    { key: 'product_2', label: 'Best Seller #2', type: 'text', defaultValue: 'Summer Essentials', placeholder: 'Product name' },
    { key: 'product_3', label: 'Best Seller #3', type: 'text', defaultValue: 'Limited Edition Set', placeholder: 'Product name' },
    { key: 'review_count', label: 'Total Reviews', type: 'text', defaultValue: '10,000+', placeholder: 'e.g., 5,000+' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'See what everyone is loving right now.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP NOW' },
  ],
  html: premiumWrapper(`
          <!-- FULL BLEED HERO WITH TEXT OVERLAY -->
          <tr>
            <td style="padding:0; position:relative;">
              <div style="position:relative;">
                <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:420px; object-fit:cover;">

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                  <tr>
                    <td style="padding:50px 40px; vertical-align:center; text-align:center;">
                      <p style="margin:0 0 8px; font-size:12px; color:#ffffff; text-transform:uppercase; letter-spacing:0.25em; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                        {{review_count}} Five-Star Reviews
                      </p>
                      <h1 class="mobile-headline" style="margin:0 0 12px; font-family:'Playfair Display',Georgia,serif; font-size:52px; font-weight:600; color:#ffffff; letter-spacing:0.05em; text-shadow:0 2px 8px rgba(0,0,0,0.4);">
                        {{headline}}
                      </h1>
                      <p class="mobile-subhead" style="margin:0 0 28px; font-size:18px; color:#ffffff; font-style:italic; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                        {{subheadline}}
                      </p>

                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                        <tr>
                          <td style="border-radius:50px; background:#ffffff;">
                            <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#000000; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                              {{cta_text}}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- PRODUCTS LIST -->
          <tr>
            <td style="padding:40px; background:#fafafa;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:16px 20px; background:#ffffff; border-radius:50px; text-align:center; margin-bottom:12px;">
                    <span style="font-family:'Playfair Display',Georgia,serif; font-size:16px; color:#1a1a1a; font-style:italic;">{{product_1}}</span>
                  </td>
                </tr>
                <tr><td style="height:12px;"></td></tr>
                <tr>
                  <td style="padding:16px 20px; background:#ffffff; border-radius:50px; text-align:center;">
                    <span style="font-family:'Playfair Display',Georgia,serif; font-size:16px; color:#1a1a1a; font-style:italic;">{{product_2}}</span>
                  </td>
                </tr>
                <tr><td style="height:12px;"></td></tr>
                <tr>
                  <td style="padding:16px 20px; background:#ffffff; border-radius:50px; text-align:center;">
                    <span style="font-family:'Playfair Display',Georgia,serif; font-size:16px; color:#1a1a1a; font-style:italic;">{{product_3}}</span>
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
  description: 'Elegant cream color block - personal letter style',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'A note, just for you.', placeholder: 'Main headline' },
    { key: 'founder_name', label: 'Founder Name', type: 'text', defaultValue: 'Sarah', placeholder: 'e.g., John' },
    { key: 'personal_message', label: 'Personal Message', type: 'text', defaultValue: 'I started this company because I believed everyone deserves access to quality products that make them feel confident and inspired.', placeholder: 'Your personal message' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FFFBEB' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'A message from our founder, just for you.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'EXPLORE' },
  ],
  html: premiumWrapper(`
          <!-- CREAM COLOR BLOCK -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:50px 40px; text-align:center;">
                    <p style="margin:0 0 12px; font-size:12px; color:#92400E; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                      From the Founder
                    </p>
                    <h1 class="mobile-headline" style="margin:0; font-family:'Playfair Display',Georgia,serif; font-size:42px; font-weight:400; color:#1a1a1a; line-height:1.2; font-style:italic;">
                      {{headline}}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- LETTER CONTENT -->
          <tr>
            <td style="padding:48px 40px; background:#ffffff;">
              <div style="max-width:480px; margin:0 auto;">
                <p style="margin:0 0 24px; font-family:'Playfair Display',Georgia,serif; font-size:18px; color:#1a1a1a; line-height:1.8; font-style:italic;">
                  "Hey {{customer_name}},
                </p>
                <p style="margin:0 0 24px; font-size:16px; color:#666666; line-height:1.8;">
                  {{personal_message}}
                </p>
                <p style="margin:0 0 24px; font-size:16px; color:#666666; line-height:1.8;">
                  Thank you for being here. You're not just a customer—you're part of our story now.
                </p>
                <p style="margin:0 0 32px; font-family:'Playfair Display',Georgia,serif; font-size:18px; color:#1a1a1a; font-style:italic;">
                  With gratitude,<br>{{founder_name}}"
                </p>

                <!-- CTA Button - Dark pill -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                  <tr>
                    <td style="border-radius:50px; background:#1a1a1a;">
                      <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                        {{cta_text}}
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
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
  description: 'Light blue color block - educational style',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(14).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Your guide to shopping.', placeholder: 'Main headline' },
    { key: 'category_1', label: 'Category 1', type: 'text', defaultValue: 'New Arrivals', placeholder: 'e.g., Dresses' },
    { key: 'category_2', label: 'Category 2', type: 'text', defaultValue: 'Best Sellers', placeholder: 'e.g., Accessories' },
    { key: 'category_3', label: 'Category 3', type: 'text', defaultValue: 'Sale', placeholder: 'e.g., Shoes' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#DBEAFE' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Everything you need to know about shopping with us.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'START EXPLORING' },
  ],
  html: premiumWrapper(`
          <!-- LIGHT BLUE COLOR BLOCK -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:50px 40px; text-align:center;">
                    <p style="margin:0 0 12px; font-size:12px; color:#1e40af; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                      Shopping Guide
                    </p>
                    <h1 class="mobile-headline" style="margin:0; font-family:'Playfair Display',Georgia,serif; font-size:42px; font-weight:400; color:#1a1a1a; line-height:1.2; font-style:italic;">
                      {{headline}}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO IMAGE -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; max-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- CATEGORIES -->
          <tr>
            <td style="padding:40px; background:#fafafa;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:20px 24px; background:#1a1a1a; border-radius:50px; text-align:center; margin-bottom:12px;">
                    <span style="font-size:15px; color:#ffffff; font-weight:600; letter-spacing:0.05em;">{{category_1}}</span>
                  </td>
                </tr>
                <tr><td style="height:12px;"></td></tr>
                <tr>
                  <td style="padding:20px 24px; background:#1a1a1a; border-radius:50px; text-align:center;">
                    <span style="font-size:15px; color:#ffffff; font-weight:600; letter-spacing:0.05em;">{{category_2}}</span>
                  </td>
                </tr>
                <tr><td style="height:12px;"></td></tr>
                <tr>
                  <td style="padding:20px 24px; background:#1e40af; border-radius:50px; text-align:center;">
                    <span style="font-size:15px; color:#ffffff; font-weight:600; letter-spacing:0.05em;">{{category_3}}</span>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:32px auto 0;">
                <tr>
                  <td style="border-radius:50px; border:2px solid #1a1a1a;">
                    <a href="{{cta_url}}" style="display:inline-block; padding:14px 40px; font-size:13px; font-weight:600; color:#1a1a1a; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
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
  description: 'Purple color block - personalized quiz invitation',
  suggestedImages: imageLibrary.beauty.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Radiant%20Woman%20Portrait.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Find your perfect match.', placeholder: 'Main headline' },
    { key: 'product_type', label: 'Product Type', type: 'text', defaultValue: 'products', placeholder: 'e.g., skincare routine' },
    { key: 'quiz_time', label: 'Quiz Duration', type: 'text', defaultValue: '2 minutes', placeholder: 'e.g., 60 seconds' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#E9D5FF' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Take our quick quiz to find your perfect match.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'TAKE THE QUIZ' },
  ],
  html: premiumWrapper(`
          <!-- HERO IMAGE -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; max-height:420px; object-fit:cover;">
            </td>
          </tr>

          <!-- PURPLE COLOR BLOCK -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:50px 40px; text-align:center;">
                    <p style="margin:0 0 12px; font-size:12px; color:#7c3aed; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                      Personalized for you
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:42px; font-weight:400; color:#1a1a1a; line-height:1.2; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 28px; font-size:16px; color:#666666; line-height:1.7; max-width:380px; margin-left:auto; margin-right:auto;">
                      Not sure where to start? Take our {{quiz_time}} quiz and we'll recommend the perfect {{product_type}} just for you.
                    </p>

                    <!-- CTA Button - Purple pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#7c3aed;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
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
  description: 'Full-bleed hero with text overlay - community invitation',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Farmer%20in%20Strawberry%20Field.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'JOIN THE FAMILY', placeholder: 'Main headline' },
    { key: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'You\'re part of something bigger.', placeholder: 'Secondary text' },
    { key: 'instagram_handle', label: 'Instagram Handle', type: 'text', defaultValue: '@yourbrand', placeholder: '@yourbrand' },
    { key: 'hashtag', label: 'Brand Hashtag', type: 'text', defaultValue: '#YourBrandName', placeholder: '#YourBrandName' },
    { key: 'community_size', label: 'Community Size', type: 'text', defaultValue: '50,000+', placeholder: 'e.g., 25,000+' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Join thousands of others in our community.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'FOLLOW US' },
  ],
  html: premiumWrapper(`
          <!-- FULL BLEED HERO WITH TEXT OVERLAY -->
          <tr>
            <td style="padding:0; position:relative;">
              <div style="position:relative;">
                <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:450px; object-fit:cover;">

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                  <tr>
                    <td style="padding:60px 40px; vertical-align:center; text-align:center;">
                      <p style="margin:0 0 8px; font-size:12px; color:#ffffff; text-transform:uppercase; letter-spacing:0.25em; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                        {{community_size}} Strong
                      </p>
                      <h1 class="mobile-headline" style="margin:0 0 12px; font-family:'Playfair Display',Georgia,serif; font-size:50px; font-weight:600; color:#ffffff; letter-spacing:0.05em; text-shadow:0 2px 8px rgba(0,0,0,0.4);">
                        {{headline}}
                      </h1>
                      <p class="mobile-subhead" style="margin:0 0 28px; font-size:18px; color:#ffffff; font-style:italic; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                        {{subheadline}}
                      </p>

                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                        <tr>
                          <td style="border-radius:50px; background:#ffffff;">
                            <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#000000; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                              {{cta_text}}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- SOCIAL INFO -->
          <tr>
            <td style="padding:40px; text-align:center; background:#fafafa;">
              <p style="margin:0 0 8px; font-size:16px; color:#1a1a1a; font-weight:600;">
                {{instagram_handle}}
              </p>
              <p style="margin:0; font-size:14px; color:#666666;">
                Share your style with {{hashtag}}
              </p>
            </td>
          </tr>
  `),
};

const welcome8: EmailTemplate = {
  id: 'welcome-8',
  name: 'Last Chance First-Timer',
  category: 'welcome',
  timing: '10 days after signup',
  subjectLine: 'Your welcome discount expires soon',
  description: 'Red urgency color block - expiring discount',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Last chance.', placeholder: 'Main headline' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '15', placeholder: 'e.g., 10' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'WELCOME15', placeholder: 'e.g., WELCOME10' },
    { key: 'hours_left', label: 'Hours Left', type: 'text', defaultValue: '24', placeholder: 'e.g., 48' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FEE2E2' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Don\'t miss your welcome discount!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'USE MY DISCOUNT' },
  ],
  html: premiumWrapper(`
          <!-- RED URGENCY COLOR BLOCK -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:50px 40px; text-align:center;">
                    <p style="margin:0 0 12px; font-size:14px; color:#991b1b; text-transform:uppercase; letter-spacing:0.2em; font-weight:700;">
                      Expires in {{hours_left}} hours
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:46px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 8px; font-size:48px; font-weight:700; color:#1a1a1a; line-height:1;">
                      {{discount_percent}}%
                    </p>
                    <p style="margin:0 0 24px; font-size:14px; color:#991b1b; text-transform:uppercase; letter-spacing:0.15em; font-weight:600;">
                      OFF YOUR FIRST ORDER
                    </p>

                    <!-- CODE PILL -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 28px;">
                      <tr>
                        <td style="padding:12px 32px; background:#ffffff; border-radius:50px; border:2px solid #991b1b;">
                          <span style="font-size:16px; font-weight:700; color:#991b1b; letter-spacing:0.15em;">{{discount_code}}</span>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button - Red pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#991b1b;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO IMAGE -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; max-height:400px; object-fit:cover;">
            </td>
          </tr>

          <!-- BOTTOM CONTENT -->
          <tr>
            <td style="padding:40px; text-align:center; background:#fafafa;">
              <p style="margin:0; font-size:15px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, this is your last chance. Don't let it slip away!
              </p>
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
  description: 'Mint green color block with price comparison - celebration style',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Lucky you.', placeholder: 'Main headline' },
    { key: 'product_name', label: 'Product Name', type: 'text', defaultValue: 'your favorites', placeholder: 'e.g., The Classic Tee' },
    { key: 'old_price', label: 'Original Price', type: 'text', defaultValue: '$89', placeholder: 'e.g., $79' },
    { key: 'new_price', label: 'New Price', type: 'text', defaultValue: '$69', placeholder: 'e.g., $59' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#D1FAE5' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'The items in your cart just went on sale!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'GET IT NOW' },
  ],
  html: premiumWrapper(`
          <!-- MINT GREEN COLOR BLOCK -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:50px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:12px; color:#059669; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                      Price Drop Alert
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 28px; font-family:'Playfair Display',Georgia,serif; font-size:46px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>

                    <!-- PRICE COMPARISON PILLS -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 28px;">
                      <tr>
                        <td style="padding:12px 24px; background:#ffffff; border-radius:50px 0 0 50px;">
                          <span style="font-size:16px; color:#9ca3af; text-decoration:line-through;">{{old_price}}</span>
                        </td>
                        <td style="padding:12px 24px; background:#059669; border-radius:0 50px 50px 0;">
                          <span style="font-size:18px; font-weight:700; color:#ffffff;">{{new_price}}</span>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button - Dark green pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#166534;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO IMAGE -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; max-height:360px; object-fit:cover;">
            </td>
          </tr>

          <!-- BOTTOM CONTENT -->
          <tr>
            <td style="padding:40px; text-align:center; background:#fafafa;">
              <p style="margin:0; font-size:15px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, {{product_name}} just dropped in price. Don't miss out!
              </p>
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
  subjectLine: 'It has arrived',
  description: 'Elegant delivery celebration - coral color block',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'It\'s Here', placeholder: 'Main headline' },
    { key: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Your order has been delivered', placeholder: 'Secondary text' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FECACA' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your package has arrived!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHARE YOUR MOMENT', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- CORAL COLOR BLOCK - DELIVERED -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:13px; color:#dc2626; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      Delivered
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 12px; font-family:'Playfair Display',Georgia,serif; font-size:52px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p class="mobile-subhead" style="margin:0 0 32px; font-size:16px; color:#374151; line-height:1.5;">
                      {{subheadline}}
                    </p>
                    <!-- CTA Button - Dark pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#1a1a1a;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Section -->
          <tr>
            <td class="mobile-padding" style="padding:40px; text-align:center;">
              <p style="margin:0; font-size:15px; color:#6b7280; line-height:1.7; max-width:380px; display:inline-block;">
                Hey {{customer_name}}, we hope you love it. Share your unboxing moment with us.
              </p>
            </td>
          </tr>
  `),
};

const postPurchase5: EmailTemplate = {
  id: 'post-purchase-5',
  name: 'How to Use Guide',
  category: 'post-purchase',
  timing: '+2 days after delivery',
  subjectLine: 'Get the most from your purchase',
  description: 'Elegant care guide - cream color block with tips',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Care Guide', placeholder: 'Main headline' },
    { key: 'tip_1', label: 'Tip 1', type: 'text', defaultValue: 'Machine wash cold, tumble dry low', placeholder: 'Care tip' },
    { key: 'tip_2', label: 'Tip 2', type: 'text', defaultValue: 'Store in a cool, dry place', placeholder: 'Care tip' },
    { key: 'tip_3', label: 'Tip 3', type: 'text', defaultValue: 'Pair with your favorite accessories', placeholder: 'Style tip' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FEF3C7' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Tips to get the most from your purchase.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'VIEW FULL GUIDE', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- CREAM COLOR BLOCK - CARE GUIDE -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:50px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:13px; color:#92400e; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      For You
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 32px; font-family:'Playfair Display',Georgia,serif; font-size:44px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Tips Section -->
          <tr>
            <td class="mobile-padding" style="padding:40px;">
              <!-- Numbered Tips -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:20px 24px; border-bottom:1px solid #f0f0f0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="40" style="font-family:'Playfair Display',Georgia,serif; font-size:28px; color:#d4a574; font-weight:400; vertical-align:top;">1</td>
                        <td style="font-size:15px; color:#374151; line-height:1.6;">{{tip_1}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px; border-bottom:1px solid #f0f0f0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="40" style="font-family:'Playfair Display',Georgia,serif; font-size:28px; color:#d4a574; font-weight:400; vertical-align:top;">2</td>
                        <td style="font-size:15px; color:#374151; line-height:1.6;">{{tip_2}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="40" style="font-family:'Playfair Display',Georgia,serif; font-size:28px; color:#d4a574; font-weight:400; vertical-align:top;">3</td>
                        <td style="font-size:15px; color:#374151; line-height:1.6;">{{tip_3}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button - Dark pill centered -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:32px auto 0;">
                <tr>
                  <td style="border-radius:50px; background:#1a1a1a;">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
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
  description: 'Elegant referral - full-bleed hero + dark rewards section',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Farmer%20in%20Strawberry%20Field.png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Share & Earn', placeholder: 'Main headline' },
    { key: 'referral_reward', label: 'Your Reward', type: 'text', defaultValue: '$20', placeholder: 'e.g., 15%' },
    { key: 'friend_reward', label: 'Friend Gets', type: 'text', defaultValue: '$20', placeholder: 'e.g., $10' },
    { key: 'referral_code', label: 'Referral Code', type: 'text', defaultValue: 'FRIEND20', placeholder: 'e.g., SHARE10' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Refer a friend and you both get rewarded.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHARE NOW', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- FULL BLEED HERO WITH TEXT OVERLAY -->
          <tr>
            <td style="padding:0; position:relative;">
              <div style="position:relative;">
                <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:400px; object-fit:cover;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                  <tr>
                    <td style="padding:60px 40px; vertical-align:center; text-align:center;">
                      <p style="margin:0 0 8px; font-size:13px; color:#ffffff; text-transform:uppercase; letter-spacing:0.2em; font-weight:500; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                        Referral Program
                      </p>
                      <h1 class="mobile-headline" style="margin:0; font-family:'Playfair Display',Georgia,serif; font-size:52px; font-weight:400; color:#ffffff; line-height:1.1; font-style:italic; text-shadow:0 2px 8px rgba(0,0,0,0.4);">
                        {{headline}}
                      </h1>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Dark Rewards Section -->
          <tr>
            <td style="padding:40px; background:#1a1a1a; text-align:center;">
              <!-- Side by side rewards -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td width="48%" style="text-align:center;">
                    <p style="margin:0 0 4px; font-size:11px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:0.15em;">You Get</p>
                    <p style="margin:0; font-size:32px; font-weight:600; color:#ffffff;">{{referral_reward}}</p>
                  </td>
                  <td width="4%" style="text-align:center;">
                    <p style="margin:0; font-size:24px; color:rgba(255,255,255,0.3);">+</p>
                  </td>
                  <td width="48%" style="text-align:center;">
                    <p style="margin:0 0 4px; font-size:11px; color:rgba(255,255,255,0.5); text-transform:uppercase; letter-spacing:0.15em;">They Get</p>
                    <p style="margin:0; font-size:32px; font-weight:600; color:#ffffff;">{{friend_reward}}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 24px; font-size:13px; color:rgba(255,255,255,0.6);">
                Code: <span style="color:#ffffff; font-weight:600;">{{referral_code}}</span>
              </p>
              <!-- CTA Button - White pill -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:50px; background:#ffffff;">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#1a1a1a; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
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
  subjectLine: 'You earned points',
  description: 'Elegant points update - champagne gold color block',
  suggestedImages: imageLibrary.jewelry.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'points_earned', label: 'Points Earned', type: 'text', defaultValue: '150', placeholder: 'e.g., 200' },
    { key: 'total_points', label: 'Total Points', type: 'text', defaultValue: '350', placeholder: 'e.g., 500' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Points Earned', placeholder: 'Main headline' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FEF3C7' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'See how many points you\'ve earned!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'VIEW REWARDS', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- CHAMPAGNE GOLD COLOR BLOCK - POINTS -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:13px; color:#92400e; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      Rewards Update
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:44px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 32px; font-size:64px; font-weight:700; color:#1a1a1a; letter-spacing:-0.03em;">
                      +{{points_earned}}
                    </p>
                    <!-- CTA Button - Dark pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#1a1a1a;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Total Balance Section -->
          <tr>
            <td style="padding:32px 40px; text-align:center; border-top:1px solid #f0f0f0;">
              <p style="margin:0 0 4px; font-size:12px; color:#6b7280; text-transform:uppercase; letter-spacing:0.15em;">
                Total Balance
              </p>
              <p style="margin:0; font-size:28px; font-weight:600; color:#1a1a1a;">
                {{total_points}} points
              </p>
            </td>
          </tr>
  `),
};

const postPurchase8: EmailTemplate = {
  id: 'post-purchase-8',
  name: 'Replenishment Reminder',
  category: 'post-purchase',
  timing: '+30 days after delivery',
  subjectLine: 'Time to restock',
  description: 'Elegant replenishment - sage green color block',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Time to Refill?', placeholder: 'Main headline' },
    { key: 'discount_percent', label: 'Reorder Discount %', type: 'number', defaultValue: '10', placeholder: 'e.g., 15' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'RESTOCK10', placeholder: 'e.g., REFILL15' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#D1FAE5' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Running low? Time to restock.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'REORDER NOW', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- SAGE GREEN COLOR BLOCK - RESTOCK -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:13px; color:#059669; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      Reorder Reminder
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:44px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 32px; font-size:18px; color:#374151;">
                      Use code <strong style="color:#059669;">{{discount_code}}</strong> for {{discount_percent}}% off
                    </p>
                    <!-- CTA Button - Dark pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#1a1a1a;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
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
  subjectLine: 'Complete your look',
  description: 'Elegant cross-sell - full-bleed hero with overlay',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Complete the Look', placeholder: 'Main headline' },
    { key: 'subheadline', label: 'Subheadline', type: 'text', defaultValue: 'Curated just for you', placeholder: 'Secondary text' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Complete your look with these picks.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP NOW', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- FULL BLEED HERO WITH TEXT OVERLAY -->
          <tr>
            <td style="padding:0; position:relative;">
              <div style="position:relative;">
                <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:500px; object-fit:cover;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                  <tr>
                    <td style="padding:60px 40px; vertical-align:center; text-align:center;">
                      <p style="margin:0 0 8px; font-size:13px; color:#ffffff; text-transform:uppercase; letter-spacing:0.2em; font-weight:500; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                        {{subheadline}}
                      </p>
                      <h1 class="mobile-headline" style="margin:0 0 32px; font-family:'Playfair Display',Georgia,serif; font-size:52px; font-weight:400; color:#ffffff; line-height:1.1; font-style:italic; text-shadow:0 2px 8px rgba(0,0,0,0.4);">
                        {{headline}}
                      </h1>
                      <!-- CTA Button - White pill -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                        <tr>
                          <td style="border-radius:50px; background:#ffffff;">
                            <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#1a1a1a; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                              {{cta_text}}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
  `),
};

const postPurchase10: EmailTemplate = {
  id: 'post-purchase-10',
  name: 'VIP Tier Unlock',
  category: 'post-purchase',
  timing: 'On milestone',
  subjectLine: 'Welcome to VIP',
  description: 'Elegant VIP unlock - gold luxe color block',
  suggestedImages: imageLibrary.jewelry.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'tier_name', label: 'VIP Tier Name', type: 'text', defaultValue: 'Gold', placeholder: 'e.g., Platinum' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'You Made It', placeholder: 'Main headline' },
    { key: 'perk_1', label: 'Perk 1', type: 'text', defaultValue: 'Free shipping on all orders', placeholder: 'VIP benefit' },
    { key: 'perk_2', label: 'Perk 2', type: 'text', defaultValue: 'Early access to new releases', placeholder: 'VIP benefit' },
    { key: 'perk_3', label: 'Perk 3', type: 'text', defaultValue: 'Exclusive VIP-only sales', placeholder: 'VIP benefit' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FEF3C7' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'You\'ve unlocked exclusive VIP benefits!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'EXPLORE BENEFITS', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- GOLD LUXE COLOR BLOCK - VIP UNLOCK -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:13px; color:#92400e; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      Welcome to {{tier_name}} VIP
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 32px; font-family:'Playfair Display',Georgia,serif; font-size:52px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <!-- CTA Button - Dark pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#1a1a1a;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Perks Section -->
          <tr>
            <td class="mobile-padding" style="padding:40px;">
              <p style="margin:0 0 20px; font-size:13px; color:#6b7280; text-transform:uppercase; letter-spacing:0.15em; text-align:center;">
                Your Exclusive Perks
              </p>
              <!-- Numbered Perks -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:16px 24px; border-bottom:1px solid #f0f0f0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="32" style="font-family:'Playfair Display',Georgia,serif; font-size:24px; color:#d4a574; font-weight:400; vertical-align:top;">1</td>
                        <td style="font-size:15px; color:#374151; line-height:1.5;">{{perk_1}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px; border-bottom:1px solid #f0f0f0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="32" style="font-family:'Playfair Display',Georgia,serif; font-size:24px; color:#d4a574; font-weight:400; vertical-align:top;">2</td>
                        <td style="font-size:15px; color:#374151; line-height:1.5;">{{perk_2}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="32" style="font-family:'Playfair Display',Georgia,serif; font-size:24px; color:#d4a574; font-weight:400; vertical-align:top;">3</td>
                        <td style="font-size:15px; color:#374151; line-height:1.5;">{{perk_3}}</td>
                      </tr>
                    </table>
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
  subjectLine: 'Share your thoughts',
  description: 'Elegant feedback request - light blue color block',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Your Voice Matters', placeholder: 'Main headline' },
    { key: 'survey_incentive', label: 'Survey Incentive', type: 'text', defaultValue: '15% off', placeholder: 'e.g., $10 credit' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#DBEAFE' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Help us improve and get a reward.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHARE FEEDBACK', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- LIGHT BLUE COLOR BLOCK - FEEDBACK -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:13px; color:#2563eb; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      We'd love to hear from you
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 32px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <!-- CTA Button - Dark pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#1a1a1a;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Incentive Section -->
          <tr>
            <td style="padding:32px 40px; text-align:center; border-top:1px solid #f0f0f0;">
              <p style="margin:0; font-size:15px; color:#6b7280;">
                As a thank you, get <strong style="color:#1a1a1a;">{{survey_incentive}}</strong> after your feedback
              </p>
            </td>
          </tr>
  `),
};

const winBack6: EmailTemplate = {
  id: 'win-back-6',
  name: 'Birthday/Anniversary',
  category: 'win-back',
  timing: 'Date-based',
  subjectLine: 'Happy Birthday',
  description: 'Elegant birthday - pink/rose color block',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Happy Birthday', placeholder: 'Main headline' },
    { key: 'discount_percent', label: 'Birthday Discount %', type: 'number', defaultValue: '20', placeholder: 'e.g., 25' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'BDAY20', placeholder: 'e.g., BIRTHDAY25' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FCE7F3' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'A special birthday gift, just for you!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'CLAIM MY GIFT', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- PINK/ROSE COLOR BLOCK - BIRTHDAY -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:13px; color:#db2777; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      It's Your Day
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:52px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 32px; font-size:56px; font-weight:700; color:#1a1a1a; letter-spacing:-0.03em;">
                      {{discount_percent}}% OFF
                    </p>
                    <!-- CTA Button - Dark pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#1a1a1a;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Code Section -->
          <tr>
            <td style="padding:32px 40px; text-align:center; border-top:1px solid #f0f0f0;">
              <p style="margin:0; font-size:15px; color:#6b7280;">
                Use code <strong style="color:#1a1a1a;">{{discount_code}}</strong>
              </p>
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
  description: 'Elegant seasonal - full-bleed hero with overlay',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'New Season', placeholder: 'Main headline' },
    { key: 'season', label: 'Season Name', type: 'text', defaultValue: 'Spring', placeholder: 'e.g., Summer, Fall, Winter' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Fresh styles for a fresh season.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP NOW', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- FULL BLEED HERO WITH TEXT OVERLAY -->
          <tr>
            <td style="padding:0; position:relative;">
              <div style="position:relative;">
                <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:500px; object-fit:cover;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                  <tr>
                    <td style="padding:60px 40px; vertical-align:center; text-align:center;">
                      <p style="margin:0 0 8px; font-size:13px; color:#ffffff; text-transform:uppercase; letter-spacing:0.2em; font-weight:500; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                        {{season}} Collection
                      </p>
                      <h1 class="mobile-headline" style="margin:0 0 24px; font-family:'Playfair Display',Georgia,serif; font-size:52px; font-weight:400; color:#ffffff; line-height:1.1; font-style:italic; text-shadow:0 2px 8px rgba(0,0,0,0.4);">
                        {{headline}}
                      </h1>
                      <!-- CTA Button - White pill -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                        <tr>
                          <td style="border-radius:50px; background:#ffffff;">
                            <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#1a1a1a; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                              {{cta_text}}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
  `),
};

const winBack8: EmailTemplate = {
  id: 'win-back-8',
  name: 'Category Restock Alert',
  category: 'win-back',
  timing: 'On restock',
  subjectLine: 'Back in stock',
  description: 'Elegant restock - mint green color block',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(12).png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Back in Stock', placeholder: 'Main headline' },
    { key: 'category_name', label: 'Category Name', type: 'text', defaultValue: 'your favorites', placeholder: 'e.g., Dresses, Shoes' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#D1FAE5' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Items you browsed are back in stock!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP NOW', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <!-- MINT GREEN COLOR BLOCK - RESTOCK -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:50px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:13px; color:#059669; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      Just Restocked
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 12px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 32px; font-size:16px; color:#374151;">
                      {{category_name}}
                    </p>
                    <!-- CTA Button - Dark pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#1a1a1a;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; max-height:400px; object-fit:cover;">
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
  subjectLine: 'The moment you\'ve waited for.',
  description: 'Lavender color block style - elegant flash sale',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png', placeholder: 'https://...' },
    { key: 'hero_image_2', label: 'Second Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '30', placeholder: 'e.g., 25' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'More essential than ever', placeholder: 'Main headline' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#C4B5FD' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Our biggest sale of the season is here.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP THE SALE' },
  ],
  html: premiumWrapper(`
          <!-- LAVENDER COLOR BLOCK - ARCADY WELLNESS STYLE -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:50px 40px 40px; text-align:center;">
                    <h1 class="mobile-headline" style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:44px; font-weight:400; color:#1a1a1a; line-height:1.15; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 28px; font-size:16px; color:#374151; line-height:1.7; max-width:380px; margin-left:auto; margin-right:auto;">
                      Our biggest sale just dropped. {{discount_percent}}% off everything you love, for a limited time only.
                    </p>

                    <!-- CTA Button - Dark green pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#166534;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- TWO-COLUMN IMAGE GRID -->
          <tr>
            <td style="padding:0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="50%" valign="top" style="padding:0;">
                    <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:320px; object-fit:cover;">
                  </td>
                  <td width="50%" valign="top" style="padding:0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding:0;">
                          <img src="{{hero_image_2}}" alt="" style="display:block; width:100%; height:160px; object-fit:cover;">
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0; background:#f5f5f5;">
                          <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:160px; object-fit:cover; opacity:0.9;">
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BOTTOM CONTENT -->
          <tr>
            <td style="padding:40px; text-align:center; background:#fafafa;">
              <p style="margin:0 0 4px; font-size:12px; color:#999999; text-transform:uppercase; letter-spacing:0.15em; font-weight:500;">
                Limited time only
              </p>
              <p style="margin:0; font-size:15px; color:#666666; line-height:1.6;">
                Sale ends soon. Don't miss your chance.
              </p>
            </td>
          </tr>
  `),
};

const flashSale2: EmailTemplate = {
  id: 'flash-sale-2',
  name: 'Early Access VIP',
  category: 'flash-sale' as EmailTemplate['category'],
  timing: 'Before public sale',
  subjectLine: 'You\'re invited first.',
  description: 'Gold champagne color block - VIP early access',
  suggestedImages: imageLibrary.jewelry.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/womans-elegant-hand-with-delicate%20(2).png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Private sale preview', placeholder: 'Main headline' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '25', placeholder: 'e.g., 30' },
    { key: 'early_hours', label: 'Early Access Hours', type: 'text', defaultValue: '24 hours', placeholder: 'e.g., 12 hours' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#F5E6D3' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your VIP early access starts now.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP EARLY' },
  ],
  html: premiumWrapper(`
          <!-- CHAMPAGNE GOLD COLOR BLOCK - VIP EARLY ACCESS -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:11px; color:#92400e; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      VIP Early Access • {{early_hours}} head start
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 8px; font-size:13px; color:#374151; line-height:1.6; max-width:340px; margin-left:auto; margin-right:auto;">
                      As one of our most valued customers, you get first access to our sale.
                    </p>
                    <p style="margin:0 0 28px; font-size:32px; font-weight:600; color:#1a1a1a; letter-spacing:-0.02em;">
                      {{discount_percent}}% off everything
                    </p>

                    <!-- CTA Button - Dark pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#1a1a1a;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Full Width Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:380px; object-fit:cover;">
            </td>
          </tr>
  `),
};

const flashSale3: EmailTemplate = {
  id: 'flash-sale-3',
  name: 'Countdown Timer',
  category: 'flash-sale' as EmailTemplate['category'],
  timing: 'Hours before end',
  subjectLine: 'Ends tonight.',
  description: 'Coral urgency color block - countdown timer',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(11).png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Final hours', placeholder: 'Main headline' },
    { key: 'hours_left', label: 'Hours Left', type: 'text', defaultValue: '6', placeholder: 'e.g., 3' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '30', placeholder: 'e.g., 25' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FED7D7' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Sale ending soon. Last chance!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP NOW' },
  ],
  html: premiumWrapper(`
          <!-- CORAL URGENCY COLOR BLOCK - COUNTDOWN -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:11px; color:#dc2626; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      Only {{hours_left}} hours left
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:52px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 8px; font-size:56px; font-weight:700; color:#1a1a1a; letter-spacing:-0.03em;">
                      {{discount_percent}}%
                    </p>
                    <p style="margin:0 0 28px; font-size:13px; color:#374151; line-height:1.6;">
                      This is your final reminder. The sale ends tonight.
                    </p>

                    <!-- CTA Button - Red pill for urgency -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#dc2626;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Full Width Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:380px; object-fit:cover;">
            </td>
          </tr>
  `),
};

const flashSale4: EmailTemplate = {
  id: 'flash-sale-4',
  name: 'BFCM Teaser',
  category: 'flash-sale' as EmailTemplate['category'],
  timing: 'Before BFCM',
  subjectLine: 'Something big is coming.',
  description: 'Full-bleed hero with dark overlay - BFCM teaser',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Black Friday', placeholder: 'Main headline' },
    { key: 'sale_date', label: 'Sale Date', type: 'text', defaultValue: 'November 29th', placeholder: 'e.g., November 24th' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'The biggest sale of the year is almost here.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'GET EARLY ACCESS' },
  ],
  html: premiumWrapper(`
          <!-- FULL BLEED HERO WITH DARK OVERLAY - BFCM TEASER -->
          <tr>
            <td style="padding:0; position:relative;">
              <div style="position:relative;">
                <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:500px; object-fit:cover;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                  <tr>
                    <td style="padding:60px 40px; vertical-align:center; text-align:center; background:rgba(0,0,0,0.4);">
                      <p style="margin:0 0 8px; font-size:11px; color:rgba(255,255,255,0.8); text-transform:uppercase; letter-spacing:0.25em; font-weight:500;">
                        Coming {{sale_date}}
                      </p>
                      <h1 class="mobile-headline" style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:64px; font-weight:400; color:#ffffff; line-height:1.05; font-style:italic; text-shadow:0 2px 8px rgba(0,0,0,0.3);">
                        {{headline}}
                      </h1>
                      <p style="margin:0 0 28px; font-size:14px; color:rgba(255,255,255,0.9); line-height:1.6;">
                        Our biggest sale of the year is almost here.
                      </p>

                      <!-- CTA Button - White pill -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                        <tr>
                          <td style="border-radius:50px; background:#ffffff;">
                            <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#1a1a1a; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                              {{cta_text}}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Dark Bottom Bar -->
          <tr>
            <td style="padding:32px 40px; background:#1a1a1a; text-align:center;">
              <p style="margin:0; font-size:12px; color:rgba(255,255,255,0.6); text-transform:uppercase; letter-spacing:0.15em;">
                Be the first to shop • Early access for subscribers
              </p>
            </td>
          </tr>
  `),
};

const flashSale5: EmailTemplate = {
  id: 'flash-sale-5',
  name: 'BFCM Live Now',
  category: 'flash-sale' as EmailTemplate['category'],
  timing: 'BFCM start',
  subjectLine: 'It\'s here.',
  description: 'Full-bleed hero with text overlay - BFCM live',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(13).png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Black Friday is live', placeholder: 'Main headline' },
    { key: 'discount_percent', label: 'Max Discount %', type: 'number', defaultValue: '50', placeholder: 'e.g., 40' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Black Friday is LIVE. Shop now!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP NOW' },
  ],
  html: premiumWrapper(`
          <!-- FULL BLEED HERO WITH TEXT OVERLAY - BFCM LIVE -->
          <tr>
            <td style="padding:0; position:relative;">
              <div style="position:relative;">
                <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:480px; object-fit:cover;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                  <tr>
                    <td style="padding:60px 40px; vertical-align:center; text-align:center;">
                      <p style="margin:0 0 8px; font-size:11px; color:#ffffff; text-transform:uppercase; letter-spacing:0.25em; font-weight:500; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                        Up to {{discount_percent}}% off everything
                      </p>
                      <h1 class="mobile-headline" style="margin:0 0 28px; font-family:'Playfair Display',Georgia,serif; font-size:56px; font-weight:400; color:#ffffff; line-height:1.1; font-style:italic; text-shadow:0 2px 8px rgba(0,0,0,0.4);">
                        {{headline}}
                      </h1>

                      <!-- CTA Button - White pill -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                        <tr>
                          <td style="border-radius:50px; background:#ffffff;">
                            <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#1a1a1a; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                              {{cta_text}}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Dark Urgency Bar -->
          <tr>
            <td style="padding:28px 40px; background:#1a1a1a; text-align:center;">
              <p style="margin:0; font-size:13px; color:#fbbf24; font-weight:500; letter-spacing:0.05em;">
                LIMITED TIME • WHILE SUPPLIES LAST
              </p>
            </td>
          </tr>
  `),
};

const flashSale6: EmailTemplate = {
  id: 'flash-sale-6',
  name: 'BFCM Extended',
  category: 'flash-sale' as EmailTemplate['category'],
  timing: 'After BFCM',
  subjectLine: 'We extended it.',
  description: 'Sage green color block - sale extended',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(15).png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Good news', placeholder: 'Main headline' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '40', placeholder: 'e.g., 30' },
    { key: 'extension_days', label: 'Extended Days', type: 'text', defaultValue: '48 hours', placeholder: 'e.g., 3 days' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#D1E7DD' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'You asked, we listened. Sale extended!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP THE SALE' },
  ],
  html: premiumWrapper(`
          <!-- SAGE GREEN COLOR BLOCK - SALE EXTENDED -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:11px; color:#166534; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      Extended {{extension_days}}
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 8px; font-size:13px; color:#374151; line-height:1.6; max-width:360px; margin-left:auto; margin-right:auto;">
                      You asked, we listened. The sale continues with {{discount_percent}}% off everything.
                    </p>
                    <p style="margin:0 0 28px; font-size:32px; font-weight:600; color:#166534; letter-spacing:-0.02em;">
                      {{discount_percent}}% OFF
                    </p>

                    <!-- CTA Button - Dark green pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#166534;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Full Width Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:380px; object-fit:cover;">
            </td>
          </tr>
  `),
};

const flashSale7: EmailTemplate = {
  id: 'flash-sale-7',
  name: 'Holiday Gift Guide',
  category: 'flash-sale' as EmailTemplate['category'],
  timing: 'Holiday season',
  subjectLine: 'The art of giving.',
  description: 'Full-bleed hero with elegant overlay - holiday gift guide',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Gift Guide', placeholder: 'Main headline' },
    { key: 'gift_category_1', label: 'Gift Category 1', type: 'text', defaultValue: 'Gifts Under $50', placeholder: 'e.g., For Her' },
    { key: 'gift_category_2', label: 'Gift Category 2', type: 'text', defaultValue: 'Luxury Picks', placeholder: 'e.g., For Him' },
    { key: 'gift_category_3', label: 'Gift Category 3', type: 'text', defaultValue: 'Bestseller Bundles', placeholder: 'e.g., For Kids' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Find the perfect gift for everyone on your list.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP GIFTS' },
  ],
  html: premiumWrapper(`
          <!-- FULL BLEED HERO WITH ELEGANT OVERLAY - HOLIDAY GIFT GUIDE -->
          <tr>
            <td style="padding:0; position:relative;">
              <div style="position:relative;">
                <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:420px; object-fit:cover;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                  <tr>
                    <td style="padding:60px 40px; vertical-align:center; text-align:center; background:rgba(255,255,255,0.85);">
                      <p style="margin:0 0 8px; font-size:11px; color:#92400e; text-transform:uppercase; letter-spacing:0.25em; font-weight:500;">
                        Holiday 2025
                      </p>
                      <h1 class="mobile-headline" style="margin:0 0 28px; font-family:'Playfair Display',Georgia,serif; font-size:56px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                        {{headline}}
                      </h1>

                      <!-- CTA Button - Dark pill -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                        <tr>
                          <td style="border-radius:50px; background:#1a1a1a;">
                            <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                              {{cta_text}}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Gift Categories Section -->
          <tr>
            <td style="padding:48px 40px; background:#fafafa; text-align:center;">
              <p style="margin:0 0 24px; font-size:11px; color:#666666; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                Shop by category
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="32%" style="padding:16px 12px; background:#ffffff; border-radius:8px; text-align:center;">
                    <p style="margin:0; font-size:14px; color:#1a1a1a; font-weight:500;">{{gift_category_1}}</p>
                  </td>
                  <td width="4%"></td>
                  <td width="32%" style="padding:16px 12px; background:#ffffff; border-radius:8px; text-align:center;">
                    <p style="margin:0; font-size:14px; color:#1a1a1a; font-weight:500;">{{gift_category_2}}</p>
                  </td>
                  <td width="4%"></td>
                  <td width="32%" style="padding:16px 12px; background:#ffffff; border-radius:8px; text-align:center;">
                    <p style="margin:0; font-size:14px; color:#1a1a1a; font-weight:500;">{{gift_category_3}}</p>
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
  subjectLine: 'Making room for what\'s next.',
  description: 'Peach color block - end of season clearance',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'End of season', placeholder: 'Main headline' },
    { key: 'discount_percent', label: 'Max Discount %', type: 'number', defaultValue: '60', placeholder: 'e.g., 50' },
    { key: 'season', label: 'Season', type: 'text', defaultValue: 'Summer', placeholder: 'e.g., Winter' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FFECD2' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Huge savings on last season\'s favorites.', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP CLEARANCE' },
  ],
  html: premiumWrapper(`
          <!-- PEACH COLOR BLOCK - END OF SEASON -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:11px; color:#c2410c; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      {{season}} clearance
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 8px; font-size:56px; font-weight:700; color:#1a1a1a; letter-spacing:-0.03em;">
                      {{discount_percent}}%
                    </p>
                    <p style="margin:0 0 28px; font-size:13px; color:#374151; line-height:1.6;">
                      Making room for new arrivals. Shop while supplies last.
                    </p>

                    <!-- CTA Button - Orange pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#c2410c;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Full Width Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:400px; object-fit:cover;">
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
  subjectLine: 'You\'ve arrived.',
  description: 'Gold luxe color block - VIP tier upgrade',
  suggestedImages: imageLibrary.jewelry.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/womans-elegant-hand-with-delicate%20(2).png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Welcome to the inner circle', placeholder: 'Main headline' },
    { key: 'tier_name', label: 'Tier Name', type: 'text', defaultValue: 'Gold', placeholder: 'e.g., Platinum' },
    { key: 'perk_1', label: 'Perk 1', type: 'text', defaultValue: 'Free shipping on every order', placeholder: 'VIP benefit' },
    { key: 'perk_2', label: 'Perk 2', type: 'text', defaultValue: 'Early access to all sales', placeholder: 'VIP benefit' },
    { key: 'perk_3', label: 'Perk 3', type: 'text', defaultValue: 'Exclusive members-only products', placeholder: 'VIP benefit' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FEF3C7' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'You\'ve unlocked VIP status!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'EXPLORE PERKS' },
  ],
  html: premiumWrapper(`
          <!-- GOLD LUXE COLOR BLOCK - VIP WELCOME -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:11px; color:#92400e; text-transform:uppercase; letter-spacing:0.25em; font-weight:500;">
                      {{tier_name}} Member
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:44px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 28px; font-size:13px; color:#374151; line-height:1.6; max-width:360px; margin-left:auto; margin-right:auto;">
                      Your loyalty has unlocked exclusive privileges. Here's what's waiting for you.
                    </p>

                    <!-- CTA Button - Dark pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#1a1a1a;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Full Width Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Perks Section -->
          <tr>
            <td style="padding:48px 40px; background:#fafafa; text-align:center;">
              <p style="margin:0 0 24px; font-size:11px; color:#666666; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                Your VIP benefits
              </p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:16px 20px; background:#ffffff; border-radius:8px; text-align:center; border-bottom:1px solid #f0f0f0;">
                    <p style="margin:0; font-size:14px; color:#1a1a1a; font-weight:500;">{{perk_1}}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:16px 20px; background:#ffffff; border-radius:8px; text-align:center; border-bottom:1px solid #f0f0f0;">
                    <p style="margin:0; font-size:14px; color:#1a1a1a; font-weight:500;">{{perk_2}}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:16px 20px; background:#ffffff; border-radius:8px; text-align:center;">
                    <p style="margin:0; font-size:14px; color:#1a1a1a; font-weight:500;">{{perk_3}}</p>
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
  subjectLine: 'Your rewards are growing.',
  description: 'Sage green color block - points balance',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Points update', placeholder: 'Main headline' },
    { key: 'total_points', label: 'Total Points', type: 'text', defaultValue: '1,250', placeholder: 'e.g., 500' },
    { key: 'points_value', label: 'Points Value', type: 'text', defaultValue: '$62.50', placeholder: 'e.g., $25' },
    { key: 'points_to_next', label: 'Points to Next Reward', type: 'text', defaultValue: '250', placeholder: 'e.g., 100' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#D1E7DD' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Check out your latest points balance!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'REDEEM NOW' },
  ],
  html: premiumWrapper(`
          <!-- SAGE GREEN COLOR BLOCK - POINTS UPDATE -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:11px; color:#166534; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      Your balance
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 8px; font-family:'Playfair Display',Georgia,serif; font-size:44px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 8px; font-size:64px; font-weight:700; color:#1a1a1a; letter-spacing:-0.03em;">
                      {{total_points}}
                    </p>
                    <p style="margin:0 0 28px; font-size:14px; color:#374151;">
                      points ({{points_value}} value)
                    </p>

                    <!-- CTA Button - Dark green pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#166534;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next Tier Info -->
          <tr>
            <td style="padding:32px 40px; background:#fafafa; text-align:center;">
              <p style="margin:0; font-size:13px; color:#666666;">
                Only <strong style="color:#166534;">{{points_to_next}} points</strong> until your next reward tier
              </p>
            </td>
          </tr>
  `),
};

const vipLoyalty3: EmailTemplate = {
  id: 'vip-loyalty-3',
  name: 'Points Expiring Soon',
  category: 'vip-loyalty' as EmailTemplate['category'],
  timing: 'Before expiry',
  subjectLine: 'Don\'t let these slip away.',
  description: 'Coral urgency color block - points expiring',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Points expiring', placeholder: 'Main headline' },
    { key: 'expiring_points', label: 'Expiring Points', type: 'text', defaultValue: '500', placeholder: 'e.g., 250' },
    { key: 'expiry_date', label: 'Expiry Date', type: 'text', defaultValue: 'January 31st', placeholder: 'e.g., March 15th' },
    { key: 'points_value', label: 'Points Value', type: 'text', defaultValue: '$25', placeholder: 'e.g., $12.50' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FED7D7' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Use your points before they expire!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'USE MY POINTS' },
  ],
  html: premiumWrapper(`
          <!-- CORAL URGENCY COLOR BLOCK - POINTS EXPIRING -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:11px; color:#dc2626; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      Expires {{expiry_date}}
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 12px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 4px; font-size:56px; font-weight:700; color:#1a1a1a; letter-spacing:-0.03em;">
                      {{expiring_points}}
                    </p>
                    <p style="margin:0 0 28px; font-size:14px; color:#374151;">
                      points worth {{points_value}}
                    </p>

                    <!-- CTA Button - Red pill for urgency -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#dc2626;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Urgency Footer -->
          <tr>
            <td style="padding:28px 40px; background:#1a1a1a; text-align:center;">
              <p style="margin:0; font-size:12px; color:rgba(255,255,255,0.6); text-transform:uppercase; letter-spacing:0.15em;">
                Redeem before they're gone
              </p>
            </td>
          </tr>
  `),
};

const vipLoyalty4: EmailTemplate = {
  id: 'vip-loyalty-4',
  name: 'Exclusive VIP Sale',
  category: 'vip-loyalty' as EmailTemplate['category'],
  timing: 'VIP events',
  subjectLine: 'For your eyes only.',
  description: 'Full-bleed hero with text overlay - VIP exclusive sale',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Private sale', placeholder: 'Main headline' },
    { key: 'discount_percent', label: 'Discount %', type: 'number', defaultValue: '30', placeholder: 'e.g., 25' },
    { key: 'sale_duration', label: 'Sale Duration', type: 'text', defaultValue: '48 hours', placeholder: 'e.g., 24 hours' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Exclusive VIP sale starts now!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP NOW' },
  ],
  html: premiumWrapper(`
          <!-- FULL BLEED HERO WITH TEXT OVERLAY - VIP EXCLUSIVE -->
          <tr>
            <td style="padding:0; position:relative;">
              <div style="position:relative;">
                <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:480px; object-fit:cover;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                  <tr>
                    <td style="padding:60px 40px; vertical-align:center; text-align:center;">
                      <p style="margin:0 0 8px; font-size:11px; color:#ffffff; text-transform:uppercase; letter-spacing:0.25em; font-weight:500; text-shadow:0 1px 3px rgba(0,0,0,0.3);">
                        VIP Exclusive • {{sale_duration}} only
                      </p>
                      <h1 class="mobile-headline" style="margin:0 0 12px; font-family:'Playfair Display',Georgia,serif; font-size:52px; font-weight:400; color:#ffffff; line-height:1.1; font-style:italic; text-shadow:0 2px 8px rgba(0,0,0,0.4);">
                        {{headline}}
                      </h1>
                      <p style="margin:0 0 28px; font-size:36px; font-weight:600; color:#ffffff; text-shadow:0 2px 8px rgba(0,0,0,0.4);">
                        {{discount_percent}}% OFF
                      </p>

                      <!-- CTA Button - White pill -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                        <tr>
                          <td style="border-radius:50px; background:#ffffff;">
                            <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#1a1a1a; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                              {{cta_text}}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Dark Bottom Bar -->
          <tr>
            <td style="padding:28px 40px; background:#1a1a1a; text-align:center;">
              <p style="margin:0; font-size:12px; color:rgba(255,255,255,0.6); text-transform:uppercase; letter-spacing:0.15em;">
                Members only • Not available to the public
              </p>
            </td>
          </tr>
  `),
};

const vipLoyalty5: EmailTemplate = {
  id: 'vip-loyalty-5',
  name: 'Birthday Reward',
  category: 'vip-loyalty' as EmailTemplate['category'],
  timing: 'Birthday month',
  subjectLine: 'A little something for you.',
  description: 'Pink/rose color block - birthday reward',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Happy birthday', placeholder: 'Main headline' },
    { key: 'birthday_reward', label: 'Birthday Reward', type: 'text', defaultValue: '$25 gift card', placeholder: 'e.g., 25% off' },
    { key: 'valid_until', label: 'Valid Until', type: 'text', defaultValue: 'end of the month', placeholder: 'e.g., 30 days' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#FCE7F3' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'A birthday surprise just for you!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'CLAIM GIFT' },
  ],
  html: premiumWrapper(`
          <!-- PINK/ROSE COLOR BLOCK - BIRTHDAY -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:11px; color:#be185d; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      It's your special day
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 8px; font-size:13px; color:#374151; line-height:1.6; max-width:340px; margin-left:auto; margin-right:auto;">
                      Here's a little something from us to celebrate you.
                    </p>
                    <p style="margin:0 0 28px; font-size:28px; font-weight:600; color:#be185d;">
                      {{birthday_reward}}
                    </p>

                    <!-- CTA Button - Pink pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#be185d;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Full Width Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:350px; object-fit:cover;">
            </td>
          </tr>

          <!-- Valid Until Footer -->
          <tr>
            <td style="padding:24px 40px; background:#fafafa; text-align:center;">
              <p style="margin:0; font-size:12px; color:#666666;">
                Valid until {{valid_until}}
              </p>
            </td>
          </tr>
  `),
};

const vipLoyalty6: EmailTemplate = {
  id: 'vip-loyalty-6',
  name: 'Anniversary Celebration',
  category: 'vip-loyalty' as EmailTemplate['category'],
  timing: '1-year customer',
  subjectLine: 'One year together.',
  description: 'Champagne color block - anniversary celebration',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Happy anniversary', placeholder: 'Main headline' },
    { key: 'anniversary_reward', label: 'Anniversary Reward', type: 'text', defaultValue: '20% off + double points', placeholder: 'e.g., $20 credit' },
    { key: 'total_orders', label: 'Total Orders', type: 'text', defaultValue: '12', placeholder: 'e.g., 8' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#F5E6D3' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'One year of amazing moments together!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'CLAIM REWARD' },
  ],
  html: premiumWrapper(`
          <!-- CHAMPAGNE COLOR BLOCK - ANNIVERSARY -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:11px; color:#92400e; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      {{total_orders}} orders later
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 8px; font-size:13px; color:#374151; line-height:1.6; max-width:340px; margin-left:auto; margin-right:auto;">
                      One year ago, you became part of our story. Here's to many more.
                    </p>
                    <p style="margin:0 0 28px; font-size:24px; font-weight:600; color:#1a1a1a;">
                      {{anniversary_reward}}
                    </p>

                    <!-- CTA Button - Dark pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#1a1a1a;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Thank You Footer -->
          <tr>
            <td style="padding:32px 40px; background:#fafafa; text-align:center;">
              <p style="margin:0; font-size:13px; color:#666666; font-style:italic;">
                Thank you for being part of our journey.
              </p>
            </td>
          </tr>
  `),
};

const vipLoyalty7: EmailTemplate = {
  id: 'vip-loyalty-7',
  name: 'Referral Program Invite',
  category: 'vip-loyalty' as EmailTemplate['category'],
  timing: 'Post-purchase',
  subjectLine: 'Share the love.',
  description: 'Full-bleed hero with overlay - referral program',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Farmer%20in%20Strawberry%20Field.png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Give & Get', placeholder: 'Main headline' },
    { key: 'your_reward', label: 'Your Reward', type: 'text', defaultValue: '$20', placeholder: 'e.g., $15' },
    { key: 'friend_reward', label: 'Friend Gets', type: 'text', defaultValue: '$20', placeholder: 'e.g., $15' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Share the love and earn rewards!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'START SHARING' },
  ],
  html: premiumWrapper(`
          <!-- FULL BLEED HERO WITH OVERLAY - REFERRAL -->
          <tr>
            <td style="padding:0; position:relative;">
              <div style="position:relative;">
                <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:420px; object-fit:cover;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="position:absolute; top:0; left:0; width:100%; height:100%;">
                  <tr>
                    <td style="padding:60px 40px; vertical-align:center; text-align:center; background:rgba(255,255,255,0.88);">
                      <p style="margin:0 0 8px; font-size:11px; color:#666666; text-transform:uppercase; letter-spacing:0.25em; font-weight:500;">
                        Referral program
                      </p>
                      <h1 class="mobile-headline" style="margin:0 0 24px; font-family:'Playfair Display',Georgia,serif; font-size:52px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                        {{headline}}
                      </h1>

                      <!-- Rewards -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 28px;">
                        <tr>
                          <td style="padding:16px 24px; text-align:center;">
                            <p style="margin:0 0 4px; font-size:11px; color:#666666; text-transform:uppercase; letter-spacing:0.1em;">They get</p>
                            <p style="margin:0; font-size:24px; font-weight:600; color:#1a1a1a;">{{friend_reward}} OFF</p>
                          </td>
                          <td style="padding:0 20px; color:#cccccc;">|</td>
                          <td style="padding:16px 24px; text-align:center;">
                            <p style="margin:0 0 4px; font-size:11px; color:#666666; text-transform:uppercase; letter-spacing:0.1em;">You get</p>
                            <p style="margin:0; font-size:24px; font-weight:600; color:#1a1a1a;">{{your_reward}} CREDIT</p>
                          </td>
                        </tr>
                      </table>

                      <!-- CTA Button - Dark pill -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                        <tr>
                          <td style="border-radius:50px; background:#1a1a1a;">
                            <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                              {{cta_text}}
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
  `),
};

const vipLoyalty8: EmailTemplate = {
  id: 'vip-loyalty-8',
  name: 'Double Points Event',
  category: 'vip-loyalty' as EmailTemplate['category'],
  timing: 'Promotional periods',
  subjectLine: 'Double the rewards.',
  description: 'Lavender color block - double points event',
  suggestedImages: imageLibrary.products.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/create-a-new-image-in%20(14).png', placeholder: 'https://...' },
    { key: 'headline', label: 'Headline', type: 'text', defaultValue: 'Double points', placeholder: 'Main headline' },
    { key: 'event_duration', label: 'Event Duration', type: 'text', defaultValue: 'This weekend only', placeholder: 'e.g., 48 hours' },
    { key: 'current_points', label: 'Current Points', type: 'text', defaultValue: '500', placeholder: 'e.g., 250' },
    { key: 'block_color', label: 'Block Color', type: 'color', defaultValue: '#E9D5FF' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Earn double points on every purchase!', placeholder: 'Email preview text' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'EARN 2X' },
  ],
  html: premiumWrapper(`
          <!-- LAVENDER COLOR BLOCK - DOUBLE POINTS -->
          <tr>
            <td style="padding:0; background:{{block_color}};">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:60px 40px; text-align:center;">
                    <p style="margin:0 0 8px; font-size:11px; color:#7c3aed; text-transform:uppercase; letter-spacing:0.2em; font-weight:500;">
                      {{event_duration}}
                    </p>
                    <h1 class="mobile-headline" style="margin:0 0 12px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:400; color:#1a1a1a; line-height:1.1; font-style:italic;">
                      {{headline}}
                    </h1>
                    <p style="margin:0 0 8px; font-size:72px; font-weight:700; color:#1a1a1a; letter-spacing:-0.03em;">
                      2X
                    </p>
                    <p style="margin:0 0 28px; font-size:13px; color:#374151; line-height:1.6;">
                      You currently have {{current_points}} points. Imagine doubling your next earn.
                    </p>

                    <!-- CTA Button - Purple pill -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                      <tr>
                        <td style="border-radius:50px; background:#7c3aed;">
                          <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:13px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">
                            {{cta_text}}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Full Width Hero Image -->
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:380px; object-fit:cover;">
            </td>
          </tr>
  `),
};

// =====================================================
// QUIZ FUNNEL - SKINCARE (15 templates)
// =====================================================

const quizSkincare1: EmailTemplate = {
  id: 'quiz-skincare-1',
  name: 'Your Personalized Results',
  category: 'quiz-skincare',
  niche: 'Skincare',
  timing: 'Immediately after quiz',
  subjectLine: '{{ first_name|default:"Hey" }}, your skin analysis is ready',
  description: 'Delivers personalized quiz results with product recommendations',
  suggestedImages: imageLibrary.beauty.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Radiant%20Woman%20Portrait.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your personalized skincare routine awaits', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Quiz Result Variable', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your skin type" }}', placeholder: 'Klaviyo quiz result' },
    { key: 'product_name', label: 'Recommended Product', type: 'text', defaultValue: 'Hydrating Serum', placeholder: 'Product name' },
    { key: 'product_benefit', label: 'Key Benefit', type: 'text', defaultValue: 'deep hydration', placeholder: 'Main benefit' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'VIEW MY ROUTINE', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:350px; object-fit:cover;">
            </td>
          </tr>
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Your Results Are In
              </p>
              <h1 style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:36px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                We Found Your Perfect Match
              </h1>
              <p style="margin:0 0 24px; font-size:15px; color:#4a4a4a; line-height:1.7; max-width:480px; margin-left:auto; margin-right:auto;">
                Based on your answers, you have <strong>{{quiz_result}}</strong>. This means your skin craves {{product_benefit}} — and we have exactly what you need.
              </p>
              <div style="background:#f9f9f9; border-radius:12px; padding:24px; margin:0 0 32px; text-align:left;">
                <p style="margin:0 0 8px; font-size:11px; color:#666; text-transform:uppercase; letter-spacing:0.1em;">Recommended For You</p>
                <p style="margin:0; font-size:18px; font-weight:600; color:#1a1a1a;">{{product_name}}</p>
                <p style="margin:8px 0 0; font-size:14px; color:#666;">Specifically formulated for {{quiz_result}}</p>
              </div>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizSkincare2: EmailTemplate = {
  id: 'quiz-skincare-2',
  name: 'Understanding Your Skin Type',
  category: 'quiz-skincare',
  niche: 'Skincare',
  timing: '24 hours after quiz',
  subjectLine: 'Why {{ event.quiz_results_name|default:"your skin" }} needs special care',
  description: 'Educational email about their specific skin concern',
  suggestedImages: imageLibrary.beauty.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Radiant%20Portrait.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'The science behind your skin type', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Quiz Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your skin type" }}', placeholder: 'Klaviyo variable' },
    { key: 'skin_fact_1', label: 'Skin Fact 1', type: 'text', defaultValue: 'Your skin loses 30% more moisture overnight', placeholder: 'Fact about their skin type' },
    { key: 'skin_fact_2', label: 'Skin Fact 2', type: 'text', defaultValue: 'The wrong products can damage your moisture barrier', placeholder: 'Second fact' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP MY ROUTINE', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Skin Science
              </p>
              <h1 style="margin:0 0 24px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                What {{quiz_result}} Really Means
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 20px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                {{ first_name|default:"Hey" }}, here's something most brands won't tell you:
              </p>
              <p style="margin:0 0 20px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                <strong>{{skin_fact_1}}</strong> — which is why using generic products simply doesn't work for {{quiz_result}}.
              </p>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                {{skin_fact_2}}. That's exactly why we created a routine specifically for people like you.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizSkincare3: EmailTemplate = {
  id: 'quiz-skincare-3',
  name: 'Real Results From Your Skin Type',
  category: 'quiz-skincare',
  niche: 'Skincare',
  timing: '48 hours after quiz',
  subjectLine: 'See what others with {{ event.quiz_results_name|default:"similar skin" }} achieved',
  description: 'Social proof from customers with same quiz results',
  suggestedImages: imageLibrary.beauty.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Close-Up%20Portrait%20Duo.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Real transformations from people just like you', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Quiz Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your skin type" }}', placeholder: 'Klaviyo variable' },
    { key: 'testimonial_name', label: 'Customer Name', type: 'text', defaultValue: 'Sarah M.', placeholder: 'Customer first name' },
    { key: 'testimonial_text', label: 'Testimonial', type: 'text', defaultValue: 'After 2 weeks, my skin finally stopped feeling tight and dry. I wish I found this sooner!', placeholder: 'Customer quote' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'GET MY RESULTS', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px 32px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Real Stories
              </p>
              <h1 style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                They Had {{quiz_result}} Too
              </h1>
              <p style="margin:0; font-size:15px; color:#666; line-height:1.6;">
                And here's what happened when they found their match.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;">
              <div style="background:#faf9f7; border-radius:12px; padding:32px; border-left:3px solid #B8860B;">
                <p style="margin:0 0 16px; font-size:16px; color:#1a1a1a; line-height:1.7; font-style:italic;">
                  "{{testimonial_text}}"
                </p>
                <p style="margin:0; font-size:13px; color:#666; font-weight:600;">
                  — {{testimonial_name}}, verified buyer with {{quiz_result}}
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:40px; text-align:center;">
              <p style="margin:0 0 24px; font-size:15px; color:#4a4a4a; line-height:1.7;">
                Your personalized routine is still waiting, {{ first_name|default:"friend" }}.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizSkincare4: EmailTemplate = {
  id: 'quiz-skincare-4',
  name: 'Exclusive Quiz Taker Discount',
  category: 'quiz-skincare',
  niche: 'Skincare',
  timing: '72 hours after quiz',
  subjectLine: '{{ first_name|default:"Hey" }}, 15% off your personalized routine',
  description: 'First discount offer for quiz completers',
  suggestedImages: imageLibrary.beauty.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Radiant%20Woman%20Portrait.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'A thank you for taking our quiz', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Quiz Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your skin type" }}', placeholder: 'Klaviyo variable' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'QUIZ15', placeholder: 'Discount code' },
    { key: 'discount_amount', label: 'Discount Amount', type: 'text', defaultValue: '15%', placeholder: '15% or $10' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'CLAIM MY DISCOUNT', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Quiz Taker Exclusive
              </p>
              <h1 style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:36px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                {{discount_amount}} Off Your Match
              </h1>
              <p style="margin:0 0 32px; font-size:15px; color:#666; line-height:1.6; max-width:420px; margin-left:auto; margin-right:auto;">
                Because you took the time to find your perfect routine, here's something special.
              </p>
              <div style="background:#1a1a1a; color:#fff; padding:20px 40px; display:inline-block; margin:0 0 32px;">
                <p style="margin:0 0 4px; font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:#999;">Your Code</p>
                <p style="margin:0; font-size:28px; font-weight:700; letter-spacing:0.05em;">{{discount_code}}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:40px; text-align:center;">
              <p style="margin:0 0 24px; font-size:15px; color:#4a4a4a; line-height:1.7;">
                Your {{quiz_result}} routine is ready, {{ first_name|default:"friend" }}. Use code <strong>{{discount_code}}</strong> at checkout.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizSkincare5: EmailTemplate = {
  id: 'quiz-skincare-5',
  name: 'Your Skin Concern Deep Dive',
  category: 'quiz-skincare',
  niche: 'Skincare',
  timing: '4 days after quiz',
  subjectLine: 'The #1 mistake people with {{ event.quiz_results_name|default:"your skin" }} make',
  description: 'Educational content about common mistakes',
  suggestedImages: imageLibrary.beauty.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Radiant%20Portrait.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Avoid this common skincare mistake', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Quiz Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your skin type" }}', placeholder: 'Klaviyo variable' },
    { key: 'mistake', label: 'Common Mistake', type: 'text', defaultValue: 'over-cleansing, which strips your natural oils', placeholder: 'The mistake they make' },
    { key: 'solution', label: 'The Solution', type: 'text', defaultValue: 'gentle, pH-balanced cleansing that protects your barrier', placeholder: 'How to fix it' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP THE SOLUTION', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Skincare Truth
              </p>
              <h1 style="margin:0 0 24px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                Stop Doing This to Your Skin
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 20px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                {{ first_name|default:"Hey" }}, we see this all the time with {{quiz_result}}:
              </p>
              <p style="margin:0 0 20px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                The #1 mistake? <strong>{{mistake}}</strong>.
              </p>
              <p style="margin:0 0 20px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                What your skin actually needs is <strong>{{solution}}</strong>.
              </p>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                That's exactly why we built your personalized routine the way we did.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizSkincare6: EmailTemplate = {
  id: 'quiz-skincare-6',
  name: 'Before & After Transformation',
  category: 'quiz-skincare',
  niche: 'Skincare',
  timing: '5 days after quiz',
  subjectLine: '28 days of using products for {{ event.quiz_results_name|default:"your skin type" }}',
  description: 'Visual transformation story with timeline',
  suggestedImages: imageLibrary.beauty.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Radiant%20Woman%20Portrait.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'See what 28 days can do', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Quiz Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your skin type" }}', placeholder: 'Klaviyo variable' },
    { key: 'week1_result', label: 'Week 1 Result', type: 'text', defaultValue: 'Skin feels more balanced', placeholder: 'First week result' },
    { key: 'week2_result', label: 'Week 2 Result', type: 'text', defaultValue: 'Visible hydration boost', placeholder: 'Second week result' },
    { key: 'week4_result', label: 'Week 4 Result', type: 'text', defaultValue: 'Radiant, healthy glow', placeholder: 'Fourth week result' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'START MY JOURNEY', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px 32px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                The Timeline
              </p>
              <h1 style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                What To Expect With {{quiz_result}}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;">
              <div style="border-left:2px solid #f0f0f0; padding-left:24px;">
                <div style="margin-bottom:24px;">
                  <p style="margin:0 0 4px; font-size:11px; color:#B8860B; font-weight:600; text-transform:uppercase;">Week 1</p>
                  <p style="margin:0; font-size:15px; color:#1a1a1a;">{{week1_result}}</p>
                </div>
                <div style="margin-bottom:24px;">
                  <p style="margin:0 0 4px; font-size:11px; color:#B8860B; font-weight:600; text-transform:uppercase;">Week 2</p>
                  <p style="margin:0; font-size:15px; color:#1a1a1a;">{{week2_result}}</p>
                </div>
                <div>
                  <p style="margin:0 0 4px; font-size:11px; color:#B8860B; font-weight:600; text-transform:uppercase;">Week 4</p>
                  <p style="margin:0; font-size:15px; color:#1a1a1a;">{{week4_result}}</p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:40px; text-align:center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizSkincare7: EmailTemplate = {
  id: 'quiz-skincare-7',
  name: 'Urgency - Routine Expiring',
  category: 'quiz-skincare',
  niche: 'Skincare',
  timing: '6 days after quiz',
  subjectLine: '{{ first_name|default:"Hey" }}, your personalized routine expires soon',
  description: 'Creates urgency around their saved quiz results',
  suggestedImages: imageLibrary.beauty.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Radiant%20Portrait.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your custom routine wont wait forever', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Quiz Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your skin type" }}', placeholder: 'Klaviyo variable' },
    { key: 'expiry_hours', label: 'Hours Until Expiry', type: 'text', defaultValue: '48', placeholder: 'Hours left' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SAVE MY ROUTINE', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#dc2626; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Time Sensitive
              </p>
              <h1 style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                Your Routine Expires in {{expiry_hours}} Hours
              </h1>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.7; max-width:420px; margin-left:auto; margin-right:auto;">
                {{ first_name|default:"Hey" }}, we've been holding your personalized {{quiz_result}} routine, but we can't keep it reserved forever.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 32px;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
  `),
};

const quizSkincare8: EmailTemplate = {
  id: 'quiz-skincare-8',
  name: 'Ingredient Spotlight',
  category: 'quiz-skincare',
  niche: 'Skincare',
  timing: '7 days after quiz',
  subjectLine: 'Why {{ event.quiz_results_name|default:"your skin" }} loves this ingredient',
  description: 'Educational email about key ingredient for their skin type',
  suggestedImages: imageLibrary.beauty.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Radiant%20Woman%20Portrait.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'The science behind your skincare', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Quiz Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your skin type" }}', placeholder: 'Klaviyo variable' },
    { key: 'ingredient_name', label: 'Key Ingredient', type: 'text', defaultValue: 'Hyaluronic Acid', placeholder: 'Main ingredient' },
    { key: 'ingredient_benefit', label: 'Ingredient Benefit', type: 'text', defaultValue: 'holds 1000x its weight in water, delivering deep hydration to thirsty skin', placeholder: 'What it does' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'TRY IT NOW', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Ingredient Science
              </p>
              <h1 style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                Why {{ingredient_name}} Is Perfect<br/>For {{quiz_result}}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 20px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                {{ first_name|default:"Hey" }}, let's talk about why we chose <strong>{{ingredient_name}}</strong> for your routine.
              </p>
              <p style="margin:0 0 20px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                {{ingredient_name}} {{ingredient_benefit}}.
              </p>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                For {{quiz_result}}, this ingredient is essential — and it's at the heart of your personalized routine.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizSkincare9: EmailTemplate = {
  id: 'quiz-skincare-9',
  name: 'Last Chance Discount',
  category: 'quiz-skincare',
  niche: 'Skincare',
  timing: '10 days after quiz',
  subjectLine: 'Final hours: 20% off your {{ event.quiz_results_name|default:"skin" }} routine',
  description: 'Final discount push with increased urgency',
  suggestedImages: imageLibrary.beauty.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/Radiant%20Portrait.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your biggest discount expires at midnight', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Quiz Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your skin type" }}', placeholder: 'Klaviyo variable' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'LASTCHANCE20', placeholder: 'Discount code' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'CLAIM 20% OFF', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center; background:#1a1a1a;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Last Chance
              </p>
              <h1 style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:500; color:#ffffff; line-height:1.1;">
                20% OFF
              </h1>
              <p style="margin:0 0 24px; font-size:15px; color:#999; line-height:1.6;">
                Your {{quiz_result}} routine. Expires at midnight.
              </p>
              <div style="background:#ffffff; color:#1a1a1a; padding:16px 32px; display:inline-block; margin:0 0 24px;">
                <p style="margin:0; font-size:24px; font-weight:700; letter-spacing:0.05em;">{{discount_code}}</p>
              </div>
              <br/>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:#B8860B;">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
  `),
};

const quizSkincare10: EmailTemplate = {
  id: 'quiz-skincare-10',
  name: 'Retake Quiz Reminder',
  category: 'quiz-skincare',
  niche: 'Skincare',
  timing: '14 days after quiz',
  subjectLine: 'Has your skin changed, {{ first_name|default:"friend" }}?',
  description: 'Re-engagement for non-converters to retake quiz',
  suggestedImages: imageLibrary.beauty.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Close-Up%20Portrait%20Duo.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your skin might have different needs now', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Previous Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your previous result" }}', placeholder: 'Klaviyo variable' },
    { key: 'quiz_url', label: 'Quiz URL', type: 'url', defaultValue: 'https://yourstore.com/quiz', placeholder: 'Link to quiz' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'RETAKE THE QUIZ', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Check In
              </p>
              <h1 style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                Your Skin Evolves.<br/>So Should Your Routine.
              </h1>
              <p style="margin:0 0 20px; font-size:15px; color:#4a4a4a; line-height:1.7; max-width:420px; margin-left:auto; margin-right:auto;">
                Last time you had {{quiz_result}}. But skin changes with seasons, stress, and lifestyle.
              </p>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.7; max-width:420px; margin-left:auto; margin-right:auto;">
                Want to make sure you're still using the right products?
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{quiz_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
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
// QUIZ FUNNEL - FASHION (10 templates)
// =====================================================

const quizFashion1: EmailTemplate = {
  id: 'quiz-fashion-1',
  name: 'Your Style Profile Results',
  category: 'quiz-fashion',
  niche: 'Fashion',
  timing: 'Immediately after quiz',
  subjectLine: '{{ first_name|default:"Hey" }}, your style profile is ready',
  description: 'Delivers personalized style quiz results',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your personalized style picks are here', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Style Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your style" }}', placeholder: 'Klaviyo quiz result' },
    { key: 'style_description', label: 'Style Description', type: 'text', defaultValue: 'effortless elegance with timeless pieces', placeholder: 'Style traits' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP MY STYLE', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:400px; object-fit:cover;">
            </td>
          </tr>
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Your Style Profile
              </p>
              <h1 style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:36px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                You Are: {{quiz_result}}
              </h1>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.7; max-width:440px; margin-left:auto; margin-right:auto;">
                Your style is defined by {{style_description}}. We've curated pieces that match your aesthetic perfectly.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizFashion2: EmailTemplate = {
  id: 'quiz-fashion-2',
  name: 'Style Tips For Your Type',
  category: 'quiz-fashion',
  niche: 'Fashion',
  timing: '24 hours after quiz',
  subjectLine: '3 styling secrets for {{ event.quiz_results_name|default:"your style" }}',
  description: 'Educational styling tips based on quiz result',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Styling tips just for you', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Style Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your style" }}', placeholder: 'Klaviyo variable' },
    { key: 'tip_1', label: 'Styling Tip 1', type: 'text', defaultValue: 'Invest in quality basics that layer well', placeholder: 'First tip' },
    { key: 'tip_2', label: 'Styling Tip 2', type: 'text', defaultValue: 'Choose neutral tones as your foundation', placeholder: 'Second tip' },
    { key: 'tip_3', label: 'Styling Tip 3', type: 'text', defaultValue: 'Add one statement piece per outfit', placeholder: 'Third tip' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP THE LOOK', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Style Guide
              </p>
              <h1 style="margin:0 0 24px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                How To Master {{quiz_result}}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;">
              <div style="text-align:left;">
                <div style="padding:20px 0; border-bottom:1px solid #f0f0f0;">
                  <p style="margin:0 0 4px; font-size:11px; color:#B8860B; font-weight:600;">01</p>
                  <p style="margin:0; font-size:15px; color:#1a1a1a; line-height:1.6;">{{tip_1}}</p>
                </div>
                <div style="padding:20px 0; border-bottom:1px solid #f0f0f0;">
                  <p style="margin:0 0 4px; font-size:11px; color:#B8860B; font-weight:600;">02</p>
                  <p style="margin:0; font-size:15px; color:#1a1a1a; line-height:1.6;">{{tip_2}}</p>
                </div>
                <div style="padding:20px 0;">
                  <p style="margin:0 0 4px; font-size:11px; color:#B8860B; font-weight:600;">03</p>
                  <p style="margin:0; font-size:15px; color:#1a1a1a; line-height:1.6;">{{tip_3}}</p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:40px; text-align:center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizFashion3: EmailTemplate = {
  id: 'quiz-fashion-3',
  name: 'Customers With Your Style',
  category: 'quiz-fashion',
  niche: 'Fashion',
  timing: '48 hours after quiz',
  subjectLine: 'How others rock {{ event.quiz_results_name|default:"your style" }}',
  description: 'Social proof showing other customers with same style',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Real customers, real style inspiration', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Style Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your style" }}', placeholder: 'Klaviyo variable' },
    { key: 'testimonial_name', label: 'Customer Name', type: 'text', defaultValue: 'Michael T.', placeholder: 'Customer name' },
    { key: 'testimonial_text', label: 'Testimonial', type: 'text', defaultValue: 'Finally found pieces that actually match my vibe. The quiz nailed it!', placeholder: 'Customer quote' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'FIND MY PIECES', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:350px; object-fit:cover;">
            </td>
          </tr>
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Style Inspo
              </p>
              <h1 style="margin:0 0 24px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                {{quiz_result}} In Action
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;">
              <div style="background:#faf9f7; padding:32px; border-left:3px solid #B8860B;">
                <p style="margin:0 0 16px; font-size:16px; color:#1a1a1a; line-height:1.7; font-style:italic;">
                  "{{testimonial_text}}"
                </p>
                <p style="margin:0; font-size:13px; color:#666; font-weight:600;">
                  — {{testimonial_name}}, {{quiz_result}} style
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px; text-align:center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizFashion4: EmailTemplate = {
  id: 'quiz-fashion-4',
  name: 'Exclusive Style Quiz Discount',
  category: 'quiz-fashion',
  niche: 'Fashion',
  timing: '72 hours after quiz',
  subjectLine: '{{ first_name|default:"Hey" }}, 15% off your style picks',
  description: 'First discount for quiz completers',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your exclusive quiz taker discount', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Style Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your style" }}', placeholder: 'Klaviyo variable' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'MYSTYLE15', placeholder: 'Discount code' },
    { key: 'discount_amount', label: 'Discount Amount', type: 'text', defaultValue: '15%', placeholder: '15% or $10' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'REDEEM NOW', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Quiz Taker Reward
              </p>
              <h1 style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:36px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                {{discount_amount}} Off Your {{quiz_result}} Picks
              </h1>
              <p style="margin:0 0 32px; font-size:15px; color:#666; line-height:1.6;">
                Because you took the time to discover your style.
              </p>
              <div style="background:#1a1a1a; color:#fff; padding:20px 40px; display:inline-block; margin:0 0 32px;">
                <p style="margin:0 0 4px; font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:#999;">Your Code</p>
                <p style="margin:0; font-size:28px; font-weight:700; letter-spacing:0.05em;">{{discount_code}}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:40px; text-align:center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizFashion5: EmailTemplate = {
  id: 'quiz-fashion-5',
  name: 'Wardrobe Building Blocks',
  category: 'quiz-fashion',
  niche: 'Fashion',
  timing: '4 days after quiz',
  subjectLine: 'The 5 essentials every {{ event.quiz_results_name|default:"style" }} needs',
  description: 'Educational content about wardrobe essentials',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/close-up-shot-of-mans-legs%20(1).png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Build your perfect wardrobe', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Style Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your style" }}', placeholder: 'Klaviyo variable' },
    { key: 'essential_1', label: 'Essential 1', type: 'text', defaultValue: 'A perfectly fitted blazer', placeholder: 'First essential' },
    { key: 'essential_2', label: 'Essential 2', type: 'text', defaultValue: 'Quality denim that flatters', placeholder: 'Second essential' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'BUILD MY WARDROBE', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Wardrobe Essentials
              </p>
              <h1 style="margin:0 0 24px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                Building Blocks For {{quiz_result}}
              </h1>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.7; max-width:420px; margin-left:auto; margin-right:auto;">
                Every great wardrobe starts with the right foundation. Here's what you need:
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px;">
              <div style="background:#faf9f7; padding:24px; margin-bottom:16px;">
                <p style="margin:0; font-size:15px; color:#1a1a1a;"><strong>Must-Have:</strong> {{essential_1}}</p>
              </div>
              <div style="background:#faf9f7; padding:24px; margin-bottom:32px;">
                <p style="margin:0; font-size:15px; color:#1a1a1a;"><strong>Must-Have:</strong> {{essential_2}}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:40px; text-align:center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizFashion6: EmailTemplate = {
  id: 'quiz-fashion-6',
  name: 'New Arrivals For Your Style',
  category: 'quiz-fashion',
  niche: 'Fashion',
  timing: '5 days after quiz',
  subjectLine: 'Just in: New pieces for {{ event.quiz_results_name|default:"your style" }}',
  description: 'Showcases new arrivals matched to their style',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Fresh drops curated for you', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Style Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your style" }}', placeholder: 'Klaviyo variable' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP NEW ARRIVALS', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:400px; object-fit:cover;">
            </td>
          </tr>
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Just Dropped
              </p>
              <h1 style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                New Arrivals For {{quiz_result}}
              </h1>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.7; max-width:420px; margin-left:auto; margin-right:auto;">
                Fresh pieces just landed that perfectly match your style profile. Don't miss them.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizFashion7: EmailTemplate = {
  id: 'quiz-fashion-7',
  name: 'Urgency - Style Picks Expiring',
  category: 'quiz-fashion',
  niche: 'Fashion',
  timing: '6 days after quiz',
  subjectLine: '{{ first_name|default:"Hey" }}, your curated picks are selling fast',
  description: 'Creates urgency around their style recommendations',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your picks are going fast', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Style Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your style" }}', placeholder: 'Klaviyo variable' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SECURE MY PICKS', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#dc2626; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Selling Fast
              </p>
              <h1 style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                Your {{quiz_result}} Picks Are Going
              </h1>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.7; max-width:420px; margin-left:auto; margin-right:auto;">
                The pieces we curated for your style profile are popular — and sizes are limited.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 32px;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
  `),
};

const quizFashion8: EmailTemplate = {
  id: 'quiz-fashion-8',
  name: 'Outfit Inspiration',
  category: 'quiz-fashion',
  niche: 'Fashion',
  timing: '7 days after quiz',
  subjectLine: 'Complete outfits for {{ event.quiz_results_name|default:"your style" }}',
  description: 'Shows complete outfit combinations',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/handsome-man-in-perfectly-tailored.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Ready-to-wear outfit ideas', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Style Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your style" }}', placeholder: 'Klaviyo variable' },
    { key: 'outfit_occasion', label: 'Outfit Occasion', type: 'text', defaultValue: 'weekend brunch to dinner date', placeholder: 'When to wear it' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'SHOP THE OUTFITS', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto; min-height:400px; object-fit:cover;">
            </td>
          </tr>
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Outfit Ideas
              </p>
              <h1 style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                {{quiz_result}} Outfits, Ready To Wear
              </h1>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.7; max-width:420px; margin-left:auto; margin-right:auto;">
                We've put together complete looks for {{outfit_occasion}}. No more wondering what goes together.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizFashion9: EmailTemplate = {
  id: 'quiz-fashion-9',
  name: 'Last Chance Style Discount',
  category: 'quiz-fashion',
  niche: 'Fashion',
  timing: '10 days after quiz',
  subjectLine: 'Final hours: 20% off your {{ event.quiz_results_name|default:"style" }} picks',
  description: 'Final discount push',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/man-in-classic-polo-shirt.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your biggest discount expires tonight', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Style Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your style" }}', placeholder: 'Klaviyo variable' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'STYLE20', placeholder: 'Discount code' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'GET 20% OFF', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center; background:#1a1a1a;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Last Chance
              </p>
              <h1 style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:500; color:#ffffff; line-height:1.1;">
                20% OFF
              </h1>
              <p style="margin:0 0 24px; font-size:15px; color:#999; line-height:1.6;">
                Your {{quiz_result}} wardrobe. Expires at midnight.
              </p>
              <div style="background:#ffffff; color:#1a1a1a; padding:16px 32px; display:inline-block; margin:0 0 24px;">
                <p style="margin:0; font-size:24px; font-weight:700; letter-spacing:0.05em;">{{discount_code}}</p>
              </div>
              <br/>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:#B8860B;">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
  `),
};

const quizFashion10: EmailTemplate = {
  id: 'quiz-fashion-10',
  name: 'Style Evolution Check-In',
  category: 'quiz-fashion',
  niche: 'Fashion',
  timing: '14 days after quiz',
  subjectLine: 'Has your style evolved, {{ first_name|default:"friend" }}?',
  description: 'Re-engagement to retake style quiz',
  suggestedImages: imageLibrary.fashion.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/woman-in-elegant-midi-linen%20(2).png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your style might have new dimensions', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Previous Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your previous style" }}', placeholder: 'Klaviyo variable' },
    { key: 'quiz_url', label: 'Quiz URL', type: 'url', defaultValue: 'https://yourstore.com/style-quiz', placeholder: 'Link to quiz' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'RETAKE STYLE QUIZ', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Check In
              </p>
              <h1 style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                Style Evolves.<br/>So Do You.
              </h1>
              <p style="margin:0 0 20px; font-size:15px; color:#4a4a4a; line-height:1.7; max-width:420px; margin-left:auto; margin-right:auto;">
                Last time you were {{quiz_result}}. But tastes change with seasons and experiences.
              </p>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.7;">
                Ready to see if there's a new dimension to your style?
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{quiz_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
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
// QUIZ FUNNEL - SUPPLEMENTS/FITNESS (10 templates)
// =====================================================

const quizSupplements1: EmailTemplate = {
  id: 'quiz-supplements-1',
  name: 'Your Personalized Formula',
  category: 'quiz-supplements',
  niche: 'Supplements',
  timing: 'Immediately after quiz',
  subjectLine: '{{ first_name|default:"Hey" }}, your custom formula is ready',
  description: 'Delivers personalized supplement/fitness quiz results',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your personalized supplement stack awaits', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Goal/Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your goal" }}', placeholder: 'Klaviyo quiz result' },
    { key: 'product_name', label: 'Recommended Product', type: 'text', defaultValue: 'Performance Stack', placeholder: 'Product name' },
    { key: 'key_benefit', label: 'Key Benefit', type: 'text', defaultValue: 'optimized energy and recovery', placeholder: 'Main benefit' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'VIEW MY FORMULA', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Your Results
              </p>
              <h1 style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:36px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                Built For {{quiz_result}}
              </h1>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.7; max-width:440px; margin-left:auto; margin-right:auto;">
                Based on your answers, we've formulated the perfect stack for {{key_benefit}}.
              </p>
              <div style="background:#f9f9f9; border-radius:12px; padding:24px; margin:0 0 32px; text-align:left;">
                <p style="margin:0 0 8px; font-size:11px; color:#666; text-transform:uppercase; letter-spacing:0.1em;">Your Personalized Stack</p>
                <p style="margin:0; font-size:18px; font-weight:600; color:#1a1a1a;">{{product_name}}</p>
                <p style="margin:8px 0 0; font-size:14px; color:#666;">Optimized for {{quiz_result}}</p>
              </div>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
  `),
};

const quizSupplements2: EmailTemplate = {
  id: 'quiz-supplements-2',
  name: 'Science Behind Your Stack',
  category: 'quiz-supplements',
  niche: 'Supplements',
  timing: '24 hours after quiz',
  subjectLine: 'Why this formula works for {{ event.quiz_results_name|default:"your goals" }}',
  description: 'Educational email about the science behind their recommendations',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'The science behind your personalized formula', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Goal/Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your goal" }}', placeholder: 'Klaviyo variable' },
    { key: 'science_fact', label: 'Science Fact', type: 'text', defaultValue: 'Studies show proper supplementation can improve performance by up to 25%', placeholder: 'Scientific backing' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'GET MY STACK', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                The Science
              </p>
              <h1 style="margin:0 0 24px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                Why Your Formula Works
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;">
              <p style="margin:0 0 20px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                {{ first_name|default:"Hey" }}, your goal of {{quiz_result}} requires specific nutritional support.
              </p>
              <div style="background:#f0fdf4; padding:24px; border-left:3px solid #22c55e; margin:0 0 24px;">
                <p style="margin:0; font-size:15px; color:#1a1a1a; line-height:1.7;">
                  <strong>Research shows:</strong> {{science_fact}}
                </p>
              </div>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                That's exactly why we formulated your stack the way we did — every ingredient serves your specific goal.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
  `),
};

const quizSupplements3: EmailTemplate = {
  id: 'quiz-supplements-3',
  name: 'Real Results From Your Goal',
  category: 'quiz-supplements',
  niche: 'Supplements',
  timing: '48 hours after quiz',
  subjectLine: 'They had the same {{ event.quiz_results_name|default:"goal" }} as you',
  description: 'Social proof from customers with same fitness goal',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'See what others achieved with your same goal', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Goal/Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your goal" }}', placeholder: 'Klaviyo variable' },
    { key: 'testimonial_name', label: 'Customer Name', type: 'text', defaultValue: 'Jason R.', placeholder: 'Customer name' },
    { key: 'testimonial_text', label: 'Testimonial', type: 'text', defaultValue: 'After 30 days on my personalized stack, my energy levels completely transformed. I hit PRs I never thought possible.', placeholder: 'Customer quote' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'START MY JOURNEY', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Real Results
              </p>
              <h1 style="margin:0 0 24px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                {{quiz_result}} Success Stories
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;">
              <div style="background:#faf9f7; padding:32px; border-left:3px solid #B8860B;">
                <p style="margin:0 0 16px; font-size:16px; color:#1a1a1a; line-height:1.7; font-style:italic;">
                  "{{testimonial_text}}"
                </p>
                <p style="margin:0; font-size:13px; color:#666; font-weight:600;">
                  — {{testimonial_name}}, {{quiz_result}} goal
                </p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:40px; text-align:center;">
              <p style="margin:0 0 24px; font-size:15px; color:#4a4a4a; line-height:1.7;">
                Your personalized formula is ready, {{ first_name|default:"friend" }}.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizSupplements4: EmailTemplate = {
  id: 'quiz-supplements-4',
  name: 'Quiz Taker Discount',
  category: 'quiz-supplements',
  niche: 'Supplements',
  timing: '72 hours after quiz',
  subjectLine: '{{ first_name|default:"Hey" }}, 15% off your personalized stack',
  description: 'First discount for quiz completers',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your exclusive quiz taker reward', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Goal/Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your goal" }}', placeholder: 'Klaviyo variable' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'MYSTACK15', placeholder: 'Discount code' },
    { key: 'discount_amount', label: 'Discount Amount', type: 'text', defaultValue: '15%', placeholder: '15% or $10' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'CLAIM MY DISCOUNT', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Quiz Taker Exclusive
              </p>
              <h1 style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:36px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                {{discount_amount}} Off Your {{quiz_result}} Stack
              </h1>
              <p style="margin:0 0 32px; font-size:15px; color:#666; line-height:1.6;">
                Because you took the time to find your perfect formula.
              </p>
              <div style="background:#1a1a1a; color:#fff; padding:20px 40px; display:inline-block; margin:0 0 32px;">
                <p style="margin:0 0 4px; font-size:11px; text-transform:uppercase; letter-spacing:0.1em; color:#999;">Your Code</p>
                <p style="margin:0; font-size:28px; font-weight:700; letter-spacing:0.05em;">{{discount_code}}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:40px; text-align:center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizSupplements5: EmailTemplate = {
  id: 'quiz-supplements-5',
  name: 'Common Mistakes For Your Goal',
  category: 'quiz-supplements',
  niche: 'Supplements',
  timing: '4 days after quiz',
  subjectLine: 'The #1 mistake people with {{ event.quiz_results_name|default:"your goal" }} make',
  description: 'Educational content about common supplementation mistakes',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Avoid this common supplementation mistake', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Goal/Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your goal" }}', placeholder: 'Klaviyo variable' },
    { key: 'mistake', label: 'Common Mistake', type: 'text', defaultValue: 'taking generic supplements not formulated for your specific needs', placeholder: 'The mistake' },
    { key: 'solution', label: 'The Solution', type: 'text', defaultValue: 'a personalized stack designed around your unique goals and body', placeholder: 'How to fix' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'GET MY FORMULA', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Important
              </p>
              <h1 style="margin:0 0 24px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                Stop Making This Mistake
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;">
              <p style="margin:0 0 20px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                {{ first_name|default:"Hey" }}, we see this all the time with people pursuing {{quiz_result}}:
              </p>
              <p style="margin:0 0 20px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                The #1 mistake? <strong>{{mistake}}</strong>.
              </p>
              <p style="margin:0 0 20px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                What you actually need is <strong>{{solution}}</strong>.
              </p>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                That's exactly why your personalized stack was built the way it was.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
  `),
};

const quizSupplements6: EmailTemplate = {
  id: 'quiz-supplements-6',
  name: '30-Day Transformation Timeline',
  category: 'quiz-supplements',
  niche: 'Supplements',
  timing: '5 days after quiz',
  subjectLine: 'What to expect in 30 days with your {{ event.quiz_results_name|default:"goal" }} stack',
  description: 'Sets expectations with transformation timeline',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your 30-day transformation roadmap', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Goal/Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your goal" }}', placeholder: 'Klaviyo variable' },
    { key: 'week1', label: 'Week 1 Result', type: 'text', defaultValue: 'Increased energy and focus', placeholder: 'First week' },
    { key: 'week2', label: 'Week 2 Result', type: 'text', defaultValue: 'Improved workout performance', placeholder: 'Second week' },
    { key: 'week4', label: 'Week 4 Result', type: 'text', defaultValue: 'Visible strength and endurance gains', placeholder: 'Fourth week' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'START MY 30 DAYS', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px 32px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Your Roadmap
              </p>
              <h1 style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                30 Days To {{quiz_result}}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;">
              <div style="border-left:2px solid #22c55e; padding-left:24px;">
                <div style="margin-bottom:24px;">
                  <p style="margin:0 0 4px; font-size:11px; color:#22c55e; font-weight:600; text-transform:uppercase;">Week 1</p>
                  <p style="margin:0; font-size:15px; color:#1a1a1a;">{{week1}}</p>
                </div>
                <div style="margin-bottom:24px;">
                  <p style="margin:0 0 4px; font-size:11px; color:#22c55e; font-weight:600; text-transform:uppercase;">Week 2</p>
                  <p style="margin:0; font-size:15px; color:#1a1a1a;">{{week2}}</p>
                </div>
                <div>
                  <p style="margin:0 0 4px; font-size:11px; color:#22c55e; font-weight:600; text-transform:uppercase;">Week 4</p>
                  <p style="margin:0; font-size:15px; color:#1a1a1a;">{{week4}}</p>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:40px; text-align:center;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `),
};

const quizSupplements7: EmailTemplate = {
  id: 'quiz-supplements-7',
  name: 'Urgency - Formula Reserved',
  category: 'quiz-supplements',
  niche: 'Supplements',
  timing: '6 days after quiz',
  subjectLine: '{{ first_name|default:"Hey" }}, your formula is still reserved',
  description: 'Creates urgency around their personalized formula',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your personalized formula wont wait forever', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Goal/Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your goal" }}', placeholder: 'Klaviyo variable' },
    { key: 'expiry_hours', label: 'Hours Until Expiry', type: 'text', defaultValue: '48', placeholder: 'Hours left' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'CLAIM MY FORMULA', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#dc2626; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Time Sensitive
              </p>
              <h1 style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                Your {{quiz_result}} Formula Expires in {{expiry_hours}}h
              </h1>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.7; max-width:420px; margin-left:auto; margin-right:auto;">
                {{ first_name|default:"Hey" }}, we've been holding your personalized stack, but we can't reserve it forever.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 32px;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
  `),
};

const quizSupplements8: EmailTemplate = {
  id: 'quiz-supplements-8',
  name: 'Key Ingredient Spotlight',
  category: 'quiz-supplements',
  niche: 'Supplements',
  timing: '7 days after quiz',
  subjectLine: 'Why this ingredient is essential for {{ event.quiz_results_name|default:"your goal" }}',
  description: 'Educational email about key ingredient in their stack',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'The science behind your key ingredient', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Goal/Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your goal" }}', placeholder: 'Klaviyo variable' },
    { key: 'ingredient_name', label: 'Key Ingredient', type: 'text', defaultValue: 'Creatine Monohydrate', placeholder: 'Main ingredient' },
    { key: 'ingredient_benefit', label: 'Ingredient Benefit', type: 'text', defaultValue: 'increases strength output by up to 15% and supports faster muscle recovery', placeholder: 'What it does' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'GET MY STACK', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Ingredient Spotlight
              </p>
              <h1 style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                Why {{ingredient_name}} Is In Your Stack
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;">
              <p style="margin:0 0 20px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                {{ first_name|default:"Hey" }}, for your goal of {{quiz_result}}, one ingredient stands out:
              </p>
              <div style="background:#f0fdf4; padding:24px; border-left:3px solid #22c55e; margin:0 0 24px;">
                <p style="margin:0 0 8px; font-size:18px; font-weight:600; color:#1a1a1a;">{{ingredient_name}}</p>
                <p style="margin:0; font-size:15px; color:#4a4a4a; line-height:1.7;">
                  {{ingredient_benefit}}
                </p>
              </div>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.8;">
                This is just one of the carefully selected ingredients in your personalized formula.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
  `),
};

const quizSupplements9: EmailTemplate = {
  id: 'quiz-supplements-9',
  name: 'Last Chance Discount',
  category: 'quiz-supplements',
  niche: 'Supplements',
  timing: '10 days after quiz',
  subjectLine: 'Final hours: 20% off your {{ event.quiz_results_name|default:"goal" }} stack',
  description: 'Final discount push with maximum urgency',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your biggest discount expires at midnight', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Goal/Result', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your goal" }}', placeholder: 'Klaviyo variable' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'LASTSTACK20', placeholder: 'Discount code' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'CLAIM 20% OFF', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:48px 40px; text-align:center; background:#1a1a1a;">
              <p style="margin:0 0 8px; font-size:11px; color:#22c55e; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Last Chance
              </p>
              <h1 style="margin:0 0 16px; font-family:'Playfair Display',Georgia,serif; font-size:48px; font-weight:500; color:#ffffff; line-height:1.1;">
                20% OFF
              </h1>
              <p style="margin:0 0 24px; font-size:15px; color:#999; line-height:1.6;">
                Your {{quiz_result}} formula. Expires at midnight.
              </p>
              <div style="background:#ffffff; color:#1a1a1a; padding:16px 32px; display:inline-block; margin:0 0 24px;">
                <p style="margin:0; font-size:24px; font-weight:700; letter-spacing:0.05em;">{{discount_code}}</p>
              </div>
              <br/>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:#22c55e;">
                    <a href="{{cta_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
                      {{cta_text}}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
  `),
};

const quizSupplements10: EmailTemplate = {
  id: 'quiz-supplements-10',
  name: 'Goals Check-In',
  category: 'quiz-supplements',
  niche: 'Supplements',
  timing: '14 days after quiz',
  subjectLine: 'Have your fitness goals changed, {{ first_name|default:"friend" }}?',
  description: 'Re-engagement for non-converters to retake quiz',
  suggestedImages: imageLibrary.lifestyle.map(i => i.url),
  fields: [
    ...commonBrandFields,
    { key: 'hero_image', label: 'Hero Image URL', type: 'url', defaultValue: 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Custom%20sections%20imaegs/luxurious-flat-lay-on-white.png', placeholder: 'https://...' },
    { key: 'preview_text', label: 'Preview Text', type: 'text', defaultValue: 'Your goals might have evolved', placeholder: 'Email preview' },
    { key: 'quiz_result', label: 'Previous Goal', type: 'text', defaultValue: '{{ event.quiz_results_name|default:"your previous goal" }}', placeholder: 'Klaviyo variable' },
    { key: 'quiz_url', label: 'Quiz URL', type: 'url', defaultValue: 'https://yourstore.com/supplement-quiz', placeholder: 'Link to quiz' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'RETAKE THE QUIZ', placeholder: 'Button text' },
  ],
  html: premiumWrapper(`
          <tr>
            <td style="padding:0;">
              <img src="{{hero_image}}" alt="" style="display:block; width:100%; height:auto;">
            </td>
          </tr>
          <tr>
            <td style="padding:48px 40px; text-align:center;">
              <p style="margin:0 0 8px; font-size:11px; color:#B8860B; text-transform:uppercase; letter-spacing:0.2em; font-weight:600;">
                Check In
              </p>
              <h1 style="margin:0 0 20px; font-family:'Playfair Display',Georgia,serif; font-size:32px; font-weight:500; color:#1a1a1a; line-height:1.2;">
                Goals Evolve.<br/>So Should Your Stack.
              </h1>
              <p style="margin:0 0 20px; font-size:15px; color:#4a4a4a; line-height:1.7; max-width:420px; margin-left:auto; margin-right:auto;">
                Last time your goal was {{quiz_result}}. But priorities shift with training and life.
              </p>
              <p style="margin:0 0 32px; font-size:15px; color:#4a4a4a; line-height:1.7;">
                Ready to see if your formula needs an update?
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
                <tr>
                  <td style="border-radius:0; background:{{primary_color}};">
                    <a href="{{quiz_url}}" style="display:inline-block; padding:16px 48px; font-size:12px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">
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
  // Quiz Funnel - Skincare
  quizSkincare1,
  quizSkincare2,
  quizSkincare3,
  quizSkincare4,
  quizSkincare5,
  quizSkincare6,
  quizSkincare7,
  quizSkincare8,
  quizSkincare9,
  quizSkincare10,
  // Quiz Funnel - Fashion
  quizFashion1,
  quizFashion2,
  quizFashion3,
  quizFashion4,
  quizFashion5,
  quizFashion6,
  quizFashion7,
  quizFashion8,
  quizFashion9,
  quizFashion10,
  // Quiz Funnel - Supplements
  quizSupplements1,
  quizSupplements2,
  quizSupplements3,
  quizSupplements4,
  quizSupplements5,
  quizSupplements6,
  quizSupplements7,
  quizSupplements8,
  quizSupplements9,
  quizSupplements10,
];

export const templateCategories = [
  { id: 'abandoned-cart', name: 'Abandoned Cart', count: 8 },
  { id: 'welcome', name: 'Welcome', count: 8 },
  { id: 'post-purchase', name: 'Post-Purchase', count: 10 },
  { id: 'win-back', name: 'Win-Back', count: 8 },
  { id: 'flash-sale', name: 'Flash Sale', count: 8 },
  { id: 'vip-loyalty', name: 'VIP & Loyalty', count: 8 },
  { id: 'quiz-skincare', name: 'Quiz Funnel - Skincare', count: 10 },
  { id: 'quiz-fashion', name: 'Quiz Funnel - Fashion', count: 10 },
  { id: 'quiz-supplements', name: 'Quiz Funnel - Supplements', count: 10 },
];
