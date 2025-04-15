import fs from 'fs'
import path from 'path'
import pool from './config/db'

async function initializeDatabase() {
  try {
    console.log('Initializing database...')
    
    // Read the schema file
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
    
    // Split into individual statements
    const statements = schema
      .split(';')
      .filter(statement => statement.trim())
      .map(statement => statement.trim() + ';')
    
    // Execute each statement
    for (const statement of statements) {
      await pool.query(statement)
    }
    
    console.log('Database initialized successfully')
    process.exit(0)
  } catch (err) {
    console.error('Error initializing database:', err)
    process.exit(1)
  }
}

initializeDatabase() 