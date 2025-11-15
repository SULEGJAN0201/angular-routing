import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../../services/user';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * USERS COMPONENT
 *
 * ROUTING CONCEPTS DEMONSTRATED:
 * 1. Route Parameters: Navigating to /users/:id
 * 2. Programmatic Navigation: Using Router.navigate() with parameters
 * 3. RouterLink with Parameters: [routerLink]="['/users', user.id]"
 *
 * This component displays a list of users and allows navigation to
 * individual user detail pages using route parameters.
 */
@Component({
  selector: 'app-users',
  imports: [CommonModule, RouterLink],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch all users
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      console.log('📋 Users loaded:', users.length);
    });
  }

  /**
   * ROUTING CONCEPT: Programmatic Navigation with Route Parameters
   *
   * Navigate to user detail page: /users/:id
   *
   * Methods:
   * 1. Array syntax: this.router.navigate(['/users', userId])
   * 2. String syntax: this.router.navigateByUrl(`/users/${userId}`)
   *
   * Array syntax is preferred as it handles encoding automatically
   */
  viewUserDetails(userId: number): void {
    console.log(`🔍 Navigating to user details: /users/${userId}`);

    /**
     * Navigate with route parameter
     * This will match the route: { path: 'users/:id', ... }
     * The :id parameter will be set to userId
     */
    this.router.navigate(['/users', userId]);
  }
}
