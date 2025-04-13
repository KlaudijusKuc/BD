import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function initializeDatabase() {
  // Get database configuration from environment variables
  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306
  };

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

  const connection = await mysql.createConnection(dbConfig);
  const dbName = process.env.DB_NAME || 'railway';

  try {
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    await connection.query(`USE ${dbName}`);

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