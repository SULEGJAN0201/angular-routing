# 🚀 Complete Angular Routing Guide
## From Beginner to Expert

> **A comprehensive guide to mastering Angular routing with code examples, best practices, and real-world scenarios**

---

## 📑 Table of Contents

- [Introduction](#introduction)
- [Part 1: Beginner Concepts](#part-1-beginner-concepts)
- [Part 2: Intermediate Concepts](#part-2-intermediate-concepts)
- [Part 3: Advanced Concepts](#part-3-advanced-concepts)
- [Part 4: Best Practices](#part-4-best-practices)
- [Part 5: Common Patterns](#part-5-common-patterns)
- [Part 6: Troubleshooting](#part-6-troubleshooting)
- [Quick Reference](#quick-reference)

---

## Introduction

### What is Routing?

Routing is the mechanism that allows Angular applications to navigate between different views/components without page reloads. It enables Single Page Application (SPA) behavior where URLs change but the page doesn't refresh.

### Why is Routing Important?

- ✅ **User Experience**: Smooth navigation without page reloads
- ✅ **Browser Integration**: Back/forward buttons work naturally
- ✅ **Bookmarkable URLs**: Users can share and bookmark specific views
- ✅ **SEO**: Search engines can index different routes
- ✅ **Code Organization**: Logical separation of features
- ✅ **Lazy Loading**: Load code only when needed

### Core Concepts Overview

```
URL → Router → Route Match → Guards → Resolvers → Component → View
```

---

## Part 1: Beginner Concepts

### 1.1 Setting Up Routing

#### Step 1: Import Router Module

**For Standalone Components (Angular 15+):**

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
```

**For NgModules (Traditional):**

```typescript
// app.module.ts
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppModule { }
```

---

### 1.2 Basic Route Configuration

#### Creating Routes

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },           // Default route
  { path: 'about', component: AboutComponent },     // /about
  { path: 'contact', component: ContactComponent }  // /contact
];
```

#### Route Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `path` | string | URL segment | `'products'` |
| `component` | Component | Component to render | `HomeComponent` |
| `redirectTo` | string | Redirect destination | `'/home'` |
| `pathMatch` | 'full' \| 'prefix' | Matching strategy | `'full'` |
| `children` | Routes[] | Child routes | `[...]` |
| `loadChildren` | Function | Lazy load module | `() => import(...)` |

---

### 1.3 Router Outlet

#### What is Router Outlet?

`<router-outlet>` is a placeholder directive where the router renders matched components.

#### Basic Usage

```html
<!-- app.component.html -->
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">About</a>
</nav>

<!-- Component renders here based on current route -->
<router-outlet></router-outlet>
```

#### Multiple Named Outlets

```html
<!-- Primary outlet -->
<router-outlet></router-outlet>

<!-- Named outlets -->
<router-outlet name="sidebar"></router-outlet>
<router-outlet name="popup"></router-outlet>
```

**Route Configuration:**

```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  children: [
    {
      path: '',
      component: MainContentComponent,
      outlet: 'primary'  // default
    },
    {
      path: 'chat',
      component: ChatComponent,
      outlet: 'sidebar'
    }
  ]
}
```

**Navigation:**

```typescript
this.router.navigate([
  {
    outlets: {
      primary: ['dashboard'],
      sidebar: ['chat']
    }
  }
]);
```

---

### 1.4 RouterLink Directive

#### Declarative Navigation

```html
<!-- String syntax -->
<a routerLink="/home">Home</a>

<!-- Array syntax (recommended) -->
<a [routerLink]="['/users', userId]">User Profile</a>

<!-- With query params -->
<a [routerLink]="['/search']"
   [queryParams]="{q: 'angular', page: 1}">
  Search
</a>

<!-- With fragment -->
<a [routerLink]="['/faq']"
   fragment="section-3">
  FAQ Section 3
</a>
```

#### RouterLink vs href

| Feature | RouterLink | href |
|---------|-----------|------|
| Page reload | ❌ No | ✅ Yes |
| SPA navigation | ✅ Yes | ❌ No |
| Browser history | ✅ Yes | ✅ Yes |
| Route guards | ✅ Respected | ❌ Ignored |
| Performance | ⚡ Fast | 🐢 Slow |

**❌ Don't do this:**
```html
<a href="/about">About</a>  <!-- Page reloads! -->
```

**✅ Do this:**
```html
<a routerLink="/about">About</a>  <!-- SPA navigation -->
```

---

### 1.5 RouterLinkActive

#### Highlighting Active Links

```html
<nav>
  <a routerLink="/home"
     routerLinkActive="active">
    Home
  </a>

  <a routerLink="/about"
     routerLinkActive="active"
     [routerLinkActiveOptions]="{exact: true}">
    About
  </a>
</nav>
```

**CSS:**

```css
.active {
  font-weight: bold;
  color: #007bff;
  border-bottom: 2px solid #007bff;
}
```

#### Multiple Classes

```html
<a routerLink="/dashboard"
   routerLinkActive="active highlighted"
   [routerLinkActive]="['active', 'highlighted']">
  Dashboard
</a>
```

#### Active Options

```typescript
// Exact match required
[routerLinkActiveOptions]="{exact: true}"

// Default: prefix matching
[routerLinkActiveOptions]="{exact: false}"
```

**Example:**
- URL: `/dashboard/stats`
- `/dashboard` → active (prefix match)
- `/dashboard` with `exact: true` → not active

---

### 1.6 Default Routes and Redirects

#### Empty Path Redirect

```typescript
{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'  // Must match entire URL
}
```

#### pathMatch Options

**Full Match:**
```typescript
{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
}
// Matches: '' or '/'
// Doesn't match: '/something'
```

**Prefix Match:**
```typescript
{
  path: '',
  redirectTo: '/home',
  pathMatch: 'prefix'
}
// Matches: '', '/', '/anything'
// Usually not what you want for empty path!
```

#### Multiple Redirects

```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'old-url', redirectTo: '/new-url', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];
```

---

### 1.7 Route Parameters

#### Defining Route Parameters

```typescript
// Single parameter
{ path: 'users/:id', component: UserDetailComponent }

// Multiple parameters
{ path: 'posts/:year/:month/:slug', component: PostComponent }
```

#### Reading Parameters - Snapshot Method

**Use when:** Component won't be reused for different parameter values

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({...})
export class UserDetailComponent implements OnInit {
  userId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get parameter once
    this.userId = this.route.snapshot.paramMap.get('id')!;
    console.log('User ID:', this.userId);
  }
}
```

#### Reading Parameters - Observable Method

**Use when:** Component might be reused with different parameters

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({...})
export class UserDetailComponent implements OnInit {
  userId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // React to parameter changes
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id')!;
      console.log('User ID changed to:', this.userId);
      this.loadUser(this.userId);
    });
  }

  loadUser(id: string) {
    // Load user data
  }
}
```

#### When to Use Each Method

| Scenario | Method | Reason |
|----------|--------|--------|
| `/users/1` → `/users/2` (same component) | Observable | Component reused |
| `/users/1` → `/posts/5` (different routes) | Snapshot | Component recreated |
| Reading in constructor | ❌ Don't | Route not ready yet |
| Reading in ngOnInit | ✅ Do | Route is ready |

---

### 1.8 Wildcard Routes (404 Pages)

#### Basic 404 Route

```typescript
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },

  // Must be LAST!
  { path: '**', component: NotFoundComponent }
];
```

#### ⚠️ Order Matters!

**❌ Wrong:**
```typescript
export const routes: Routes = [
  { path: '**', component: NotFoundComponent },  // Catches everything!
  { path: 'home', component: HomeComponent },    // Never reached
  { path: 'about', component: AboutComponent }   // Never reached
];
```

**✅ Correct:**
```typescript
export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }  // Last
];
```

#### Custom 404 Component

```typescript
// not-found.component.ts
@Component({
  template: `
    <div class="error-page">
      <h1>404</h1>
      <p>Page not found</p>
      <a routerLink="/home">Go Home</a>
    </div>
  `
})
export class NotFoundComponent {}
```

---

### 1.9 Programmatic Navigation

#### Using Router Service

```typescript
import { Router } from '@angular/router';

@Component({...})
export class MyComponent {
  constructor(private router: Router) {}

  navigateToUser(id: number) {
    // Navigate to route
    this.router.navigate(['/users', id]);
  }

  navigateWithParams() {
    // With query params
    this.router.navigate(['/search'], {
      queryParams: { q: 'angular', page: 1 }
    });
  }

  navigateRelative() {
    // Relative navigation
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
```

#### navigate() vs navigateByUrl()

**navigate() - Array-based (Recommended)**

```typescript
// Builds URL from segments
this.router.navigate(['/users', userId, 'posts', postId]);
// Result: /users/123/posts/456

// Handles encoding
this.router.navigate(['/search', 'special chars!@#']);
// Result: /search/special%20chars!%40%23
```

**navigateByUrl() - String-based**

```typescript
// Direct URL string
this.router.navigateByUrl('/users/123/posts/456');

// Must encode manually
const encoded = encodeURIComponent('special chars');
this.router.navigateByUrl(`/search/${encoded}`);
```

#### Navigation Options

```typescript
this.router.navigate(['/home'], {
  // Query parameters
  queryParams: { page: 1, sort: 'name' },

  // URL fragment (#section)
  fragment: 'top',

  // Preserve existing query params
  queryParamsHandling: 'merge',

  // Replace current history entry
  replaceUrl: true,

  // Pass state (invisible in URL)
  state: { fromDashboard: true }
});
```

---

## Part 2: Intermediate Concepts

### 2.1 Child Routes (Nested Routing)

#### Why Child Routes?

- ✅ Shared layouts (header, sidebar, footer)
- ✅ Hierarchical URL structure
- ✅ Better code organization
- ✅ Scoped routing logic

#### Basic Child Routes

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: DashboardOverviewComponent
      },
      {
        path: 'stats',
        component: DashboardStatsComponent
      },
      {
        path: 'settings',
        component: DashboardSettingsComponent
      }
    ]
  }
];
```

#### Parent Component Template

```html
<!-- dashboard.component.html -->
<div class="dashboard">
  <!-- Parent component content -->
  <header>
    <h1>Dashboard</h1>
  </header>

  <!-- Navigation for child routes -->
  <nav>
    <a routerLink="overview" routerLinkActive="active">Overview</a>
    <a routerLink="stats" routerLinkActive="active">Stats</a>
    <a routerLink="settings" routerLinkActive="active">Settings</a>
  </nav>

  <!-- Child components render here -->
  <router-outlet></router-outlet>
</div>
```

#### URL Structure

```
/dashboard              → DashboardComponent + redirect to overview
/dashboard/overview     → DashboardComponent + DashboardOverviewComponent
/dashboard/stats        → DashboardComponent + DashboardStatsComponent
/dashboard/settings     → DashboardComponent + DashboardSettingsComponent
```

#### Nested Child Routes

```typescript
{
  path: 'admin',
  component: AdminComponent,
  children: [
    {
      path: 'users',
      component: UsersComponent,
      children: [
        { path: ':id', component: UserDetailComponent },
        { path: ':id/edit', component: UserEditComponent }
      ]
    }
  ]
}

// URLs:
// /admin/users
// /admin/users/123
// /admin/users/123/edit
```

---

### 2.2 Route Guards

Route guards control navigation to/from routes. They're like security checkpoints.

#### Types of Guards

| Guard | Purpose | Returns |
|-------|---------|---------|
| `CanActivate` | Can user access route? | boolean \| UrlTree |
| `CanActivateChild` | Can access child routes? | boolean \| UrlTree |
| `CanDeactivate` | Can leave route? | boolean |
| `CanMatch` | Should route be matched? | boolean |
| `Resolve` | Pre-load data | Observable\<T> |

#### CanActivate - Authentication Guard

**Functional Guard (Modern - Angular 15+):**

```typescript
// auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;  // Allow navigation
  } else {
    // Redirect to login with return URL
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }
};
```

**Usage:**

```typescript
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [authGuard]  // Apply guard
}
```

**Class-based Guard (Traditional):**

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
```

#### CanActivateChild - Protect Child Routes

```typescript
export const adminGuard: CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isAdmin();
};

// Usage
{
  path: 'admin',
  component: AdminComponent,
  canActivateChild: [adminGuard],  // Protects all children
  children: [
    { path: 'users', component: UsersComponent },
    { path: 'settings', component: SettingsComponent }
  ]
}
```

#### CanDeactivate - Unsaved Changes Guard

```typescript
// unsaved-changes.guard.ts
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> =
  (component) => {
    return component.canDeactivate ?
      component.canDeactivate() :
      true;
  };

// form.component.ts
@Component({...})
export class FormComponent implements CanComponentDeactivate {
  hasUnsavedChanges = false;

  canDeactivate(): boolean {
    if (this.hasUnsavedChanges) {
      return confirm('You have unsaved changes. Leave anyway?');
    }
    return true;
  }
}

// Routes
{
  path: 'edit',
  component: FormComponent,
  canDeactivate: [unsavedChangesGuard]
}
```

#### Multiple Guards

```typescript
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [authGuard, adminGuard, licenseGuard],
  // All must return true
}
```

Guards execute in order. If any guard returns false, navigation stops.

---

### 2.3 Query Parameters

#### Setting Query Parameters

**In Template:**

```html
<!-- Single param -->
<a [routerLink]="['/search']"
   [queryParams]="{q: 'angular'}">
  Search Angular
</a>

<!-- Multiple params -->
<a [routerLink]="['/products']"
   [queryParams]="{category: 'electronics', sort: 'price', page: 1}">
  Products
</a>
```

**Programmatically:**

```typescript
// Navigate with query params
this.router.navigate(['/search'], {
  queryParams: {
    q: 'angular',
    page: 1,
    sort: 'relevance'
  }
});
// Result: /search?q=angular&page=1&sort=relevance
```

#### Reading Query Parameters

**Snapshot (one-time read):**

```typescript
ngOnInit() {
  const searchQuery = this.route.snapshot.queryParamMap.get('q');
  const page = this.route.snapshot.queryParamMap.get('page');

  console.log('Search:', searchQuery);  // 'angular'
  console.log('Page:', page);           // '1'
}
```

**Observable (reactive):**

```typescript
ngOnInit() {
  this.route.queryParamMap.subscribe(params => {
    const searchQuery = params.get('q');
    const page = parseInt(params.get('page') || '1');

    this.performSearch(searchQuery, page);
  });
}
```

#### Query Params Handling

```typescript
// Replace all query params
this.router.navigate(['/products'], {
  queryParams: { category: 'new' }
});
// Before: /products?sort=price&page=2
// After:  /products?category=new

// Merge with existing params
this.router.navigate(['/products'], {
  queryParams: { page: 3 },
  queryParamsHandling: 'merge'
});
// Before: /products?category=electronics&sort=price
// After:  /products?category=electronics&sort=price&page=3

// Preserve existing params
this.router.navigate(['/products'], {
  queryParamsHandling: 'preserve'
});
// Before: /products?category=electronics
// After:  /products?category=electronics
```

