# Progress Tracker — MERN Full-Stack Crash Course (DevPulse)

> **Source of Truth for Project Progress.**  
> Update this document after completing each lesson. A checkbox is marked completed (`[x]`) **only** after the lesson's "Done When" verification criteria have been physically tested and verified in code — never assumed or marked in advance.

---

## Course Summary Overview

| Lesson        | Topic                                                     | Est. Time | Status             | Completion Date |
| ------------- | --------------------------------------------------------- | --------- | ------------------ | --------------- |
| **Lesson 01** | Monorepo & Backend Workspace Architecture                 | 20m       | 🔄 NOT YET STARTED | —               |
| **Lesson 02** | MongoDB Connection & Mongoose Schemas                     | 20m       | 🔄 NOT YET STARTED | —               |
| **Lesson 03** | Authentication Core: bcryptjs & JWT                       | 25m       | 🔄 NOT YET STARTED | —               |
| **Lesson 04** | Middleware Pipeline, Validation & Central Error Handling  | 20m       | 🔄 NOT YET STARTED | —               |
| **Lesson 05** | Task CRUD REST API: Business Logic & Controllers          | 20m       | 🔄 NOT YET STARTED | —               |
| **Lesson 06** | API Verification & Automated Testing Script               | 15m       | 🔄 NOT YET STARTED | —               |
| **Lesson 07** | Frontend Setup: Vite, Tailwind CSS & Axios Client         | 20m       | 🔄 NOT YET STARTED | —               |
| **Lesson 08** | Client State with Zustand: Auth Store & Session           | 20m       | 🔄 NOT YET STARTED | —               |
| **Lesson 09** | React Router, Protected Routes & Auth Forms               | 25m       | 🔄 NOT YET STARTED | —               |
| **Lesson 10** | Server State with TanStack Query v5 (Queries & Mutations) | 20m       | 🔄 NOT YET STARTED | —               |
| **Lesson 11** | Task Board UI, Filters, Skeletons & Edge States           | 15m       | 🔄 NOT YET STARTED | —               |
| **Lesson 12** | Production Build & MERN Technical Interview Defense       | 20m       | 🔄 NOT YET STARTED | —               |

---

## Lesson 01 — Monorepo & Backend Workspace Architecture

- **Status**: 🔄 NOT YET STARTED
- **Completion Date**: —
- **Checklist**:
  - [ ] 1.1 Directory layout created (`projects/devpulse/server` and `client`)
  - [ ] 1.2 `server/package.json` initialized with `"type": "module"`
  - [ ] 1.3 Core dependencies installed (`express`, `dotenv`, `cors`, `helmet`, dev: `nodemon`)
  - [ ] 1.4 Environment files created (`.env` and `.env.example`)
  - [ ] 1.5 `.gitignore` configured to ignore `node_modules` and `.env`
  - [ ] 1.6 `server/src/app.js` configured with security middleware and `GET /health`
  - [ ] 1.7 `server/src/server.js` configured with `app.listen()` on `process.env.PORT`
  - [ ] 1.8 Done-When check: `npm run dev` boots cleanly; `curl http://localhost:5000/health` returns status 200
- **Blockers / Challenges Encountered**:
  - _None yet._
- **Short Reflection**:
  - _To be recorded upon lesson completion._

---

## Lesson 02 — MongoDB Connection & Mongoose Schemas

- **Status**: 🔄 NOT YET STARTED
- **Completion Date**: —
- **Checklist**:
  - [ ] 2.1 Mongoose installed (`npm install mongoose`)
  - [ ] 2.2 `server/src/config/db.js` created with resilient connection and fail-fast logging
  - [ ] 2.3 `server/src/models/User.js` created with name, email regex validation, role enum, and `select: false` on password
  - [ ] 2.4 `server/src/models/Task.js` created with status/priority enums and relational `ObjectId` reference to `User`
  - [ ] 2.5 Compound index added on `{ createdBy: 1, status: 1 }`
  - [ ] 2.6 Done-When check: Server starts and logs `MongoDB Connected`; invalid URI halts process cleanly
- **Blockers / Challenges Encountered**:
  - _None yet._
- **Short Reflection**:
  - _To be recorded upon lesson completion._

---

## Lesson 03 — Authentication Core: bcryptjs & JWT

