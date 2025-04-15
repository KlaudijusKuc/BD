import { defineEventHandler, readBody, getRouterParams } from 'h3'
import { unlink } from 'fs/promises'
import { join } from 'path'
import pool from '../config/db'

// GET /api/job-applications - Get all job applications
export const getJobApplications = defineEventHandler(async (event) => {
  try {
    const [rows] = await pool.query(`
      SELECT * FROM job_applications 
      ORDER BY date DESC
    `)
    return rows
  } catch (error) {
    console.error('Error fetching job applications:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch job applications'
    })
  }
})

// GET /api/job-applications/:id - Get a single job application
export const getJobApplication = defineEventHandler(async (event) => {
  const params = getRouterParams(event)
  const id = params.id
  
  try {
    const [rows] = await pool.query('SELECT * FROM job_applications WHERE id = ?', [id])
    
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

// POST /api/job-applications - Create a new job application
export const createJobApplication = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { name, email, phone, position_id, position_title, position_type, position_location, cover_letter, cv_filename } = body
    
    if (!name || !email || !phone || !position_id || !cv_filename) {
      throw createError({
        statusCode: 400,
        message: 'Required fields are missing'
      })
    }
    
    const [result] = await pool.query(
      `INSERT INTO job_applications 
       (name, email, phone, position_id, position_title, position_type, position_location, cover_letter, cv_filename) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, position_id, position_title, position_type, position_location, cover_letter || null, cv_filename]
    )
    
    return {
      id: result.insertId,
      name,
      email,
      phone,
      position_id,
      position_title,
      position_type,
      position_location,
      cover_letter,
      cv_filename,
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

// PATCH /api/job-applications/:id/status - Update a job application status
export const updateJobApplicationStatus = defineEventHandler(async (event) => {
  const params = getRouterParams(event)
  const id = params.id
  const body = await readBody(event)
  const { status } = body
  
  if (!status || !['new', 'pending', 'responded', 'rejected'].includes(status)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid status'
    })
  }
  
  try {
    const [result] = await pool.query(
      'UPDATE job_applications SET status = ? WHERE id = ?',
      [status, id]
    )
    
    if (result.affectedRows === 0) {
      throw createError({
        statusCode: 404,
        message: 'Job application not found'
      })
    }
    
    return { success: true, status }
  } catch (error) {
    console.error('Error updating job application status:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to update job application status'
    })
  }
})

// DELETE /api/job-applications/:id - Delete a job application
export const deleteJobApplication = defineEventHandler(async (event) => {
  const params = getRouterParams(event)
  const id = params.id
  
  try {
    // First get the CV filename to delete the file
    const [rows] = await pool.query('SELECT cv_filename FROM job_applications WHERE id = ?', [id])
    if (rows.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'Job application not found'
      })
    }

    const cv_filename = rows[0].cv_filename
    try {
      const filePath = join(process.cwd(), 'public', 'uploads', 'cv', cv_filename)
      await unlink(filePath)
    } catch (fileError) {
      console.error('Error deleting CV file:', fileError)
      // Continue with deletion even if file removal fails
    }
    
    const [result] = await pool.query('DELETE FROM job_applications WHERE id = ?', [id])
    
    if (result.affectedRows === 0) {
      throw createError({
        statusCode: 404,
        message: 'Job application not found'
      })
    }
    
    return { success: true }
  } catch (error) {
    console.error('Error deleting job application:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to delete job application'
    })
  }
})

// Default handler for all routes
export default defineEventHandler(async (event) => {
  const method = event.method
  const path = event.path?.toLowerCase()
  
  if (!path) {
    throw createError({
      statusCode: 404,
      message: 'Not found'
    })
  }

  // Handle GET /api/job-applications
  if (method === 'GET' && path === '/api/job-applications') {
    return getJobApplications(event)
  }
  
  // Handle GET /api/job-applications/:id
  if (method === 'GET' && /^\/api\/job-applications\/\d+$/.test(path)) {
    return getJobApplication(event)
  }
  
  // Handle POST /api/job-applications
  if (method === 'POST' && path === '/api/job-applications') {
    return createJobApplication(event)
  }
  
  // Handle PATCH /api/job-applications/:id/status
  if (method === 'PATCH' && /^\/api\/job-applications\/\d+\/status$/.test(path)) {
    return updateJobApplicationStatus(event)
  }
  
  // Handle DELETE /api/job-applications/:id
  if (method === 'DELETE' && /^\/api\/job-applications\/\d+$/.test(path)) {
    return deleteJobApplication(event)
  }
  
  throw createError({
    statusCode: 404,
    message: 'Not found'
  })
})