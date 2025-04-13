import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import db from '../config/db.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../uploads/cv')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// GET /api/jobs - Get all job applications
export const getJobs = defineEventHandler(async (event) => {
  try {
    const [rows] = await db.query('SELECT * FROM job_applications ORDER BY date DESC')
    return rows
  } catch (error) {
    console.error('Error fetching job applications:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch job applications'
    })
  }
})

// GET /api/jobs/:id - Get a single job application
export const getJob = defineEventHandler(async (event) => {
  const id = event.context.params.id
  
  try {
    const [rows] = await db.query('SELECT * FROM job_applications WHERE id = ?', [id])
    if (rows.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Job application not found'
      })
    }
    return rows[0]
  } catch (error) {
    console.error('Error fetching job application:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch job application'
    })
  }
})

// POST /api/jobs - Create a new job application
export const createJob = defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    if (!formData) {
      throw createError({
        statusCode: 400,
        message: 'No form data received'
      })
    }

    const formFields = {}
    let cvFile = null

    for (const field of formData) {
      if (field.name === 'cv') {
        const ext = path.extname(field.filename).toLowerCase()
        const allowedTypes = ['.pdf', '.doc', '.docx']
        
        if (!allowedTypes.includes(ext)) {
          throw createError({
            statusCode: 400,
            message: 'Invalid file type. Only PDF, DOC, and DOCX files are allowed.'
          })
        }

        if (field.data.length > 5 * 1024 * 1024) { // 5MB limit
          throw createError({
            statusCode: 400,
            message: 'File size exceeds 5MB limit'
          })
        }

        const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`
        const filepath = path.join(uploadDir, filename)
        await fs.promises.writeFile(filepath, field.data)
        cvFile = filename
      } else {
        formFields[field.name] = field.data.toString()
      }
    }

    const { name, email, phone, coverLetter, position } = formFields

    if (!name || !email || !phone || !coverLetter || !position || !cvFile) {
      throw createError({
        statusCode: 400,
        message: 'All fields are required'
      })
    }

    const positionData = JSON.parse(position)
    
    const [result] = await db.query(
      `INSERT INTO job_applications 
       (name, email, phone, cv_filename, cover_letter, position_id, position_title, position_type, position_location) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, 
        email, 
        phone, 
        cvFile, 
        coverLetter, 
        positionData.id, 
        positionData.title, 
        positionData.type, 
        positionData.location
      ]
    )

    return {
      id: result.insertId,
      name,
      email,
      phone,
      cv: cvFile,
      coverLetter,
      position: positionData,
      status: 'new',
      date: new Date()
    }
  } catch (error) {
    console.error('Error creating job application:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to create job application'
    })
  }
})

// PATCH /api/jobs/:id/status - Update a job application status
export const updateJobStatus = defineEventHandler(async (event) => {
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
    await db.query(
      'UPDATE job_applications SET status = ? WHERE id = ?',
      [status, id]
    )
    
    return { success: true, status }
  } catch (error) {
    console.error('Error updating job application status:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to update job application status'
    })
  }
})

// DELETE /api/jobs/:id - Delete a job application
export const deleteJob = defineEventHandler(async (event) => {
  const id = event.context.params.id
  
  try {
    // First get the CV filename to delete the file
    const [rows] = await db.query('SELECT cv_filename FROM job_applications WHERE id = ?', [id])
    
    if (rows.length > 0) {
      const cvPath = path.join(uploadDir, rows[0].cv_filename)
      // Delete the file if it exists
      if (fs.existsSync(cvPath)) {
        fs.unlinkSync(cvPath)
      }
    }
    
    // Then delete the database record
    await pool.query('DELETE FROM job_applications WHERE id = ?', [id])
    return { success: true }
  } catch (error) {
    console.error('Error deleting job application:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to delete job application'
    })
  }
})

// Default handler for all routes
export default defineEventHandler(async (event) => {
  const method = event.method
  const path = event.path
  
  // Handle GET /api/jobs
  if (method === 'GET' && path === '/api/jobs') {
    return getJobs(event)
  }
  
  // Handle GET /api/jobs/:id
  if (method === 'GET' && path.match(/^\/api\/jobs\/\d+$/)) {
    return getJob(event)
  }
  
  // Handle POST /api/jobs
  if (method === 'POST' && path === '/api/jobs') {
    return createJob(event)
  }
  
  // Handle PATCH /api/jobs/:id/status
  if (method === 'PATCH' && path.match(/^\/api\/jobs\/\d+\/status$/)) {
    return updateJobStatus(event)
  }
  
  // Handle DELETE /api/jobs/:id
  if (method === 'DELETE' && path.match(/^\/api\/jobs\/\d+$/)) {
    return deleteJob(event)
  }
  
  // Return 404 for other routes
  throw createError({
    statusCode: 404,
    message: 'Not found'
  })
}) 