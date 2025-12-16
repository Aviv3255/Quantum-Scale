import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  slug: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  isInCart: (slug: string) => boolean;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getOriginalTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const { items } = get();
        if (!items.find(i => i.slug === item.slug)) {
          set({ items: [...items, item] });
        }
      },

      removeItem: (slug) => {
        set({ items: get().items.filter(i => i.slug !== slug) });
      },

      clearCart: () => set({ items: [] }),

      isInCart: (slug) => {
        return get().items.some(i => i.slug === slug);
      },

      toggleCart: () => set({ isOpen: !get().isOpen }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.price, 0);
      },

      getOriginalTotal: () => {
        return get().items.reduce((sum, item) => sum + (item.originalPrice || item.price), 0);
      },

      getItemCount: () => get().items.length,
    }),
    {
      name: 'quantum-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
