// src/components/NewForm.jsx
import { useState } from 'react';
import './index.css'; 
function NewForm() {
  const [formData, setFormData] = useState({
    name: '',
    roll_number: '',
    subject: '',
    marks: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        setMessage('Student added successfully!');
        setFormData({ name: '', roll_number: '', subject: '', marks: '' });
  
        setTimeout(() => {
          setMessage('');
        }, 3000);
      } else {
        setMessage('Failed to add student');
        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };
  
  return (
    <div class="main-container">
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 class="heading">New Student Form</h1>

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="roll_number">Roll Number:</label>
        <input type="text" id="roll_number" name="roll_number" value={formData.roll_number} onChange={handleChange} required />

        <label htmlFor="subject">Subject:</label>
        <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />

        <label htmlFor="marks">Marks:</label>
        <input type="number" id="marks" name="marks" value={formData.marks} onChange={handleChange} required />

        <button type="submit">Submit</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
    </div>
  );
}

export default NewForm;
