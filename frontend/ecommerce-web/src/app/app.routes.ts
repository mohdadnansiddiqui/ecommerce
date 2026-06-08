import { Routes } from '@angular/router';
import { adminGuard, authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      { path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent) },
      { path: '', pathMatch: 'full', redirectTo: 'login' }
    ]
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'products', loadComponent: () => import('./pages/admin/products/product-list/product-list.component').then(m => m.ProductListComponent) },
      { path: 'products/create', loadComponent: () => import('./pages/admin/products/product-create/product-create.component').then(m => m.ProductCreateComponent) },
      { path: 'products/:id/edit', loadComponent: () => import('./pages/admin/products/product-update/product-update.component').then(m => m.ProductUpdateComponent) },
      { path: 'products/:id', loadComponent: () => import('./pages/admin/products/product-details/product-details.component').then(m => m.ProductDetailsComponent) },
      { path: 'orders', loadComponent: () => import('./pages/admin/orders/order-list/order-list.component').then(m => m.OrderListComponent) },
      { path: 'orders/:id/status', loadComponent: () => import('./pages/admin/orders/order-status/order-status.component').then(m => m.OrderStatusComponent) },
      { path: 'orders/:id', loadComponent: () => import('./pages/admin/orders/order-details/order-details.component').then(m => m.OrderDetailsComponent) },
      { path: 'customers', loadComponent: () => import('./pages/admin/customers/customer-list/customer-list.component').then(m => m.CustomerListComponent) },
      { path: 'customers/:id/orders', loadComponent: () => import('./pages/admin/customers/customer-orders/customer-orders.component').then(m => m.CustomerOrdersComponent) },
      { path: 'customers/:id', loadComponent: () => import('./pages/admin/customers/customer-details/customer-details.component').then(m => m.CustomerDetailsComponent) },
      { path: 'issues', loadComponent: () => import('./pages/admin/issues/ticket-list/ticket-list.component').then(m => m.TicketListComponent) },
      { path: 'issues/list', redirectTo: '/admin/issues', pathMatch: 'full' },
      { path: 'issues/dashboard', loadComponent: () => import('./pages/admin/issues/ticket-dashboard/ticket-dashboard.component').then(m => m.TicketDashboardComponent) },
      { path: 'issues/create', loadComponent: () => import('./pages/admin/issues/ticket-create/ticket-create.component').then(m => m.TicketCreateComponent) },
      { path: 'issues/:id/edit', loadComponent: () => import('./pages/admin/issues/ticket-update/ticket-update.component').then(m => m.TicketUpdateComponent) },
      { path: 'issues/:id', loadComponent: () => import('./pages/admin/issues/ticket-details/ticket-details.component').then(m => m.TicketDetailsComponent) },
      { path: ':resource', loadComponent: () => import('./features/admin/resource-management.component').then(m => m.ResourceManagementComponent) },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  },
  {
    path: 'portal',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/customer-layout/customer-layout.component').then(m => m.CustomerLayoutComponent),
    children: [
      { path: 'home', loadComponent: () => import('./pages/customer/home/customer-home.component').then(m => m.CustomerHomeComponent) },
      { path: 'products', loadComponent: () => import('./pages/customer/products/product-list/customer-product-list.component').then(m => m.CustomerProductListComponent) },
      { path: 'products/:id', loadComponent: () => import('./pages/customer/products/product-details/customer-product-details.component').then(m => m.CustomerProductDetailsComponent) },
      { path: 'cart', loadComponent: () => import('./pages/customer/cart/cart.component').then(m => m.CartComponent) },
      { path: 'checkout', loadComponent: () => import('./pages/customer/checkout/checkout.component').then(m => m.CheckoutComponent) },
      { path: 'orders', loadComponent: () => import('./pages/customer/orders/orders.component').then(m => m.OrdersComponent) },
      { path: 'profile', loadComponent: () => import('./pages/customer/profile/profile.component').then(m => m.ProfileComponent) },
      { path: 'notifications', loadComponent: () => import('./pages/customer/notifications/notifications.component').then(m => m.NotificationsComponent) },
      { path: 'reviews', loadComponent: () => import('./pages/customer/reviews/reviews.component').then(m => m.ReviewsComponent) },
      { path: '', pathMatch: 'full', redirectTo: 'home' }
    ]
  },
  { path: 'login', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'register', redirectTo: '/auth/register', pathMatch: 'full' },
  { path: 'products', redirectTo: '/portal/products', pathMatch: 'full' },
  { path: 'orders', redirectTo: '/portal/orders', pathMatch: 'full' },
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin/dashboard' }
];
