import { create } from 'zustand';
import type { CartItem, CartState } from '../types';

const loadCartItems = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('cartItems');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to parse cart items:', e);
      return [];
    }
  }
  return [];
};

const saveCartItems = (items: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }
};

export const useCartStore = create<CartState>((set, get) => ({
  isCartOpen: false,
  cartItems: loadCartItems(),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  addToCart: (product, selectedAttributes) => {
    set((state) => {
      const attributeString = Object.keys(selectedAttributes)
        .sort()
        .map(key => `${key}-${selectedAttributes[key]}`)
        .join('-');
      const uniqueItemId = `${product.id}-${attributeString}`;

      const existingItemIndex = state.cartItems.findIndex(item => item.id === uniqueItemId);

      let updatedItems;
      if (existingItemIndex > -1) {
        updatedItems = [...state.cartItems];
        updatedItems[existingItemIndex].quantity += 1;
      } else {
        const newItem: CartItem = {
          id: uniqueItemId,
          productId: product.id,
          name: product.name,
          price: product.prices[0]?.amount || 0,
          imageUrl: product.gallery[0]?.imageUrl,
          quantity: 1,
          selectedAttributes: selectedAttributes,
          attributes: product.attributes,
        };
        updatedItems = [...state.cartItems, newItem];
      }

      saveCartItems(updatedItems);
      return { cartItems: updatedItems };
    });
  },

  updateQuantity: (id, delta) => {
    set((state) => {
      const updatedItems = state.cartItems
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter(item => item.quantity > 0);

      saveCartItems(updatedItems);
      return { cartItems: updatedItems };
    });
  },

  calculateTotal: () => {
    const total = get().cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total.toFixed(2);
  },
}));
