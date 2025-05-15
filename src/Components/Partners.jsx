import React, { useState } from 'react';

const initialData = {
  name: '',
  companyName: '',
  companyWebsite: '',
  numberOfEmployees: '',
  turnover: '',
  numberOfBranches: '',
  area: '',
  areaInSqFt: '',
  bankName: '',
  bankAddress: '',
  accountNumber: '',
  ifsc: '',
  panCard: null,
  msmemCard: null,
  aadhaarCard: null,
  gstNumber: '',
  state: '',
  city: '',
  pinCode: '',
  mobile: '',
  email: '',
  address: '',
};

const PartnerForm = () => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formDataToSend = new FormData();
  
  // Append all fields
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== null) {
      formDataToSend.append(key, value);
    }
  });

  try {
    const response = await fetch('http://localhost:8000/api/partner-registration', {
      method: 'POST',
      body: formDataToSend,
      // Note: Don't set Content-Type header for FormData - the browser will set it automatically
    });

    const result = await response.json();
    
    if (response.ok) {
      alert("Registration successful!");
      setFormData(initialData);
    } else {
      throw new Error(result.error || 'Submission failed');
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert(error.message || "Registration failed. Please try again.");
  }
};

  return (
    <>
      <style>{`
        .partner-container {
          max-width: 1024px;
          margin: 2.5rem auto;
          background-color: white;
          padding: 2rem;
          border: 1px solid #ff8000;
          border-radius: 1rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .partner-heading {
          font-size: 1.875rem;
          font-weight: bold;
          color: #ea580c;
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .partner-form {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .partner-form {
            grid-template-columns: repeat(2, 1fr);
          }
          .partner-full-width {
            grid-column: span 2;
          }
        }
        .partner-input-group {
          display: flex;
          flex-direction: column;
        }
        .partner-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.25rem;
        }
        .partner-input,
        .partner-textarea,
        .partner-file-input {
          border: 1px solid #fdba74;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          outline: none;
        }
        .partner-input:focus,
        .partner-textarea:focus,
        .partner-file-input:focus {
          box-shadow: 0 0 0 2px #f97316;
        }
        .partner-textarea {
          resize: vertical;
        }
        .partner-button-container {
          text-align: center;
          margin-top: 1rem;
        }
        .partner-button {
          background-color: #f97316;
          color: white;
          font-weight: 600;
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .partner-button:hover {
          background-color: #ea580c;
        }
      `}</style>

      <div className="partner-container">
        <h1 className="partner-heading">Partner Registration Form</h1>
        <form onSubmit={handleSubmit} className="partner-form">
          {[['name', 'Full Name'],
            ['companyName', 'Company Name'],
            ['companyWebsite', 'Company Website'],
            ['numberOfEmployees', 'Number of Employees'],
            ['turnover', 'Turnover'],
            ['numberOfBranches', 'Number of Branches'],
            ['area', 'Area'],
            ['areaInSqFt', 'Area in Sq Ft'],
            ['bankName', 'Bank Name'],
            ['bankAddress', 'Bank Address'],
            ['accountNumber', 'Account Number'],
            ['ifsc', 'IFSC Code'],
            ['gstNumber', 'GST Number'],
            ['state', 'State'],
            ['city', 'City'],
            ['pinCode', 'Pin Code'],
            ['mobile', 'Mobile Number'],
            ['email', 'Email Address']
          ].map(([name, label]) => (
            <div key={name} className="partner-input-group">
              <label className="partner-label">{label}</label>
              <input
                type={
                  name.includes("email")
                    ? "email"
                    : name.includes("number") || name.includes("pin") || name.includes("mobile")
                    ? "number"
                    : "text"
                }
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="partner-input"
              />
            </div>
          ))}

          <div className="partner-input-group partner-full-width">
            <label className="partner-label">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="partner-textarea"
            />
          </div>

          {[['panCard', 'PAN Card'],
            ['msmemCard', 'MSME Certificate'],
            ['aadhaarCard', 'Aadhaar Card']
          ].map(([name, label]) => (
            <div key={name} className="partner-input-group">
              <label className="partner-label">{label}</label>
              <input
                type="file"
                name={name}
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="partner-file-input"
              />
            </div>
          ))}

          <div className="partner-button-container partner-full-width">
            <button type="submit" className="partner-button">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PartnerForm;
