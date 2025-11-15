import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';

/**
 * LOGIN COMPONENT
 *
 * ROUTING CONCEPTS DEMONSTRATED:
 * 1. Query Parameters: Reading ?returnUrl from URL
 * 2. Programmatic Navigation: Router.navigate() after login
 * 3. NavigationExtras: Passing state during navigation
 * 4. Route Guards Integration: Redirect target after auth
 *
 * FLOW:
 * 1. User tries to access protected route (/dashboard)
 * 2. AuthGuard redirects to /login?returnUrl=/dashboard
 * 3. User logs in
 * 4. Redirect to returnUrl or default home
 */
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  username = '';
  password = '';
  errorMessage = '';
  returnUrl = '/home';

  constructor(
    private authService: Auth,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    /**
     * ROUTING CONCEPT: Reading Query Parameters
     *
     * Query parameters are key-value pairs in the URL after '?'
     * Example: /login?returnUrl=/dashboard&source=guard
     *
     * Access Methods:
     * 1. Snapshot (one-time read): this.route.snapshot.queryParamMap.get('key')
     * 2. Observable (reactive): this.route.queryParamMap.subscribe(...)
     */
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/home';
    console.log('🔐 Login: Return URL set to', this.returnUrl);
  }

  /**
   * ROUTING CONCEPT: Programmatic Navigation After Auth
   *
   * Demonstrates:
   * - Navigation after successful action
   * - Using stored returnUrl for redirect
   * - Error handling in navigation
   */
  onSubmit(): void {
    const success = this.authService.login(this.username, this.password);

    if (success) {
      console.log('✅ Login successful, navigating to:', this.returnUrl);

      /**
       * Navigate to the return URL or home page
       *
       * NAVIGATION EXTRAS:
       * Can include additional options:
       * - queryParams: Query parameters to add
       * - fragment: URL fragment (#section)
       * - replaceUrl: Replace current history entry
       * - state: Pass data without showing in URL
       */
      this.router.navigate([this.returnUrl]);
    } else {
      this.errorMessage = 'Login failed. Please enter any username and password.';
    }
  }
}
