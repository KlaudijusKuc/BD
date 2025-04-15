import { defineEventHandler, getMethod, getRouterParam, readBody } from 'h3'
import pool from '../config/db'
import type { RowDataPacket } from 'mysql2'

interface Position extends RowDataPacket {
  id: number
  title: string
  type: string
  location: string
  description: string | null
  requirements: string | null
  created_at: Date
  updated_at: Date
}

interface JobApplication extends RowDataPacket {
  id: number
  position_id: number
  name: string
  email: string
  phone: string | null
  cover_letter: string | null
  cv_filename: string | null
  status: 'new' | 'pending' | 'responded' | 'rejected'
  date: Date
  position_title?: string
  position_type?: string
  position_location?: string
}

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const id = getRouterParam(event, 'id')

  // GET all job applications
  if (method === 'GET' && !id) {
    try {
      const [rows] = await pool.query<(JobApplication & Position)[]>(`
        SELECT 
          ja.*,
          p.title as position_title,
          p.type as position_type,
          p.location as position_location
        FROM job_applications ja
        LEFT JOIN positions p ON ja.position_id = p.id
        ORDER BY ja.date DESC
      `)
      return rows
    } catch (err) {
      console.error('Error fetching job applications:', err)
      throw new Error('Failed to fetch job applications')
    }
  }

  // GET single job application
  if (method === 'GET' && id) {
    try {
      const [rows] = await pool.query<(JobApplication & Position)[]>(`
        SELECT 
          ja.*,
          p.title as position_title,
          p.type as position_type,
          p.location as position_location
        FROM job_applications ja
        LEFT JOIN positions p ON ja.position_id = p.id
        WHERE ja.id = ?
      `, [id])
      
      if (!rows[0]) {
        throw new Error('Job application not found')
      }
      
      return rows[0]
    } catch (err) {
      console.error('Error fetching job application:', err)
      throw new Error('Failed to fetch job application')
    }
  }

  // PATCH update job application status
  if (method === 'PATCH' && id) {
    try {
      const body = await readBody(event)
      const { status } = body

      if (!status) {
        throw new Error('Status is required')
      }

      await pool.query(`
        UPDATE job_applications
        SET status = ?
        WHERE id = ?
      `, [status, id])

      const [rows] = await pool.query<(JobApplication & Position)[]>(`
        SELECT 
          ja.*,
          p.title as position_title,
          p.type as position_type,
          p.location as position_location
        FROM job_applications ja
        LEFT JOIN positions p ON ja.position_id = p.id
        WHERE ja.id = ?
      `, [id])

      return rows[0]
    } catch (err) {
      console.error('Error updating job application:', err)
      throw new Error('Failed to update job application')
    }
  }

  // DELETE job application
  if (method === 'DELETE' && id) {
    try {
      await pool.query('DELETE FROM job_applications WHERE id = ?', [id])
      return { message: 'Job application deleted successfully' }
    } catch (err) {
      console.error('Error deleting job application:', err)
      throw new Error('Failed to delete job application')
    }
  }

  throw new Error('Method not allowed')
}) 