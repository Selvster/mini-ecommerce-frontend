import { create } from 'zustand';
import type { CartItem, CartState } from '../types';

// Create the Zustand store
export const useCartStore = create<CartState>((set, get) => ({
  isCartOpen: false,
  cartItems: [
    // Initial dummy cart items (can be empty or pre-filled for testing)
    // Note: IDs now reflect the new generalized format
    // {
    //   id: 'jacket-canada-goosee-Size-S-Color-#333333',
    //   productId: 'jacket-canada-goosee',
    //   name: 'Jacket',
    //   price: 518.47,
    //   imageUrl: 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg',
    //   quantity: 1,
    //   selectedAttributes: {
    //     'Size': 'S',
    //     'Color': '#333333'
    //   },
    //   attributes: [ // Dummy attributes for initial item
    //     {id: 'Size', name: 'Size', type: 'text', items: [{id: 5, displayValue: 'Small', value: 'S'}, {id: 6, displayValue: 'Medium', value: 'M'}]},
    //     {id: 'Color', name: 'Color', type: 'swatch', items: [{id: 1, displayValue: 'Black', value: '#000000'}, {id: 2, displayValue: 'Gray', value: '#333333'}]}
    //   ]
    // },
    // {
    //   id: 'running-short-Size-M-Color-#008000',
    //   productId: 'running-short',
    //   name: 'Running Short',
    //   price: 50.00,
    //   imageUrl: 'https://placehold.co/100x100/e0e0e0/333333?text=Short',
    //   quantity: 2,
    //   selectedAttributes: {
    //     'Size': 'M',
    //     'Color': '#008000'
    //   },
    //   attributes: [ // Dummy attributes for initial item
    //     {id: 'Size', name: 'Size', type: 'text', items: [{id: 1, displayValue: 'Small', value: 'S'}, {id: 2, displayValue: 'Medium', value: 'M'}]},
    //     {id: 'Color', name: 'Color', type: 'swatch', items: [{id: 3, displayValue: 'Green', value: '#008000'}, {id: 4, displayValue: 'Red', value: '#FF0000'}]}
    //   ]
    // }
  ],

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  // addToCart now takes selectedAttributes object
  addToCart: (product, selectedAttributes) => {
    set((state) => {
      // Create a unique ID for the cart item based on product ID and ALL selected attributes
      const attributeString = Object.keys(selectedAttributes)
        .sort() // Sort keys for consistent ID generation
        .map(key => `${key}-${selectedAttributes[key]}`)
        .join('-');
      const uniqueItemId = `${product.id}-${attributeString}`;

      const existingItemIndex = state.cartItems.findIndex(item => item.id === uniqueItemId);

      if (existingItemIndex > -1) {
        // If item already exists, update its quantity
        const updatedItems = [...state.cartItems];
        updatedItems[existingItemIndex].quantity += 1;
        return { cartItems: updatedItems };
      } else {
        // If item is new, add it to the cart
        const newItem: CartItem = {
          id: uniqueItemId,
          productId: product.id, // Store original product ID
          name: product.name,
          price: product.prices[0]?.amount || 0, // Use the first price amount
          imageUrl: product.gallery[0]?.imageUrl || 'https://placehold.co/100x100/e0e0e0/333333?text=No+Image', // Use first gallery image
          quantity: 1,
          selectedAttributes: selectedAttributes, // Store the generalized attributes
          attributes: product.attributes, // Store the full attribute definitions
        };
        return { cartItems: [...state.cartItems, newItem] };
      }
    });
  },

  updateQuantity: (id, delta) => {
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  calculateTotal: () => {
    const total = get().cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total.toFixed(2);
  },
}));
