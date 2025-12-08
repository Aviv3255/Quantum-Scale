import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Quantum Scale | Follow the Monkey",
  description: "Data-driven strategies, proven systems, and premium tools to scale your eCommerce brand to 7 figures and beyond. Follow the Monkey - he knows the path to success.",
  keywords: ["ecommerce", "shopify", "dropshipping", "LTV", "conversion rate", "meta ads", "tiktok ads", "quantum scale"],
  authors: [{ name: "Quantum Scale" }],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Inter font for all text */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-white text-[var(--text-secondary)]">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
