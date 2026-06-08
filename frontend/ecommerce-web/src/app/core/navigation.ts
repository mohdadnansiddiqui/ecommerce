import { NavItem } from '../models/app.models';

export const ADMIN_NAV: NavItem[] = [
  { label: 'Dashboard', route: '/admin/dashboard', icon: 'space_dashboard' },
  { label: 'Products', route: '/admin/products', icon: 'inventory_2' },
  { label: 'Categories', route: '/admin/categories', icon: 'category' },
  { label: 'Inventory', route: '/admin/inventory', icon: 'warehouse' },
  { label: 'Orders', route: '/admin/orders', icon: 'receipt_long' },
  { label: 'Payments', route: '/admin/payments', icon: 'credit_card' },
  { label: 'Customers', route: '/admin/customers', icon: 'groups' },
  { label: 'Reviews', route: '/admin/reviews', icon: 'reviews' },
  { label: 'Notifications', route: '/admin/notifications', icon: 'notifications' },
  { label: 'Issue Management', route: '/admin/issues', icon: 'confirmation_number' },
  { label: 'Reports', route: '/admin/reports', icon: 'monitoring' },
  { label: 'Settings', route: '/admin/settings', icon: 'settings' }
];

export const CUSTOMER_NAV: NavItem[] = [
  { label: 'Home', route: '/portal/home', icon: 'home' },
  { label: 'Products', route: '/portal/products', icon: 'storefront' },
  { label: 'Cart', route: '/portal/cart', icon: 'shopping_cart' },
  { label: 'Checkout', route: '/portal/checkout', icon: 'payments' },
  { label: 'Orders', route: '/portal/orders', icon: 'receipt_long' },
  { label: 'Profile', route: '/portal/profile', icon: 'person' },
  { label: 'Notifications', route: '/portal/notifications', icon: 'notifications' },
  { label: 'Reviews', route: '/portal/reviews', icon: 'rate_review' }
];
