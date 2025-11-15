import { Routes } from '@angular/router';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PRODUCTS FEATURE ROUTES - LAZY LOADED MODULE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * LAZY LOADING CONCEPT:
 *
 * This file demonstrates lazy loading of feature modules in Angular.
 * The entire products feature is loaded only when the user navigates to /products
 *
 * BENEFITS:
 * 1. Reduced Initial Bundle Size: Main bundle doesn't include products code
 * 2. Faster Initial Load: App starts faster
 * 3. On-Demand Loading: Code is loaded only when needed
 * 4. Code Splitting: Separate bundles for each feature
 * 5. Better Performance: Users only download what they use
 *
 * HOW IT WORKS:
 * 1. User navigates to /products
 * 2. Router detects loadChildren in main routes
 * 3. Downloads products.routes.ts and related components
 * 4. Executes the route configuration
 * 5. Displays the requested component
 *
 * CONFIGURATION IN MAIN ROUTES (app.routes.ts):
 * {
 *   path: 'products',
 *   loadChildren: () => import('./features/products/products.routes')
 *     .then(m => m.PRODUCTS_ROUTES)
 * }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const PRODUCTS_ROUTES: Routes = [
  /**
   * Default route for /products
   * Redirects to product list
   */
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },

  /**
   * Products List Route: /products/list
   *
   * Shows all available products
   * This component is also lazy loaded
   */
  {
    path: 'list',
    loadComponent: () => import('./product-list/product-list').then(m => m.ProductList),
    title: 'Products - Browse Our Catalog',
    data: {
      breadcrumb: 'Product List',
      description: 'Browse all available products'
    }
  },

  /**
   * Product Detail Route: /products/:productId
   *
   * ROUTING CONCEPTS:
   * - Route Parameter: :productId captures dynamic product ID
   * - Lazy Loading: Component loaded on-demand
   * - SEO: Dynamic title for each product
   *
   * Example URLs:
   * - /products/101 (shows product with ID 101)
   * - /products/202 (shows product with ID 202)
   */
  {
    path: ':productId',
    loadComponent: () => import('./product-detail/product-detail').then(m => m.ProductDetail),
    title: 'Product Details',
    data: {
      breadcrumb: 'Product Detail',
      description: 'View detailed product information'
    }
  }
];

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LAZY LOADING BEST PRACTICES
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 1. Feature Modules: Group related functionality together
 * 2. Strategic Loading: Lazy load large or rarely used features
 * 3. Preloading Strategy: Consider preloading important routes
 * 4. Bundle Analysis: Use webpack-bundle-analyzer to optimize
 * 5. Route Organization: Keep feature routes in separate files
 * 6. Shared Code: Extract common code to shared modules
 * 7. Performance Monitoring: Track bundle sizes over time
 *
 * WHEN TO USE LAZY LOADING:
 * ✅ Large feature modules (e.g., admin panels)
 * ✅ Rarely accessed features (e.g., settings, reports)
 * ✅ Role-based features (e.g., admin-only sections)
 * ✅ Optional functionality (e.g., advanced tools)
 *
 * WHEN NOT TO USE LAZY LOADING:
 * ❌ Core app functionality (e.g., home page)
 * ❌ Small components (overhead > benefit)
 * ❌ Frequently accessed routes (UX impact)
 * ❌ Shared dependencies (leads to duplication)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */
