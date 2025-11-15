# 🧭 Angular Routing - Complete Learning Guide

This application demonstrates **Angular Routing** concepts from beginner to advanced level, with comprehensive code comments and examples.

## 📚 Table of Contents

1. [Getting Started](#getting-started)
2. [Beginner Concepts](#beginner-concepts)
3. [Intermediate Concepts](#intermediate-concepts)
4. [Advanced Concepts](#advanced-concepts)
5. [Project Structure](#project-structure)
6. [Key Files to Study](#key-files-to-study)
7. [Running the Application](#running-the-application)

---

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Run Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`

---

## 🔰 Beginner Concepts

### 1. Basic Route Configuration

**File**: `src/app/app.routes.ts`

```typescript
{
  path: 'home',
  component: HomeComponent,
  title: 'Home Page'
}
```

**What it does**: Maps the `/home` URL to the `HomeComponent`.

**Try it**: Navigate to `/home` in the browser.

---

### 2. RouterLink Directive

**File**: `src/app/app.html`

```html
<a routerLink="/home">Home</a>
```

**What it does**: Creates clickable navigation links without page reload.

**Benefits**:
- SPA navigation (no page refresh)
- Proper browser history management
- Works with back/forward buttons

---

### 3. RouterOutlet

**File**: `src/app/app.html`

```html
<router-outlet></router-outlet>
```

**What it does**: Placeholder where routed components are rendered.

**How it works**:
1. User navigates to a route
2. Router matches the URL to a route configuration
3. Component is instantiated
4. Component renders inside `<router-outlet>`

---

### 4. Route Parameters

**File**: `src/app/app.routes.ts`

```typescript
{
  path: 'users/:id',
  component: UserDetailComponent
}
```

**Usage**: `/users/1`, `/users/2`, etc.

**Reading parameters** (`src/app/components/user-detail/user-detail.ts`):

```typescript
const id = this.route.snapshot.paramMap.get('id');
// or reactive:
this.route.paramMap.subscribe(params => {
  const id = params.get('id');
});
```

**Try it**: Click any user in the Users page.

---

### 5. Default Route & Redirects

**File**: `src/app/app.routes.ts`

```typescript
{
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
}
```

**What it does**: Redirects empty path (`/`) to `/home`.

**pathMatch options**:
- `'full'`: Exact match required
- `'prefix'`: Partial match allowed

---

### 6. Wildcard Route (404)

**File**: `src/app/app.routes.ts`

```typescript
{
  path: '**',
  component: NotFoundComponent
}
```

**What it does**: Catches all undefined routes.

**Important**: Must be the **LAST** route in the array!

**Try it**: Navigate to `/this-does-not-exist`

---

## ⚙️ Intermediate Concepts

### 7. Child Routes (Nested Routing)

**File**: `src/app/app.routes.ts`

```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  children: [
    { path: 'overview', component: OverviewComponent },
    { path: 'stats', component: StatsComponent },
    { path: 'settings', component: SettingsComponent }
  ]
}
```

**Parent component** (`src/app/components/dashboard/dashboard.html`):

```html
<nav>
  <a routerLink="overview">Overview</a>
  <a routerLink="stats">Stats</a>
</nav>
<router-outlet></router-outlet>  <!-- Child routes render here -->
```

**URLs**:
- `/dashboard/overview`
- `/dashboard/stats`
- `/dashboard/settings`

**Benefits**:
- Shared parent layout
- Hierarchical structure
- Clean URL organization

**Try it**: Navigate to Dashboard and use the sidebar.

---

### 8. Route Guards (canActivate)

**File**: `src/app/guards/auth-guard.ts`

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.checkAuthentication()) {
    return true; // Allow navigation
  } else {
    // Redirect to login with return URL
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }
};
```

**Usage** (`src/app/app.routes.ts`):

```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]  // Protected route
}
```

**How it works**:
1. User tries to access `/dashboard`
2. Guard checks authentication
3. If authenticated: Allow access
4. If not: Redirect to `/login?returnUrl=/dashboard`

**Try it**: Try accessing Dashboard without logging in.

---

### 9. Query Parameters

**Setting query params**:

```typescript
// In code
this.router.navigate(['/login'], {
  queryParams: { returnUrl: '/dashboard' }
});

// In template
<a [routerLink]="['/search']" [queryParams]="{q: 'angular'}">Search</a>
```

**Reading query params** (`src/app/components/login/login.ts`):

```typescript
const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
// or reactive:
this.route.queryParamMap.subscribe(params => {
  const returnUrl = params.get('returnUrl');
});
```

**Try it**: Click Dashboard without logging in, observe the URL.

---

### 10. Route Data

**File**: `src/app/app.routes.ts`

```typescript
{
  path: 'home',
  component: HomeComponent,
  data: {
    title: 'Home Page',
    breadcrumb: 'Home',
    requiresAuth: false
  }
}
```

**Reading route data**:

```typescript
this.route.data.subscribe(data => {
  console.log(data['title']); // 'Home Page'
});
```

**Use cases**:
- Page titles
- Breadcrumbs
- Permissions
- Configuration

---

## 🚀 Advanced Concepts

### 11. Lazy Loading

**File**: `src/app/app.routes.ts`

```typescript
{
  path: 'products',
  loadChildren: () => import('./features/products/products.routes')
    .then(m => m.PRODUCTS_ROUTES)
}
```

**What it does**: Loads the `products` feature only when needed.

**Benefits**:
- **Smaller initial bundle**: Faster app startup
- **Code splitting**: Separate chunks per feature
- **On-demand loading**: Load only what users access

**How to verify**:
1. Open browser DevTools → Network tab
2. Navigate to Products
3. See separate chunk file downloaded

**Try it**: Navigate to Products and watch the Network tab.

---

### 12. Route Resolvers

**File**: `src/app/resolvers/user-resolver.ts`

```typescript
export const userResolver: ResolveFn<User | undefined> = (route) => {
  const userService = inject(UserService);
  const userId = route.paramMap.get('id');
  return userService.getUserById(parseInt(userId!));
};
```

**Usage** (`src/app/app.routes.ts`):

```typescript
{
  path: 'users/:id',
  component: UserDetailComponent,
  resolve: {
    user: userResolver  // Data pre-loaded
  }
}
```

**Reading resolved data** (`src/app/components/user-detail/user-detail.ts`):

```typescript
this.route.data.subscribe(data => {
  this.user = data['user']; // Already loaded!
});
```

**Benefits**:
- Data ready on component init
- No loading spinners needed
- Better user experience
- Centralized data fetching

**Try it**: Click any user - data loads before component displays.

---

### 13. RouterLinkActive

**File**: `src/app/app.html`

```html
<a routerLink="/home" 
   routerLinkActive="active"
   class="nav-link">
  Home
</a>
```

**What it does**: Adds `active` CSS class when route is active.

**CSS**:

```css
.nav-link.active {
  background-color: blue;
  font-weight: bold;
}
```

---

### 14. Programmatic Navigation

**Basic navigation**:

```typescript
// Navigate to route
this.router.navigate(['/home']);

// Navigate with parameters
this.router.navigate(['/users', userId]);

// Navigate with query params
this.router.navigate(['/search'], {
  queryParams: { q: 'angular' }
});
```

**NavigationExtras**:

```typescript
this.router.navigate(['/home'], {
  queryParams: { session: 'ended' },
  fragment: 'section-2',          // URL#section-2
  replaceUrl: true,                // Replace history entry
  state: { customData: 'value' }   // Hidden state data
});
```

**Try it**: Logout button in the header uses programmatic navigation.

---

### 15. Route Configuration Options

**Complete route example**:

```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard],        // Guard
  resolve: { data: dataResolver }, // Resolver
  data: { title: 'Dashboard' },    // Static data
  title: 'Dashboard Page',         // Browser title
  children: [ /* child routes */ ] // Nested routes
}
```

---

## 📁 Project Structure

```
src/app/
├── app.routes.ts              # Main routing configuration ⭐
├── app.config.ts              # App configuration with routing
├── app.ts                     # Root component with navigation
│
├── components/                # Feature components
│   ├── home/                  # Basic routing
│   ├── about/                 # Static route
│   ├── users/                 # Route parameters
│   ├── user-detail/           # Resolvers
│   ├── login/                 # Query parameters
│   ├── dashboard/             # Nested routing ⭐
│   │   ├── overview/
│   │   ├── stats/
│   │   └── settings/
│   ├── contact/               # Static route
│   └── not-found/             # Wildcard route
│
├── features/                  # Lazy-loaded features
│   └── products/              # Lazy loading ⭐
│       ├── products.routes.ts # Feature routing
│       ├── product-list/
│       └── product-detail/
│
├── guards/                    # Route guards
│   └── auth-guard.ts          # Auth guard ⭐
│
├── resolvers/                 # Route resolvers
│   └── user-resolver.ts       # User resolver ⭐
│
└── services/                  # Services
    ├── auth.ts                # Authentication
    └── user.ts                # User data
```

**⭐ = Must study files**

---

## 🔑 Key Files to Study

### 1. **`src/app/app.routes.ts`**
   - **All routing concepts in one place**
   - Comments explain each concept
   - Start here!

### 2. **`src/app/guards/auth-guard.ts`**
   - Route protection
   - Redirects
   - Query parameters

### 3. **`src/app/resolvers/user-resolver.ts`**
   - Data pre-loading
   - Route parameters
   - Async operations

### 4. **`src/app/components/dashboard/dashboard.ts`**
   - Nested routing
   - Child routes
   - Shared layouts

### 5. **`src/app/features/products/products.routes.ts`**
   - Lazy loading
   - Feature modules
   - Code splitting

---

## 🏃 Running the Application

### Development Server

```bash
ng serve
```

Open `http://localhost:4200/`

### Build

```bash
ng build
```

### Analyze Bundle Size

```bash
ng build --stats-json
npx webpack-bundle-analyzer dist/routing-app/stats.json
```

---

## 🎯 Learning Path

### Day 1: Beginner
1. Read `app.routes.ts` (basic routes section)
2. Explore Home, About, Contact pages
3. Try the Users page (route parameters)
4. Navigate to a non-existent page (404)

### Day 2: Intermediate
1. Study Dashboard component (nested routing)
2. Try accessing Dashboard without login (guards)
3. Login and access Dashboard
4. Examine the Login component (query params)

### Day 3: Advanced
1. Open DevTools → Network tab
2. Navigate to Products (watch lazy loading)
3. Study `products.routes.ts` (feature routing)
4. Read `user-resolver.ts` (resolvers)
5. Check UserDetail component (resolved data)

---

## 📖 Routing Cheat Sheet

| Concept | Syntax | File |
|---------|--------|------|
| **Basic Route** | `{ path: 'home', component: HomeComponent }` | `app.routes.ts` |
| **Route Parameter** | `{ path: 'users/:id', ... }` | `app.routes.ts` |
| **Child Route** | `children: [...]` | `app.routes.ts` |
| **Lazy Load** | `loadChildren: () => import(...)` | `app.routes.ts` |
| **Guard** | `canActivate: [authGuard]` | `app.routes.ts` |
| **Resolver** | `resolve: { user: userResolver }` | `app.routes.ts` |
| **Redirect** | `redirectTo: '/home'` | `app.routes.ts` |
| **Wildcard** | `path: '**'` | `app.routes.ts` |
| **RouterLink** | `<a routerLink="/home">` | Templates |
| **Navigate** | `router.navigate(['/home'])` | Components |
| **Read Params** | `route.paramMap.get('id')` | Components |
| **Query Params** | `queryParams: { key: value }` | Templates/Code |

---

## 💡 Tips

1. **Check console logs**: All routing actions are logged
2. **Open DevTools**: Watch Network tab for lazy loading
3. **Try authentication**: Dashboard requires login
4. **Examine URLs**: Watch how they change with routing
5. **Read comments**: Every file has detailed explanations

---

## 🎓 Further Learning

- [Official Angular Router Docs](https://angular.io/guide/router)
- [Angular University Routing Course](https://angular-university.io/)
- Check browser console for routing logs in this app

---

## 📝 Summary

This application covers:

✅ **Beginner**: Basic routes, RouterLink, parameters, redirects  
✅ **Intermediate**: Child routes, guards, query params, route data  
✅ **Advanced**: Lazy loading, resolvers, programmatic navigation  

**Every concept is documented with comments in the code.**

Happy Learning! 🚀
