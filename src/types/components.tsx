import type { Product } from './';

export interface HeaderProps {
    categoryName?: string; 
    setDefaultCategory: (category: string) => void; 
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductGridProps {
  currentCategory: string; 
}