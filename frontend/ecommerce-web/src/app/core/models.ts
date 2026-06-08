export interface User {
  id: number;
  username: string;
  email: string;
  enabled: boolean;
  createdAt: string;
  roles: string[];
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stockQuantity: number;
  imageUrl?: string;
  createdAt: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
}

export interface Cart {
  id: number;
  customerId: number;
  items: CartItem[];
}

export interface Order {
  id: number;
  customerId: number;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
  items: Array<{ id: number; productId: number; quantity: number; price: number }>;
}
