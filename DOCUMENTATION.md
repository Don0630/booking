# Full-Stack Monorepo Documentation

A complete guide covering everything built in this project — from setup to authentication.

---

## Table of Contents

1. [What is a Monorepo?](#what-is-a-monorepo)
2. [What is Turborepo?](#what-is-turborepo)
3. [Project Structure](#project-structure)
4. [Tech Stack](#tech-stack)
5. [Getting Started](#getting-started)
6. [Database](#database)
7. [Authentication & Token System](#authentication--token-system)
8. [Frontend Architecture](#frontend-architecture)
9. [Backend Architecture](#backend-architecture)
10. [UI Components](#ui-components)
11. [Common Errors & Fixes](#common-errors--fixes)
12. [Key Concepts Explained](#key-concepts-explained)
13. [Next Steps](#next-steps)

---

## What is a Monorepo?

A **monorepo** (monolithic repository) is a single Git repository that holds multiple projects together.

Instead of separate repos:
```
repo-frontend/
repo-backend/
repo-ui-library/
```

You have one repo with everything:
```
my-template/
├── apps/
│   ├── client/     ← React frontend
│   └── server/     ← Node.js backend
└── packages/
    └── shared/     ← Shared types & utilities
```

### Why use a monorepo?
- **Shared code** — frontend and backend share types without publishing npm packages
- **One place** — single repo to clone, one PR to change multiple apps
- **Consistent tooling** — same linting, testing, and build config across all projects
- **Easier refactoring** — rename a function and update all apps in one commit

### Monorepo vs Monolithic
| | **Monorepo** | **Monolithic** |
|---|---|---|
| **What it is** | A repo structure | An architecture pattern |
| **About** | How you organize code/files | How you design your application |
| **Example** | One Git repo with client + server | One big app where everything is tangled |
| **Can be split?** | Each package runs independently | Hard to split — everything is coupled |

---

## What is Turborepo?

**Turborepo** is a smart build tool made specifically for monorepos. It sits on top of your package manager and makes everything faster and easier to manage.

### Without Turborepo:
Every time you run a command, you manually figure out what to run and in what order.

### With Turborepo:
```bash
turbo dev
```
It automatically:
- Builds `shared` first (since client & server depend on it)
- Then builds `client` and `server` in parallel
- **Caches results** — if nothing changed, it skips the build entirely ⚡

### Key benefits:
| Feature | What it means |
|---|---|
| **Task pipelines** | Define order: build shared → then client + server |
| **Caching** | Skips tasks if files haven't changed |
| **Parallel execution** | Runs independent tasks at the same time |
| **One command** | `turbo dev` starts all apps at once |

---

## Project Structure

```
my-template/
├── apps/
│   ├── client/                    ← React + Vite frontend
│   │   └── src/
│   │       ├── api/               ← API functions (axios calls)
│   │       │   ├── auth.ts        ← auth API functions
│   │       │   └── users.ts       ← users API functions
│   │       ├── components/
│   │       │   ├── data-table/    ← reusable DataTable component
│   │       │   │   ├── index.tsx
│   │       │   │   ├── toolbar.tsx
│   │       │   │   └── pagination.tsx
│   │       │   ├── ui/            ← shadcn components
│   │       │   ├── Layout.tsx
│   │       │   ├── Navbar.tsx
│   │       │   ├── Sidebar.tsx
│   │       │   ├── ProtectedRoute.tsx
│   │       │   └── theme-provider.tsx
│   │       ├── context/
│   │       │   └── AuthContext.tsx ← auth state management
│   │       ├── hooks/
│   │       │   └── useUsers.ts    ← TanStack Query hooks
│   │       ├── lib/
│   │       │   └── axios.ts       ← axios instance + interceptors
│   │       ├── pages/
│   │       │   ├── Dashboard.tsx
│   │       │   ├── Login.tsx
│   │       │   ├── Users.tsx
│   │       │   ├── UserDetail.tsx
│   │       │   ├── Products.tsx
│   │       │   └── Settings.tsx
│   │       └── App.tsx            ← routes
│   └── server/                    ← Node.js + Express backend
│       ├── prisma/
│       │   ├── schema.prisma      ← database schema
│       │   ├── seed.ts            ← seed data
│       │   └── migrations/        ← migration history
│       └── src/
│           ├── db/
│           │   └── index.ts       ← database connection
│           ├── models/            ← database queries
│           │   ├── user.model.ts
│           │   └── auth.model.ts
│           ├── services/          ← business logic
│           │   ├── user.service.ts
│           │   └── auth.service.ts
│           ├── controllers/       ← request/response handlers
│           │   ├── user.controller.ts
│           │   └── auth.controller.ts
│           ├── routes/            ← API endpoints
│           │   ├── user.route.ts
│           │   └── auth.route.ts
│           ├── middleware/
│           │   └── errorHandler.ts
│           └── index.ts           ← main server entry point
├── packages/
│   └── shared/                    ← shared types & utilities
│       └── src/
│           └── index.ts
├── turbo.json                     ← Turborepo config
├── eslint.config.js               ← ESLint config
├── .prettierrc                    ← Prettier config
└── package.json                   ← root package.json (workspaces)
```

---

## Tech Stack

### Frontend (apps/client)
| Technology | Purpose |
|---|---|
| **React** | UI library |
| **Vite** | Build tool |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling |
| **shadcn/ui** | Component library (built on Radix UI) |
| **React Router** | Client-side routing |
| **TanStack Table** | Data tables |
| **TanStack Query** | Data fetching & caching |
| **Axios** | HTTP client |
| **Lucide React** | Icons |
| **next-themes** | Dark mode |

### Backend (apps/server)
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime |
| **Express** | Web framework |
| **TypeScript** | Type safety |
| **tsx** | Run TypeScript directly |
| **Prisma ORM** | Database client |
| **@prisma/adapter-pg** | PostgreSQL driver adapter |
| **bcrypt** | Password hashing |
| **jsonwebtoken** | JWT creation & verification |
| **cookie-parser** | Parse httpOnly cookies |
| **cors** | Cross-origin resource sharing |
| **dotenv** | Environment variables |

### Shared (packages/shared)
| Technology | Purpose |
|---|---|
| **TypeScript** | Shared types and interfaces |

### DevOps
| Technology | Purpose |
|---|---|
| **Turborepo** | Monorepo build tool |
| **npm workspaces** | Package management |
| **ESLint** | Code linting |
| **Prettier** | Code formatting |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 10+
- PostgreSQL installed and running

### 1. Install dependencies
```bash
cd my-template
npm install
```

### 2. Set up environment variables
Create `apps/server/.env`:
```dotenv
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/my_template"
JWT_SECRET="your-generated-secret-key"
JWT_EXPIRES_IN="15m"
REFRESH_TOKEN_EXPIRES_IN="30d"
```

Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Set up the database
```bash
cd apps/server
npx prisma migrate dev --name init
npx prisma generate
npm run seed
```

### 4. Run the project
```bash
cd my-template
npm run dev
```

- **Client** → http://localhost:5173
- **Server** → http://localhost:5000

### 5. Login
```
Email: john@example.com
Password: password123
```

---

## Database

### Schema
```prisma
model User {
  id            Int            @id @default(autoincrement())
  name          String
  email         String         @unique
  password      String
  role          String         @default("User")
  status        String         @default("Active")
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  refreshTokens RefreshToken[]
}

model RefreshToken {
  id        Int      @id @default(autoincrement())
  token     String   @unique
  userId    Int
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
}
```

### Prisma Commands
```bash
# Create a migration after schema changes
npx prisma migrate dev --name <migration-name>

# Generate Prisma client after schema changes
npx prisma generate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Seed the database with test data
npm run seed
```

### What is seeding?
Seeding is a script that populates the database with test data automatically.
It's used so every developer gets the same starting data when they clone the project.

```bash
npm run seed  # inserts test users with hashed passwords
```

### Why store refresh tokens in the database?
This lets you revoke access instantly:
```ts
// Log out user from all devices:
await prisma.refreshToken.deleteMany({ where: { userId: 5 } })
// Even if they have the cookie, it's useless — it's not in the DB anymore!
```

---

## Authentication & Token System

### The two tokens

| Token | Purpose | Lifespan | Where stored |
|---|---|---|---|
| **JWT (access token)** | Proves who you are on each request | 15 minutes | `token` httpOnly cookie |
| **Refresh token** | Gets you a new JWT when it expires | 30 days | `refreshToken` cookie + database |

### Why two tokens?
- **Long-lived only (30 days)** → ❌ If stolen, attacker has access for 30 days
- **Short-lived only (15 min)** → ❌ User must re-login every 15 minutes — annoying!
- **Both together** → ✅ Short JWT limits damage if stolen; refresh token keeps user logged in

### Login flow
```
User enters email/password
        ↓
Server finds user by email
        ↓
bcrypt.compare(password, hashedPassword)
        ↓
If valid → jwt.sign() creates JWT (15 min)
        ↓
If "Remember Me" → creates refresh token (30 days), saves to DB
        ↓
Both tokens set as httpOnly cookies
        ↓
Returns user data (without password)
        ↓
AuthContext sets user state
        ↓
ProtectedRoute allows access → redirects to Dashboard
```

### Making requests (JWT valid)
```
Browser automatically sends cookies with every request
        ↓
Server reads the `token` cookie
        ↓
jwt.verify() checks if valid and not expired
        ↓
If valid → request proceeds normally
```

### When JWT expires (after 15 min)
```
Request made with expired token
        ↓
Server responds 401 Unauthorized
        ↓
Axios interceptor catches the 401
        ↓
Calls /api/auth/refresh (sends refreshToken cookie)
        ↓
Server checks refreshToken:
  1. Is it a valid JWT?
  2. Does it exist in the database?
  3. Has it expired?
        ↓
If all pass → new JWT created, sent as new cookie
        ↓
Axios retries the original failed request
        ↓
User never notices anything happened ✨
```

### When refresh token expires (after 30 days)
```
Refresh request also fails
        ↓
Axios interceptor redirects to /login
        ↓
User must log in again
```

### Logout flow
```
User clicks logout
        ↓
Server deletes refreshToken from database
        ↓
Server clears both cookies
        ↓
Even if someone has the old cookie, it's now useless
```

### Why httpOnly cookies?
- Regular cookies → JavaScript can read them → vulnerable to XSS attacks
- httpOnly cookies → JavaScript CANNOT read them → much safer
- Sent automatically with every request → no manual handling needed

### API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Login with email/password |
| `POST` | `/api/auth/logout` | Logout and clear tokens |
| `POST` | `/api/auth/refresh` | Get new JWT using refresh token |
| `GET` | `/api/auth/me` | Get current logged-in user |

---

## Frontend Architecture

### Data flow
```
PostgreSQL → Prisma → Model → Service → Controller → Route → Express
                                                          ↓
                                                    JWT + Cookies
                                                          ↓
                                   Axios (with interceptors for token refresh)
                                                          ↓
                                              TanStack Query (caching)
                                                          ↓
                                              React Components (UI)
```

### AuthContext
Manages authentication state across the entire app:
```tsx
const { user, isAuthenticated, isLoading, handleLogin, handleLogout } = useAuth()
```

### ProtectedRoute
Redirects to `/login` if user is not authenticated:
```tsx
<ProtectedRoute>
  <Dashboard />  // only renders if logged in
</ProtectedRoute>
```

### Axios Interceptor
Automatically refreshes JWT when it expires:
```
Request fails with 401
        ↓
Interceptor calls /api/auth/refresh
        ↓
Gets new token
        ↓
Retries original request
```

### TanStack Query
Fetches and caches server data:
```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: getUsers,
})
```

### Reusable DataTable
```tsx
<DataTable
  columns={columns}
  data={data}
  searchKey="name"
  searchPlaceholder="Search by name..."
  filters={[
    { key: 'status', label: 'Status', options: ['Active', 'Inactive'] },
    { key: 'role', label: 'Role', options: ['Admin', 'Editor', 'User'] },
  ]}
/>
```

Features: Search, Column sorting, Pagination, Row selection, Column visibility toggle, Radio button filters

### Pages & Routes
| Route | Page | Protection |
|---|---|---|
| `/login` | Login | Public |
| `/` | Dashboard | Protected |
| `/users` | Users table | Protected |
| `/users/:id` | User detail | Protected |
| `/products` | Products grid | Protected |
| `/settings` | Settings form | Protected |

---

## Backend Architecture

### Model → Service → Controller pattern

```
Request comes in
        ↓
route (user.route.ts)          ← defines URL + HTTP method
        ↓
controller (user.controller.ts) ← handles req/res, calls service
        ↓
service (user.service.ts)       ← business logic, validation
        ↓
model (user.model.ts)           ← database queries via Prisma
        ↓
database (PostgreSQL)
```

### Why this pattern?
| Layer | Responsibility | What NOT to put here |
|---|---|---|
| **Route** | URL + HTTP method | Business logic |
| **Controller** | req/res handling | Database queries |
| **Service** | Business logic | HTTP concepts (req/res) |
| **Model** | Database queries | Business logic |

### Available Scripts
| Command | Description |
|---|---|
| `npm run dev` | Start server with tsx watch |
| `npm run build` | Compile TypeScript |
| `npm run seed` | Seed the database |

---

## UI Components

### shadcn/ui components installed
- `Button` — actions
- `Card` — content containers
- `Table` — data display
- `Badge` — status indicators
- `Input` — form fields
- `Label` — form labels
- `Checkbox` — row selection
- `RadioGroup` — filters
- `Popover` — filter dropdowns
- `DropdownMenu` — action menus
- `Select` — dropdown selection

### Dark Mode
Implemented using `next-themes` with a custom `ThemeProvider`.
Toggle is in the Navbar (Sun/Moon icon).
Theme preference saved in `localStorage`.

### Icons
Using **Lucide React** — the official icon library for shadcn/ui.
Browse all icons at: https://lucide.dev/icons

---

## Common Errors & Fixes

### 1. Missing `packageManager` field
```
Could not resolve workspaces. Missing `packageManager` field
```
**Fix:** Add `"packageManager": "npm@x.x.x"` to root `package.json`

---

### 2. `pipeline` renamed to `tasks`
```
Found `pipeline` field instead of `tasks`
```
**Fix:** Rename `pipeline` to `tasks` in `turbo.json`

---

### 3. Express module not found
```
Cannot find module 'express'
```
**Fix:** Run `npm install` inside the specific app folder, not just root

---

### 4. Shared package export error
```
Does not provide an export named 'APP_NAME'
```
**Fix:** Run `npm run build` inside `packages/shared`

---

### 5. CommonJS vs ESM conflict
```
Does not provide an export named 'APP_NAME'
```
**Fix:** Change `"module": "CommonJS"` to `"module": "ESNext"` in `packages/shared/tsconfig.json`

---

### 6. TypeScript interfaces not exported at runtime
```
Does not provide an export named 'ApiResponse'
```
**Fix:** Use `import type` for interfaces — they're erased at compile time:
```ts
import type { User, ApiResponse } from '@my-template/shared'
```

---

### 7. React root div missing
```
Uncaught Error: Target container is not a DOM element
```
**Fix:** Add `<div id="root"></div>` inside `<body>` in `index.html`

---

### 8. Prisma 7 driver adapter required
```
PrismaClientInitializationError: Missing configured driver adapter
```
**Fix:**
```ts
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })
```

---

### 9. Prisma schema `url` no longer in schema file
```
The datasource property `url` is no longer supported in schema files
```
**Fix:** Move connection URL to `prisma.config.ts` (Prisma 7 requirement)

---

### 10. JWT `expiresIn` type error
```
Type 'string' is not assignable to type 'number'
```
**Fix:** Use seconds as numbers instead of strings:
```ts
// ❌ old
{ expiresIn: '15m' }

// ✅ new
{ expiresIn: 15 * 60 }
```

---

### 11. CORS blocking requests
```
Access-Control-Allow-Origin header value not equal to supplied origin
```
**Fix:** Allow all development ports:
```ts
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}))
```

---

### 12. JWT secret undefined
```
secretOrPrivateKey must have a value
```
**Fix:** Add `JWT_SECRET` to `apps/server/.env` and import `dotenv/config`

---

### 13. npm peer dependency conflicts
```
ERESOLVE could not resolve
```
**Fix:**
```bash
npm config set legacy-peer-deps true
```

---

### 14. tsx vs ts-node
**Problem:** `ts-node` with ESM gives cryptic `[Object: null prototype]` errors.
**Fix:** Use `tsx` instead — it's faster and shows real errors:
```json
"dev": "tsx watch src/index.ts"
```

---

## Key Concepts Explained

### What is Express?
Express is a minimal web framework for Node.js that makes it easy to build a backend server.

```ts
// Without Express (verbose):
const server = http.createServer((req, res) => {
  if (req.url === '/users' && req.method === 'GET') { ... }
})

// With Express (clean):
app.get('/users', (req, res) => {
  res.json({ users: [] })
})
```

### What is an ORM?
ORM (Object Relational Mapper) lets you query the database using TypeScript instead of raw SQL:

```ts
// Raw SQL:
SELECT * FROM users WHERE id = 1

// Prisma ORM:
prisma.user.findUnique({ where: { id: 1 } })
```

Benefits: Type safety, auto-completion, no SQL injection, easy migrations.

### What is bcrypt?
bcrypt hashes passwords so they're never stored in plain text:

```ts
// Hashing (on register/seed):
const hash = await bcrypt.hash('password123', 10)
// Result: "$2b$10$..." (unreadable)

// Verifying (on login):
const isValid = await bcrypt.compare('password123', hash)
// Result: true or false
```

### What is JWT?
JWT (JSON Web Token) is a compact, self-contained token that proves who you are:

```
Header.Payload.Signature

eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIn0.abc123
```

The payload contains: `{ id: 1, email: "john@example.com", role: "Admin" }`

### What is `useMemo` and `useCallback`?
- **`useMemo`** — caches a value so it's not recalculated unless dependencies change
- **`useCallback`** — caches a function so it's not recreated unless dependencies change

```tsx
// Without: filteredData recalculated on EVERY render
const filteredData = data.filter(...)

// With: only recalculates when data or filterValues change
const filteredData = useMemo(() => data.filter(...), [data, filterValues])
```

### What does `_` prefix mean?
The underscore tells TypeScript/ESLint "I know this variable exists but I'm intentionally not using it":

```ts
// ❌ ESLint warns: 'error' is defined but never used
} catch (error) {
  res.status(500).json({ message: 'Failed' })
}

// ✅ ESLint understands: intentionally ignoring
} catch (_error) {
  res.status(500).json({ message: 'Failed' })
}
```

### What is `import type`?
TypeScript interfaces are erased at compile time — they don't exist in JavaScript.
Using `import type` tells TypeScript not to look for them at runtime:

```ts
// ❌ Runtime error: interface doesn't exist in compiled JS
import { ApiResponse } from '@my-template/shared'

// ✅ Type-only import: TypeScript knows not to look for it at runtime
import type { ApiResponse } from '@my-template/shared'
```

---

## Next Steps

- [ ] Add CRUD modals (Add/Edit/Delete users with forms)
- [ ] Update UserDetail page to fetch real data
- [ ] Protect routes by role (Admin vs User vs Editor)
- [ ] Add token refresh on expiry (Axios interceptor)
- [ ] Publish to GitHub with proper `.gitignore` and `.env.example`
- [ ] Add Docker for deployment
- [ ] Add CI/CD with GitHub Actions

---

## Resources

- [Turborepo Docs](https://turbo.build/repo/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [TanStack Table Docs](https://tanstack.com/table)
- [TanStack Query Docs](https://tanstack.com/query)
- [Prisma Docs](https://www.prisma.io/docs)
- [React Router Docs](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons)
- [JWT Debugger](https://jwt.io)
- [bcrypt explained](https://auth0.com/blog/hashing-in-action-understanding-bcrypt)
