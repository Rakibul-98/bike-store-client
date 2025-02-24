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

export type APIErrorType = {
  data?: {
    message?: string;
  };
};

export type StateType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UserType = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  isBlocked: boolean;
  name: string;
  profile_image: string;
  role: string;
  __v: number;
};

///

interface ProductType {
  _id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  features: string[];
  product_image: string;
  available_quantity: number;
  cart_quantity: number;
  inStock: boolean;
  isDeleted: boolean;
  updatedAt: string;
}

interface OrderItemType {
  product: ProductType;
  order_quantity: number;
  _id: string;
}

interface CustomerType {
  _id: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  profile_image: string;
  user_name: string;
}

interface TransactionType {
  id: string;
  transactionStatus: string;
}

export type OrderType = {
  transaction: TransactionType;
  _id: string;
  customer: CustomerType;
  items: OrderItemType[];
  totalAmount: number;
  address: string;
  phone: string;
  orderStatus: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type argsType = {
  name: string;
  value: string;
};
