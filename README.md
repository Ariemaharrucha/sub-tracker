# 📊 **sub-tracker**

![./screenshots/landing.png](https://res.cloudinary.com/dehyfhrwi/image/upload/v1765608177/landing_pbpgc8.png)

![(./screenshots/dashboard.png)](https://res.cloudinary.com/dehyfhrwi/image/upload/v1765608176/dashboard_jnfauo.png)

## 📚 Table of Contents

* [Project Overview](#-project-overview)
* [Key Features](#-key-features)
* [Tech Stack](#-tech-stack)
* [Getting Started](#-getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Environment Variables](#environment-variables)
  * [Running the App](#running-the-app)
* [Folder Structure](#-folder-structure)

---

## 🚀 Project Overview

**sub-tracker** is a web application designed to record and manage all of your digital subscriptions in a single, centralized dashboard.

Built with **Next.js 16** and **PostgreSQL (Neon)**, this application helps users:

* View and manage active subscriptions
* Calculate total monthly subscription expenses
* Receive email notifications before payment due dates

---

## ✨ Key Features

* 📋 **Subscription Management** — Easily add, view, and delete subscription records
* 💰 **Monthly Expense Overview** — Instantly see total subscription costs per month
* 📧 **Email Notifications** — Automatic email reminders before subscription renewals
* 🔐 **Authentication** — Secure login with Google OAuth (Better Auth)

---

## 🧰 Tech Stack

* **Frontend**: Next.js 16 (App Router)
* **Styling**: Tailwind CSS, Shadcn UI
* **Backend**: Next.js API Routes
* **Authentication**: Better Auth (Google OAuth)
* **Database ORM**: Prisma
* **Database**: PostgreSQL
* **Validation**: Zod
* **Email Service**: Nodemailer (Gmail SMTP)

---

## 🛠 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js ≥ 18
* npm / yarn / pnpm / bun

---

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Ariemaharrucha/sub-tracker
cd sub-tracker
```

2. **Install dependencies**

Using npm:

```bash
npm install
```

Using pnpm:

```bash
pnpm install
```

Using bun:

```bash
bun install
```

---

### Environment Variables

Copy the `.env.example` file to `.env` and configure the values:

```env
DATABASE_URL="postgresql://"

BETTER_AUTH_SECRET="from better auth dashboard"
BETTER_AUTH_URL="http://localhost:3000"

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

GMAIL_USER=""
GMAIL_PASS=""
```

> ⚠️ **Note:** Ensure that OAuth credentials, database connection, and Gmail SMTP settings are properly configured.

---

### Running the App

1. **Generate Prisma Client & run database migrations**

```bash
npx prisma migrate dev
```

2. **Start the development server**

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## 📁 Folder Structure

A brief overview of the main project structure:

```bash
app/                # Next.js App Router (pages, layouts, API routes)
components/         # Reusable UI and feature-based components
lib/                # Business logic, Prisma client, auth, utils, actions
hooks/              # Custom React hooks
prisma/             # Database schema and migrations
public/             # Static assets (if any)
.env.example        # Environment variable template
```