- **Status**: 🔄 NOT YET STARTED
- **Completion Date**: —
- **Checklist**:
  - [ ] 3.1 Dependencies installed (`bcryptjs`, `jsonwebtoken`)
  - [ ] 3.2 Mongoose `pre('save')` hook implemented on `User.js` with `this.isModified('password')` guard
  - [ ] 3.3 Instance method `matchPassword` created on `User.js`
  - [ ] 3.4 `server/src/utils/generateToken.js` created with signed JWT payload containing only `id`
  - [ ] 3.5 `authController.js` implemented with `register` and `login` handlers
  - [ ] 3.6 `authRoutes.js` mounted at `/api/auth`
  - [ ] 3.7 Done-When check: `POST /api/auth/register` returns 201 + token; invalid password returns 401
- **Blockers / Challenges Encountered**:
  - _None yet._
- **Short Reflection**:
  - _To be recorded upon lesson completion._

---

## Lesson 04 — Middleware Pipeline, Validation & Central Error Handling

- **Status**: 🔄 NOT YET STARTED
- **Completion Date**: —
- **Checklist**:
  - [ ] 4.1 `server/src/middleware/authMiddleware.js` written with Bearer token decoding and `req.user` attachment
  - [ ] 4.2 Protected route `GET /api/auth/me` implemented and tested
  - [ ] 4.3 `server/src/middleware/errorMiddleware.js` implemented with 4-parameter `errorHandler` and `notFound`
  - [ ] 4.4 Handled Mongoose `CastError`, duplicate key `code 11000`, and `ValidationError`
  - [ ] 4.5 Done-When check: Unauthenticated requests return 401; invalid route returns uniform 404 JSON
- **Blockers / Challenges Encountered**:
  - _None yet._
- **Short Reflection**:
  - _To be recorded upon lesson completion._

---

## Lesson 05 — Task CRUD REST API: Business Logic & Controllers

- **Status**: 🔄 NOT YET STARTED
- **Completion Date**: —
- **Checklist**:
  - [ ] 5.1 `server/src/controllers/taskController.js` written (`getTasks`, `createTask`, `updateTask`, `deleteTask`)
  - [ ] 5.2 User ownership verification implemented on update and delete (`task.createdBy.toString() === req.user._id.toString()`)
  - [ ] 5.3 Query filtering implemented for `status`, `priority`, and case-insensitive regex `search`
  - [ ] 5.4 `server/src/routes/taskRoutes.js` mounted at `/api/tasks` protected by `protect` middleware
  - [ ] 5.5 Done-When check: Users can only see/edit their tasks; query filters return expected subsets
- **Blockers / Challenges Encountered**:
  - _None yet._
- **Short Reflection**:
  - _To be recorded upon lesson completion._

---

## Lesson 06 — API Verification & Automated Testing Script

- **Status**: 🔄 NOT YET STARTED
- **Completion Date**: —
- **Checklist**:
  - [ ] 6.1 `server/test-api.js` script written using native `fetch`
  - [ ] 6.2 All 6 lifecycle assertions tested (Healthcheck, Register, Auth /me, Create Task, Filter Tasks, Auth Guard)
  - [ ] 6.3 Script added to `package.json` as `npm run test:api`
  - [ ] 6.4 Done-When check: Running `npm run test:api` passes with 100% green checkmarks
- **Blockers / Challenges Encountered**:
  - _None yet._
- **Short Reflection**:
  - _To be recorded upon lesson completion._

---

## Lesson 07 — Frontend Setup: Vite, Tailwind CSS & Axios Client

- **Status**: 🔄 NOT YET STARTED
- **Completion Date**: —
- **Checklist**:
  - [ ] 7.1 React app created via `npm create vite@latest client -- --template react`
  - [ ] 7.2 Tailwind CSS initialized and configured with slate dark theme
  - [ ] 7.3 Dependencies installed (`axios`, `lucide-react`, `clsx`, `tailwind-merge`)
  - [ ] 7.4 Feature-based folder layout established in `client/src/`
  - [ ] 7.5 `client/src/api/client.js` written with request interceptor (auto-injects JWT) and response interceptor (handles 401)
  - [ ] 7.6 Done-When check: Vite dev server runs; API requests show configured base URL and headers
- **Blockers / Challenges Encountered**:
  - _None yet._
- **Short Reflection**:
  - _To be recorded upon lesson completion._

