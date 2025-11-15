import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

/**
 * DASHBOARD COMPONENT - NESTED ROUTING DEMO
 *
 * ROUTING CONCEPTS DEMONSTRATED:
 * 1. Child Routes: Dashboard has child routes (overview, stats, settings)
 * 2. Nested Router Outlet: Child components render in this component's <router-outlet>
 * 3. Relative Navigation: Navigate to child routes
 * 4. Protected Routes: This entire section requires authentication
 *
 * STRUCTURE:
 * /dashboard (this component)
 *   ├─ /dashboard/overview (child route)
 *   ├─ /dashboard/stats (child route)
 *   └─ /dashboard/settings (child route)
 */
@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {}
