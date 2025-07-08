export interface Category {
  id: number;
  name: string;
}

export interface Currency {
  id: number;
  label: string;
  symbol: string;
}

export interface Price {
  amount: number; 
  currency: Currency;
}

export interface GalleryItem {
  imageUrl: string;
}

export interface AttributeItem {
  id: number; 
  displayValue: string;
  value: string;
}

export interface AttributeSet {
  id: string;
  name: string;
  type: 'text' | 'swatch'; 
  items: AttributeItem[];
}

export interface Product {
  id: string;
  name: string;
  inStock: boolean;
  brand: string | null; 
  description: string | null;
  category: Category; 
  gallery: GalleryItem[];
  prices: Price[];
  attributes: AttributeSet[];
}
