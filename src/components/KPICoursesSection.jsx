import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function KPICoursesSection({ failingKpis }) {
  if (!failingKpis || failingKpis.length === 0) return null;

  const coursesData = [
    {
      id: 1,
      title: 'The Subconscious Trap',
      subtitle: "The 24-hour framework that turns 'nice websites' into subconscious sales machines.",
      image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_41.jpg?v=1757233340',
      link: 'https://quantum-scale.co/products/the-subconscious-switch',
      badge: 'Higher Conversion Rate',
      forKpi: 'cr'
    },
    {
      id: 2,
      title: 'The Social Proof',
      subtitle: 'The Billion-Dollar Social Proof Tactic That Turns Buyers into Zombies Who Buy Without Thinking.',
      image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_43.jpg?v=1757233352',
      link: 'https://quantum-scale.co/products/the-social-proof',
      badge: 'Higher Conversion Rate',
      forKpi: 'cr'
    },
    {
      id: 3,
      title: 'Product Mapping Manipulation',
      subtitle: "The Billion Dollar tactic you simply can't succeed without",
      image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_44.jpg?v=1757233375',
      link: 'https://quantum-scale.co/products/test',
      badge: 'Higher Conversion Rate',
      forKpi: 'cr'
    },
    {
      id: 4,
      title: 'The Automatic System',
      subtitle: "Rocket your Customer's LTV to $1,000 with A Copy & Paste System, make the Scale 10X easier, and bigger.",
      image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_58_efa8c3cd-aa72-4542-a933-0f433d8c01a1.jpg?v=1757325732',
      link: 'https://quantum-scale.co/products/the-automatic-system-that-earn-1-000-per-customer',
      badge: 'Higher LTV',
      forKpi: 'ltv'
    },
    {
      id: 5,
      title: 'Email Marketing',
      subtitle: 'Advanced Tactics That Shatter Sales Records - Straight from the billion-dollar playbook',
      image: 'https://cdn.shopify.com/s/files/1/0682/3202/0061/files/LaserCRO-Coursemockups_40.jpg?v=1757233368',
      link: 'https://quantum-scale.co/products/email-marketing',
      badge: 'Higher LTV',
      forKpi: 'ltv'
    }
  ];

  const hasConversionIssue = failingKpis.some(kpi => kpi.name.toLowerCase().includes('conversion'));
  const hasLtvIssue = failingKpis.some(kpi => kpi.name.toLowerCase().includes('ltv'));

  const relevantCourses = coursesData.filter(course => {
    if (hasConversionIssue && course.forKpi === 'cr') return true;
    if (hasLtvIssue && course.forKpi === 'ltv') return true;
    return false;
  });

  if (relevantCourses.length === 0) return null;

  return (
    <div className="glass-card p-6 mt-6">
      <h3 className="text-xl font-bold text-center mb-6" style={{ color: '#F5F7FA' }}>
        Recommended Courses Based On Your Results
      </h3>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {relevantCourses.map(course => (
          <a
            key={course.id}
            href={course.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
            style={{
              background: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 0 8px rgba(0,125,255,0.2)'
            }}
          >
            <div style={{ aspectRatio: '1000/1200', overflow: 'hidden' }}>
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="p-5">
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold mb-2"
                   style={{ 
                     background: 'rgba(34,197,94,0.1)', 
                     color: '#22c55e',
                     border: '1px solid rgba(34,197,94,0.2)'
                   }}>
                <span>↗</span>
                {course.badge}
              </div>
              
              <h4 className="font-bold text-sm mb-2 uppercase tracking-wide" style={{ color: '#F5F7FA', letterSpacing: '0.5px' }}>
                {course.title}
              </h4>
              
              <p className="text-xs mb-3 leading-relaxed" style={{ color: '#AAB3C5' }}>
                {course.subtitle}
              </p>
              
              <div className="flex items-center justify-between px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                   style={{
                     background: 'rgba(255,255,255,0.05)',
                     color: '#8AC3FF'
                   }}>
                <span>Learn More</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}