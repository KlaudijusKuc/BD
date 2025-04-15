import { createPool } from 'mysql2/promise'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This script is designed to be run manually after deployment
// It will initialize the database with the schema

async function setupDatabase() {
  console.log('Starting database setup...');
  
  const dbConfig = {
    host: process.env.DB_HOST || 'sql7.freesqldatabase.com',
    user: process.env.DB_USER || 'sql7772954',
    password: process.env.DB_PASSWORD || 'TJ8yiaRujp',
    database: process.env.DB_NAME || 'sql7772954',
    port: parseInt(process.env.DB_PORT || '3306'),
    ssl: false
  };
  
  console.log(`Connecting to database: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
  
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

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the setup function
setupDatabase(); 