---

### 2.4 Route Data

#### Static Route Data

```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  data: {
    title: 'Dashboard',
    breadcrumb: 'Home > Dashboard',
    requiresAuth: true,
    roles: ['admin', 'manager'],
    animation: 'DashboardPage'
  }
}
```

#### Reading Route Data

```typescript
@Component({...})
export class DashboardComponent implements OnInit {
  pageTitle: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.pageTitle = data['title'];
      document.title = this.pageTitle;
    });
  }
}
```

#### Dynamic Data with Resolvers (see section 3.2)

---

### 2.5 URL Fragments

Fragments are the `#section` part of URLs, used for in-page navigation.

#### Setting Fragments

**Template:**

```html
<a [routerLink]="['/faq']"
   fragment="section-3">
  Jump to Section 3
</a>
```

**Programmatically:**

```typescript
this.router.navigate(['/docs'], {
  fragment: 'installation'
});
// Result: /docs#installation
```

#### Reading Fragments

```typescript
ngOnInit() {
  this.route.fragment.subscribe(fragment => {
    if (fragment) {
      // Scroll to element
      document.getElementById(fragment)?.scrollIntoView();
    }
  });
}
```

#### Scroll Behavior

```typescript
// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
    )
  ]
};
```

---

## Part 3: Advanced Concepts

