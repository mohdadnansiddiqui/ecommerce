export type ServiceKey =
  | 'auth'
  | 'customers'
  | 'products'
  | 'carts'
  | 'orders'
  | 'payments'
  | 'inventory'
  | 'notifications'
  | 'reviews';

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

export type ProductPayload = Omit<Product, 'id' | 'createdAt'>;

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: string;
}

export interface Inventory {
  id: number;
  productId: number;
  availableQuantity: number;
  warehouseLocation: string;
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

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  customerId: number;
  totalAmount: number;
  orderStatus: 'PLACED' | 'CANCELLED' | 'PAID' | string;
  createdAt: string;
  items: OrderItem[];
}

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  paymentMethod: 'CARD' | 'UPI' | 'COD' | string;
  paymentStatus: 'CREATED' | 'SUCCESS' | 'FAILED' | string;
  paymentDate: string;
}

export interface Review {
  id: number;
  customerId: number;
  productId: number;
  rating: number;
  reviewText: string;
  createdAt: string;
}

export interface NotificationMessage {
  id: number;
  customerId: number;
  message: string;
  notificationType: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  customer: string;
  createdDate: string;
}

export interface NavItem {
  label: string;
  route: string;
  icon: string;
}

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'currency' | 'date' | 'status' | 'rating' | 'image';
}

export interface DashboardCard {
  label: string;
  value: string | number;
  hint: string;
  icon: string;
  tone: 'blue' | 'green' | 'amber' | 'red' | 'slate';
}

export interface ChartDatum {
  label: string;
  value: number;
}

export type RowData = Record<string, unknown>;
