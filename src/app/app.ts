import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Auth } from './services/auth';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MAIN APP COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * PURPOSE: Root component that provides the main layout and navigation
 *
 * ROUTING CONCEPTS DEMONSTRATED:
 * 1. RouterOutlet: Displays the active route's component
 * 2. RouterLink: Declarative navigation
 * 3. RouterLinkActive: CSS class for active routes
 * 4. Programmatic Navigation: Using Router service
 * 5. Auth Integration: Conditional navigation based on auth state
 *
 * IMPORTS:
 * - RouterOutlet: Directive for rendering routed components
 * - RouterLink: Directive for navigation links
 * - RouterLinkActive: Directive for highlighting active links
 * - Router: Service for programmatic navigation
 * - Auth: Service for authentication management
 */
@Component({
  selector: 'app-root',
  // Standalone component with required router directives
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  /**
   * Inject AuthService to access authentication state
   * Made public to access in template
   */
  constructor(
    public authService: Auth,
    private router: Router
  ) {}

  /**
   * ROUTING CONCEPT: Programmatic Navigation
   *
   * Logout and navigate to home page
   * Demonstrates:
   * - Using Router.navigate() for programmatic navigation
   * - Navigation after state changes (logout)
   * - Redirecting users after auth state changes
   */
  logout(): void {
    // Log out the user
    this.authService.logout();

    /**
     * Navigate to home page after logout
     *
     * NAVIGATION METHODS:
     * 1. this.router.navigate(['/home'])
     *    - Array-based navigation (recommended)
     *    - Supports route parameters: ['/users', userId]
     *
     * 2. this.router.navigateByUrl('/home')
     *    - String-based navigation
     *    - Simpler for static routes
     *
     * 3. With NavigationExtras:
     *    this.router.navigate(['/home'], {
     *      queryParams: { sessionEnded: true },
     *      fragment: 'top'
     *    })
     */
    this.router.navigate(['/home']);

    console.log('🔓 User logged out and redirected to home');
  }
}
