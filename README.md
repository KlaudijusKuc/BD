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

3. Create a `.env` file with the following variables:
   ```bash
   DB_HOST=sql7.freesqldatabase.com
   DB_USER=sql7772954
   DB_PASSWORD=TJ8yiaRujp
   DB_NAME=sql7772954
   DB_PORT=3306
   ```

4. Initialize the database:
   ```bash
   npm run init-db
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

## Deployment to Vercel

1. Push your changes to GitHub
2. Connect your GitHub repository to Vercel
3. Configure the following environment variables in Vercel:
   ```bash
   DB_HOST=sql7.freesqldatabase.com
   DB_USER=sql7772954
   DB_PASSWORD=TJ8yiaRujp
   DB_NAME=sql7772954
   DB_PORT=3306
   ```
4. Deploy your application

## Database Setup After Deployment

After deploying to Vercel, you need to set up the database. You can do this by running the following command locally:

```bash
npm run setup-db
```

This will initialize the database with the required tables.

## Troubleshooting

If you encounter any issues with the database connection, check the following:

1. Ensure the database credentials are correct
2. Make sure the database is accessible from your deployment environment
3. Check if the database tables are created correctly

For Vercel deployment issues, check the build logs in the Vercel dashboard for more information.

## License

This project is licensed under the MIT License - see the LICENSE file for details.