### 3.1 Lazy Loading

Lazy loading defers loading of features until they're needed, dramatically improving initial load time.

#### Why Lazy Load?

**Without Lazy Loading:**
```
Initial Bundle: 2.5 MB
First Load Time: 8 seconds ❌
```

**With Lazy Loading:**
```
Initial Bundle: 500 KB
First Load Time: 2 seconds ✅
Feature loaded on-demand: +200 KB when accessed
```

#### Setting Up Lazy Loading

**Step 1: Create Feature Routes**

```typescript
// features/admin/admin.routes.ts
import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];
```

**Step 2: Configure Lazy Route**

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: 'home', component: HomeComponent },

  // Lazy loaded route
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes')
      .then(m => m.ADMIN_ROUTES)
  }
];
```

#### How It Works

```
1. User visits /home        → Main bundle loaded (500 KB)
2. User clicks Admin link   → Angular detects lazy route
3. /admin accessed          → admin.routes.ts downloaded (200 KB)
4. Route activated          → AdminComponent rendered
```

#### Lazy Loading Components (Without Children)

```typescript
{
  path: 'profile',
  loadComponent: () => import('./profile/profile.component')
    .then(m => m.ProfileComponent)
}
```

#### Preloading Strategies

**No Preloading (Default):**
```typescript
// Load only when accessed
provideRouter(routes)
```

**Preload All Modules:**
```typescript
import { PreloadAllModules } from '@angular/router';

provideRouter(routes,
  withPreloading(PreloadAllModules)
)
// Loads all lazy modules in background after initial load
```

**Custom Preloading:**

```typescript
// custom-preload.strategy.ts
@Injectable({ providedIn: 'root' })
export class CustomPreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Preload if route has data.preload = true
    return route.data?.['preload'] ? load() : of(null);
  }
}

// Usage
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
  data: { preload: true }  // This will be preloaded
}

provideRouter(routes,
  withPreloading(CustomPreloadStrategy)
)
```

#### Monitoring Lazy Loading

```typescript
// In component
constructor(private router: Router) {
  router.events.subscribe(event => {
    if (event instanceof RouteConfigLoadStart) {
      console.log('Loading module...');
    }
    if (event instanceof RouteConfigLoadEnd) {
      console.log('Module loaded!');
    }
  });
}
```

---

### 3.2 Route Resolvers

Resolvers pre-load data before activating a route, ensuring data is ready when component initializes.

#### Without Resolver (Loading State)

```typescript
@Component({...})
export class UserDetailComponent implements OnInit {
  user: User;
  loading = true;

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.userService.getUser(id).subscribe(user => {
      this.user = user;
      this.loading = false;  // Data loaded
    });
  }
}
```

```html
<div *ngIf="loading">Loading...</div>
<div *ngIf="!loading">
  <h1>{{ user.name }}</h1>
</div>
```

#### With Resolver (No Loading State Needed)

**Step 1: Create Resolver**

```typescript
// user.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService, User } from './user.service';

export const userResolver: ResolveFn<User> = (route, state) => {
  const userService = inject(UserService);
  const userId = route.paramMap.get('id')!;

  // Return Observable - router waits for it
  return userService.getUser(parseInt(userId));
};
```

**Step 2: Add to Route**

```typescript
{
  path: 'users/:id',
  component: UserDetailComponent,
  resolve: {
    user: userResolver  // Data stored in route.data['user']
  }
}
```

**Step 3: Access Resolved Data**

```typescript
@Component({...})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Data is already loaded!
    this.route.data.subscribe(data => {
      this.user = data['user'];  // No loading state needed
    });
  }
}
```

```html
<!-- No loading state needed -->
<h1>{{ user.name }}</h1>
<p>{{ user.email }}</p>
```

#### Multiple Resolvers

```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  resolve: {
    user: userResolver,
    stats: statsResolver,
    notifications: notificationsResolver
  }
}

