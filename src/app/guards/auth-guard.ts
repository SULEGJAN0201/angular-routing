import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

/**
 * Authentication Guard
 *
 * PURPOSE: Protects routes from unauthorized access by checking authentication status.
 * This is a functional guard (new in Angular 15+) that uses the inject() function.
 *
 * ROUTING CONCEPTS DEMONSTRATED:
 * - CanActivateFn: Functional approach to route guards (modern Angular)
 * - Route Protection: Prevents navigation to protected routes
 * - Programmatic Navigation: Redirects to login if not authenticated
 * - State Preservation: Passes the attempted URL to login for post-auth redirect
 *
 * USAGE IN ROUTES:
 * {
 *   path: 'dashboard',
 *   component: DashboardComponent,
 *   canActivate: [authGuard] // Apply this guard
 * }
 *
 * GUARD EXECUTION FLOW:
 * 1. User attempts to navigate to a protected route
 * 2. Guard checks authentication status via AuthService
 * 3. If authenticated: Allow navigation (return true)
 * 4. If not authenticated: Redirect to login (return false/UrlTree)
 *
 * @param route - ActivatedRouteSnapshot containing route information
 * @param state - RouterStateSnapshot containing the current router state
 * @returns boolean | UrlTree - true to allow navigation, false/UrlTree to prevent/redirect
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Inject dependencies using the inject() function
  // This is the modern approach for functional guards
  const authService = inject(Auth);
  const router = inject(Router);

  // Check if user is authenticated
  const isAuthenticated = authService.checkAuthentication();

  if (isAuthenticated) {
    // User is authenticated, allow navigation
    console.log('✅ Auth Guard: User authenticated, allowing access to:', state.url);
    return true;
  } else {
    // User is not authenticated
    console.log('❌ Auth Guard: User not authenticated, redirecting to login');

    /**
     * Redirect to login page with query parameters
     *
     * QUERY PARAMETERS CONCEPT:
     * We pass the 'returnUrl' as a query parameter so that after successful login,
     * the user can be redirected back to the page they originally tried to access.
     *
     * Example: /login?returnUrl=%2Fdashboard
     *
     * The login component can read this parameter and navigate to it after authentication.
     */
    return router.createUrlTree(['/login'], {
      queryParams: {
        returnUrl: state.url // Store the attempted URL
      }
    });
  }
};
