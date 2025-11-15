import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * HOME COMPONENT
 *
 * PURPOSE: Landing page that introduces the routing application
 *
 * ROUTING CONCEPTS:
 * - Basic component routing
 * - RouterLink for navigation
 * - Static route configuration
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  // No special logic needed for this introductory page
}