// In component
this.route.data.subscribe(data => {
  this.user = data['user'];
  this.stats = data['stats'];
  this.notifications = data['notifications'];
});
```

#### Error Handling in Resolvers

```typescript
export const userResolver: ResolveFn<User> = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const userId = route.paramMap.get('id')!;

  return userService.getUser(parseInt(userId)).pipe(
    catchError(error => {
      console.error('Failed to load user:', error);
      // Redirect to error page
      router.navigate(['/error']);
      return EMPTY;
    })
  );
};
```

---

### 3.3 Router Events

Monitor navigation lifecycle with router events.

#### Available Events

```typescript
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({...})
export class AppComponent {
  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log('Navigation started:', event.url);
      }

      if (event instanceof NavigationEnd) {
        console.log('Navigation ended:', event.url);
      }

      if (event instanceof NavigationCancel) {
        console.log('Navigation cancelled');
      }

      if (event instanceof NavigationError) {
        console.error('Navigation error:', event.error);
      }
    });
  }
}
```

#### Loading Indicator

```typescript
@Component({...})
export class AppComponent {
  loading = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }

      if (event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError) {
        this.loading = false;
      }
    });
  }
}
```

```html
<div *ngIf="loading" class="loading-bar"></div>
<router-outlet></router-outlet>
```

#### All Router Events

| Event | When | Use Case |
|-------|------|----------|
| `NavigationStart` | Navigation begins | Show loader |
| `RoutesRecognized` | Routes matched | Analytics |
| `RouteConfigLoadStart` | Lazy module loading | Show progress |
| `RouteConfigLoadEnd` | Lazy module loaded | Hide progress |
| `NavigationEnd` | Navigation complete | Hide loader, analytics |
| `NavigationCancel` | Navigation cancelled | Hide loader |
| `NavigationError` | Navigation failed | Error handling |

---

### 3.4 Route Animations

Add smooth transitions between routes.

#### Setup

```typescript
// app.component.ts
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  template: `
    <div [@routeAnimations]="getRouteAnimationData()">
      <router-outlet></router-outlet>
    </div>
  `,
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {
  constructor(private route: ActivatedRoute) {}

  getRouteAnimationData() {
    return this.route.snapshot.data['animation'];
  }
}
```

#### Route Configuration

```typescript
{
  path: 'home',
  component: HomeComponent,
  data: { animation: 'HomePage' }
},
{
  path: 'about',
  component: AboutComponent,
  data: { animation: 'AboutPage' }
}
```

---

### 3.5 Custom URL Matching

Create custom route matching logic.

```typescript
import { UrlSegment } from '@angular/router';

// Custom matcher function
export function articleMatcher(url: UrlSegment[]) {
  // Match URLs like: /2024/01/my-article-slug
  if (url.length === 3) {
    const year = url[0].path;
    const month = url[1].path;
    const slug = url[2].path;

    if (/^\d{4}$/.test(year) && /^\d{2}$/.test(month)) {
      return {
        consumed: url,
        posParams: {
          year: new UrlSegment(year, {}),
          month: new UrlSegment(month, {}),
          slug: new UrlSegment(slug, {})
        }
      };
    }
  }
  return null;
}

// Use in routes
{
  matcher: articleMatcher,
  component: ArticleComponent
}
```

---

## Part 4: Best Practices

### 4.1 Route Organization

#### Feature-based Structure

```
src/app/
├── features/
│   ├── admin/
│   │   ├── admin.routes.ts
│   │   ├── components/
│   │   └── services/
│   ├── shop/
│   │   ├── shop.routes.ts
│   │   ├── components/
│   │   └── services/
│   └── user/
│       ├── user.routes.ts
│       └── components/
├── core/
│   ├── guards/
│   └── services/
└── app.routes.ts (main routes)
```

#### Route Naming Conventions

```typescript
// ✅ Good: Clear, descriptive paths
{ path: 'user-profile', component: UserProfileComponent }
{ path: 'products/:id/reviews', component: ProductReviewsComponent }

