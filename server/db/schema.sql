-- Create contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'pending', 'responded', 'rejected') DEFAULT 'new',
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  cv_filename VARCHAR(255) NOT NULL,
  cover_letter TEXT NOT NULL,
  position_id INT NOT NULL,
  position_title VARCHAR(255) NOT NULL,
  position_type VARCHAR(100) NOT NULL,
  position_location VARCHAR(255) NOT NULL,
  status ENUM('new', 'pending', 'responded', 'rejected') DEFAULT 'new',
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 