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
  console.log('Starting database initialization...');
  console.log(`Connecting to database: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
  
  // If RAILWAY_DATABASE_URL is provided, use it instead
  if (process.env.RAILWAY_DATABASE_URL) {
    console.log('Using RAILWAY_DATABASE_URL for connection');
    const url = new URL(process.env.RAILWAY_DATABASE_URL);
    dbConfig.host = url.hostname;
    dbConfig.user = url.username;
    dbConfig.password = url.password;
    dbConfig.port = url.port || 3306;
    dbConfig.ssl = {
      rejectUnauthorized: true
    };
  }

  let connection;
  try {
    connection = await createPool(dbConfig);
    console.log('Database connection established');

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    console.log(`Database ${dbConfig.database} created or already exists`);
    
    await connection.query(`USE ${dbConfig.database}`);
    console.log(`Using database ${dbConfig.database}`);

    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    console.log(`Reading schema from ${schemaPath}`);
    
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found at ${schemaPath}`);
    }
    
    const schema = fs.readFileSync(schemaPath, 'utf8');
    const statements = schema.split(';').filter(stmt => stmt.trim());
    console.log(`Found ${statements.length} SQL statements to execute`);

    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await connection.query(statement);
          console.log('Executed SQL statement successfully');
        } catch (stmtError) {
          console.error('Error executing SQL statement:', stmtError);
          console.error('Statement:', statement);
          // Continue with other statements even if one fails
        }
      }
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    // Exit with error code to indicate failure
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Only run if this script is executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  initializeDatabase();
}

export default initializeDatabase; 