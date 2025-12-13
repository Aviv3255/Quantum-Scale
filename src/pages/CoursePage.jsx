import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Play,
  FileText,
  Download,
  Video,
  Star,
  Clock,
  Users,
  BookOpen,
  Brain,
  Palette,
  Code,
  Layout,
  Type,
  Target,
  ListChecks,
  Gift,
} from "lucide-react";

// Icon mapping for modules
const iconMap = {
  video: Video,
  file: FileText,
  download: Download,
  play: Play,
  book: BookOpen,
  brain: Brain,
  palette: Palette,
  code: Code,
  layout: Layout,
  type: Type,
  target: Target,
  list: ListChecks,
  gift: Gift,
};

// Course data store
export const coursesData = {
  "subconscious-trap": {
    slug: "subconscious-trap",
    title: "The Subconscious Trap",
    description:
      "Learn how to convert 4-6%+ of your eCommerce store visitors using extreme design manipulations that bypass logic and trigger impulse purchases.",
    badge: "FLAGSHIP COURSE",
    price: 29,
    originalPrice: 197,
    image: "https://quantum-scale.co/cdn/shop/files/LaserCRO-Coursemockups_41.jpg?v=1757233340",
    stats: [
      { value: "8", label: "Modules" },
      { value: "70+", label: "Tasks" },
      { value: "$929", label: "in Bonuses" },
    ],
    modules: [
      {
        icon: "brain",
        title: "The Brain, Unlocked",
        duration: "Core Module",
        description: "What triggers the brain to buy and how to activate those triggers on demand",
      },
      {
        icon: "type",
        title: "The Copywriting Secrets",
        duration: "+39% CVR",
        description: "The exact button text that boosted our conversions by 39%",
      },
      {
        icon: "file",
        title: "The Power of Fonts",
        duration: "Typography",
        description: "Which fonts increase trust and perceived brand value",
      },
      {
        icon: "layout",
        title: "Winning Layouts",
        duration: "Data-Backed",
        description: "Page structures that psychologically convert visitors",
      },
      {
        icon: "code",
        title: "Code-Based Conversion Hacks",
        duration: "+21% CVR",
        description: "CSS tweaks that increased our purchase rate by 21%",
      },
      {
        icon: "palette",
        title: "Color Manipulations",
        duration: "Psychology",
        description: "The exact color tactics that knock out the subconscious",
      },
      {
        icon: "target",
        title: "Psychological Positioning",
        duration: "Pricing",
        description: "How to charge double your competitors and still convert at 6%+",
      },
      {
        icon: "list",
        title: "The Subconscious Switch",
        duration: "70+ Steps",
        description: "Step-by-step implementation tasks for your store",
      },
    ],
    bonuses: [
      { title: "The $10,000 AI Photographer", value: 297, description: "Create studio-grade product photos using AI" },
      { title: "Secret Tools Vault", value: 97, description: "Tools that give you a brutal advantage over competitors" },
      { title: "Lifetime Discount Vault", value: 97, description: "Save $40-$60/month on active subscriptions" },
      { title: "The Intelligence Agent", value: 97, description: "AI agent trained to mimic billion-dollar brand tactics" },
      { title: "Einstein on Steroids", value: 97, description: "180 IQ AI brain for strategic business decisions" },
      { title: "Your Personal Conversion Map", value: 147, description: "Guided tracking system to 6%+ conversions" },
      { title: "Secret Newsletter Access", value: 97, description: "Weekly breakdowns from 7-8 figure brands" },
    ],
    reviews: [
      {
        name: "Marcus T.",
        avatar: null,
        text: "Went from 2.1% to 5.8% conversion rate in just 2 weeks. This framework is insane. The psychology behind it actually works.",
        rating: 5,
      },
      {
        name: "Jessica L.",
        avatar: null,
        text: "I was skeptical at first - my site already looked professional. But after implementing the color manipulations, my add-to-cart rate jumped 44%.",
        rating: 5,
      },
      {
        name: "David K.",
        avatar: null,
        text: "The bonuses alone are worth 10x the price. The AI photographer course saved me thousands in product photography.",
        rating: 5,
      },
    ],
    faq: [
      {
        question: "Will this really work if my site already looks professional?",
        answer:
          "Absolutely. 'Looking professional' and 'converting visitors' are two completely different things. Your site might look like a million-dollar brand, but if it's not using psychological triggers, you're leaving massive money on the table. This framework shows you exactly what's missing - the subconscious manipulations that drive purchases.",
      },
      {
        question: "I'm already converting at 3%. Is this still worth it?",
        answer:
          "Let me put it this way: if you're converting 3% now, this framework could take you to 5-6%+. That means nearly DOUBLING your revenue from the exact same traffic. Same ad spend, double the sales.",
      },
      {
        question: "Do I need to know how to code?",
        answer:
          "Not at all. The framework includes simple copy-paste instructions for every element. If you can use Shopify's theme editor, you can implement this. We've made it accessible for complete beginners while keeping it powerful enough for advanced users.",
      },
      {
        question: "Will this work for my specific product/niche?",
        answer:
          "Yes. These are universal psychological principles that work on the human brain - regardless of what you're selling. Whether it's fashion, electronics, home goods, or anything else, the subconscious responds the same way to these triggers.",
      },
      {
        question: "What if I implement everything and it doesn't work?",
        answer:
          "Simple: we refund you 100%. No questions, no hassle. We're that confident because this framework is built on thousands of A/B tests with proven results. But if somehow it doesn't increase your conversions, just let us know and we'll give you every penny back.",
      },
      {
        question: "Why is it only $29?",
        answer:
          "Honest answer? We could easily charge $997+ for this. But we want every serious eCommerce entrepreneur to have access to it - not just the ones with big budgets. The framework itself (plus 7 bonuses worth $929) is available for just $29. One-time payment, lifetime access.",
      },
    ],
  },
};

