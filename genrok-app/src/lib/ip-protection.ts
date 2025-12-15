import { supabase } from './supabase';
import { checkIPActivity, recordSession, IPCheckResult } from './course-access';

// Configuration for IP protection
export const IP_PROTECTION_CONFIG = {
  // Maximum unique IPs allowed in 24 hours before warning
  MAX_UNIQUE_IPS_24H: 5,
  // Maximum unique IPs allowed in 7 days before flagging
  MAX_UNIQUE_IPS_7D: 10,
  // Whether to block access on suspicious activity
  BLOCK_ON_SUSPICIOUS: false, // Start with warning only
  // Grace period for new users (days)
  NEW_USER_GRACE_PERIOD_DAYS: 7,
};

export interface IPProtectionResult {
  allowed: boolean;
  warning: boolean;
  message: string | null;
  details: IPCheckResult | null;
}

// Get user's IP address (client-side helper)
export async function getClientIP(): Promise<string | null> {
  try {
    // Use a simple IP detection service
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting client IP:', error);
    return null;
  }
}

// Get device fingerprint (simple implementation)
export function getDeviceFingerprint(): string {
  if (typeof window === 'undefined') return 'server';

  const components = [
    navigator.userAgent,
    navigator.language,
    new Date().getTimezoneOffset().toString(),
    screen.width + 'x' + screen.height,
    screen.colorDepth.toString(),
  ];

  // Simple hash function
  let hash = 0;
  const str = components.join('|');
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash.toString(36);
}

// Check if user can access course content
export async function checkCourseAccess(
  userId: string,
  ipAddress: string,
  userAgent?: string
): Promise<IPProtectionResult> {
  // Record the session
  const fingerprint = getDeviceFingerprint();
  await recordSession(userId, ipAddress, userAgent, fingerprint);

  // Check IP activity
  const activity = await checkIPActivity(userId, ipAddress);

  if (!activity) {
    // If we can't check activity, allow access but log warning
    return {
      allowed: true,
      warning: false,
      message: null,
      details: null,
    };
  }

  // Check if user is in grace period (new user)
  const { data: profile } = await supabase
    .from('profiles')
    .select('created_at')
    .eq('id', userId)
    .single();

  const isNewUser =
    profile &&
    new Date(profile.created_at) >
      new Date(Date.now() - IP_PROTECTION_CONFIG.NEW_USER_GRACE_PERIOD_DAYS * 24 * 60 * 60 * 1000);

  // If IP is in allowlist, always allow
  if (activity.is_allowed) {
    return {
      allowed: true,
      warning: false,
      message: null,
      details: activity,
    };
  }

  // Check for suspicious activity
  if (activity.is_suspicious && !isNewUser) {
    if (IP_PROTECTION_CONFIG.BLOCK_ON_SUSPICIOUS) {
      return {
        allowed: false,
        warning: true,
        message:
          'We detected unusual activity on your account. For security, please verify your identity or contact support.',
        details: activity,
      };
    }

    return {
      allowed: true,
      warning: true,
      message:
        'We noticed you\'re accessing from multiple locations. If this is you, you can add trusted devices in your account settings.',
      details: activity,
    };
  }

  // Warn if approaching limits
  if (
    activity.unique_ips_24h >= IP_PROTECTION_CONFIG.MAX_UNIQUE_IPS_24H - 1 ||
    activity.unique_ips_7d >= IP_PROTECTION_CONFIG.MAX_UNIQUE_IPS_7D - 2
  ) {
    return {
      allowed: true,
      warning: true,
      message:
        'You\'re accessing from multiple devices. Remember, your account is for personal use only.',
      details: activity,
    };
  }

  return {
    allowed: true,
    warning: false,
    message: null,
    details: activity,
  };
}

// Mark an IP as trusted
export async function trustCurrentIP(
  userId: string,
  ipAddress: string,
  label?: string
): Promise<boolean> {
  const { error } = await supabase
    .from('user_ip_allowlist')
    .upsert(
      {
        user_id: userId,
        ip_address: ipAddress,
        label: label || 'Trusted Device',
        is_verified: true,
      } as never,
      { onConflict: 'user_id,ip_address' }
    );

  return !error;
}

// Get user's trusted IPs
export async function getTrustedIPs(userId: string): Promise<
  Array<{
    ip_address: string;
    label: string | null;
    created_at: string;
  }>
> {
  const { data, error } = await supabase
    .from('user_ip_allowlist')
    .select('ip_address, label, created_at')
    .eq('user_id', userId)
    .eq('is_verified', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching trusted IPs:', error);
    return [];
  }

  return data || [];
}

// Remove a trusted IP
export async function removeTrustedIP(userId: string, ipAddress: string): Promise<boolean> {
  const { error } = await supabase
    .from('user_ip_allowlist')
    .delete()
    .eq('user_id', userId)
    .eq('ip_address', ipAddress);

  return !error;
}

// Get recent sessions for account security page
export async function getRecentSessions(userId: string): Promise<
  Array<{
    id: string;
    ip_address: string;
    user_agent: string | null;
    country: string | null;
    city: string | null;
    last_active_at: string;
    is_current: boolean;
  }>
> {
  const currentIP = await getClientIP();

  const { data, error } = await supabase
    .from('user_sessions')
    .select('id, ip_address, user_agent, country, city, last_active_at')
    .eq('user_id', userId)
    .order('last_active_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching sessions:', error);
    return [];
  }

  return (data || []).map((session) => ({
    ...session,
    is_current: session.ip_address === currentIP,
  }));
}