// ❌ Bad: Unclear, abbreviated
{ path: 'up', component: UserProfileComponent }
{ path: 'p/:i/r', component: ProductReviewsComponent }
```

---

### 4.2 Performance Optimization

#### 1. Use Lazy Loading

```typescript
// Load features on-demand
{
  path: 'admin',
  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
}
```

#### 2. Preloading Strategy

```typescript
// Preload important routes
provideRouter(routes, withPreloading(PreloadAllModules))
```

#### 3. Route Reuse Strategy

```typescript
// Reuse components instead of destroying/recreating
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
  // ... other methods
}

// Provide in config
providers: [
  { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
]
```

---

### 4.3 Security

#### 1. Always Use Guards for Protected Routes

```typescript
// ✅ Protected
{
  path: 'admin',
  canActivate: [authGuard, adminGuard],
  component: AdminComponent
}

// ❌ Unprotected
{
  path: 'admin',
  component: AdminComponent  // Anyone can access!
}
```

#### 2. Validate Route Parameters

```typescript
@Component({...})
export class UserComponent implements OnInit {
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    // ✅ Validate
    if (!id || !/^\d+$/.test(id)) {
      this.router.navigate(['/error']);
      return;
    }

    this.loadUser(parseInt(id));
  }
}
```

#### 3. Sanitize User Input in URLs

```typescript
import { DomSanitizer } from '@angular/platform-browser';

constructor(private sanitizer: DomSanitizer) {}

navigateToUser(username: string) {
  // Sanitize before using in URL
  const safe = this.sanitizer.sanitize(SecurityContext.URL, username);
  this.router.navigate(['/users', safe]);
}
```

---

### 4.4 SEO and Meta Tags

#### Setting Page Title

```typescript
// In route configuration
{
  path: 'about',
  component: AboutComponent,
  title: 'About Us - My App'
}

// Programmatically
import { Title } from '@angular/platform-browser';

@Component({...})
export class AboutComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('About Us - My App');
  }
}
```

#### Custom Title Strategy

```typescript
// custom-title.strategy.ts
@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`My App - ${title}`);
    }
  }
}

// Provide
providers: [
  { provide: TitleStrategy, useClass: CustomTitleStrategy }
]
```

---

## Part 5: Common Patterns

### 5.1 Breadcrumbs

```typescript
// breadcrumb.service.ts
@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs$.next(this.buildBreadcrumbs(this.route.root));
    });
  }

  private buildBreadcrumbs(route: ActivatedRoute, url = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (label) {
        breadcrumbs.push({ label, url });
      }

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}

// breadcrumb.component.ts
@Component({
  selector: 'app-breadcrumb',
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <span *ngFor="let breadcrumb of breadcrumbs$ | async">
        / <a [routerLink]="breadcrumb.url">{{ breadcrumb.label }}</a>
      </span>
    </nav>
  `
})
export class BreadcrumbComponent {
  breadcrumbs$ = this.breadcrumbService.breadcrumbs$;

  constructor(private breadcrumbService: BreadcrumbService) {}
}
```

---

### 5.2 Modal Routes

```typescript
// Routes
{
  path: 'products',
  component: ProductsComponent,
  children: [
    {
      path: ':id',
      component: ProductDetailModalComponent,
      outlet: 'modal'
    }
  ]
}

// Open modal
this.router.navigate(['/products', { outlets: { modal: ['123'] } }]);

// Close modal
this.router.navigate(['/products', { outlets: { modal: null } }]);
```

---

### 5.3 Tab Navigation

```typescript
@Component({
  template: `
    <nav>
      <a routerLink="profile" routerLinkActive="active">Profile</a>
      <a routerLink="settings" routerLinkActive="active">Settings</a>
      <a routerLink="notifications" routerLinkActive="active">Notifications</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class UserComponent {}

// Routes
{
  path: 'user/:id',
  component: UserComponent,
  children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'notifications', component: NotificationsComponent }
  ]
}
```

---

## Part 6: Troubleshooting

### Common Issues and Solutions

#### Issue 1: Routes Not Working

**Symptom:** Clicking links refreshes page

**Solution:** Use `routerLink` instead of `href`

```html
<!-- ❌ Wrong -->
<a href="/about">About</a>