// Star rating component
function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          )}
        />
      ))}
    </div>
  );
}

// Avatar component for reviews
function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      {initials}
    </div>
  );
}

export default function CoursePage() {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState("modules");

  // Get course data based on slug, default to subconscious-trap
  const course = coursesData[slug] || coursesData["subconscious-trap"];

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="w-full max-w-[900px] mx-auto px-4 py-10">
        {/* Main Card */}
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row">
            {/* Left - Image Area */}
            <div
              className="w-full md:w-[40%] flex items-center justify-center p-6"
              style={{
                background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                minHeight: "320px",
              }}
            >
              {course.image ? (
                <img
                  src={course.image}
                  alt={course.title}
                  className="max-w-full max-h-64 object-contain rounded-lg"
                  style={{
                    filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
                  }}
                />
              ) : (
                <div className="w-32 h-40 bg-white/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white/40" />
                </div>
              )}
            </div>

            {/* Right - Product Info */}
            <div className="w-full md:w-[60%] p-8 md:p-10">
              {/* Badge */}
              {course.badge && (
                <Badge
                  className="mb-4 border-0"
                  style={{
                    backgroundColor: "rgba(34, 197, 94, 0.1)",
                    color: "#22c55e",
                  }}
                >
                  {course.badge}
                </Badge>
              )}

              {/* Title */}
              <h1
                className="text-2xl md:text-3xl font-bold mb-3 leading-tight"
                style={{ color: "#1a1a1a" }}
              >
                {course.title}
              </h1>

              {/* Description */}
              <p className="text-base mb-6 leading-relaxed" style={{ color: "#6b7280" }}>
                {course.description}
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 mb-6">
                {course.stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {index === 0 && <BookOpen className="w-4 h-4" style={{ color: "#22c55e" }} />}
                    {index === 1 && <ListChecks className="w-4 h-4" style={{ color: "#22c55e" }} />}
                    {index === 2 && <Gift className="w-4 h-4" style={{ color: "#22c55e" }} />}
                    <span className="font-semibold" style={{ color: "#1a1a1a" }}>
                      {stat.value}
                    </span>
                    <span style={{ color: "#9ca3af" }}>{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6" />

              {/* Price and CTA */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  {course.originalPrice && (
                    <span
                      className="text-lg line-through"
                      style={{ color: "#9ca3af" }}
                    >
                      ${course.originalPrice}
                    </span>
                  )}
                  <span
                    className="text-3xl font-bold"
                    style={{ color: "#1a1a1a" }}
                  >
                    ${course.price}
                  </span>
                </div>

                <button
                  className="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                  style={{ backgroundColor: "#22c55e" }}
                  onClick={() => {
                    // Handle purchase flow - redirect to external checkout
                    window.open("https://quantum-scale.co/products/the-subconscious-trap", "_blank");
                  }}
                >
                  Get Instant Access
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t border-gray-200">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
                <TabsTrigger
                  value="modules"
                  className={cn(
                    "rounded-none border-b-2 border-transparent px-6 py-4 text-sm font-medium transition-all",
                    "data-[state=active]:border-b-2 data-[state=active]:shadow-none"
                  )}
                  style={{
                    color: activeTab === "modules" ? "#1a1a1a" : "#9ca3af",
                    borderBottomColor: activeTab === "modules" ? "#1a1a1a" : "transparent",
                    backgroundColor: "transparent",
                  }}
                >
                  What's Inside
                </TabsTrigger>
                <TabsTrigger
                  value="bonuses"
                  className={cn(
                    "rounded-none border-b-2 border-transparent px-6 py-4 text-sm font-medium transition-all",
                    "data-[state=active]:border-b-2 data-[state=active]:shadow-none"
                  )}
                  style={{
                    color: activeTab === "bonuses" ? "#1a1a1a" : "#9ca3af",
                    borderBottomColor: activeTab === "bonuses" ? "#1a1a1a" : "transparent",
                    backgroundColor: "transparent",
                  }}
                >
                  Bonuses
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className={cn(
                    "rounded-none border-b-2 border-transparent px-6 py-4 text-sm font-medium transition-all",
                    "data-[state=active]:border-b-2 data-[state=active]:shadow-none"
                  )}
                  style={{
                    color: activeTab === "reviews" ? "#1a1a1a" : "#9ca3af",
                    borderBottomColor: activeTab === "reviews" ? "#1a1a1a" : "transparent",
                    backgroundColor: "transparent",
                  }}
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="faq"
                  className={cn(
                    "rounded-none border-b-2 border-transparent px-6 py-4 text-sm font-medium transition-all",
                    "data-[state=active]:border-b-2 data-[state=active]:shadow-none"
                  )}
                  style={{
                    color: activeTab === "faq" ? "#1a1a1a" : "#9ca3af",
                    borderBottomColor: activeTab === "faq" ? "#1a1a1a" : "transparent",
                    backgroundColor: "transparent",
                  }}
                >
                  FAQ
                </TabsTrigger>
              </TabsList>

              {/* What's Inside Tab */}
              <TabsContent value="modules" className="mt-0 p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.modules.map((module, index) => {
                    const Icon = iconMap[module.icon] || FileText;
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-gray-50"
                        style={{ border: "1px solid #e5e7eb" }}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                        >
                          <Icon className="w-5 h-5" style={{ color: "#22c55e" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4
                            className="font-semibold text-sm mb-1"
                            style={{ color: "#1a1a1a" }}
                          >
                            {module.title}
                          </h4>
                          <p
                            className="text-xs mb-1 line-clamp-2"
                            style={{ color: "#6b7280" }}
                          >
                            {module.description}
                          </p>
                          <span
                            className="text-xs font-medium"
                            style={{ color: "#22c55e" }}
                          >
                            {module.duration}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Bonuses Tab */}
              <TabsContent value="bonuses" className="mt-0 p-6 md:p-8">
                <div className="space-y-3">
                  {course.bonuses?.map((bonus, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl"
                      style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "#1a1a1a" }}
                      >
                        <Gift className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm" style={{ color: "#1a1a1a" }}>
                            {bonus.title}
                          </h4>
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#22c55e" }}
                          >
                            ${bonus.value} value
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: "#6b7280" }}>
                          {bonus.description}
                        </p>
                      </div>
                      <div
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: "#22c55e", color: "white" }}
                      >
                        FREE
                      </div>
                    </div>
                  ))}
                  <div
                    className="mt-4 p-4 rounded-xl text-center"
                    style={{ backgroundColor: "#1a1a1a" }}
                  >
                    <p className="text-sm text-white">
                      Total Bonus Value: <span className="font-bold text-lg">${course.bonuses?.reduce((sum, b) => sum + b.value, 0)}</span>
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="mt-0 p-6 md:p-8">
                <div className="space-y-4">
                  {course.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-xl"
                      style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar name={review.name} />
                        <div>
                          <p
                            className="font-semibold text-sm"
                            style={{ color: "#1a1a1a" }}
                          >
                            {review.name}
                          </p>
                          <StarRating rating={review.rating} />
                        </div>
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "#4b5563" }}
                      >
                        "{review.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* FAQ Tab */}
              <TabsContent value="faq" className="mt-0 p-6 md:p-8">
                <Accordion type="single" collapsible className="w-full">
                  {course.faq.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-b border-gray-200"
                    >
                      <AccordionTrigger
                        className="text-left font-semibold hover:no-underline py-4"
                        style={{ color: "#1a1a1a" }}
                      >
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p
                          className="text-sm leading-relaxed pb-2"
                          style={{ color: "#6b7280" }}
                        >
                          {item.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Security Note */}
        <div className="text-center mt-6">
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            🔒 Secure 256-bit SSL encrypted payment
          </p>
        </div>
      </div>
    </div>
  );
}
