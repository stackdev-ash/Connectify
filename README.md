# Connectify Backend

A social media backend built with **Node.js**, **Express.js**, **TypeScript**, **PostgreSQL**, and **Prisma ORM**.

This project was created to gain a deeper understanding of:

* PostgreSQL database design
* Prisma ORM
* Authentication and Authorization
* REST API development with Express
* TypeScript in backend applications

Future plans include integrating Redis for caching, session management, and performance optimization.

## Tech Stack

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Prisma ORM
* JWT Authentication
* HTTP-Only Cookies
* bcrypt
* Helmet
* Morgan

## Setup

### Clone Repository

```bash
git clone <repository-url>
cd connectify
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

DATABASE_URL=your_database_url

JWT_SECRET=your_jwt_secret

NODE_ENV=development
```

### Prisma Setup

For Prisma installation, migrations, schema management, and configuration details, refer to the official documentation:

[Prisma Documentation](https://www.prisma.io/docs)

### Run Development Server

```bash
npm run dev
```

## Notes

This project is currently under active development and is primarily focused on gaining a deeper understanding of PostgreSQL and Prisma ORM. Redis will be explored later as part of the learning process while expanding the backend architecture.
