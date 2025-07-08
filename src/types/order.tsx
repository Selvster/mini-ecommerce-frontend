
import type { Currency } from './';

export interface OrderItemInput {
  productId: string;
  quantity: number;
  selectedAttributes?: { name: string; value: string; }[]; 
}

export interface PlaceOrderInput {
  items: OrderItemInput[];
}

export interface PlaceOrderResult {
  orderId: number;
  totalAmount: number;
  currency: Currency; 
  message?: string;
}
