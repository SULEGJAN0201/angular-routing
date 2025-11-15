import { Injectable, signal } from '@angular/core';

/**
 * Authentication Service
 *
 * PURPOSE: Manages user authentication state throughout the application.
 * This service is used in conjunction with Route Guards to protect routes
 * that require authentication.
 *
 * ROUTING CONCEPTS DEMONSTRATED:
 * - Used by AuthGuard to control route access
 * - Maintains authentication state using Angular signals
 * - Simulates login/logout functionality for demonstration
 */
@Injectable({
  providedIn: 'root', // Singleton service available throughout the app
})
export class Auth {
  /**
   * Signal to track authentication status
   * Using signals for reactive state management (Angular 16+)
   */
  private isAuthenticatedSignal = signal(false);

  /**
   * Public readonly access to authentication status
   */
  readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();

  /**
   * Signal to store the currently logged-in username
   */
  private currentUserSignal = signal<string | null>(null);

  /**
   * Public readonly access to current user
   */
  readonly currentUser = this.currentUserSignal.asReadonly();

  /**
   * Simulates user login
   * In a real application, this would call an API endpoint
   *
   * @param username - The username to log in with
   * @param password - The password (not validated in this demo)
   * @returns boolean indicating success
   */
  login(username: string, password: string): boolean {
    // Simulate authentication logic
    // In production, you would validate credentials against a backend
    if (username && password) {
      this.isAuthenticatedSignal.set(true);
      this.currentUserSignal.set(username);

      // Store auth status in localStorage for persistence
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', username);

      return true;
    }
    return false;
  }

  /**
   * Logs out the current user
   * Clears authentication state and localStorage
   */
  logout(): void {
    this.isAuthenticatedSignal.set(false);
    this.currentUserSignal.set(null);

    // Clear localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  }

  /**
   * Checks if user is authenticated
   * This method is used by the AuthGuard to protect routes
   *
   * @returns boolean indicating if user is authenticated
   */
  checkAuthentication(): boolean {
    // Check localStorage for persistent authentication
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    const user = localStorage.getItem('currentUser');

    if (isAuth && user) {
      this.isAuthenticatedSignal.set(true);
      this.currentUserSignal.set(user);
      return true;
    }

    return this.isAuthenticatedSignal();
  }
}
