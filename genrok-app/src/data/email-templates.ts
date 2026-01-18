// Email Templates Data - 15 Production-Ready HTML Email Templates
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
}

export interface TemplateField {
  key: string;
  label: string;
  type: 'text' | 'color' | 'url' | 'number';
  defaultValue: string;
  placeholder?: string;
}

// Common fields used across templates
const commonBrandFields: TemplateField[] = [
  { key: 'brand_name', label: 'Brand Name', type: 'text', defaultValue: 'Your Brand', placeholder: 'e.g., Acme Store' },
  { key: 'logo_url', label: 'Logo URL', type: 'url', defaultValue: 'https://via.placeholder.com/150x50?text=LOGO', placeholder: 'https://...' },
  { key: 'primary_color', label: 'Primary Color', type: 'color', defaultValue: '#000000' },
  { key: 'accent_color', label: 'Accent Color', type: 'color', defaultValue: '#B8860B' },
  { key: 'cta_url', label: 'Button URL', type: 'url', defaultValue: 'https://yourstore.com', placeholder: 'https://yourstore.com' },
];

// Base email wrapper
const emailWrapper = (content: string) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>{{subject_line}}</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin:0; padding:0; background-color:#f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f5f5f5;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          ${content}
        </table>
        <!-- Footer -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="padding:30px 40px; text-align:center;">
              <p style="margin:0 0 10px; color:#999999; font-size:12px; line-height:1.5;">
                &copy; 2026 {{brand_name}}. All rights reserved.
              </p>
              <p style="margin:0; color:#999999; font-size:12px;">
                <a href="#" style="color:#999999; text-decoration:underline;">Unsubscribe</a> &nbsp;|&nbsp;
                <a href="#" style="color:#999999; text-decoration:underline;">View in browser</a>
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
  subjectLine: "Don't worry, we saved your cart!",
  description: 'First touchpoint - reassuring and helpful tone',
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'product_name', label: 'Product Name', type: 'text', defaultValue: 'your items', placeholder: 'e.g., Premium Skincare Set' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Complete My Order' },
  ],
  html: emailWrapper(`
          <!-- Header -->
          <tr>
            <td style="padding:30px 40px 20px; text-align:center; background:linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%);">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:520px; height:auto;">
            </td>
          </tr>
          <!-- Hero -->
          <tr>
            <td style="padding:30px 40px; text-align:center;">
              <h1 style="margin:0 0 15px; font-size:28px; font-weight:700; color:{{primary_color}}; line-height:1.3;">
                Don't worry, we saved your cart!
              </h1>
              <p style="margin:0; font-size:16px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, looks like you left {{product_name}} behind. No worries - we've kept everything safe for you.
              </p>
            </td>
          </tr>
          <!-- Product Reminder Box -->
          <tr>
            <td style="padding:0 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f9f9f9; border-radius:8px;">
                <tr>
                  <td style="padding:25px; text-align:center;">
                    <p style="margin:0 0 5px; font-size:12px; color:#999999; text-transform:uppercase; letter-spacing:1px;">Your cart is waiting</p>
                    <p style="margin:0; font-size:18px; font-weight:600; color:{{primary_color}};">{{product_name}}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px; text-align:center;">
              <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; background:{{accent_color}}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px;">
                {{cta_text}}
              </a>
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
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there', placeholder: 'or use: Friend' },
    { key: 'product_name', label: 'Product Name', type: 'text', defaultValue: 'your items', placeholder: 'e.g., Premium Skincare Set' },
    { key: 'review_count', label: 'Review Count', type: 'text', defaultValue: '2,500+', placeholder: 'e.g., 1,000+' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Return to Cart' },
  ],
  html: emailWrapper(`
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px; text-align:center;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:520px; height:auto;">
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:30px 40px; text-align:center;">
              <h1 style="margin:0 0 15px; font-size:28px; font-weight:700; color:{{primary_color}}; line-height:1.3;">
                Still thinking about it?
              </h1>
              <p style="margin:0 0 25px; font-size:16px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, we noticed you left {{product_name}} in your cart. Here's what our customers are saying:
              </p>
            </td>
          </tr>
          <!-- Social Proof -->
          <tr>
            <td style="padding:0 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#fafafa; border-radius:8px; border-left:4px solid {{accent_color}};">
                <tr>
                  <td style="padding:20px 25px;">
                    <p style="margin:0 0 10px; font-size:14px; color:#666666; font-style:italic; line-height:1.5;">
                      "Absolutely love this! Best purchase I've made all year. The quality exceeded my expectations."
                    </p>
                    <p style="margin:0; font-size:12px; color:#999999;">
                      ⭐⭐⭐⭐⭐ &nbsp;•&nbsp; Joined {{review_count}} happy customers
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px; text-align:center;">
              <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; background:{{accent_color}}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px;">
                {{cta_text}}
              </a>
            </td>
          </tr>
  `),
};

const abandonedCart3: EmailTemplate = {
  id: 'abandoned-cart-3',
  name: 'Value Reminder',
  category: 'abandoned-cart',
  timing: '48 hours after abandonment',
  subjectLine: "There's more to this than you think",
  description: 'Highlight product benefits and value proposition',
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there' },
    { key: 'product_name', label: 'Product Name', type: 'text', defaultValue: 'your items' },
    { key: 'benefit_1', label: 'Benefit 1', type: 'text', defaultValue: 'Premium quality materials' },
    { key: 'benefit_2', label: 'Benefit 2', type: 'text', defaultValue: 'Free shipping on all orders' },
    { key: 'benefit_3', label: 'Benefit 3', type: 'text', defaultValue: '30-day money-back guarantee' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Get It Now' },
  ],
  html: emailWrapper(`
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px; text-align:center;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:520px; height:auto;">
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:30px 40px; text-align:center;">
              <h1 style="margin:0 0 15px; font-size:28px; font-weight:700; color:{{primary_color}}; line-height:1.3;">
                There's more to this than meets the eye
              </h1>
              <p style="margin:0; font-size:16px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, here's why {{product_name}} is worth it:
              </p>
            </td>
          </tr>
          <!-- Benefits -->
          <tr>
            <td style="padding:20px 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #f0f0f0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="30" style="color:{{accent_color}}; font-size:18px;">✓</td>
                        <td style="font-size:15px; color:#333333;">{{benefit_1}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #f0f0f0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="30" style="color:{{accent_color}}; font-size:18px;">✓</td>
                        <td style="font-size:15px; color:#333333;">{{benefit_2}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="30" style="color:{{accent_color}}; font-size:18px;">✓</td>
                        <td style="font-size:15px; color:#333333;">{{benefit_3}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px; text-align:center;">
              <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; background:{{accent_color}}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px;">
                {{cta_text}}
              </a>
            </td>
          </tr>
  `),
};

const abandonedCart4: EmailTemplate = {
  id: 'abandoned-cart-4',
  name: 'Special Gift',
  category: 'abandoned-cart',
  timing: '72 hours after abandonment',
  subjectLine: "Here's a little something for you: {{discount}}% OFF",
  description: 'First discount offer to incentivize purchase',
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there' },
    { key: 'discount', label: 'Discount %', type: 'number', defaultValue: '10' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'COMEBACK10', placeholder: 'e.g., SAVE10' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Claim My Discount' },
  ],
  html: emailWrapper(`
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px; text-align:center;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:520px; height:auto;">
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:30px 40px; text-align:center;">
              <h1 style="margin:0 0 15px; font-size:28px; font-weight:700; color:{{primary_color}}; line-height:1.3;">
                Here's a little gift for you 🎁
              </h1>
              <p style="margin:0; font-size:16px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, we really want you to have this. Here's {{discount}}% off to make it easier:
              </p>
            </td>
          </tr>
          <!-- Discount Code Box -->
          <tr>
            <td style="padding:20px 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(135deg, {{primary_color}} 0%, #333333 100%); border-radius:12px;">
                <tr>
                  <td style="padding:30px; text-align:center;">
                    <p style="margin:0 0 10px; font-size:12px; color:rgba(255,255,255,0.7); text-transform:uppercase; letter-spacing:2px;">Use code at checkout</p>
                    <p style="margin:0 0 10px; font-size:32px; font-weight:700; color:#ffffff; letter-spacing:3px;">{{discount_code}}</p>
                    <p style="margin:0; font-size:24px; color:{{accent_color}}; font-weight:600;">{{discount}}% OFF</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px; text-align:center;">
              <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; background:{{accent_color}}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px;">
                {{cta_text}}
              </a>
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
  description: 'Show popular products as social proof',
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there' },
    { key: 'bestseller_1', label: 'Best Seller 1', type: 'text', defaultValue: 'Premium Collection' },
    { key: 'bestseller_2', label: 'Best Seller 2', type: 'text', defaultValue: 'Essential Bundle' },
    { key: 'bestseller_3', label: 'Best Seller 3', type: 'text', defaultValue: 'Starter Kit' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Shop Best Sellers' },
  ],
  html: emailWrapper(`
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px; text-align:center;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:520px; height:auto;">
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:30px 40px; text-align:center;">
              <h1 style="margin:0 0 15px; font-size:28px; font-weight:700; color:{{primary_color}}; line-height:1.3;">
                See what everyone's buying
              </h1>
              <p style="margin:0; font-size:16px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, here are our most-loved products this week:
              </p>
            </td>
          </tr>
          <!-- Best Sellers Grid -->
          <tr>
            <td style="padding:20px 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="33%" style="padding:10px; text-align:center; vertical-align:top;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f9f9f9; border-radius:8px;">
                      <tr>
                        <td style="padding:20px;">
                          <p style="margin:0 0 5px; font-size:11px; color:{{accent_color}}; text-transform:uppercase; font-weight:600;">Trending</p>
                          <p style="margin:0; font-size:14px; color:{{primary_color}}; font-weight:600;">{{bestseller_1}}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="33%" style="padding:10px; text-align:center; vertical-align:top;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f9f9f9; border-radius:8px;">
                      <tr>
                        <td style="padding:20px;">
                          <p style="margin:0 0 5px; font-size:11px; color:{{accent_color}}; text-transform:uppercase; font-weight:600;">Popular</p>
                          <p style="margin:0; font-size:14px; color:{{primary_color}}; font-weight:600;">{{bestseller_2}}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="33%" style="padding:10px; text-align:center; vertical-align:top;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f9f9f9; border-radius:8px;">
                      <tr>
                        <td style="padding:20px;">
                          <p style="margin:0 0 5px; font-size:11px; color:{{accent_color}}; text-transform:uppercase; font-weight:600;">New</p>
                          <p style="margin:0; font-size:14px; color:{{primary_color}}; font-weight:600;">{{bestseller_3}}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px; text-align:center;">
              <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; background:{{accent_color}}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px;">
                {{cta_text}}
              </a>
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
  description: 'Reminder that discount code is still valid',
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there' },
    { key: 'discount', label: 'Discount %', type: 'number', defaultValue: '10' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'COMEBACK10' },
    { key: 'hours_left', label: 'Hours Left', type: 'text', defaultValue: '24' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Use My Discount' },
  ],
  html: emailWrapper(`
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px; text-align:center;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:520px; height:auto;">
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:30px 40px; text-align:center;">
              <h1 style="margin:0 0 15px; font-size:28px; font-weight:700; color:{{primary_color}}; line-height:1.3;">
                Your {{discount}}% off is still waiting!
              </h1>
              <p style="margin:0; font-size:16px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, just a friendly reminder that your exclusive discount expires soon.
              </p>
            </td>
          </tr>
          <!-- Urgency Box -->
          <tr>
            <td style="padding:20px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#fff8e6; border-radius:8px; border:1px solid #f5e6c8;">
                <tr>
                  <td style="padding:20px; text-align:center;">
                    <p style="margin:0 0 5px; font-size:14px; color:#996600;">⏰ Expires in {{hours_left}} hours</p>
                    <p style="margin:0; font-size:24px; font-weight:700; color:{{primary_color}}; letter-spacing:2px;">{{discount_code}}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:30px 40px 40px; text-align:center;">
              <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; background:{{accent_color}}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px;">
                {{cta_text}}
              </a>
            </td>
          </tr>
  `),
};

const abandonedCart7: EmailTemplate = {
  id: 'abandoned-cart-7',
  name: 'No Pressure Goodbye',
  category: 'abandoned-cart',
  timing: '5 days after abandonment',
  subjectLine: "No worries, we'll be here when you're ready",
  description: 'Final gentle touch - no pressure approach',
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Browse When Ready' },
  ],
  html: emailWrapper(`
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px; text-align:center;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:520px; height:auto;">
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:30px 40px; text-align:center;">
              <h1 style="margin:0 0 20px; font-size:28px; font-weight:700; color:{{primary_color}}; line-height:1.3;">
                No pressure at all
              </h1>
              <p style="margin:0 0 15px; font-size:16px; color:#666666; line-height:1.7;">
                Hey {{customer_name}}, we get it - sometimes the timing just isn't right. That's totally okay!
              </p>
              <p style="margin:0 0 15px; font-size:16px; color:#666666; line-height:1.7;">
                We're not going anywhere. Whenever you're ready to come back, we'll be here with the same great products and service.
              </p>
              <p style="margin:0; font-size:16px; color:#666666; line-height:1.7;">
                Take care, and we hope to see you again soon! 💛
              </p>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:30px 40px 40px; text-align:center;">
              <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; background:{{primary_color}}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px;">
                {{cta_text}}
              </a>
              <p style="margin:15px 0 0; font-size:13px; color:#999999;">
                No rush. No pressure. Just quality.
              </p>
            </td>
          </tr>
  `),
};

// =====================================================
// WELCOME & POST-PURCHASE EMAILS (4 templates)
// =====================================================

const welcomeEmail: EmailTemplate = {
  id: 'welcome-1',
  name: 'Welcome Email',
  category: 'welcome',
  timing: 'Immediately after signup',
  subjectLine: 'Welcome to {{brand_name}}! Here\'s {{discount}}% off',
  description: 'First email - brand intro with welcome discount',
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there' },
    { key: 'discount', label: 'Discount %', type: 'number', defaultValue: '15' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'WELCOME15' },
    { key: 'brand_tagline', label: 'Brand Tagline', type: 'text', defaultValue: 'Quality products for modern living' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Start Shopping' },
  ],
  html: emailWrapper(`
          <!-- Header with Gradient -->
          <tr>
            <td style="padding:50px 40px 30px; text-align:center; background:linear-gradient(135deg, {{primary_color}} 0%, #333333 100%);">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto 20px; width:100%; max-width:520px; height:auto;">
              <h1 style="margin:0; font-size:32px; font-weight:700; color:#ffffff; line-height:1.3;">
                Welcome to the family!
              </h1>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:40px; text-align:center;">
              <p style="margin:0 0 25px; font-size:18px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, we're so excited to have you here! At {{brand_name}}, we believe in {{brand_tagline}}.
              </p>
              <p style="margin:0 0 30px; font-size:16px; color:#666666; line-height:1.6;">
                As a thank you for joining us, here's an exclusive welcome gift:
              </p>
            </td>
          </tr>
          <!-- Discount Code Box -->
          <tr>
            <td style="padding:0 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(135deg, {{accent_color}} 0%, #d4a017 100%); border-radius:12px;">
                <tr>
                  <td style="padding:35px; text-align:center;">
                    <p style="margin:0 0 10px; font-size:14px; color:rgba(255,255,255,0.9); text-transform:uppercase; letter-spacing:2px;">Your exclusive code</p>
                    <p style="margin:0 0 10px; font-size:36px; font-weight:700; color:#ffffff; letter-spacing:3px;">{{discount_code}}</p>
                    <p style="margin:0; font-size:20px; color:#ffffff; font-weight:600;">{{discount}}% OFF your first order</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px; text-align:center;">
              <a href="{{cta_url}}" style="display:inline-block; padding:18px 50px; background:{{primary_color}}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px;">
                {{cta_text}}
              </a>
            </td>
          </tr>
  `),
};

const orderConfirmation: EmailTemplate = {
  id: 'post-purchase-1',
  name: 'Order Confirmation',
  category: 'post-purchase',
  timing: 'Immediately after purchase',
  subjectLine: 'Order confirmed! Thanks for your purchase',
  description: 'Thank you email with order details',
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there' },
    { key: 'order_number', label: 'Order Number', type: 'text', defaultValue: '#12345' },
    { key: 'order_total', label: 'Order Total', type: 'text', defaultValue: '$99.00' },
    { key: 'delivery_estimate', label: 'Delivery Estimate', type: 'text', defaultValue: '3-5 business days' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Track My Order' },
  ],
  html: emailWrapper(`
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px; text-align:center;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:520px; height:auto;">
            </td>
          </tr>
          <!-- Success Icon & Title -->
          <tr>
            <td style="padding:20px 40px; text-align:center;">
              <div style="width:80px; height:80px; background:#e8f5e9; border-radius:50%; margin:0 auto 20px; line-height:80px; font-size:40px;">
                ✓
              </div>
              <h1 style="margin:0 0 10px; font-size:28px; font-weight:700; color:{{primary_color}}; line-height:1.3;">
                Order Confirmed!
              </h1>
              <p style="margin:0; font-size:16px; color:#666666;">
                Thanks for your purchase, {{customer_name}}!
              </p>
            </td>
          </tr>
          <!-- Order Details -->
          <tr>
            <td style="padding:20px 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f9f9f9; border-radius:8px;">
                <tr>
                  <td style="padding:25px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding:8px 0; border-bottom:1px solid #e0e0e0;">
                          <span style="font-size:14px; color:#666666;">Order Number</span>
                        </td>
                        <td style="padding:8px 0; border-bottom:1px solid #e0e0e0; text-align:right;">
                          <span style="font-size:14px; font-weight:600; color:{{primary_color}};">{{order_number}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0; border-bottom:1px solid #e0e0e0;">
                          <span style="font-size:14px; color:#666666;">Order Total</span>
                        </td>
                        <td style="padding:8px 0; border-bottom:1px solid #e0e0e0; text-align:right;">
                          <span style="font-size:14px; font-weight:600; color:{{primary_color}};">{{order_total}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <span style="font-size:14px; color:#666666;">Estimated Delivery</span>
                        </td>
                        <td style="padding:8px 0; text-align:right;">
                          <span style="font-size:14px; font-weight:600; color:{{primary_color}};">{{delivery_estimate}}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px; text-align:center;">
              <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; background:{{accent_color}}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px;">
                {{cta_text}}
              </a>
            </td>
          </tr>
  `),
};

const shippingNotification: EmailTemplate = {
  id: 'post-purchase-2',
  name: 'Shipping Notification',
  category: 'post-purchase',
  timing: 'When order ships',
  subjectLine: 'Your order is on its way!',
  description: 'Shipping confirmation with tracking info',
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there' },
    { key: 'order_number', label: 'Order Number', type: 'text', defaultValue: '#12345' },
    { key: 'tracking_number', label: 'Tracking Number', type: 'text', defaultValue: '1Z999AA10123456784' },
    { key: 'carrier', label: 'Carrier', type: 'text', defaultValue: 'UPS' },
    { key: 'delivery_date', label: 'Expected Delivery', type: 'text', defaultValue: 'January 20, 2026' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Track Package' },
  ],
  html: emailWrapper(`
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px; text-align:center;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:520px; height:auto;">
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:20px 40px; text-align:center;">
              <div style="font-size:50px; margin-bottom:15px;">📦</div>
              <h1 style="margin:0 0 15px; font-size:28px; font-weight:700; color:{{primary_color}}; line-height:1.3;">
                Your order is on its way!
              </h1>
              <p style="margin:0; font-size:16px; color:#666666; line-height:1.6;">
                Great news, {{customer_name}}! Your order {{order_number}} has shipped and is heading your way.
              </p>
            </td>
          </tr>
          <!-- Shipping Details -->
          <tr>
            <td style="padding:20px 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f0f8ff; border-radius:8px; border:1px solid #cce5ff;">
                <tr>
                  <td style="padding:25px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding:5px 0;">
                          <span style="font-size:13px; color:#666666;">Carrier:</span>
                          <span style="font-size:13px; font-weight:600; color:{{primary_color}}; margin-left:10px;">{{carrier}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;">
                          <span style="font-size:13px; color:#666666;">Tracking:</span>
                          <span style="font-size:13px; font-weight:600; color:{{primary_color}}; margin-left:10px;">{{tracking_number}}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:5px 0;">
                          <span style="font-size:13px; color:#666666;">Expected:</span>
                          <span style="font-size:13px; font-weight:600; color:{{accent_color}}; margin-left:10px;">{{delivery_date}}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px; text-align:center;">
              <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; background:{{accent_color}}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px;">
                {{cta_text}}
              </a>
            </td>
          </tr>
  `),
};

const reviewRequest: EmailTemplate = {
  id: 'post-purchase-3',
  name: 'Review Request',
  category: 'post-purchase',
  timing: '7 days after delivery',
  subjectLine: 'How did we do? Share your thoughts',
  description: 'Ask for feedback with incentive',
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there' },
    { key: 'product_name', label: 'Product Name', type: 'text', defaultValue: 'your recent purchase' },
    { key: 'reward_amount', label: 'Reward Amount', type: 'text', defaultValue: '10%' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Leave a Review' },
  ],
  html: emailWrapper(`
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px; text-align:center;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:520px; height:auto;">
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:20px 40px; text-align:center;">
              <h1 style="margin:0 0 15px; font-size:28px; font-weight:700; color:{{primary_color}}; line-height:1.3;">
                How are you loving {{product_name}}?
              </h1>
              <p style="margin:0 0 25px; font-size:16px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, we'd love to hear your thoughts! Your feedback helps us improve and helps other customers make informed decisions.
              </p>
            </td>
          </tr>
          <!-- Star Rating Visual -->
          <tr>
            <td style="padding:0 40px 20px; text-align:center;">
              <p style="margin:0; font-size:40px; letter-spacing:8px;">⭐⭐⭐⭐⭐</p>
            </td>
          </tr>
          <!-- Incentive -->
          <tr>
            <td style="padding:0 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f9f9f9; border-radius:8px;">
                <tr>
                  <td style="padding:20px; text-align:center;">
                    <p style="margin:0; font-size:14px; color:#666666;">
                      As a thank you, get <span style="color:{{accent_color}}; font-weight:600;">{{reward_amount}} off</span> your next order when you leave a review!
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px; text-align:center;">
              <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; background:{{accent_color}}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px;">
                {{cta_text}}
              </a>
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
  subjectLine: 'We miss you! Come back and see what\'s new',
  description: 'First win-back attempt - friendly reconnection',
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'See What\'s New' },
  ],
  html: emailWrapper(`
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px; text-align:center;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:520px; height:auto;">
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:30px 40px; text-align:center;">
              <div style="font-size:50px; margin-bottom:15px;">👋</div>
              <h1 style="margin:0 0 15px; font-size:28px; font-weight:700; color:{{primary_color}}; line-height:1.3;">
                Long time no see!
              </h1>
              <p style="margin:0 0 20px; font-size:16px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, we've missed you around here! It's been a while since your last visit, and we've added some exciting new things.
              </p>
              <p style="margin:0; font-size:16px; color:#666666; line-height:1.6;">
                Come back and check out what's new at {{brand_name}}!
              </p>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:30px 40px 40px; text-align:center;">
              <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; background:{{accent_color}}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px;">
                {{cta_text}}
              </a>
            </td>
          </tr>
  `),
};

const winBack2: EmailTemplate = {
  id: 'win-back-2',
  name: "What's New",
  category: 'win-back',
  timing: '45 days inactive',
  subjectLine: 'You\'ve been gone! Here\'s what you missed',
  description: 'Showcase new products and updates',
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there' },
    { key: 'new_item_1', label: 'New Item 1', type: 'text', defaultValue: 'Spring Collection' },
    { key: 'new_item_2', label: 'New Item 2', type: 'text', defaultValue: 'Limited Edition Bundles' },
    { key: 'new_item_3', label: 'New Item 3', type: 'text', defaultValue: 'Exclusive Member Perks' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Explore Now' },
  ],
  html: emailWrapper(`
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px; text-align:center;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:520px; height:auto;">
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:30px 40px; text-align:center;">
              <h1 style="margin:0 0 15px; font-size:28px; font-weight:700; color:{{primary_color}}; line-height:1.3;">
                Here's what you missed!
              </h1>
              <p style="margin:0; font-size:16px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, a lot has changed since you were last here:
              </p>
            </td>
          </tr>
          <!-- What's New List -->
          <tr>
            <td style="padding:20px 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding:15px; background:#f9f9f9; border-radius:8px; margin-bottom:10px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="30" style="font-size:20px;">✨</td>
                        <td style="font-size:15px; color:#333333; font-weight:500;">{{new_item_1}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height:10px;"></td></tr>
                <tr>
                  <td style="padding:15px; background:#f9f9f9; border-radius:8px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="30" style="font-size:20px;">🎁</td>
                        <td style="font-size:15px; color:#333333; font-weight:500;">{{new_item_2}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height:10px;"></td></tr>
                <tr>
                  <td style="padding:15px; background:#f9f9f9; border-radius:8px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="30" style="font-size:20px;">⭐</td>
                        <td style="font-size:15px; color:#333333; font-weight:500;">{{new_item_3}}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px; text-align:center;">
              <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; background:{{accent_color}}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px;">
                {{cta_text}}
              </a>
            </td>
          </tr>
  `),
};

const winBack3: EmailTemplate = {
  id: 'win-back-3',
  name: 'Exclusive Return Offer',
  category: 'win-back',
  timing: '60 days inactive',
  subjectLine: 'We want you back! Here\'s {{discount}}% off',
  description: 'Discount incentive to return',
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there' },
    { key: 'discount', label: 'Discount %', type: 'number', defaultValue: '20' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'WEMISSYOU20' },
    { key: 'expiry_days', label: 'Expires In (days)', type: 'text', defaultValue: '7' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'Claim My Discount' },
  ],
  html: emailWrapper(`
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px; text-align:center;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:520px; height:auto;">
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:30px 40px; text-align:center;">
              <h1 style="margin:0 0 15px; font-size:28px; font-weight:700; color:{{primary_color}}; line-height:1.3;">
                We really want you back!
              </h1>
              <p style="margin:0; font-size:16px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, it's been too long! Here's an exclusive offer just for you:
              </p>
            </td>
          </tr>
          <!-- Discount Box -->
          <tr>
            <td style="padding:20px 40px 30px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(135deg, {{accent_color}} 0%, #d4a017 100%); border-radius:12px;">
                <tr>
                  <td style="padding:35px; text-align:center;">
                    <p style="margin:0 0 10px; font-size:48px; font-weight:700; color:#ffffff;">{{discount}}% OFF</p>
                    <p style="margin:0 0 15px; font-size:14px; color:rgba(255,255,255,0.9); text-transform:uppercase; letter-spacing:2px;">Use code</p>
                    <p style="margin:0 0 15px; font-size:28px; font-weight:700; color:#ffffff; letter-spacing:3px;">{{discount_code}}</p>
                    <p style="margin:0; font-size:13px; color:rgba(255,255,255,0.8);">Expires in {{expiry_days}} days</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px; text-align:center;">
              <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; background:{{primary_color}}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px;">
                {{cta_text}}
              </a>
            </td>
          </tr>
  `),
};

const winBack4: EmailTemplate = {
  id: 'win-back-4',
  name: 'Last Chance Goodbye',
  category: 'win-back',
  timing: '90 days inactive',
  subjectLine: 'Before you go... one last offer',
  description: 'Final attempt before unsubscribe',
  fields: [
    ...commonBrandFields,
    { key: 'customer_name', label: 'Customer Name', type: 'text', defaultValue: 'there' },
    { key: 'discount', label: 'Discount %', type: 'number', defaultValue: '25' },
    { key: 'discount_code', label: 'Discount Code', type: 'text', defaultValue: 'LASTCHANCE25' },
    { key: 'cta_text', label: 'Button Text', type: 'text', defaultValue: 'One More Try' },
  ],
  html: emailWrapper(`
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 20px; text-align:center;">
              <img src="{{logo_url}}" alt="{{brand_name}}" style="display:block; margin:0 auto; width:100%; max-width:520px; height:auto;">
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding:30px 40px; text-align:center;">
              <h1 style="margin:0 0 15px; font-size:28px; font-weight:700; color:{{primary_color}}; line-height:1.3;">
                We don't want to say goodbye...
              </h1>
              <p style="margin:0 0 20px; font-size:16px; color:#666666; line-height:1.6;">
                Hey {{customer_name}}, it's been a while and we understand things change. Before we part ways, we wanted to offer you one last special deal:
              </p>
            </td>
          </tr>
          <!-- Last Chance Offer -->
          <tr>
            <td style="padding:0 40px 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#1a1a1a; border-radius:12px;">
                <tr>
                  <td style="padding:35px; text-align:center;">
                    <p style="margin:0 0 5px; font-size:12px; color:#999999; text-transform:uppercase; letter-spacing:2px;">Final offer</p>
                    <p style="margin:0 0 10px; font-size:48px; font-weight:700; color:#ffffff;">{{discount}}% OFF</p>
                    <p style="margin:0; font-size:24px; font-weight:600; color:{{accent_color}}; letter-spacing:2px;">{{discount_code}}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:20px 40px 30px; text-align:center;">
              <a href="{{cta_url}}" style="display:inline-block; padding:16px 40px; background:{{accent_color}}; color:#ffffff; text-decoration:none; border-radius:8px; font-weight:600; font-size:16px;">
                {{cta_text}}
              </a>
            </td>
          </tr>
          <!-- Unsubscribe Note -->
          <tr>
            <td style="padding:0 40px 40px; text-align:center;">
              <p style="margin:0; font-size:13px; color:#999999; line-height:1.5;">
                If you'd prefer not to hear from us anymore, no hard feelings. You can <a href="#" style="color:#999999;">unsubscribe here</a>. We'll miss you!
              </p>
            </td>
          </tr>
  `),
};

// =====================================================
// EXPORT ALL TEMPLATES
// =====================================================

export const emailTemplates: EmailTemplate[] = [
  // Abandoned Cart (7)
  abandonedCart1,
  abandonedCart2,
  abandonedCart3,
  abandonedCart4,
  abandonedCart5,
  abandonedCart6,
  abandonedCart7,
  // Welcome (1)
  welcomeEmail,
  // Post-Purchase (3)
  orderConfirmation,
  shippingNotification,
  reviewRequest,
  // Win-Back (4)
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
