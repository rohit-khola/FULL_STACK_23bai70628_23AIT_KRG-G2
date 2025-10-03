import React, { useState } from 'react';

function SimpleForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmittedData(formData);

    console.log('✅ Form Submitted! Values:', formData);

    setFormData({ name: '', email: '' });
  };

  return (
    <div className="form-container">
      <h1>Simple React Form</h1>
      <form onSubmit={handleSubmit} className="form-style">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit">Submit Data</button>
      </form>

      {submittedData && (
        <div className="submitted-data">
          <h2>Last Submitted Data (in State):</h2>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
        </div>
      )}
    </div>
  );
}

export default SimpleForm;