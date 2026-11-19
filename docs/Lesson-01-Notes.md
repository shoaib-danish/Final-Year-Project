# Lesson 01 Notes — Monorepo & Backend Workspace Architecture

> **Retrospective Decision & Learning Log.**  
> Fill this document out upon completing Lesson 01. Record the actual technical nuances, architectural decisions, and bug resolutions experienced during implementation.

---

## 1. What I Learned

- _Summary of new capabilities and insights gained during this lesson._
- _e.g., Setting up a modern Node.js ES Modules environment with strict separation of server configuration and HTTP listener._

---

## 2. Key Concepts

- **Node.js ECMAScript Modules (ESM)**: Configuring `"type": "module"` in `package.json` to enable native `import` / `export` syntax and top-level `await`.

- **Fail-Fast Configuration**: Validating environment variables early to prevent silent runtime configuration failures downstream.

- **HTTP Security Headers (Helmet)**: Applying baseline security headers to prevent common vulnerabilities (e.g., clickjacking, cross-site scripting).

- **CORS Negotiation**: Configuring origin whitelisting and credentials headers so browser clients can communicate across ports during development.

---

## 3. Key Architectural & Technical Decisions

- **Decoupling `app.js` and `server.js`**:
  - `app.js` instantiates and configures Express, routes, and middleware without starting the network listener.
  - `server.js` imports `app`, connects to the database, and calls `app.listen()`.
- **ES Modules over CommonJS**:
  - Chose native ESM over `require()` to keep syntax consistent across client (Vite/React) and server (Node.js).

---

## 4. Why This Approach Was Chosen

- Separating Express app creation from `.listen()` makes the application testable with integration test libraries like Supertest without occupying a real TCP port.
- Centralizing `.env` parsing in `server.js` before any route logic ensures configuration is initialized before controllers execute.

---

## 5. Approaches Considered & Rejected

- **Monolithic `index.js` holding all routes and server setup**:
  - _Rejected because_: Fails single-responsibility principles, becomes unmaintainable past 50 lines, and prevents automated testing.
- **CommonJS (`require` / `module.exports`)**:
  - _Rejected because_: CommonJS is legacy in modern Node.js ecosystems (Node 20+) and creates friction when sharing types or utilities between frontend and backend.

---

## 6. Challenges / Errors Faced & Resolutions

- _Record any bugs, syntax mistakes, or port conflicts encountered._
- _Template format:_
  - **Symptom / Error**: `Error [ERR_MODULE_NOT_FOUND]: Cannot find module ...`
  - **Root Cause**: Node.js ESM requires explicit file extensions in import paths (`import app from './app.js'`).
  - **Resolution**: Ensured all relative imports include the `.js` file extension.

---

## 7. Important Commands & Code Patterns

### Terminal Commands

```bash
# Initialize Node.js ESM package
npm init -y
npm pkg set type="module"

# Install production and development dependencies
npm install express dotenv cors helmet
npm install -D nodemon

# Start development server with live reload
npm run dev
```

### Core Architecture Pattern (`server/src/app.js`)

```javascript
import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

export default app;
```

---

## 8. Interview-Relevant Takeaways

- **Question**: _"Why do you separate app.js and server.js?"_
  - **Answer**: _"Decoupling the Express application instance from the HTTP server listener allows us to run programmatic integration tests (such as with Supertest) in memory without binding to a physical network port."_
- **Question**: _"What does express.json() middleware actually do?"_
  - **Answer**: _"It parses incoming request streams with Content-Type: application/json and places the resulting parsed JavaScript object on req.body."_

---

## 9. Questions or Topics to Revisit

- [ ] Explore Helmet's Content Security Policy (CSP) configurations for production assets.
- [ ] Understand how Node.js clustering / process managers (PM2) scale instances of `server.js`.
