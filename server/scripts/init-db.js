import pool from '../config/db.js'

async function initializeDatabase() {
  try {
    // Create positions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS positions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        location VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create job_applications table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS job_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        position_id INT NOT NULL,
        cover_letter TEXT,
        cv_filename VARCHAR(255) NOT NULL,
        status ENUM('new', 'pending', 'responded', 'rejected') DEFAULT 'new',
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (position_id) REFERENCES positions(id)
      )
    `)

    // Create contact_submissions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status ENUM('new', 'pending', 'responded', 'rejected') DEFAULT 'new',
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    console.log('Database initialized successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  }
}

initializeDatabase() 