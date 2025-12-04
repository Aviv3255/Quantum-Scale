import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Genrok | Scale Your eCommerce Brand",
  description: "Data-driven strategies, proven systems, and premium tools to scale your eCommerce brand to 7 figures and beyond.",
  keywords: ["ecommerce", "shopify", "dropshipping", "LTV", "conversion rate", "meta ads", "tiktok ads"],
  authors: [{ name: "Genrok" }],
  openGraph: {
    title: "Genrok | Scale Your eCommerce Brand",
    description: "Data-driven strategies, proven systems, and premium tools to scale your eCommerce brand to 7 figures and beyond.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Genrok | Scale Your eCommerce Brand",
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
      <body
        className="font-sans antialiased bg-white text-gray-900"
      >
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
