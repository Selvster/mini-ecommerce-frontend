export interface CartItem {
  id: string; // Unique ID combining product ID and all selected attributes
  productId: string; 
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  selectedAttributes: { [attributeId: string]: string }; 
  attributes: Array<{
    id: string;
    name: string;
    type: string;
    items: Array<{ id: number; displayValue: string; value: string; }>;
  }>;
}

export interface ProductForCart {
  id: string;
  name: string;
  prices: Array<{ amount: number; currency: { symbol: string; label: string; } }>;
  gallery: Array<{ imageUrl: string }>;
  attributes: Array<{ 
    id: string;
    name: string;
    type: string;
    items: Array<{ id: number; displayValue: string; value: string; }>;
  }>;
}

export interface CartState {
  isCartOpen: boolean;
  cartItems: CartItem[];
  toggleCart: () => void;
  addToCart: (product: ProductForCart, selectedAttributes: { [attributeId: string]: string }) => void;
  updateQuantity: (id: string, delta: number) => void;
  calculateTotal: () => string;
  reset: () => void;
}
