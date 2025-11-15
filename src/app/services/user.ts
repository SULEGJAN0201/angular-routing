import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

/**
 * User Interface
 * Defines the structure of a user object
 */
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  bio: string;
}

/**
 * User Service
 *
 * PURPOSE: Manages user data and provides methods to fetch user information.
 * This service is used with Route Resolvers to pre-load data before navigating
 * to a route.
 *
 * ROUTING CONCEPTS DEMONSTRATED:
 * - Used by UserResolver to fetch data before route activation
 * - Simulates async data fetching with Observable
 * - Demonstrates how to handle route parameters to fetch specific data
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * Mock user data
   * In a real application, this would come from a backend API
   */
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      bio: 'Full-stack developer with 10 years of experience in Angular and Node.js.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Developer',
      bio: 'Frontend specialist focusing on Angular and modern web technologies.',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'Designer',
      bio: 'UX/UI designer passionate about creating intuitive user experiences.',
    },
    {
      id: 4,
      name: 'Alice Williams',
      email: 'alice.williams@example.com',
      role: 'Manager',
      bio: 'Project manager with expertise in agile methodologies and team leadership.',
    },
  ];

  /**
   * Fetches all users
   *
   * @returns Observable<User[]> - Stream of all users
   *
   * NOTE: The delay() operator simulates network latency
   * This demonstrates how resolvers wait for data before activating routes
   */
  getAllUsers(): Observable<User[]> {
    return of(this.users).pipe(
      delay(500) // Simulate 500ms network delay
    );
  }

  /**
   * Fetches a specific user by ID
   *
   * @param id - The user ID to fetch
   * @returns Observable<User | undefined> - Stream of the requested user or undefined
   *
   * ROUTING USE CASE:
   * This method is called by the UserResolver when navigating to /users/:id
   * The resolver extracts the :id parameter and passes it to this method
   */
  getUserById(id: number): Observable<User | undefined> {
    const user = this.users.find(u => u.id === id);
    return of(user).pipe(
      delay(300) // Simulate network delay
    );
  }

  /**
   * Searches users by name
   *
   * @param searchTerm - The search term to filter users
   * @returns Observable<User[]> - Stream of matching users
   *
   * ROUTING USE CASE:
   * This demonstrates query parameters in routing
   * Can be used with routes like /users?search=john
   */
  searchUsers(searchTerm: string): Observable<User[]> {
    const filtered = this.users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filtered).pipe(delay(200));
  }
}
