import { createPool } from 'mysql2/promise'
import { defineEventHandler, createError } from 'h3'

const dbConfig = {
  host: process.env.DB_HOST || 'sql7.freesqldatabase.com',
  user: process.env.DB_USER || 'sql7772954',
  password: process.env.DB_PASSWORD || 'TJ8yiaRujp',
  database: process.env.DB_NAME || 'sql7772954',
  port: parseInt(process.env.DB_PORT || '3306'),
  ssl: false
}

const pool = createPool(dbConfig)

export default defineEventHandler(async (event) => {
  try {
    // Add the pool to the event context so it can be used in API routes
    event.context.db = pool
  } catch (error) {
    console.error('Database connection error:', error)
    throw createError({
      statusCode: 500,
      message: 'Database connection failed'
    })
  }
})

// ... existing code ... 