import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Accent color options
export const ACCENT_COLORS = [
  { id: 'lime', label: 'Lime', value: '#88DA1C' },
  { id: 'mint', label: 'Mint', value: '#24F07D' },
  { id: 'teal', label: 'Teal', value: '#038468' },
  { id: 'forest', label: 'Forest', value: '#065D5D' },
  { id: 'emerald', label: 'Emerald', value: '#00C48D' },
] as const;

export type AccentColorId = typeof ACCENT_COLORS[number]['id'];
export type SidebarStyle = 'black' | 'gradient';

interface ThemeState {
  accentColor: AccentColorId;
  sidebarStyle: SidebarStyle;
  setAccentColor: (color: AccentColorId) => void;
  setSidebarStyle: (style: SidebarStyle) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      accentColor: 'lime',
      sidebarStyle: 'black',
      setAccentColor: (color) => set({ accentColor: color }),
      setSidebarStyle: (style) => set({ sidebarStyle: style }),
    }),
    {
      name: 'quantum-theme',
    }
  )
);

// Helper to get the current accent color value
export function getAccentColorValue(colorId: AccentColorId): string {
  const color = ACCENT_COLORS.find((c) => c.id === colorId);
  return color?.value || '#88DA1C';
}

// Apply theme to document
export function applyTheme(accentColor: AccentColorId, sidebarStyle: SidebarStyle) {
  const root = document.documentElement;
  const colorValue = getAccentColorValue(accentColor);

  // Set accent color CSS variable
  root.style.setProperty('--primary', colorValue);
  root.style.setProperty('--accent-primary', colorValue);

  // Set sidebar style class on body
  document.body.classList.remove('sidebar-black', 'sidebar-gradient');
  document.body.classList.add(`sidebar-${sidebarStyle}`);
}
