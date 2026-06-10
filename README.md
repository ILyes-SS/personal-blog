# Personal Blog

A modern, full-stack personal blog built with Next.js 15, TypeScript, Tailwind CSS, Prisma, and Supabase.

## Features

- **Next.js 15 App Router:** Leveraging the latest Next.js features for optimal performance and SEO.
- **TypeScript:** Fully typed codebase for improved developer experience and reliability.
- **Tailwind CSS v4:** Utility-first styling with modern aesthetic design.
- **Authentication:** Secure user authentication using Supabase SSR (supporting GitHub & Google OAuth).
- **Database:** PostgreSQL database powered by Supabase, interacted with via Prisma ORM.
- **Rich Text Editing:** Integrated with `react-quill-new` for drafting and editing blog posts.
- **Search Capabilities:** Fast, fuzzy search implementations using `fuse.js`.
- **Beautiful UI Components:** Utilizing Radix UI primitives and custom styling for accessible, premium interfaces. Notifications powered by `sonner`.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- npm, yarn, pnpm, or bun

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd personal-blog
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` or `.env.local` file in the root of the project and add your database and Supabase credentials. Example:

   ```env
   DATABASE_URL="postgresql://user:password@host:port/database"
   DIRECT_URL="postgresql://user:password@host:port/database"
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   ```

4. **Initialize the database:**
   Run the Prisma migrations to set up your database schema:

   ```bash
   npm run migrate
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `src/app`: Contains the Next.js App Router pages (divided into `(auth)` and `(main)` groups).
- `src/components`: Reusable React components.
- `src/db`: Prisma schema and database configuration.
- `src/lib` / `src/utils`: Utility functions, helpers, and configurations.
- `src/actions`: Server actions for handling data mutations.

## Learn More

To learn more about the technologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This project is licensed under the MIT License.
