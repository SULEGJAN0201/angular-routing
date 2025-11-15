import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../services/user';
import { CommonModule } from '@angular/common';

/**
 * USER DETAIL COMPONENT
 *
 * ROUTING CONCEPTS DEMONSTRATED:
 * 1. Route Parameters: Reading :id from URL
 * 2. Route Resolvers: Pre-loaded data via userResolver
 * 3. Route Data: Accessing resolved data
 * 4. Navigation: Going back to list
 *
 * DATA FLOW:
 * 1. User navigates to /users/3
 * 2. UserResolver fetches user with ID 3
 * 3. Resolver completes, stores data in route.data['user']
 * 4. Component is activated with data already available
 * 5. No loading state needed - data is guaranteed to be ready
 */
@Component({
  selector: 'app-user-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css'
})
export class UserDetail implements OnInit {
  user?: User;
  userId?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    /**
     * ROUTING CONCEPT: Accessing Route Parameters
     *
     * Two methods to read route parameters:
     *
     * 1. SNAPSHOT (one-time read):
     *    const id = this.route.snapshot.paramMap.get('id');
     *    - Simple and direct
     *    - Good when component won't be reused
     *
     * 2. OBSERVABLE (reactive):
     *    this.route.paramMap.subscribe(params => {
     *      const id = params.get('id');
     *    });
     *    - Updates when params change
     *    - Good for components that stay active while params change
     */
    this.userId = this.route.snapshot.paramMap.get('id') || undefined;

    /**
     * ROUTING CONCEPT: Accessing Resolved Data
     *
     * Data provided by resolvers is available in route.data
     *
     * In app.routes.ts, we configured:
     * {
     *   path: 'users/:id',
     *   resolve: { user: userResolver }
     * }
     *
     * The resolved user data is stored under the 'user' key
     */
    this.route.data.subscribe(data => {
      this.user = data['user'];

      if (this.user) {
        console.log('✅ User data pre-loaded by resolver:', this.user);
      } else {
        console.warn('⚠️ No user found for ID:', this.userId);
      }
    });
  }

  /**
   * Navigate back to users list
   * Demonstrates programmatic navigation
   */
  goBack(): void {
    this.router.navigate(['/users']);
  }
}
