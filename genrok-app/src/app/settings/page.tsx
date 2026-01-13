'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Tag,
  ShoppingCart,
  DollarSign,
  Clock,
  TrendingUp,
  ExternalLink,
  LogOut,
  Save,
  Edit2,
  X,
  Check,
  Loader2,
  ChevronDown,
  Search,
  Globe,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuthStore } from '@/store/auth';
import { getUserProfile, updateUserProfile, signOut, type UserProfile } from '@/lib/supabase';

// Countries list for dropdown
const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
];

// Options for dropdowns (matching onboarding)
const BUSINESS_TYPES = [
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'dropshipping', label: 'Dropshipping' },
  { value: 'digital_products', label: 'Digital Products' },
  { value: 'saas', label: 'SaaS' },
  { value: 'agency', label: 'Agency / Services' },
  { value: 'affiliate', label: 'Affiliate Marketing' },
  { value: 'content', label: 'Content Creator' },
  { value: 'other', label: 'Other' },
];

const NICHES = [
  { value: "men's fashion", label: "Men's Fashion" },
  { value: "women's fashion", label: "Women's Fashion" },
  { value: 'home decor', label: 'Home Decor' },
  { value: 'gadgets', label: 'Gadgets' },
  { value: 'pets', label: 'Pets' },
  { value: 'kids', label: 'Kids' },
  { value: 'beauty', label: 'Beauty & Health' },
  { value: 'other', label: 'Other' },
];

const PLATFORMS = [
  { value: 'shopify', label: 'Shopify' },
  { value: 'woocommerce', label: 'WooCommerce' },
  { value: 'amazon', label: 'Amazon' },
  { value: 'etsy', label: 'Etsy' },
  { value: 'ebay', label: 'eBay' },
  { value: 'tiktok_shop', label: 'TikTok Shop' },
  { value: 'custom', label: 'Custom Website' },
  { value: 'none', label: "Don't have one yet" },
  { value: 'other', label: 'Other Platform' },
];

const REVENUE_RANGES = [
  { value: '0', label: '$0 - Just getting started' },
  { value: '1-1000', label: '$1 - $1,000' },
  { value: '1000-5000', label: '$1,000 - $5,000' },
  { value: '5000-10000', label: '$5,000 - $10,000' },
  { value: '10000-25000', label: '$10,000 - $25,000' },
  { value: '25000-50000', label: '$25,000 - $50,000' },
  { value: '50000-100000', label: '$50,000 - $100,000' },
  { value: '100000-250000', label: '$100,000 - $250,000' },
  { value: '250000-500000', label: '$250,000 - $500,000' },
  { value: '500000-1000000', label: '$500,000 - $1,000,000' },
  { value: '1000000+', label: '$1,000,000+' },
];

const TIME_IN_FIELD = [
  { value: 'new', label: 'Just starting out' },
  { value: '0-6months', label: 'Less than 6 months' },
  { value: '6-12months', label: '6-12 months' },
  { value: '1-2years', label: '1-2 years' },
  { value: '2-5years', label: '2-5 years' },
  { value: '5+years', label: '5+ years' },
];

const AD_BUDGETS = [
  { value: '0', label: '$0 - Organic only' },
  { value: '1-500', label: '$1 - $500' },
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000-5000', label: '$1,000 - $5,000' },
  { value: '5000-10000', label: '$5,000 - $10,000' },
  { value: '10000-25000', label: '$10,000 - $25,000' },
  { value: '25000-50000', label: '$25,000 - $50,000' },
  { value: '50000+', label: '$50,000+' },
];

