'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  Copy,
  Check,
  ChevronDown,
  Monitor,
  Smartphone,
  ExternalLink,
  Zap,
  TrendingUp,
  Clock,
  Users,
  Settings,
  CreditCard,
  MessageCircle,
  Gift,
  Save,
  Info,
  Key,
  Upload,
  Loader2,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { emailTemplates, templateCategories, type EmailTemplate } from '@/data/email-templates';

// Default logo (Quantum Scale)
const DEFAULT_LOGO_URL = 'https://pqvvrljykfvhpyvxmwzb.supabase.co/storage/v1/object/public/images/Quantum%20Scale%20logo%20(12).jpg';

// LocalStorage keys
const BRAND_SETTINGS_KEY = 'quantum-scale-email-brand-settings';
const KLAVIYO_API_KEY_STORAGE = 'quantum-scale-klaviyo-api-key';

interface BrandSettings {
  brandName: string;
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  websiteUrl: string;
  supportEmail: string;
}

// Partner tools data with affiliate links
const partnerTools = [
  {
    id: 'klaviyo',
    name: 'Klaviyo',
    type: 'Email Marketing',
    description: 'The #1 email platform for eCommerce',
    url: 'https://www.klaviyo.com/partner/signup?utm_source=001Nu00000NY5EeIAL&utm_medium=partner',
    recommended: true,
  },
  {
    id: 'txtcart',
    name: 'TxtCart',
    type: 'SMS Marketing',
    description: 'AI-powered SMS cart recovery',
    url: 'https://txtcartapp.com/affiliate/?mref=lsbqcbva',
    recommended: false,
  },
  {
    id: 'quizkit',
    name: 'Quiz Kit',
    type: 'Lead Capture',
    description: 'Product recommendation quizzes',
    url: 'https://apps.shopify.com/quiz-kit?mref=nasigsuy-4902',
    recommended: false,
  },
  {
    id: 'joy',
    name: 'Joy Loyalty',
    type: 'Retention',
    description: 'Points & rewards program',
    url: 'https://partners.avada.io/i/a/LG19U',
    recommended: false,
  },
];

// TxtCart setup steps
const txtCartSteps = [
  {
    step: 1,
    title: 'Install & Connect to Shopify',
    description: 'Install TxtCart app from Shopify App Store. Free with 14-day trial. Connect to your store and get free toll-free numbers.',
    icon: Settings,
  },
  {
    step: 2,
    title: 'Account & Business Details',
    description: 'Go to Settings → Account. Enter your business name, type, email, and phone number.',
    icon: Users,
  },
  {
    step: 3,
    title: 'Company Settings',
    description: 'Enter your store policies (shipping, returns). Select AI persona (Chris or Lindsay) who introduces as support agent.',
    icon: MessageCircle,
  },
  {
    step: 4,
    title: 'Sending Settings',
    description: 'Get free phone numbers for UK, US, AUS, Canada. Set Quiet Hours (9pm-8am default). Enable Texting Status.',
    icon: Clock,
  },
  {
    step: 5,
    title: 'Discount Settings (Critical!)',
    description: 'Create 3 discount codes: 5%, 10%, 15%. AI decides which to offer based on customer behavior. Use "Amount off order" type.',
    icon: CreditCard,
  },
];

// SMS stats
const smsStats = [
  { label: 'SMS Open Rate', value: '98%', comparison: 'vs 20-28% email' },
  { label: 'Opened Within', value: '3 min', comparison: '90% of messages' },
  { label: 'Average ROI', value: '15X', comparison: 'on SMS spend' },
  { label: 'Cart Recovery', value: '70-75%', comparison: 'recovery rate' },
];

