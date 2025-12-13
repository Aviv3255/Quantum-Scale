import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight, Gift } from "lucide-react";
import { coursesData } from "./CoursePage";

export default function Courses() {
  const courses = Object.values(coursesData);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="w-full max-w-[1000px] mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "#1a1a1a" }}
          >
            Courses
          </h1>
          <p className="text-base" style={{ color: "#6b7280" }}>
            Premium frameworks to scale your eCommerce business
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {courses.map((course) => (
            <Link
              key={course.slug}
              to={`/coursepage/${course.slug}`}
              className="group block"
            >
              <div
                className="bg-white rounded-2xl overflow-hidden transition-all duration-300 h-full"
                style={{
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  border: "1px solid #e5e7eb",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
                }}
              >
                {/* Image Section */}
                <div
                  className="w-full flex items-center justify-center p-6"
                  style={{
                    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                    minHeight: "200px",
                  }}
                >
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="max-w-full max-h-40 object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                      style={{
                        filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
                      }}
                    />
                  ) : (
                    <div className="w-24 h-32 bg-white/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-white/40" />
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6">
                  {/* Badge */}
                  {course.badge && (
                    <Badge
                      className="mb-3 border-0"
                      style={{
                        backgroundColor: "rgba(34, 197, 94, 0.1)",
                        color: "#22c55e",
                      }}
                    >
                      {course.badge}
                    </Badge>
                  )}

                  {/* Title */}
                  <h2
                    className="text-xl font-bold mb-2"
                    style={{ color: "#1a1a1a" }}
                  >
                    {course.title}
                  </h2>

                  {/* Description */}
                  <p
                    className="text-sm mb-4 line-clamp-2"
                    style={{ color: "#6b7280" }}
                  >
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    {course.stats.slice(0, 3).map((stat, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "#1a1a1a" }}
                        >
                          {stat.value}
                        </span>
                        <span className="text-xs" style={{ color: "#9ca3af" }}>
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bonuses indicator */}
                  {course.bonuses && course.bonuses.length > 0 && (
                    <div
                      className="flex items-center gap-2 mb-4 p-2 rounded-lg"
                      style={{ backgroundColor: "#f9fafb" }}
                    >
                      <Gift className="w-4 h-4" style={{ color: "#22c55e" }} />
                      <span className="text-xs" style={{ color: "#6b7280" }}>
                        Includes {course.bonuses.length} bonuses worth $
                        {course.bonuses.reduce((sum, b) => sum + b.value, 0)}
                      </span>
                    </div>
                  )}

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-baseline gap-2">
                      {course.originalPrice && (
                        <span
                          className="text-sm line-through"
                          style={{ color: "#9ca3af" }}
                        >
                          ${course.originalPrice}
                        </span>
                      )}
                      <span
                        className="text-2xl font-bold"
                        style={{ color: "#1a1a1a" }}
                      >
                        ${course.price}
                      </span>
                    </div>

                    <div
                      className="flex items-center gap-1 text-sm font-semibold transition-all duration-200 group-hover:gap-2"
                      style={{ color: "#22c55e" }}
                    >
                      View Course
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State - for when no courses */}
        {courses.length === 0 && (
          <div className="text-center py-20">
            <BookOpen
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: "#9ca3af" }}
            />
            <h3 className="text-lg font-semibold mb-2" style={{ color: "#1a1a1a" }}>
              No courses available yet
            </h3>
            <p className="text-sm" style={{ color: "#6b7280" }}>
              Check back soon for new learning materials
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
