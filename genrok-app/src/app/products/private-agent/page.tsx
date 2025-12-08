'use client';

import React, { useState } from 'react';
import { ExternalLink, CheckCircle, Truck, Package, DollarSign, MessageCircle, Globe, Zap, ShoppingBag, CreditCard, Box, TrendingUp, ChevronDown, ArrowRight, LucideIcon } from 'lucide-react';

interface ComparisonRow {
  criterion: string;
  agent: string;
  aliexpress: string;
  icon: LucideIcon;
}

interface Step {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface FAQ {
  q: string;
  a: string;
}

interface Benefit {
  icon: LucideIcon;
  title: string;
  color: string;
}

export default function PrivateAgent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const comparisonData: ComparisonRow[] = [
    { criterion: 'Shipping Time', agent: '5-7 days worldwide', aliexpress: '15-45 days average', icon: Truck },
    { criterion: 'Product Quality', agent: 'Manual inspection before shipping', aliexpress: 'No oversight, potential issues', icon: CheckCircle },
    { criterion: 'Customer Service', agent: 'Personal WhatsApp rep 24/7', aliexpress: 'Limited support', icon: MessageCircle },
    { criterion: 'Package Branding', agent: 'Branded with your logo (optional)', aliexpress: 'Generic Chinese packages', icon: Box },
    { criterion: 'Pricing', agent: 'Usually cheaper', aliexpress: '15-40% more expensive', icon: DollarSign },
    { criterion: 'Inventory', agent: 'Private inventory option', aliexpress: 'No control', icon: Package },
    { criterion: 'Consolidation', agent: 'One package for all items', aliexpress: 'Separate shipments', icon: ShoppingBag },
    { criterion: 'Scalability', agent: '1-50,000 orders/day', aliexpress: 'Collapses under pressure', icon: TrendingUp }
  ];

  const steps: Step[] = [
    { number: 1, title: 'Install the Shopify App', description: 'Connect your store with HyperSKU. All orders sync automatically.', icon: ShoppingBag },
    { number: 2, title: 'Orders Sync Automatically', description: 'Every order appears instantly in your dashboard.', icon: Zap },
    { number: 3, title: 'Product Pricing (Real Time)', description: 'Get exact sourcing prices within 2 hours.', icon: DollarSign },
    { number: 4, title: 'Choose Shipping', description: 'Select delivery method with full tracking.', icon: Truck },
    { number: 5, title: 'Complete Payment', description: 'Pay securely via credit card or PayPal.', icon: CreditCard },
    { number: 6, title: 'Fulfillment & Branding', description: 'Items are inspected, branded, and shipped.', icon: Package },
    { number: 7, title: 'Real-Time Tracking', description: 'Monitor every order in real-time.', icon: Globe }
  ];

  const faqs: FAQ[] = [
    { q: 'Does it cost money?', a: 'No. Opening an account is completely free. No subscription fees, no commitment. You only pay for orders placed.' },
    { q: 'How long until I receive shipments?', a: 'In most countries (US, Europe), shipments arrive within 5-7 days typically.' },
    { q: 'How do I communicate with the agent?', a: 'Directly on WhatsApp. After registering, a personal representative will contact you.' },
    { q: 'Can I brand my products?', a: 'Absolutely. Add logo, branded packaging, personal notes, and full customer experience branding.' },
    { q: 'How is it more profitable than AliExpress?', a: 'Cheaper prices, fewer errors, fast shipping, reduced complaints, branding options, everything in one package.' },
    { q: 'Do I have to stop working with AliExpress?', a: "No. You can use both, but most entrepreneurs don't go back after seeing the efficiency." }
  ];

