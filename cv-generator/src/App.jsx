import { useState } from 'react'
import './App.css'

function App() {
  const [cvData, setCvData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCvData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('CV Data Submitted! Check the preview below.')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">CV Generator</h1>
        <p className="app-subtitle">Create your professional resume in minutes</p>
      </header>
      
      <div className="cv-container">
        <form onSubmit={handleSubmit} className="cv-form">
          <h2 className="form-title">Your Information</h2>
          
          <div className="form-group">
            <label className="form-label">
              Full Name
              <input type="text" name="name" value={cvData.name} onChange={handleChange} required className="form-input" />
            </label>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Email
                <input type="email" name="email" value={cvData.email} onChange={handleChange} required className="form-input" />
              </label>
            </div>
            
            <div className="form-group">
              <label className="form-label">
                Phone
                <input type="tel" name="phone" value={cvData.phone} onChange={handleChange} required className="form-input" />
              </label>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Education
              <textarea name="education" value={cvData.education} onChange={handleChange} required className="form-textarea" />
            </label>
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Work Experience
              <textarea name="experience" value={cvData.experience} onChange={handleChange} required className="form-textarea" />
            </label>
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Skills (comma separated)
              <input type="text" name="skills" value={cvData.skills} onChange={handleChange} required className="form-input" />
            </label>
          </div>
          
          <button type="submit" className="submit-btn">Generate CV</button>
        </form>
        
        <div className="cv-preview">
          <div className="preview-header">
            <h2 className="preview-title">CV Preview</h2>
            <div className="preview-actions">
              <button className="action-btn download-btn">Download PDF</button>
              <button className="action-btn print-btn">Print</button>
            </div>
          </div>
          <div className="preview-content">
            <div className="preview-personal">
              <h3 className="preview-name">{cvData.name || 'Your Name'}</h3>
              <div className="preview-contacts">
                <p className="contact-item">{cvData.email || 'your.email@example.com'}</p>
                <p className="contact-item">{cvData.phone || '+1234567890'}</p>
              </div>
            </div>
            
            <div className="preview-section">
              <h4 className="section-title">Education</h4>
              <p className="section-content">{cvData.education || 'Your education details'}</p>
            </div>
            
            <div className="preview-section">
              <h4 className="section-title">Work Experience</h4>
              <p className="section-content">{cvData.experience || 'Your work experience'}</p>
            </div>
            
            <div className="preview-section">
              <h4 className="section-title">Skills</h4>
              <ul className="skills-list">
                {cvData.skills.split(',').map((skill, index) => (
                  skill.trim() && <li key={index} className="skill-item">{skill.trim()}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App