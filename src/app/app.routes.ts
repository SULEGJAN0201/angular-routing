import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { userResolver } from './resolvers/user-resolver';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANGULAR ROUTING CONFIGURATION - COMPREHENSIVE LEARNING GUIDE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This file demonstrates Angular routing concepts from beginner to advanced:
 *
 * BEGINNER CONCEPTS:
 * 1. Basic Route Configuration
 * 2. Component Routing
 * 3. RouterLink and Navigation
 * 4. Default Route (redirectTo)
 * 5. Wildcard Route (404 page)
 *
 * INTERMEDIATE CONCEPTS:
 * 6. Route Parameters (/:id)
 * 7. Query Parameters (?param=value)
 * 8. Child Routes (Nested Routing)
 * 9. Route Guards (canActivate)
 * 10. Route Data
 *
 * ADVANCED CONCEPTS:
 * 11. Lazy Loading
 * 12. Route Resolvers
 * 13. Route Configuration (title, data)
 * 14. Programmatic Navigation
 * 15. NavigationExtras
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const routes: Routes = [
  /**
   * ─────────────────────────────────────────────────────────────────────────
   * CONCEPT 1: DEFAULT ROUTE (REDIRECT)
   * ─────────────────────────────────────────────────────────────────────────
   *
   * When user navigates to '/' (root), redirect to '/home'
   *
   * - pathMatch: 'full' ensures exact match of the empty path
   * - pathMatch: 'prefix' would match any route starting with the path
   */
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * CONCEPT 2: BASIC ROUTE CONFIGURATION
   * ─────────────────────────────────────────────────────────────────────────
   *
   * Simple route that maps a path to a component
   *
   * - path: URL segment (e.g., /home)
   * - loadComponent: Lazy loads the component (standalone components)
   * - title: Sets the browser page title
   * - data: Static data passed to the route (accessible in component)
   */
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then(m => m.Home),
    title: 'Home - Angular Routing App',
    data: {
      breadcrumb: 'Home',
      description: 'Welcome to the Angular Routing learning application'
    }
  },

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * CONCEPT 3: STATIC ROUTES
   * ─────────────────────────────────────────────────────────────────────────
   */
  {
    path: 'about',
    loadComponent: () => import('./components/about/about').then(m => m.About),
    title: 'About - Angular Routing',
    data: { breadcrumb: 'About' }
  },

  {
    path: 'contact',
    loadComponent: () => import('./components/contact/contact').then(m => m.Contact),
    title: 'Contact Us',
    data: { breadcrumb: 'Contact' }
  },

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * CONCEPT 4: LOGIN ROUTE (NO GUARD)
   * ─────────────────────────────────────────────────────────────────────────
   *
   * This route is accessible to everyone (no guard)
   * It will handle query parameters like ?returnUrl=/dashboard
   */
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.Login),
    title: 'Login',
    data: { breadcrumb: 'Login' }
  },

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * CONCEPT 5: ROUTE PARAMETERS (:id)
   * ─────────────────────────────────────────────────────────────────────────
   *
   * Dynamic route segments for passing data via URL
   * Example: /users/1, /users/2, etc.
   *
   * Access in component:
   * - this.route.snapshot.paramMap.get('id')
   * - this.route.paramMap.subscribe(params => params.get('id'))
   */
  {
    path: 'users',
    loadComponent: () => import('./components/users/users').then(m => m.Users),
    title: 'Users List',
    data: { breadcrumb: 'Users' }
  },

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * CONCEPT 6: ROUTE PARAMETERS + RESOLVER
   * ─────────────────────────────────────────────────────────────────────────
   *
   * Combines route parameters with data pre-loading
   * The resolver fetches user data BEFORE the component is activated
   *
   * Benefits:
   * - Data is available immediately when component initializes
   * - No loading state needed in component
   * - Better user experience
   */
  {
    path: 'users/:id',
    loadComponent: () => import('./components/user-detail/user-detail').then(m => m.UserDetail),
    title: 'User Details',
    resolve: {
      user: userResolver // Pre-load user data
    },
    data: { breadcrumb: 'User Detail' }
  },

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * CONCEPT 7: PROTECTED ROUTE WITH GUARD
   * ─────────────────────────────────────────────────────────────────────────
   *
   * Routes protected by canActivate guard
   * Only accessible to authenticated users
   *
   * If user is not authenticated:
   * - Guard returns false (or UrlTree)
   * - Navigation is cancelled (or redirected)
   * - User is sent to login page
   */
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard),
    canActivate: [authGuard], // Apply authentication guard
    title: 'Dashboard',
    data: { breadcrumb: 'Dashboard', requiresAuth: true },

    /**
     * ───────────────────────────────────────────────────────────────────────
     * CONCEPT 8: CHILD ROUTES (NESTED ROUTING)
     * ───────────────────────────────────────────────────────────────────────
     *
     * Child routes render inside the parent component's <router-outlet>
     *
     * URL structure:
     * - /dashboard/overview
     * - /dashboard/stats
     * - /dashboard/settings
     *
     * Benefits:
     * - Shared parent layout (header, sidebar)
     * - Hierarchical URL structure
     * - Organized code structure
     */
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        loadComponent: () => import('./components/dashboard/overview/overview').then(m => m.Overview),
        title: 'Dashboard - Overview',
        data: { breadcrumb: 'Overview' }
      },
      {
        path: 'stats',
        loadComponent: () => import('./components/dashboard/stats/stats').then(m => m.Stats),
        title: 'Dashboard - Statistics',
        data: { breadcrumb: 'Statistics' }
      },
      {
        path: 'settings',
        loadComponent: () => import('./components/dashboard/settings/settings').then(m => m.Settings),
        title: 'Dashboard - Settings',
        data: { breadcrumb: 'Settings' }
      }
    ]
  },

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * CONCEPT 9: LAZY LOADED FEATURE MODULE (ADVANCED)
   * ─────────────────────────────────────────────────────────────────────────
   *
   * Lazy loading loads features only when needed
   *
   * Benefits:
   * - Smaller initial bundle size
   * - Faster app startup
   * - Code splitting
   * - Better performance
   *
   * The 'products' module will be loaded only when user navigates to /products/*
   */
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.routes').then(m => m.PRODUCTS_ROUTES),
    data: { breadcrumb: 'Products' }
  },

  /**
   * ─────────────────────────────────────────────────────────────────────────
   * CONCEPT 10: WILDCARD ROUTE (404 NOT FOUND)
   * ─────────────────────────────────────────────────────────────────────────
   *
   * Catches all undefined routes
   * MUST be the LAST route in the array
   *
   * The '**' wildcard matches any path
   * If no other route matches, this route is activated
   */
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found').then(m => m.NotFound),
    title: '404 - Page Not Found',
    data: { breadcrumb: '404' }
  }
];

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ROUTING BEST PRACTICES
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 1. ORDER MATTERS: Routes are matched in order, most specific first
 * 2. WILDCARD LAST: Always place '**' route at the end
 * 3. USE LAZY LOADING: For better performance and code splitting
 * 4. GUARDS FOR PROTECTION: Use canActivate, canDeactivate for security
 * 5. RESOLVERS FOR DATA: Pre-load data for better UX
 * 6. MEANINGFUL PATHS: Use clear, descriptive route paths
 * 7. CONFIGURE TITLES: Set page titles for SEO and UX
 * 8. USE ROUTE DATA: Pass static configuration via data property
 * 9. CHILD ROUTES: For nested layouts and hierarchical structure
 * 10. TYPE SAFETY: Use proper TypeScript types for route configuration
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */
