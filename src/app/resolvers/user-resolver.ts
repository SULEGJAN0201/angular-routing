import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { User, UserService } from '../services/user';
import { Observable } from 'rxjs';

/**
 * User Resolver
 *
 * PURPOSE: Pre-loads user data before activating a route.
 * Resolvers ensure that required data is available before the component is displayed.
 *
 * ROUTING CONCEPTS DEMONSTRATED:
 * - ResolveFn: Functional resolver (Angular 15+)
 * - Data Pre-loading: Fetches data before route activation
 * - Route Parameters: Extracts :id from the route path
 * - Async Operations: Returns Observable that router waits for
 *
 * BENEFITS OF RESOLVERS:
 * 1. Data is guaranteed to be available when component initializes
 * 2. Prevents "loading spinners" in components
 * 3. Provides better user experience with pre-loaded data
 * 4. Centralizes data fetching logic
 *
 * USAGE IN ROUTES:
 * {
 *   path: 'users/:id',
 *   component: UserDetailComponent,
 *   resolve: {
 *     user: userResolver // Data will be available as route.data['user']
 *   }
 * }
 *
 * ACCESSING RESOLVED DATA IN COMPONENT:
 * this.route.data.subscribe(data => {
 *   const user = data['user']; // Pre-loaded user object
 * });
 *
 * @param route - ActivatedRouteSnapshot containing route parameters
 * @param state - RouterStateSnapshot containing router state
 * @returns Observable<User | undefined> - User data stream
 */
export const userResolver: ResolveFn<User | undefined> = (
  route,
  state
): Observable<User | undefined> => {
  // Inject the UserService
  const userService = inject(UserService);

  /**
   * Extract the 'id' parameter from the route
   *
   * ROUTE PARAMETERS CONCEPT:
   * When the route is defined as 'users/:id', the :id is a route parameter.
   * For URL /users/3, route.paramMap.get('id') returns '3'
   */
  const userId = route.paramMap.get('id');

  console.log('🔄 User Resolver: Fetching user data for ID:', userId);

  // Convert string ID to number and fetch user
  if (userId) {
    const id = parseInt(userId, 10);

    /**
     * Return Observable<User>
     *
     * IMPORTANT: The router will:
     * 1. Subscribe to this Observable
     * 2. Wait for it to emit a value
     * 3. Store the emitted value in route.data
     * 4. Then activate the route and component
     *
     * This ensures data is ready before the component renders.
     */
    return userService.getUserById(id);
  }

  // If no ID provided, return undefined
  console.warn('⚠️ User Resolver: No user ID provided in route');
  return userService.getUserById(0); // Will return undefined
};