// Klaviyo placeholder info
const klaviyoPlaceholders = {
  firstName: '{{ first_name|default:"there" }}',
  lastName: '{{ last_name }}',
  email: '{{ email }}',
  fullName: '{{ person.full_name }}',
  checkoutUrl: '{{ event.extra.checkout_url }}',
  cartItems: '{{ event.shopping_cart_items }}',
  productName: '{{ event.item.name }}',
  productPrice: '{% currency_format event.item.price %}',
  orderValue: '{% currency_format event|lookup:"$value" %}',
  unsubscribe: '{% unsubscribe %}',
  webView: '{% web_view %}',
  organizationName: '{{ organization.name }}',
  organizationUrl: '{{ organization.url }}',
};

export default function EmailSmsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();

  // State
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate>(emailTemplates[0]);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'email' | 'sms'>('email');
  const [categoryOpen, setCategoryOpen] = useState<string | null>('abandoned-cart');
  const [brandSettingsSaved, setBrandSettingsSaved] = useState(false);
  const [brandSettingsOpen, setBrandSettingsOpen] = useState(false);

  // Klaviyo integration state
  const [klaviyoApiKey, setKlaviyoApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isPushingToKlaviyo, setIsPushingToKlaviyo] = useState(false);
  const [klaviyoResult, setKlaviyoResult] = useState<{
    success: boolean;
    message: string;
    templateId?: string;
  } | null>(null);

  // Brand settings (saved to localStorage)
  const [brandSettings, setBrandSettings] = useState<BrandSettings>({
    brandName: 'Your Brand',
    logoUrl: DEFAULT_LOGO_URL,
    primaryColor: '#000000',
    accentColor: '#B8860B',
    websiteUrl: 'https://yourstore.com',
    supportEmail: 'support@yourstore.com',
  });

  // User edits to fields (overrides defaults) - per template
  const [userEdits, setUserEdits] = useState<Record<string, Record<string, string>>>({});

  // Load brand settings and Klaviyo API key from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(BRAND_SETTINGS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBrandSettings(parsed);
      } catch (e) {
        console.error('Failed to load brand settings:', e);
      }
    }

    // Load Klaviyo API key
    const savedApiKey = localStorage.getItem(KLAVIYO_API_KEY_STORAGE);
    if (savedApiKey) {
      setKlaviyoApiKey(savedApiKey);
    }
  }, []);

  // Save brand settings to localStorage
  const saveBrandSettings = () => {
    localStorage.setItem(BRAND_SETTINGS_KEY, JSON.stringify(brandSettings));
    setBrandSettingsSaved(true);
    setTimeout(() => setBrandSettingsSaved(false), 2000);
  };

  // Compute field values by merging brand settings + template defaults + user edits
  const fieldValues = useMemo(() => {
    const values: Record<string, string> = {};
    const templateEdits = userEdits[selectedTemplate.id] || {};

    // Start with brand settings
    values['brand_name'] = brandSettings.brandName;
    values['logo_url'] = brandSettings.logoUrl;
    values['primary_color'] = brandSettings.primaryColor;
    values['accent_color'] = brandSettings.accentColor;
    values['cta_url'] = brandSettings.websiteUrl;
    values['support_email'] = brandSettings.supportEmail;

    // Then apply template defaults and user edits
    selectedTemplate.fields.forEach((field) => {
      if (!['brand_name', 'logo_url', 'primary_color', 'accent_color'].includes(field.key)) {
        values[field.key] = templateEdits[field.key] ?? field.defaultValue;
      } else if (templateEdits[field.key]) {
        // Allow per-template overrides of brand settings
        values[field.key] = templateEdits[field.key];
      }
    });

    return values;
  }, [selectedTemplate, userEdits, brandSettings]);

  // Update a field value
  const updateFieldValue = (key: string, value: string) => {
    setUserEdits((prev) => ({
      ...prev,
      [selectedTemplate.id]: {
        ...(prev[selectedTemplate.id] || {}),
        [key]: value,
      },
    }));
  };

  // Generate HTML with replaced values
  const generatedHtml = useMemo(() => {
    let html = selectedTemplate.html;
    Object.entries(fieldValues).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      html = html.replace(regex, value);
    });
    // Also replace subject_line
    html = html.replace(/\{\{subject_line\}\}/g, selectedTemplate.subjectLine);
    return html;
  }, [selectedTemplate, fieldValues]);

  // Copy HTML to clipboard
  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(generatedHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Save Klaviyo API key to localStorage
  const saveKlaviyoApiKey = (key: string) => {
    setKlaviyoApiKey(key);
    if (key) {
      localStorage.setItem(KLAVIYO_API_KEY_STORAGE, key);
    } else {
      localStorage.removeItem(KLAVIYO_API_KEY_STORAGE);
    }
  };

  // Push template to Klaviyo
  const pushToKlaviyo = async () => {
    if (!klaviyoApiKey) {
      setKlaviyoResult({
        success: false,
        message: 'Please enter your Klaviyo API key first',
      });
      return;
    }

    setIsPushingToKlaviyo(true);
    setKlaviyoResult(null);

    try {
      const templateName = `${selectedTemplate.name} - ${brandSettings.brandName} - ${new Date().toLocaleDateString()}`;

      const response = await fetch('/api/klaviyo/push-template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: klaviyoApiKey,
          templateName,
          html: generatedHtml,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setKlaviyoResult({
          success: true,
          message: 'Template added to Klaviyo!',
          templateId: data.klaviyoTemplateId,
        });
      } else {
        setKlaviyoResult({
          success: false,
          message: data.error || 'Failed to add template to Klaviyo',
        });
      }
    } catch (err) {
      setKlaviyoResult({
        success: false,
        message: err instanceof Error ? err.message : 'Network error occurred',
      });
    } finally {
      setIsPushingToKlaviyo(false);
      // Clear result after 5 seconds
      setTimeout(() => setKlaviyoResult(null), 5000);
    }
  };

  // Auth check - disabled for local dev
  // useEffect(() => {
  //   if (!authLoading && !user) {
  //     router.push('/login');
  //   }
  // }, [user, authLoading, router]);

  // if (authLoading || !user) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-white">
  //       <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
  //     </div>
  //   );
  // }

  return (
    <DashboardLayout>
      <div className="page-wrapper">
        {/* Page Header */}
        <header className="page-header">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1>SMS & Email Marketing</h1>
              <p>World-class email templates. Copy HTML directly into Klaviyo.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)]">
              <Mail size={16} className="text-[var(--text-primary)]" strokeWidth={1.5} />
              <span className="text-sm font-medium text-[var(--text-primary)]">{emailTemplates.length} Templates</span>
            </div>
          </div>
        </header>

        {/* Partner Tools Bar */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {partnerTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-4 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)]">{tool.name}</h3>
                    <p className="text-xs text-[var(--text-muted)]">{tool.type}</p>
                  </div>
                  {tool.recommended && (
                    <span className="badge badge-gold text-xs">Recommended</span>
                  )}
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-3">{tool.description}</p>
                <span className="text-sm font-medium text-[var(--accent-gold)] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Install <ExternalLink size={14} />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Tab Switcher - Black background with lime green text for selected */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('email')}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'email'
                ? 'bg-[#000000] text-[#a3e635]'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
            }`}
          >
            <Mail size={18} className={activeTab === 'email' ? 'text-[#a3e635]' : ''} />
            Email Builder
          </button>
          <button
            onClick={() => setActiveTab('sms')}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeTab === 'sms'
                ? 'bg-[#000000] text-[#a3e635]'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
            }`}
          >
            <MessageSquare size={18} className={activeTab === 'sms' ? 'text-[#a3e635]' : ''} />
            SMS Setup Guide
          </button>
        </div>

        {/* Email Builder Tab */}
        {activeTab === 'email' && (
          <div className="space-y-6">
            {/* Brand Settings Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setBrandSettingsOpen(!brandSettingsOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] border border-[var(--border-light)] transition-colors text-sm font-medium text-[var(--text-secondary)]"
              >
                <Settings size={16} />
                Brand Settings
                <ChevronDown
                  size={16}
                  className={`transition-transform ${brandSettingsOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {/* Brand Settings Panel (hidden by default) */}
            {brandSettingsOpen && (
              <div className="card p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Left Column - Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        value={brandSettings.brandName}
                        onChange={(e) => setBrandSettings({ ...brandSettings, brandName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-light)] bg-white text-sm"
                        placeholder="e.g., Acme Store"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                        Website URL
                      </label>
                      <input
                        type="url"
                        value={brandSettings.websiteUrl}
                        onChange={(e) => setBrandSettings({ ...brandSettings, websiteUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-light)] bg-white text-sm"
                        placeholder="https://yourstore.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                        Support Email
                      </label>
                      <input
                        type="email"
                        value={brandSettings.supportEmail}
                        onChange={(e) => setBrandSettings({ ...brandSettings, supportEmail: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-light)] bg-white text-sm"
                        placeholder="support@yourstore.com"
                      />
                    </div>
                  </div>

                  {/* Middle Column - Logo */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                        Logo URL
                        <span className="text-[var(--accent-gold)] ml-1">(Recommended: 1000x300 wide)</span>
                      </label>
                      <input
                        type="url"
                        value={brandSettings.logoUrl}
                        onChange={(e) => setBrandSettings({ ...brandSettings, logoUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border-light)] bg-white text-sm"
                        placeholder="https://your-logo-url.com/logo.png"
                      />
                    </div>
                    {brandSettings.logoUrl && (
                      <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-light)]">
                        <p className="text-xs text-[var(--text-muted)] mb-2">Preview:</p>
                        <img
                          src={brandSettings.logoUrl}
                          alt="Logo preview"
                          className="max-h-16 w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = DEFAULT_LOGO_URL;
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Right Column - Colors */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                        Primary Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={brandSettings.primaryColor}
                          onChange={(e) => setBrandSettings({ ...brandSettings, primaryColor: e.target.value })}
                          className="w-10 h-10 rounded cursor-pointer border border-[var(--border-light)]"
                        />
                        <input
                          type="text"
                          value={brandSettings.primaryColor}
                          onChange={(e) => setBrandSettings({ ...brandSettings, primaryColor: e.target.value })}
                          className="flex-1 px-3 py-2 rounded-lg border border-[var(--border-light)] bg-white text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                        Accent Color (Buttons)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={brandSettings.accentColor}
                          onChange={(e) => setBrandSettings({ ...brandSettings, accentColor: e.target.value })}
                          className="w-10 h-10 rounded cursor-pointer border border-[var(--border-light)]"
                        />
                        <input
                          type="text"
                          value={brandSettings.accentColor}
                          onChange={(e) => setBrandSettings({ ...brandSettings, accentColor: e.target.value })}
                          className="flex-1 px-3 py-2 rounded-lg border border-[var(--border-light)] bg-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Klaviyo API Integration */}
                <div className="mt-6 pt-4 border-t border-[var(--border-light)]">
                  <div className="flex items-center gap-2 mb-4">
                    <Key size={16} className="text-[var(--accent-gold)]" />
                    <h3 className="font-semibold text-[var(--text-primary)]">Klaviyo Integration</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                        Private API Key
                        <span className="text-[var(--accent-gold)] ml-1">(Required for one-click push)</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type={showApiKey ? 'text' : 'password'}
                            value={klaviyoApiKey}
                            onChange={(e) => saveKlaviyoApiKey(e.target.value)}
                            className="w-full px-3 py-2 pr-10 rounded-lg border border-[var(--border-light)] bg-white text-sm font-mono"
                            placeholder="pk_xxxxxxxxxxxxxxxxxxxxx"
                          />
                          <button
                            type="button"
                            onClick={() => setShowApiKey(!showApiKey)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                          >
                            {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] mt-2">
                        Find your API key in Klaviyo → Settings → API Keys → Create Private API Key
                      </p>
                    </div>
                    <div className="flex items-end">
                      <div className="p-4 bg-[var(--bg-secondary)] rounded-lg flex-1">
                        <p className="text-xs text-[var(--text-secondary)]">
                          <span className="font-medium">Tip:</span> Create a Private API Key with <span className="font-mono bg-white px-1 rounded">templates:write</span> scope for one-click template push.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-6 pt-4 border-t border-[var(--border-light)] flex items-center justify-between">
                  <p className="text-xs text-[var(--text-muted)]">
                    Brand settings are saved to your browser and will persist across sessions.
                  </p>
                  <button
                    onClick={saveBrandSettings}
                    className="btn btn-primary flex items-center gap-2"
                  >
                    {brandSettingsSaved ? <Check size={16} /> : <Save size={16} />}
                    {brandSettingsSaved ? 'Saved!' : 'Save Brand Settings'}
                  </button>
                </div>
              </div>
            )}

            {/* Main Builder Area */}
            <div className="grid lg:grid-cols-[340px_1fr] gap-6">
              {/* Left Panel - Template Selection & Email Content */}
              <div className="card p-0 overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-[var(--border-light)] bg-[var(--bg-secondary)]">
                  <h2 className="font-semibold text-[var(--text-primary)]">Email Templates</h2>
                </div>

                <div className="p-4 space-y-6 max-h-[calc(100vh-400px)] overflow-y-auto">
                  {/* Template Selector */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Select Template
                  </label>
                  <div className="space-y-2">
                    {templateCategories.map((category) => (
                      <div key={category.id} className="border border-[var(--border-light)] rounded-lg overflow-hidden">
                        <button
                          onClick={() => setCategoryOpen(categoryOpen === category.id ? null : category.id)}
                          className="w-full px-4 py-3 flex items-center justify-between bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] transition-colors"
                        >
                          <span className="font-medium text-[var(--text-primary)]">
                            {category.name} ({category.count})
                          </span>
                          <ChevronDown
                            size={16}
                            className={`text-[var(--text-muted)] transition-transform ${
                              categoryOpen === category.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {categoryOpen === category.id && (
                          <div className="border-t border-[var(--border-light)]">
                            {emailTemplates
                              .filter((t) => t.category === category.id)
                              .map((template) => (
                                <button
                                  key={template.id}
                                  onClick={() => setSelectedTemplate(template)}
                                  className={`w-full px-4 py-3 text-left hover:bg-[var(--bg-secondary)] transition-colors border-b border-[var(--border-light)] last:border-b-0 ${
                                    selectedTemplate.id === template.id
                                      ? 'bg-[var(--accent-gold)]/10 border-l-2 border-l-[var(--accent-gold)]'
                                      : ''
                                  }`}
                                >
                                  <p className="font-medium text-sm text-[var(--text-primary)]">{template.name}</p>
                                  <p className="text-xs text-[var(--text-muted)]">{template.timing}</p>
                                </button>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Template Info */}
                <div className="p-3 bg-[var(--bg-secondary)] rounded-lg">
                  <p className="text-xs text-[var(--text-muted)] mb-1">Subject Line</p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{selectedTemplate.subjectLine}</p>
                </div>

                {/* Content Settings - Per template */}
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                    <Mail size={14} />
                    Email Content
                  </h3>
                  <div className="space-y-3">
                    {selectedTemplate.fields
                      .filter((f) => !['brand_name', 'logo_url', 'primary_color', 'accent_color'].includes(f.key))
                      .map((field) => (
                        <div key={field.key}>
                          <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">
                            {field.label}
                          </label>
                          <input
                            type={field.type === 'number' ? 'number' : 'text'}
                            value={fieldValues[field.key] || field.defaultValue}
                            onChange={(e) => updateFieldValue(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full px-3 py-2 rounded-lg border border-[var(--border-light)] bg-white text-sm"
                          />
                        </div>
                      ))}
                  </div>
                </div>

                {/* Klaviyo Placeholders Info */}
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Info size={14} />
                    Klaviyo Personalization Tags
                  </h4>
                  <p className="text-xs text-blue-700 mb-3">
                    Use these in your Klaviyo flows for dynamic personalization:
                  </p>
                  <div className="space-y-1 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-blue-600">First Name:</span>
                      <span className="text-blue-900">{klaviyoPlaceholders.firstName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Checkout URL:</span>
                      <span className="text-blue-900 text-right">{klaviyoPlaceholders.checkoutUrl}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Unsubscribe:</span>
                      <span className="text-blue-900">{klaviyoPlaceholders.unsubscribe}</span>
                    </div>
                  </div>
                </div>

                {/* Partner CTA */}
                <a
                  href="https://www.klaviyo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-4 bg-[var(--accent-gold)] text-white rounded-lg font-medium text-center hover:opacity-90 transition-opacity"
                >
                  Set up in Klaviyo
                </a>
              </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="card p-0 overflow-hidden">
              {/* Preview Header */}
              <div className="p-4 border-b border-[var(--border-light)] bg-[var(--bg-secondary)] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="font-semibold text-[var(--text-primary)]">Live Preview</h2>
                  <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-[var(--border-light)]">
                    <button
                      onClick={() => setPreviewMode('desktop')}
                      className={`p-2 rounded ${
                        previewMode === 'desktop'
                          ? 'bg-[var(--primary)] text-white'
                          : 'text-[var(--text-muted)] hover:bg-[var(--bg-secondary)]'
                      }`}
                    >
                      <Monitor size={16} />
                    </button>
                    <button
                      onClick={() => setPreviewMode('mobile')}
                      className={`p-2 rounded ${
                        previewMode === 'mobile'
                          ? 'bg-[var(--primary)] text-white'
                          : 'text-[var(--text-muted)] hover:bg-[var(--bg-secondary)]'
                      }`}
                    >
                      <Smartphone size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyHtml}
                    className="btn btn-secondary flex items-center gap-2"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy HTML'}
                  </button>
                  <button
                    onClick={pushToKlaviyo}
                    disabled={isPushingToKlaviyo}
                    className="btn btn-primary flex items-center gap-2 disabled:opacity-50"
                    title={klaviyoApiKey ? 'Push template to Klaviyo' : 'Set API key in Brand Settings first'}
                  >
                    {isPushingToKlaviyo ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Upload size={16} />
                    )}
                    {isPushingToKlaviyo ? 'Pushing...' : 'Add to Klaviyo'}
                  </button>
                </div>
              </div>

              {/* Klaviyo Result Toast */}
              {klaviyoResult && (
                <div
                  className={`mx-4 mt-2 p-3 rounded-lg flex items-center gap-2 text-sm ${
                    klaviyoResult.success
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {klaviyoResult.success ? (
                    <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
                  )}
                  <span className="flex-1">{klaviyoResult.message}</span>
                  {klaviyoResult.success && (
                    <a
                      href="https://www.klaviyo.com/email-templates"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 underline hover:no-underline flex items-center gap-1"
                    >
                      Open in Klaviyo <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              )}

              {/* Preview Content */}
              <div
                className="p-4 bg-[#f5f5f5] overflow-auto flex justify-center"
              >
                <div
                  className={`transition-all duration-300 ${
                    previewMode === 'mobile' ? 'w-[375px]' : 'w-full max-w-[600px]'
                  }`}
                >
                  <iframe
                    srcDoc={generatedHtml}
                    className="w-full bg-white rounded-lg shadow-lg"
                    style={{ height: '520px', border: 'none' }}
                    title="Email Preview"
                  />
                </div>
              </div>
              </div>
            </div>
          </div>
        )}

        {/* SMS Setup Guide Tab */}
        {activeTab === 'sms' && (
          <div className="space-y-8">
            {/* SMS Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {smsStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card p-6 text-center"
                >
                  <p className="text-3xl font-bold text-[var(--accent-gold)] mb-1">{stat.value}</p>
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-1">{stat.label}</p>
                  <p className="text-xs text-[var(--text-muted)]">{stat.comparison}</p>
                </motion.div>
              ))}
            </div>

            {/* TxtCart Header */}
            <div className="card p-6 bg-gradient-to-r from-[var(--primary)] to-[#333] text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">TxtCart SMS Automation</h2>
                  <p className="text-white/80">
                    AI-powered conversational SMS that recovers 70-75% of abandoned carts
                  </p>
                </div>
                <a
                  href="https://txtcartapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-white text-[var(--primary)] hover:bg-white/90 flex items-center gap-2 whitespace-nowrap"
                >
                  Install TxtCart <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Setup Steps */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
                5-Step Setup Guide
              </h3>
              <div className="space-y-4">
                {txtCartSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent-gold)]/20 flex items-center justify-center flex-shrink-0">
                      <step.icon size={24} className="text-[var(--accent-gold)]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-[var(--accent-gold)]">STEP {step.step}</span>
                      </div>
                      <h4 className="font-semibold text-[var(--text-primary)] mb-1">{step.title}</h4>
                      <p className="text-sm text-[var(--text-secondary)]">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
                How TxtCart AI Works
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-4">
                    <Zap size={32} className="text-[var(--accent-gold)]" />
                  </div>
                  <h4 className="font-semibold text-[var(--text-primary)] mb-2">1. Customer Abandons Cart</h4>
                  <p className="text-sm text-[var(--text-muted)]">
                    Customer leaves without completing purchase
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-4">
                    <MessageCircle size={32} className="text-[var(--accent-gold)]" />
                  </div>
                  <h4 className="font-semibold text-[var(--text-primary)] mb-2">2. AI Sends Personal SMS</h4>
                  <p className="text-sm text-[var(--text-muted)]">
                    AI persona reaches out with helpful, conversational message
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-4">
                    <TrendingUp size={32} className="text-[var(--accent-gold)]" />
                  </div>
                  <h4 className="font-semibold text-[var(--text-primary)] mb-2">3. Offers Smart Discount</h4>
                  <p className="text-sm text-[var(--text-muted)]">
                    AI decides 5%, 10%, or 15% off based on behavior
                  </p>
                </div>
              </div>
            </div>

            {/* Example Conversation */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
                Example AI Conversation
              </h3>
              <div className="max-w-md mx-auto space-y-3">
                {/* AI Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-gold)] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <div className="bg-[var(--bg-secondary)] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[280px]">
                    <p className="text-sm text-[var(--text-secondary)]">
                      Hey! This is Chris from Your Brand. I noticed you left some items in your cart. Need any help completing your order?
                    </p>
                  </div>
                </div>
                {/* Customer Reply */}
                <div className="flex gap-3 justify-end">
                  <div className="bg-[var(--primary)] text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[280px]">
                    <p className="text-sm">
                      Hi! Yeah I was going to buy but shipping seemed expensive
                    </p>
                  </div>
                </div>
                {/* AI Response */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-gold)] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <div className="bg-[var(--bg-secondary)] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[280px]">
                    <p className="text-sm text-[var(--text-secondary)]">
                      I totally get it! Let me see what I can do... I just applied a special 10% discount to cover shipping. Here&apos;s your cart: [link]
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-[var(--text-muted)] mt-6">
                The AI adapts to each customer conversation in real-time
              </p>
            </div>

            {/* Partner Integration */}
            <div className="card p-6 bg-[var(--bg-secondary)]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                    <Gift size={24} className="text-[var(--accent-gold)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)]">Ready to boost your cart recovery?</h4>
                    <p className="text-sm text-[var(--text-muted)]">Start your 14-day free trial today</p>
                  </div>
                </div>
                <a
                  href="https://txtcartapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex items-center gap-2"
                >
                  Install TxtCart Free <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