<!-- ✅ Correct -->
<a routerLink="/about">About</a>
```

---

#### Issue 2: Wildcard Route Catching Everything

**Symptom:** 404 page shows for all routes

**Solution:** Move wildcard route to the end

```typescript
// ❌ Wrong
{ path: '**', component: NotFoundComponent },
{ path: 'home', component: HomeComponent }

// ✅ Correct
{ path: 'home', component: HomeComponent },
{ path: '**', component: NotFoundComponent }
```

---

#### Issue 3: Route Parameters Not Updating

**Symptom:** Component doesn't update when parameter changes

**Solution:** Use Observable instead of snapshot

```typescript
// ❌ Won't update
ngOnInit() {
  this.id = this.route.snapshot.paramMap.get('id');
}

// ✅ Updates on change
ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.id = params.get('id');
    this.loadData(this.id);
  });
}
```

---

#### Issue 4: Can't Navigate from Guard

**Symptom:** Navigation in guard doesn't work

**Solution:** Return UrlTree, don't call navigate()

```typescript
// ❌ Won't work
canActivate() {
  this.router.navigate(['/login']);
  return false;
}

// ✅ Works
canActivate() {
  return this.router.createUrlTree(['/login']);
}
```

---

## Quick Reference

### Router Navigation

```typescript
// Basic navigation
this.router.navigate(['/home']);

// With parameters
this.router.navigate(['/users', userId]);

// With query params
this.router.navigate(['/search'], { queryParams: { q: 'angular' } });

// With fragment
this.router.navigate(['/docs'], { fragment: 'installation' });

// Relative navigation
this.router.navigate(['../'], { relativeTo: this.route });

// Replace URL
this.router.navigate(['/home'], { replaceUrl: true });
```

### Reading Route Data

```typescript
// Route parameters
const id = this.route.snapshot.paramMap.get('id');
this.route.paramMap.subscribe(params => { ... });

// Query parameters
const search = this.route.snapshot.queryParamMap.get('q');
this.route.queryParamMap.subscribe(params => { ... });

// Route data
this.route.data.subscribe(data => { ... });

// Fragment
this.route.fragment.subscribe(fragment => { ... });
```

### Route Configuration

```typescript
{
  path: 'path',                    // URL segment
  component: Component,            // Component to render
  redirectTo: '/other',           // Redirect
  pathMatch: 'full',              // Matching strategy
  children: [],                   // Child routes
  canActivate: [guard],           // Guards
  resolve: { data: resolver },    // Resolvers
  data: { key: 'value' },        // Static data
  loadChildren: () => import(),   // Lazy loading
  title: 'Page Title'            // Browser title
}
```

---

## Summary

### Key Takeaways

1. **Always use `routerLink`** instead of `href` for SPA navigation
2. **Place wildcard routes last** in the route configuration
3. **Use guards** to protect routes and control access
4. **Implement lazy loading** for better performance
5. **Use resolvers** to pre-load data and avoid loading states
6. **Subscribe to paramMap** when component might be reused
7. **Configure proper title strategy** for SEO
8. **Organize routes** by feature for maintainability

### Learning Path

**Week 1: Basics**
- RouterLink, RouterOutlet
- Basic route configuration
- Route parameters

**Week 2: Intermediate**
- Child routes
- Route guards
- Query parameters

**Week 3: Advanced**
- Lazy loading
- Resolvers
- Router events

**Week 4: Mastery**
- Custom strategies
- Performance optimization
- Real-world patterns

---

## Additional Resources

- [Official Angular Router Docs](https://angular.io/guide/router)
- [Angular Router API Reference](https://angular.io/api/router)
- [Angular University - Router Course](https://angular-university.io/)
- This application code - Check the inline comments!

---

**Happy Routing! 🚀**
