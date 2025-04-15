# E-Shop99 Website

A modern e-commerce website built with Nuxt 3, Vue 3, and Tailwind CSS.

## Features

- Responsive design
- Contact form with database storage
- Job application system with CV uploads
- Blog section
- Admin dashboard for managing submissions

## Tech Stack

- **Frontend**: Nuxt 3, Vue 3, Tailwind CSS
- **Backend**: Nuxt Server Routes, H3
- **Database**: MySQL
- **Deployment**: Vercel

## Prerequisites

- Node.js 16.x or higher
- MySQL database

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/eshop99-website.git
   cd eshop99-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your database credentials.

5. Initialize the database:
   ```bash
   npm run init-db
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:3000`.

## Deployment

### Deploying to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).

2. Connect your repository to Vercel.

3. Configure the following environment variables in Vercel:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `DB_PORT`

4. Deploy your application.

### Database Setup

1. Create a MySQL database.

2. Update the environment variables with your database credentials.

3. The database schema will be automatically created during deployment.

## License

This project is licensed under the MIT License - see the LICENSE file for details.