---

## Lesson 08 — Client State with Zustand: Auth Store & Session

- **Status**: 🔄 NOT YET STARTED
- **Completion Date**: —
- **Checklist**:
  - [ ] 8.1 Zustand installed (`npm install zustand`)
  - [ ] 8.2 `client/src/store/useAuthStore.js` created with `user`, `token`, `isAuthenticated`, and actions
  - [ ] 8.3 Zustand `persist` middleware configured for `localStorage` under `devpulse-auth`
  - [ ] 8.4 Role-checking selector method added (`hasRole`)
  - [ ] 8.5 Done-When check: Logging in saves auth state to localStorage; refreshing preserves session
- **Blockers / Challenges Encountered**:
  - _None yet._
- **Short Reflection**:
  - _To be recorded upon lesson completion._

---

## Lesson 09 — React Router, Protected Routes & Auth Forms

- **Status**: 🔄 NOT YET STARTED
- **Completion Date**: —
- **Checklist**:
  - [ ] 9.1 React Router installed (`npm install react-router-dom`)
  - [ ] 9.2 `<ProtectedRoute>` component created using `useAuthStore` and `<Navigate replace />`
  - [ ] 9.3 `LoginPage.jsx` created with responsive layout and error handling
  - [ ] 9.4 `RegisterPage.jsx` created with role selection
  - [ ] 9.5 `AppRoutes.jsx` configured with public routes and protected dashboard
  - [ ] 9.6 Done-When check: Direct navigation to `/` redirects to `/login`; successful login redirects to `/`
- **Blockers / Challenges Encountered**:
  - _None yet._
- **Short Reflection**:
  - _To be recorded upon lesson completion._

---

## Lesson 10 — Server State with TanStack Query v5

- **Status**: 🔄 NOT YET STARTED
- **Completion Date**: —
- **Checklist**:
  - [ ] 10.1 TanStack Query v5 installed (`@tanstack/react-query`, `@tanstack/react-query-devtools`)
  - [ ] 10.2 `QueryClientProvider` mounted in `client/src/main.jsx` with default staleTime
  - [ ] 10.3 `useTasks` hook created using `useQuery` with `['tasks', filters]` key
  - [ ] 10.4 `useCreateTask`, `useUpdateTask`, and `useDeleteTask` mutations created with cache invalidation
  - [ ] 10.5 Done-When check: TanStack devtools shows query cached; mutations auto-refetch active queries
- **Blockers / Challenges Encountered**:
  - _None yet._
- **Short Reflection**:
  - _To be recorded upon lesson completion._

---

## Lesson 11 — Task Board UI, Filters, Skeletons & Edge States

- **Status**: 🔄 NOT YET STARTED
- **Completion Date**: —
- **Checklist**:
  - [ ] 11.1 Reusable `TaskCard.jsx` built with priority colors, status toggle, and delete action
  - [ ] 11.2 `CreateTaskModal.jsx` modal form built and wired to `useCreateTask`
  - [ ] 11.3 `TaskDashboard.jsx` built with status tabs ('All', 'Todo', 'In Progress', 'Done') and search
  - [ ] 11.4 Pulsing loading skeleton implemented for `isLoading` state
  - [ ] 11.5 Empty state fallback rendered when tasks list is empty
  - [ ] 11.6 Done-When check: Task lifecycle (Create -> Filter -> Toggle Status -> Delete) works seamlessly
- **Blockers / Challenges Encountered**:
  - _None yet._
- **Short Reflection**:
  - _To be recorded upon lesson completion._

---

## Lesson 12 — Production Build & MERN Technical Interview Defense

- **Status**: 🔄 NOT YET STARTED
- **Completion Date**: —
- **Checklist**:
  - [ ] 12.1 Client production bundle built via `npm run build`
  - [ ] 12.2 Express configured to serve `client/dist` static assets in production mode
  - [ ] 12.3 SPA wildcard fallback `app.get('*')` configured to serve `index.html`
  - [ ] 12.4 End-to-end full-stack verification checklist reviewed
  - [ ] 12.5 Mastered answers to the 15 project-specific MERN technical interview questions
  - [ ] 12.6 Done-When check: App runs standalone in production mode without development server
- **Blockers / Challenges Encountered**:
  - _None yet._
- **Short Reflection**:
  - _To be recorded upon lesson completion._
