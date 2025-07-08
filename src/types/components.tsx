import type { Product } from './';

// export  interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   size: string; 
//   color: string; 
//   quantity: number;
//   imageUrl: string;
//   availableSizes: string[]; 
//   availableColors: string[]; 
// }

// export  interface CartOverlayProps {
//   isOpen: boolean;
//   toggleCart: () => void;
//   cartItems: CartItem[];
//   updateQuantity: (id: number, delta: number) => void;
//   calculateTotal: () => string; 
// }

export interface HeaderProps {
    categoryName?: string; // Optional, used for category-specific navigation
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductGridProps {
  currentCategory: string; 
}