// Dropdown component
function Dropdown({
  value,
  options,
  onChange,
  disabled,
  placeholder = 'Select...',
}: {
  value: string | null;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left ${
          disabled
            ? 'bg-[#f5f5f5] border-[#e5e5e5] cursor-not-allowed'
            : 'bg-white border-[#e5e5e5] hover:border-[#ccc]'
        }`}
      >
        <span className={selectedOption ? 'text-[#111]' : 'text-[#888]'}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown size={16} className={`text-[#888] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e5e5e5] rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-[#f5f5f5] transition-colors flex items-center justify-between ${
                  value === option.value ? 'bg-[#f5f5f5] font-medium' : ''
                }`}
              >
                <span>{option.label}</span>
                {value === option.value && <Check size={16} className="text-[var(--primary)]" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Country dropdown component
function CountryDropdown({
  value,
  onChange,
  disabled,
}: {
  value: string | null;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredCountries = useMemo(() => {
    if (!search) return COUNTRIES;
    const lower = search.toLowerCase();
    return COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(lower) || c.code.toLowerCase().includes(lower)
    );
  }, [search]);

  const selectedCountry = COUNTRIES.find((c) => c.code === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left ${
          disabled
            ? 'bg-[#f5f5f5] border-[#e5e5e5] cursor-not-allowed'
            : 'bg-white border-[#e5e5e5] hover:border-[#ccc]'
        }`}
      >
        {selectedCountry ? (
          <span className="flex items-center gap-2">
            <span>{selectedCountry.flag}</span>
            <span>{selectedCountry.name}</span>
          </span>
        ) : (
          <span className="text-[#888]">Select country</span>
        )}
        <ChevronDown size={16} className={`text-[#888] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e5e5e5] rounded-xl shadow-lg z-50 overflow-hidden">
            <div className="p-3 border-b border-[#e5e5e5]">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search countries..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#111]"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    onChange(country.code);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-[#f5f5f5] transition-colors flex items-center justify-between ${
                    value === country.code ? 'bg-[#f5f5f5] font-medium' : ''
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                  </span>
                  {value === country.code && <Check size={16} className="text-[var(--primary)]" />}
                </button>
              ))}
              {filteredCountries.length === 0 && (
                <div className="px-4 py-3 text-[#888] text-center">No countries found</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Setting row component
function SettingRow({
  icon: Icon,
  label,
  value,
  editValue,
  isEditing,
  onEdit,
  type = 'text',
  options,
  placeholder,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null | undefined;
  editValue: string;
  isEditing: boolean;
  onEdit: (value: string) => void;
  type?: 'text' | 'select' | 'country' | 'url';
  options?: { value: string; label: string }[];
  placeholder?: string;
}) {
  const displayValue = useMemo(() => {
    if (!value) return 'Not set';
    if (type === 'select' && options) {
      return options.find((o) => o.value === value)?.label || value;
    }
    if (type === 'country') {
      const country = COUNTRIES.find((c) => c.code === value);
      return country ? `${country.flag} ${country.name}` : value;
    }
    return value;
  }, [value, type, options]);

  return (
    <div className="setting-row">
      <div className="setting-label">
        <Icon size={18} className="text-[#888]" />
        <span>{label}</span>
      </div>
      <div className="setting-value">
        {isEditing ? (
          type === 'select' && options ? (
            <Dropdown value={editValue} options={options} onChange={onEdit} placeholder={placeholder} />
          ) : type === 'country' ? (
            <CountryDropdown value={editValue} onChange={onEdit} />
          ) : (
            <input
              type={type === 'url' ? 'url' : 'text'}
              value={editValue}
              onChange={(e) => onEdit(e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-3 rounded-xl border border-[#e5e5e5] focus:outline-none focus:border-[#111] transition-colors"
            />
          )
        ) : (
          <span className={value ? 'text-[#111]' : 'text-[#888]'}>{displayValue}</span>
        )}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<UserProfile>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) return;
      const { data } = await getUserProfile(user.id);
      if (data) {
        setProfile(data);
        setEditData(data);
      }
      setLoading(false);
    };
    loadProfile();
  }, [user?.id]);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/login';
  };

  const handleSave = async () => {
    if (!user?.id) return;
    setSaving(true);

    const { data, error } = await updateUserProfile(user.id, {
      full_name: editData.full_name || undefined,
      country: editData.country || undefined,
      occupation: editData.occupation || undefined,
      niche: editData.niche || undefined,
      platform: editData.platform || undefined,
      monthly_revenue: editData.monthly_revenue || undefined,
      time_in_field: editData.time_in_field || undefined,
      monthly_ad_budget: editData.monthly_ad_budget || undefined,
      store_link: editData.store_link || null,
    });

    if (!error && data) {
      setProfile(data);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }

    setSaving(false);
  };

  const handleCancel = () => {
    setEditData(profile || {});
    setIsEditing(false);
  };

  const updateField = (field: keyof UserProfile, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  if (authLoading || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-[#111]" />
        </div>
      </DashboardLayout>
    );
  }

  const userName = user?.user_metadata?.full_name || profile?.full_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';
  const userInitials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <DashboardLayout>
      <div className="settings-page">
        <div className="settings-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="settings-header"
          >
            <div>
              <h1 className="settings-title">Account Settings</h1>
              <p className="settings-subtitle">Manage your profile and preferences</p>
            </div>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="settings-edit-btn">
                <Edit2 size={16} />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="settings-edit-actions">
                <button onClick={handleCancel} className="settings-cancel-btn">
                  <X size={16} />
                  <span>Cancel</span>
                </button>
                <button onClick={handleSave} disabled={saving} className="settings-save-btn">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            )}
          </motion.div>

          {/* Success Message */}
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="settings-success"
            >
              <Check size={16} />
              <span>Changes saved successfully!</span>
            </motion.div>
          )}

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="settings-profile-card"
          >
            <div className="settings-avatar">{userInitials}</div>
            <div className="settings-profile-info">
              <h2 className="settings-profile-name">{userName}</h2>
              <p className="settings-profile-email">{userEmail}</p>
            </div>
          </motion.div>

          {/* Settings Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="settings-section"
          >
            <h3 className="settings-section-title">Personal Information</h3>
            <div className="settings-rows">
              <SettingRow
                icon={User}
                label="Full Name"
                value={profile?.full_name}
                editValue={editData.full_name || ''}
                isEditing={isEditing}
                onEdit={(v) => updateField('full_name', v)}
                placeholder="Your name"
              />
              <SettingRow
                icon={Mail}
                label="Email"
                value={userEmail}
                editValue={userEmail}
                isEditing={false}
                onEdit={() => {}}
              />
              <SettingRow
                icon={MapPin}
                label="Country"
                value={profile?.country}
                editValue={editData.country || ''}
                isEditing={isEditing}
                onEdit={(v) => updateField('country', v)}
                type="country"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="settings-section"
          >
            <h3 className="settings-section-title">Business Details</h3>
            <div className="settings-rows">
              <SettingRow
                icon={Briefcase}
                label="Business Type"
                value={profile?.occupation}
                editValue={editData.occupation || ''}
                isEditing={isEditing}
                onEdit={(v) => updateField('occupation', v)}
                type="select"
                options={BUSINESS_TYPES}
                placeholder="Select business type"
              />
              <SettingRow
                icon={Tag}
                label="Niche"
                value={profile?.niche}
                editValue={editData.niche || ''}
                isEditing={isEditing}
                onEdit={(v) => updateField('niche', v)}
                type="select"
                options={NICHES}
                placeholder="Select niche"
              />
              <SettingRow
                icon={ShoppingCart}
                label="Platform"
                value={profile?.platform}
                editValue={editData.platform || ''}
                isEditing={isEditing}
                onEdit={(v) => updateField('platform', v)}
                type="select"
                options={PLATFORMS}
                placeholder="Select platform"
              />
              <SettingRow
                icon={Globe}
                label="Store URL"
                value={profile?.store_link}
                editValue={editData.store_link || ''}
                isEditing={isEditing}
                onEdit={(v) => updateField('store_link', v)}
                type="url"
                placeholder="https://your-store.com"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="settings-section"
          >
            <h3 className="settings-section-title">Revenue & Experience</h3>
            <div className="settings-rows">
              <SettingRow
                icon={DollarSign}
                label="Monthly Revenue"
                value={profile?.monthly_revenue}
                editValue={editData.monthly_revenue || ''}
                isEditing={isEditing}
                onEdit={(v) => updateField('monthly_revenue', v)}
                type="select"
                options={REVENUE_RANGES}
                placeholder="Select revenue range"
              />
              <SettingRow
                icon={Clock}
                label="Time in Business"
                value={profile?.time_in_field}
                editValue={editData.time_in_field || ''}
                isEditing={isEditing}
                onEdit={(v) => updateField('time_in_field', v)}
                type="select"
                options={TIME_IN_FIELD}
                placeholder="Select experience"
              />
              <SettingRow
                icon={TrendingUp}
                label="Monthly Ad Budget"
                value={profile?.monthly_ad_budget}
                editValue={editData.monthly_ad_budget || ''}
                isEditing={isEditing}
                onEdit={(v) => updateField('monthly_ad_budget', v)}
                type="select"
                options={AD_BUDGETS}
                placeholder="Select ad budget"
              />
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="settings-section settings-danger-zone"
          >
            <h3 className="settings-section-title">Session</h3>
            <div className="settings-logout-row">
              <div>
                <p className="settings-logout-text">Sign out of your account</p>
                <p className="settings-logout-subtext">You will need to sign in again to access your dashboard</p>
              </div>
              <button onClick={handleSignOut} className="settings-logout-btn">
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