  const benefits: Benefit[] = [
    { icon: Truck, title: 'Shipments in 5-8 days worldwide', color: '#3B82F6' },
    { icon: Package, title: 'Full package branding (optional)', color: '#8B5CF6' },
    { icon: ShoppingBag, title: 'Combine shipments into one package', color: '#06B6D4' },
    { icon: DollarSign, title: 'Lower prices = higher profit', color: '#10B981' },
    { icon: Box, title: 'Private inventory option', color: '#F59E0B' },
    { icon: MessageCircle, title: 'Personal WhatsApp support', color: '#EC4899' }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: '#EFF6FF', border: '1px solid #DBEAFE' }}>
            <Truck className="w-4 h-4" style={{ color: '#3B82F6' }} />
            <span className="text-sm font-semibold" style={{ color: '#3B82F6' }}>PREMIUM FULFILLMENT</span>
          </div>
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#1E1E1E', fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.02em' }}>Your Personal Fulfillment Partner</h1>
          <p className="text-xl mb-3" style={{ color: '#6B7280', maxWidth: '800px', margin: '0 auto 12px' }}>Premium fulfillment partner with 5-7 day delivery to USA</p>
          <p className="text-lg mb-10" style={{ color: '#6B7280', maxWidth: '900px', margin: '0 auto 40px' }}>Partnership with China's largest logistics company, working exclusively with dropshippers. From 1 order/month to 50,000 orders/day.</p>
          <a href="https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', color: '#FFFFFF', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)' }}>
            Connect Your Agent <ExternalLink className="w-5 h-5" />
          </a>
          <p className="mt-4 text-sm" style={{ color: '#6B7280' }}>Register through our link and receive personal WhatsApp support</p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${benefit.color}15`, border: `1px solid ${benefit.color}30` }}>
                  <benefit.icon className="w-6 h-6" style={{ color: benefit.color }} />
                </div>
                <h3 className="font-semibold" style={{ color: '#1E1E1E' }}>{benefit.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="p-8 rounded-2xl mb-16" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#1E1E1E', fontFamily: 'Poppins, sans-serif' }}>Private Agent vs AliExpress</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                  <th className="text-left p-4 font-bold" style={{ color: '#6B7280' }}>Criterion</th>
                  <th className="text-left p-4 font-bold" style={{ color: '#10B981' }}>Private Agent</th>
                  <th className="text-left p-4 font-bold" style={{ color: '#EF4444' }}>AliExpress</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                          <row.icon className="w-5 h-5" style={{ color: '#3B82F6' }} />
                        </div>
                        <span style={{ color: '#1E1E1E', fontWeight: 600 }}>{row.criterion}</span>
                      </div>
                    </td>
                    <td className="p-4" style={{ color: '#10B981', fontWeight: 500 }}>{row.agent}</td>
                    <td className="p-4" style={{ color: '#6B7280' }}>{row.aliexpress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How It Works Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#1E1E1E', fontFamily: 'Poppins, sans-serif' }}>How the System Works</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-0.5" style={{ background: '#E5E7EB' }} />
            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div key={idx} className="ml-20 p-6 rounded-xl relative" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
                  <div className="absolute -left-[72px] top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg" style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: '#FFFFFF', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)', border: '4px solid #F9FAFB' }}>{step.number}</div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                      <step.icon className="w-6 h-6" style={{ color: '#3B82F6' }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2" style={{ color: '#1E1E1E' }}>{step.title}</h3>
                      <p style={{ color: '#6B7280' }}>{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="p-8 rounded-2xl mb-12" style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#1E1E1E', fontFamily: 'Poppins, sans-serif' }}>Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden transition-all" style={{ background: openFaq === idx ? '#EFF6FF' : '#F9FAFB', border: '1px solid ' + (openFaq === idx ? '#3B82F6' : '#E5E7EB') }}>
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full p-5 flex items-center justify-between text-left">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#EFF6FF', border: '1px solid #DBEAFE' }}>
                      <CheckCircle className="w-5 h-5" style={{ color: '#3B82F6' }} />
                    </div>
                    <h3 className="font-bold" style={{ color: '#1E1E1E' }}>{faq.q}</h3>
                  </div>
                  <ChevronDown className="w-6 h-6 transition-transform" style={{ color: '#3B82F6', transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>
                {openFaq === idx && <div className="px-5 pb-5 pt-0"><p className="pl-11" style={{ color: '#6B7280' }}>{faq.a}</p></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <a href="https://www.hypersku.com/campaign/optimize-dropshipping/?ref=nmmwogq" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 text-xl font-bold rounded-xl transition-all hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', color: '#FFFFFF', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)' }}>
            Connect Your Agent Now <ExternalLink className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}
