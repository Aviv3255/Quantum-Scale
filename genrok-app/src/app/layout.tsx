import type { Metadata } from "next";
import "./globals.css";
import { RootProviders } from "@/components/providers/RootProviders";

export const metadata: Metadata = {
  title: "Quantum Scale | Follow the Monkey",
  description: "Data-driven strategies, proven systems, and premium tools to scale your eCommerce brand to 7 figures and beyond. Follow the Monkey - he knows the path to success.",
  keywords: ["ecommerce", "shopify", "dropshipping", "LTV", "conversion rate", "meta ads", "tiktok ads", "quantum scale"],
  authors: [{ name: "Quantum Scale" }],
  icons: {
    icon: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Quantum_Scale_logo_14.png?v=1765206846",
    apple: "https://cdn.shopify.com/s/files/1/0682/3202/0061/files/Quantum_Scale_logo_14.png?v=1765206846",
  },
  openGraph: {
    title: "Quantum Scale | Follow the Monkey",
    description: "Data-driven strategies, proven systems, and premium tools to scale your eCommerce brand to 7 figures and beyond.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantum Scale | Follow the Monkey",
    description: "Data-driven strategies, proven systems, and premium tools to scale your eCommerce brand to 7 figures and beyond.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* iOS Safe Area Support */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Preconnect to font sources */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />

        {/* General Sans font for all text */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />

        {/* Load accent color before paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var accent = localStorage.getItem('accent-color');
                  if (accent && ['lime', 'mint', 'forest', 'sage', 'neon', 'gold', 'blue', 'purple', 'coral', 'teal'].includes(accent)) {
                    document.documentElement.setAttribute('data-accent', accent);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-[var(--text-secondary)]">
        <RootProviders>
          {children}
        </RootProviders>
      </body>
    </html>
  );
}
