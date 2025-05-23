import React, { useState, useRef } from 'react';

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
  photo: null,
};

const PartnerForm = () => {
  const [formData, setFormData] = useState(initialData);
  const fileRefs = {
    photo: useRef(),
    panCard: useRef(),
    msmemCard: useRef(),
    aadhaarCard: useRef(),
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'name', 'companyName', 'companyWebsite', 'numberOfEmployees',
      'turnover', 'numberOfBranches', 'area', 'areaInSqFt', 'bankName',
      'bankAddress', 'accountNumber', 'ifsc', 'gstNumber', 'state', 'city',
      'pinCode', 'mobile', 'email', 'address', 'photo', 'panCard', 'msmemCard', 'aadhaarCard'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill the required field: ${field}`);
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    // Mobile validation: 10 digits
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return false;
    }

    // PIN code validation: 6 digits
    const pinRegex = /^[0-9]{6}$/;
    if (!pinRegex.test(formData.pinCode)) {
      alert("Please enter a valid 6-digit PIN code.");
      return false;
    }

    // IFSC code: 4 letters, 0, then 6 alphanum
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/i;
    if (!ifscRegex.test(formData.ifsc)) {
      alert("Please enter a valid IFSC code (e.g., HDFC0001234).");
      return false;
    }

    // Account number: 9-18 digits
    const accountRegex = /^[0-9]{9,18}$/;
    if (!accountRegex.test(formData.accountNumber)) {
      alert("Please enter a valid account number (at least 9 digits).");
      return false;
    }

    // Website URL validation
    const websiteRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
    if (!websiteRegex.test(formData.companyWebsite)) {
      alert("Please enter a valid company website URL.");
      return false;
    }

    // GST Number validation (15 characters - Indian GST format)
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    if (!gstRegex.test(formData.gstNumber)) {
      alert("Please enter a valid GST Number (e.g., 22AAAAA0000A1Z5).");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch('http://localhost:8000/api/partner-registration', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        setFormData(initialData);
        Object.values(fileRefs).forEach(ref => {
          if (ref.current) ref.current.value = "";
        });
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
          position: relative;
        }
        .photo-upload {
          position: absolute;
          top: 2rem;
          right: 2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .photo-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.25rem;
        }
        .photo-input {
          border: 1px solid #fdba74;
          border-radius: 0.5rem;
          padding: 0.5rem;
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
        <div className="photo-upload">
          <label className="photo-label">Upload Profile Photo</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="photo-input"
            ref={fileRefs.photo}
          />
        </div>

        <h1 className="partner-heading">Partner Registration Form</h1>
        <form onSubmit={handleSubmit} className="partner-form">
          {[
            ['name', 'Full Name'],
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
            ['email', 'Email Address'],
          ].map(([name, label]) => (
            <div key={name} className="partner-input-group">
              <label className="partner-label">{label}</label>
              <input
                type={
                  name === 'companyWebsite'
                    ? 'url'
                    : name.includes("email")
                    ? 'email'
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

          {[
            ['panCard', 'PAN Card'],
            ['msmemCard', 'MSME Certificate'],
            ['aadhaarCard', 'Aadhaar Card'],
          ].map(([name, label]) => (
            <div key={name} className="partner-input-group">
              <label className="partner-label">{label}</label>
              <input
                type="file"
                name={name}
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="partner-file-input"
                ref={fileRefs[name]}
              />
            </div>
          ))}

          <div className="partner-button-container partner-full-width">
            <button type="submit" className="partner-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PartnerForm;
