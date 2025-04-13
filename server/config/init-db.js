import { createPool } from 'mysql2/promise'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfig = {
  host: process.env.DB_HOST || 'sql7.freesqldatabase.com',
  user: process.env.DB_USER || 'sql7772954',
  password: process.env.DB_PASSWORD || 'TJ8yiaRujp',
  database: process.env.DB_NAME || 'sql7772954',
  port: parseInt(process.env.DB_PORT || '3306'),
  ssl: false
}

async function initializeDatabase() {
  // If RAILWAY_DATABASE_URL is provided, use it instead
  if (process.env.RAILWAY_DATABASE_URL) {
    const url = new URL(process.env.RAILWAY_DATABASE_URL);
    dbConfig.host = url.hostname;
    dbConfig.user = url.username;
    dbConfig.password = url.password;
    dbConfig.port = url.port || 3306;
    dbConfig.ssl = {
      rejectUnauthorized: true
    };
  }

  const connection = await createPool(dbConfig);

  try {
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    await connection.query(`USE ${dbConfig.database}`);

    // Read and execute schema.sql
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    const statements = schema.split(';').filter(stmt => stmt.trim());

    for (const statement of statements) {
      if (statement.trim()) {
        await connection.query(statement);
      }
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await connection.end();
  }
}

initializeDatabase(); 