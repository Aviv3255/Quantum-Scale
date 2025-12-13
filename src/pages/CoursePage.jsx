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
  ChevronRight,
} from "lucide-react";

// Icon mapping for modules
const iconMap = {
  video: Video,
  file: FileText,
  download: Download,
  play: Play,
  book: BookOpen,
};

// Sample course data - this would come from props or API
const sampleCourseData = {
  slug: "email-marketing-course",
  title: "Turn Email Marketing Into a Revenue Engine",
  description:
    "Learn how to build automated email flows that convert subscribers into loyal customers. Master the strategies that generate $1,000+ per customer.",
  badge: "BEST SELLER",
  price: 47,
  originalPrice: 500,
  image: "/courses/email-marketing-thumb.jpg",
  stats: [
    { value: "7", label: "Templates" },
    { value: "2.5h", label: "Content" },
    { value: "156", label: "Students" },
  ],
  modules: [
    {
      icon: "video",
      title: "Introduction to Email Revenue",
      duration: "12 min",
      description: "Understanding the email marketing landscape",
    },
    {
      icon: "video",
      title: "Building Your Email List",
      duration: "18 min",
      description: "Proven strategies to grow subscribers fast",
    },
    {
      icon: "file",
      title: "Email Templates Pack",
      duration: "7 files",
      description: "Ready-to-use email templates",
    },
    {
      icon: "video",
      title: "Automated Flow Setup",
      duration: "25 min",
      description: "Set up your welcome and abandoned cart flows",
    },
    {
      icon: "video",
      title: "Segmentation Strategies",
      duration: "20 min",
      description: "Target the right customers at the right time",
    },
    {
      icon: "download",
      title: "Swipe File Collection",
      duration: "15 files",
      description: "High-converting email examples",
    },
  ],
  reviews: [
    {
      name: "Sarah M.",
      avatar: null,
      text: "This course completely transformed how I approach email marketing. My open rates went from 15% to 45% in just two weeks!",
      rating: 5,
    },
    {
      name: "James K.",
      avatar: null,
      text: "The templates alone are worth 10x the price. I've made back my investment within the first month.",
      rating: 5,
    },
    {
      name: "Emily R.",
      avatar: null,
      text: "Finally, a course that doesn't waste time. Everything is actionable and easy to implement.",
      rating: 5,
    },
  ],
  faq: [
    {
      question: "What's included in this course?",
      answer:
        "You get lifetime access to all video lessons, downloadable templates, swipe files, and any future updates we add to the course.",
    },
    {
      question: "Is this suitable for beginners?",
      answer:
        "Absolutely! We start from the basics and build up. Whether you're just starting out or looking to improve your existing email strategy, this course has something for you.",
    },
    {
      question: "How long do I have access?",
      answer:
        "You get lifetime access. Once you purchase, the course is yours forever including all future updates.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, just reach out and we'll refund your purchase.",
    },
  ],
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

export default function CoursePage({ courseData = sampleCourseData }) {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState("modules");

  // In a real app, you'd fetch course data based on slug
  const course = courseData;

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
              className="w-full md:w-[35%] flex items-center justify-center p-8"
              style={{
                background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                minHeight: "280px",
              }}
            >
              {course.image ? (
                <img
                  src={course.image}
                  alt={course.title}
                  className="max-w-full max-h-48 object-contain rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-32 h-40 bg-white/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white/40" />
                </div>
              )}
            </div>

            {/* Right - Product Info */}
            <div className="w-full md:w-[65%] p-8 md:p-10">
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
                    {index === 0 && <FileText className="w-4 h-4" style={{ color: "#22c55e" }} />}
                    {index === 1 && <Clock className="w-4 h-4" style={{ color: "#22c55e" }} />}
                    {index === 2 && <Users className="w-4 h-4" style={{ color: "#22c55e" }} />}
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
                    // Handle purchase flow
                    console.log("Purchase clicked");
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
                            className="text-xs mb-1 line-clamp-1"
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
