import { defineEventHandler, readBody, createError } from 'h3'
import { createPool } from 'mysql2/promise'

const dbConfig = {
  host: process.env.DB_HOST || 'sql7.freesqldatabase.com',
  user: process.env.DB_USER || 'sql7772954',
  password: process.env.DB_PASSWORD || 'TJ8yiaRujp',
  database: process.env.DB_NAME || 'sql7772954',
  port: parseInt(process.env.DB_PORT || '3306'),
  ssl: false
}

const pool = createPool(dbConfig)

// GET /api/contact - Get all contact submissions
export const getContacts = defineEventHandler(async (event) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_submissions ORDER BY date DESC')
    return rows
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch contact submissions'
    })
  }
})

// GET /api/contact/:id - Get a single contact submission
export const getContact = defineEventHandler(async (event) => {
  const id = event.context.params.id
  
  try {
    const [rows] = await pool.query('SELECT * FROM contact_submissions WHERE id = ?', [id])
    if (rows.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Contact submission not found'
      })
    }
    return rows[0]
  } catch (error) {
    console.error('Error fetching contact submission:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch contact submission'
    })
  }
})

// POST /api/contact - Create a new contact submission
export const createContact = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { name, email, subject, message } = body
    
    if (!name || !email || !subject || !message) {
      throw createError({
        statusCode: 400,
        message: 'All fields are required'
      })
    }
    
    const [result] = await pool.query(
      'INSERT INTO contact_submissions (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    )
    
    return {
      id: result.insertId,
      name,
      email,
      subject,
      message,
      status: 'new',
      date: new Date()
    }
  } catch (error) {
    console.error('Error creating contact submission:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to create contact submission'
    })
  }
})

// PATCH /api/contact/:id/status - Update a contact submission status
export const updateContactStatus = defineEventHandler(async (event) => {
  const id = event.context.params.id
  const body = await readBody(event)
  const { status } = body
  
  if (!status || !['new', 'pending', 'responded', 'rejected'].includes(status)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid status'
    })
  }
  
  try {
    await pool.query(
      'UPDATE contact_submissions SET status = ? WHERE id = ?',
      [status, id]
    )
    
    return { success: true, status }
  } catch (error) {
    console.error('Error updating contact submission status:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to update contact submission status'
    })
  }
})

// DELETE /api/contact/:id - Delete a contact submission
export const deleteContact = defineEventHandler(async (event) => {
  const id = event.context.params.id
  
  try {
    await pool.query('DELETE FROM contact_submissions WHERE id = ?', [id])
    return { success: true }
  } catch (error) {
    console.error('Error deleting contact submission:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to delete contact submission'
    })
  }
})

// Default handler for all routes
export default defineEventHandler(async (event) => {
  const method = event.method
  const path = event.path
  
  // Handle GET /api/contact
  if (method === 'GET' && path === '/api/contact') {
    return getContacts(event)
  }
  
  // Handle GET /api/contact/:id
  if (method === 'GET' && path.match(/^\/api\/contact\/\d+$/)) {
    return getContact(event)
  }
  
  // Handle POST /api/contact
  if (method === 'POST' && path === '/api/contact') {
    return createContact(event)
  }
  
  // Handle PATCH /api/contact/:id/status
  if (method === 'PATCH' && path.match(/^\/api\/contact\/\d+\/status$/)) {
    return updateContactStatus(event)
  }
  
  // Handle DELETE /api/contact/:id
  if (method === 'DELETE' && path.match(/^\/api\/contact\/\d+$/)) {
    return deleteContact(event)
  }
  
  // Return 404 for other routes
  throw createError({
    statusCode: 404,
    message: 'Not found'
  })
}) 