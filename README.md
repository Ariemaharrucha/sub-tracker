# Next.js + Better Auth + Prisma (Bun Setup)

This project is built with **Next.js (App Router)** and configured with **Better Auth** for authentication. Before running the application, make sure you have **generated the Prisma schema using Better Auth** and filled in your `.env` file.

---

## ⚙️ Setup Instructions

### 1. Install dependencies (using Bun)

```bash
bun install
```

### 2. Generate Prisma schema from Better Auth

```bash
bunx @better-auth/cli generate
```

### 3. Apply Prisma migrations

```bash
bunx prisma migrate dev
```

---

## 📄 Example `.env.example`

```env
DATABASE_URL="postgresql:"

BETTER_AUTH_SECRET="from better auth dashboard"
BETTER_AUTH_URL="http://localhost:3000"

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

GMAIL_USER=""
GMAIL_PASS=""
```

---

## 🚀 Run the Development Server

```bash
bun dev
```

Open your browser at:

👉 [http://localhost:3000](http://localhost:3000)

---

## 🗂 Project Structure

* `app/` – Main Next.js App Router
* `lib/auth/` – Better Auth configuration
* `prisma/schema.prisma` – Prisma database schema
* `components/` – UI Components
* `env.example` – Environment variable template

---

## 📚 Additional Documentation

### Next.js

[https://nextjs.org/docs](https://nextjs.org/docs)

### Better Auth

[https://www.better-auth.com/docs/integrations/next](https://www.better-auth.com/docs/integrations/next)
[https://www.better-auth.com/docs/installation](https://www.better-auth.com/docs/installation)

### Prisma

[https://www.prisma.io/docs/guides/nextjs](https://www.prisma.io/docs/guides/nextjs)
