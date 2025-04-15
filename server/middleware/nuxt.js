import { defineEventHandler, createError } from 'h3'
import pool from '../config/db'

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