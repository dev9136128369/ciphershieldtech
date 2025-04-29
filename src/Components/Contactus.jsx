import React, { useState } from 'react';
import img1 from '/Images/B-7JS.webp';
import img2 from '/Images/contactNumber.webp';
import img3 from '/Images/Email.webp';
import axios from 'axios';
import { Helmet } from "react-helmet";


const Contactus = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate form before sending
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill all fields');
        return;
      }
      // const response = await axios.post("http://localhost:8000/login-email", formData);
      const response = await axios.post('https://api.ciphershieldtech.com/login-email', formData);
      if (response.data.success) {
        alert('Email sent successfully!');
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        alert(response.data.error || 'Failed to send email');
      }
    } catch (error) {
      let errorMessage = 'Failed to send email';
      
      if (error.response) {
        errorMessage = error.response.data.error || 
                     `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'No response from server';
      } else {
        errorMessage = error.message;
      }
      
      alert(`Error: ${errorMessage}`);
      console.error('Full error:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact CipherShield | Automation & AI</title>
        <meta name="description" content="Get in touch with CipherShield Technologies for cutting-edge AI and automation solutions. Contact us today for business inquiries and support." />
        <meta name="keywords" content="contact CipherShield, AI solutions, automation services, technology solutions, CipherShield Technologies, business support" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div id='heade'></div>
      <div className="container-fluid">
        <div className="row contactus">
          <div className="col-sm-12 contactslide"></div>
        </div>
        
        <div className="col-sm-12 contacts text-center">
          <h1 className="text-center mt-4">Contact CipherShield Technologies
      <span className="decorative-line2"></span>

          </h1>
        </div>

        <div className="row formcontrol mt-5">
          <div className="col-sm-6 boxex pt-5">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-2">
                  <label className="pb-2">Name</label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  <label className="pb-2">EmailId</label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2">
                  <label className="pb-2">Subject</label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-2 text-center">
                  <label className="pb-2">Message</label>
                </div>
                <div className="col-sm-8">
                  <textarea
                    className="form-control"
                    name="message"
                    rows="8"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
              <br />
              <div className="col-md-12 text-left">
                <button type="submit" className="btn btn-success btn-lg">Submit</button>
              </div>
            </form>
          </div>
          <div className="col-sm-6 boxex1">
            <h3><i className="fa fa-map-marker fa-spin" aria-hidden="true"></i> &nbsp; Address</h3>
            <img src={img1} className='img-responsive' alt='Address img'/>
            <h3><i className="fa fa-phone fa-spin" aria-hidden="true"></i>&nbsp; Call Us</h3>
            <img src={img2} className='img-responsive' alt='Contact img'/>
            <h3><i className="fa fa-envelope fa-spin" aria-hidden="true"></i>&nbsp; Email Us</h3>
            <img src={img3} className='img-responsive' alt='Email img'/>
          </div>
        </div>
        <div className="container map mt-5 mb-5">
          <div className="col-md-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14015.678522053231!2d77.3240682!3d28.572176!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6c80af5d7e9a74c1%3A0x3712cd302f4b63a0!2sCipherShield%20Technologies!5e0!3m2!1sen!2sin!4v1719750714447!5m2!1sen!2sin" 
              width="1000"
              height="500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactus;
