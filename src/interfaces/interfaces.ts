export type ItemType = {
  _id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  features: string[];
  price: number;
  available_quantity: number;
  inStock: boolean;
  product_image: string;
  cart_quantity: number;
};

export type CartType = {
  items: ItemType[];
  totalAmount: number;
  totalItems: number;
  shippingCost: number;
  tax: number;
  discount: number;
  grandTotal: number;
  coupon?: string;
};
