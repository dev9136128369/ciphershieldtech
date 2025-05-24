// import React, { useState } from 'react';
// import { Helmet } from "react-helmet";
// import axios from 'axios';

// import WhatsAppButton from "../Components/WhatsAppButton"


// import img1Webp from '/Images/Carrer_banner.webp';
// import img1Jpeg from '/Images/Carrer_banner.webp';
// import img1Jpg from '/Images/Carrer_banner.webp';



// import img2Webp from '/Images/carr.webp';
// import img2Jpeg from '/Images/carr.webp';
// import img2Jpg from '/Images/carr.webp';



// import img3Webp from '/Images/Java-Python.webp';
// import img3Jpeg from '/Images/Java-Python.webp';
// import img3Jpg from '/Images/Java-Python.webp';


// const Career = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         state: '',
//         designation: '',
//         contact: '',
//         gender: '',
//         message: '',
//       });
    
//       const [errors, setErrors] = useState({});
    
//       // Handle input changes
//       const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//           ...formData,
//           [name]: value,
//         });
//       };
    
//       // Validate form inputs
//       const validateForm = () => {
//         const newErrors = {};
    
//         if (!formData.name) {
//           newErrors.name = 'Name is required.';
//         }
    
//         if (!formData.email) {
//           newErrors.email = 'Email is required.';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//           newErrors.email = 'Invalid email format.';
//         }
    
//         if (!formData.state) {
//           newErrors.state = 'State is required.';
//         }
    
//         if (!formData.designation) {
//           newErrors.designation = 'Designation is required.';
//         }
    
//         if (!formData.contact) {
//           newErrors.contact = 'Contact is required.';
//         } else if (!/^\d{10}$/.test(formData.contact)) {
//           newErrors.contact = 'Contact must be 10 digits.';
//         }
    
//         if (!formData.gender) {
//           newErrors.gender = 'Gender is required.';
//         }
    
//         if (!formData.message) {
//           newErrors.message = 'Message is required.';
//         }
    
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//       };
    
//       // Handle form submission
//       const handleSubmit = async (e) => {
//         e.preventDefault();
      
//         if (validateForm()) {
//           try {
//       // const response = await axios.post("http://localhost:8000/submit-form", formData);

//       const response = await axios.post('https://api.ciphershieldtech.com/submit-form', formData);
//             if (response.status === 200) {
//               alert(response.data.message);
//               setFormData({
//                 name: '',
//                 email: '',
//                 state: '',
//                 designation: '',
//                 contact: '',
//                 gender: '',
//                 message: '',
//               });
//             } else {
//               alert('Failed to submit form. Please try again.');
//             }
//           } catch (error) {
//             console.error('Error:', error);
//             alert('Failed to submit form. Please try again.');
//           }
//         }
//       };
//   return (
//     <>

// <Helmet>
//     <title>Career Opportunities at CipherShield Technologies | AI & Automation Solutions</title>
//     <meta name="description" content="Join CipherShield Technologies for exciting career opportunities in AI, automation, and technology solutions. Contact us to be part of an innovative team!" />
//     <meta name="keywords" content="career opportunities, CipherShield Technologies, automation jobs, AI solutions, technology careers, software development, contact CipherShield" />
//     <meta name="robots" content="index, follow" />
// </Helmet>
// <WhatsAppButton/>

// <div id='heade'></div>

//     <div className="container-fluid">
//         <div className="careerrapper">
//         <div className="row carre">
//             <div className="col-lg-12 careimg">
//                 {/* <img src="~/Images/Carrer_banner.png" alt="carrer Image" height="400" width="1360" /> */}
//                 <picture>
//   {/* WebP Format */}
//   <source 
//     srcSet={`${img1Webp} 300w, ${img1Webp} 600w, ${img1Webp} 1200w`} 
//     type="image/webp" 
//   />

//   {/* JPEG Format */}
//   <source 
//     srcSet={`${img1Jpeg} 300w, ${img1Jpeg} 600w, ${img1Jpeg} 1200w`} 
//     type="image/jpeg" 
//   />

//   {/* Default Fallback (JPG) */}
//   <img 
//     src={img1Jpg} 
//     srcSet={`${img1Jpg} 300w, ${img1Jpg} 600w, ${img1Jpg} 1200w`}
//     sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
//     loading="lazy"
//     alt="Career at CipherShield Technologies - Join Our Team" 
//     className="img-responsive"
//      width="100%"
//     height="auto"
//   />
// </picture>

//             </div>

//         </div>
//         <div className="col-lg-12 caree pt-5 mb-5">
//         <h1>Career Opportunities at CipherShield Technologies
//       <span className="decorative-line5"></span>

//         </h1>
//         </div>
//         <div className="container row language mb-5">
//             <div className="col-lg-6 col-md-6 languagepart1 mt-5">
//             <h2>Join CipherShield Technologies - Innovate with Us</h2>
//                 <p className="textpart1  text-justify mt-5 ">
//                 At <strong>CipherShield Technologies</strong>, we are passionate about <strong>technology solutions</strong> and innovation.  We strive to provide the best solutions for our clients and foster a work environment where everyone can grow, learn, and contribute. If you're a driven individual with a strong background in development and a desire to work on exciting projects, we want to hear from you.
//                 </p>
//             </div>
//             <div className="col-lg-6 col-md-6 languagepart1   mb-b ">
//             <picture>
//   {/* WebP Format */}
//   <source 
//     srcSet={`${img2Webp} 300w, ${img2Webp} 600w, ${img2Webp} 900w`} 
//     type="image/webp" 
//   />

//   {/* JPEG Format */}
//   <source 
//     srcSet={`${img2Jpeg} 300w, ${img2Jpeg} 600w, ${img2Jpeg} 900w`} 
//     type="image/jpeg" 
//   />

//   {/* Default Fallback (JPG) */}
//   <img 
//     src={img2Jpg} 
//     srcSet={`${img2Jpg} 300w, ${img2Jpg} 600w, ${img2Jpg} 900w`}
//     sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 900px"
//     loading="lazy"
//     alt="Thumbnail image representing our services"
//     className="img-responsive"
//      width="100%"
//     height="auto"
//   />
// </picture>

   
//             </div>
//         </div>

//         <div className="col-sm-12 zohotext mb-5">
//         <h3 className="text-justify">Python Developer (2+ Years Experience) - Apply Now!
//       <span className="decorative-line5"></span>

//         </h3>
//         </div>
//         <div className="container care">

//             <div className="cantainer care">
//                 <p className="fonts font-medium text-justify mt-2">
//                     <b>Job Title: </b>Python Developer<br />
//                     <b>Company: </b>CipherShield Technologies<br />
//                     <b>Location: </b>On-site<br />
//                     <b>Employment Type: </b>Full-Time<br />

//                 </p>
//             </div>
//         </div>

//         <div className="row cards-section text-center ms-2">
//             <div className="container row text-center ">
//                 <div className="col-md-4 thirddive  text-center pb-5">
//                     <div className="carde  text-center pb-4">
//                         <div className="card-body  pb-5">
//                             <h3 className="card-title">About Us:</h3>

//                             <p className="card-text text-justify  pb-2">

//                                 CipherShield Technologies is an innovative AI-driven company focused on automation solutions to
//                                 transform businesses. As part of our mission, we specialize in creating efficient, scalable software and
//                                 data solutions tailored for a range of industries. Our team values creativity, efficiency, and
//                                 adaptability to leverage advanced technologies for positive impact.
//                             </p>
//                             <h3 className="card-title pb-3">Position Overview:</h3>
                           
//                             <p className="card-text ">
//                                 We are seeking a talented and experienced Python Developer to join our growing team. The ideal
//                                 candidate will have a strong foundation in Python and a passion for developing robust, scalable, and
//                                 intelligent applications.  AI, and software development teams to implement advanced features, particularly for our AI-augmented applications.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-4 thirddive  text-center ">
//                     <div className="carde ">
//                         <div className="card-body pb-5">
//                             <h3 className="card-title">Key Responsibilities:</h3>
//                             <p className="card-text text-justify ">

//                                 • Design, develop, and deploy Python applications and services, with a strong focus on
//                                 automation and AI capabilities.<br />
//                                 • Collaborate with cross-functional teams to integrate Python-based solutions into existing
//                                 platforms and products.<br />
//                                 • Enhance the efficiency and performance of applications by optimizing code, debugging
//                                 issues, and implementing security best practices.<br />
//                                 • Develop APIs and work on backend integrations to streamline data flow across platforms.<br />
//                                 • Implement and maintain unit tests, documentation, and quality assurance for Python code.<br />
//                                 • Work with machine learning and data science teams to integrate models into applications,
//                                 automating data workflows and analysis.<br />
//                                 • Troubleshoot, resolve, and document technical issues, adapting code as needed to enhance
//                                 application performance.<br />
                                
//                             </p>

//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-4 thirddive  text-center">
//                     <div className="carde pb-3">
//                         <div className="card-body  pb-5">
//                             <h3 className="card-title">Requirements:</h3>
                            
//                             <p className="card-text text-justify">
//                                 • Bachelor&#39;s degree in Computer Science, Engineering, or a related field (or equivalent work
//                                 experience).<br />
//                                 • <b>Proven experience</b> (2+ years) as a Python Developer in a professional setting, with a portfolio
//                                 or code samples showcasing expertise.<br />
//                                 • Strong knowledge of Python libraries and frameworks (e.g., Django, Flask, FastAPI).<br />
//                                 • Proficiency in RESTful APIs, and backend integration techniques.<br />
//                                 • <b>Experience with AI/ML libraries</b> (e.g., TensorFlow, scikit-learn) is a plus.<br />
//                                 • Familiarity with SQL and NoSQL databases (e.g., PostgreSQL, MongoDB).<br />
//                                 • <b>Understanding of front-end technologies</b> (JavaScript, HTML, CSS) for complete stack
//                                 solutions is a bonus.<br />
//                                 • Proficient in version control (e.g., Git) and Agile project management tools (Jira, Trello).<br />
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <div className="container row zoho-section animated-text mt-3  text-center" id="zohoanimated">

//             <div className="row trainningcard animated-text mt-2 text-center">
//                 <div className="col-md-6 pb-5">
//                     <div className="carde pb-5">
//                         <div className="card-body text-justify ">
//                             <h3 className="card-titles ms-5 "><b>Preferred Skills</b></h3>
//                             <ul>
//                                 <li>
//                                     Knowledge of data analysis and data science concepts.</li>
//                                 <li>
//                                     Experience in cloud platforms like AWS, Azure, or Google Cloud.
//                                 </li>
//                                 <li>
//                                     Familiarity with Docker and containerization.
//                                 </li>
//                                 <li> Interest in cybersecurity is a plus.</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-6 mt-2 text-center">
//                     <div className="carde">
//                         <div className="card-body text-justify">
//                             <h3 className="card-titles  ms-5 pb-3"><b>Benefits</b></h3>
//                             <ul>
//                                 <li>
//                                     Competitive salary and performance bonuses.
//                                 </li>
//                                 <li>
//                                     Professional development opportunities, including training in AI and machine learning.
//                                 </li>
//                                 <li>
//                                     Flexible work arrangements and a supportive, collaborative work environment.
//                                 </li>
//                                 <li>
//                                     Chance to be part of a team pushing the boundaries in AI-powered automation.
//                                 </li>
                               
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

        

//         <div className="col-sm-12 zohotext mt-5 text-center mb-5">
//             <h4 className="text-justify">Java Developer (2+ Years Experience)
//       <span className="decorative-line4"></span>

//             </h4>
//         </div>
//         <div className="container care ">

//             <div className="cantainer care">
//                 <p className="fonts font-medium text-justify mt-2">
//                     <b>Job Title: </b>Java Developer &#45; Embedded to AI Automation<br/>
//                     <b>Company: </b>CipherShield Technologies<br/>
//                     <b>Location: </b>On-site<br/>
//                     <b>Employment Type: </b>Full-Time

//                 </p>
//             </div>
//         </div>

//         <div className="row cards-section text-center ms-2 ">
//             <div className="container row text-center ">
//                 <div className="col-md-4 thirddive  text-center">
//                     <div className="carde mb-5 text-center">
//                         <div className="card-body mb-5">
//                             <h3 className="card-title">About Us:</h3>

//                             <p className="card-text text-justify pt-3 ">
//                                 CipherShield Technologies is at the forefront of AI-driven solutions, empowering businesses through
//                                 automation and intelligent applications. Our mission is to build advanced, adaptable, and efficient
//                                 systems that leverage the latest in AI and embedded technology. Join our team and be part of a
//                                 transformative journey into the future of intelligent automation.
//                             </p>
//                             <h3 className="card-title pb-1">Position Overview:</h3>

//                             <p className="card-text ">
//                                 We are looking for a skilled Java Developer with experience in embedded systems who is eager to
//                                 expand into AI and automation applications. This role will involve updating existing Java-based
//                                 embedded applications to incorporate AI-driven features and automation. The ideal candidate
//                                 should have a strong foundation in Java, an understanding of embedded systems, and a keen interest
//                                 in working with AI technologies.

//                             </p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-4 thirddive  text-center pb-5">
//                     <div className="carde pb-5">
//                         <div className="card-body pb-3">
//                             <h3 className="card-title">Key Responsibilities:</h3>

//                             <p className="card-text text-justify">

//                                 • Develop, maintain, and optimize Java-based embedded applications, focusing on AIenhanced automation features.<br />
//                                 • Collaborate with AI and data science teams to integrate machine learning models into
//                                 embedded systems and enhance system automation.<br />
//                                 • Design and implement APIs to connect embedded systems with AI-driven platforms and
//                                 applications.<br />
//                                 • Refactor and optimize legacy code for improved performance, scalability, and adaptability to
//                                 AI integrations.<br />
//                                 • Debug, troubleshoot, and resolve technical issues in the application lifecycle, ensuring high
//                                 performance and security.<br />
//                                 • Develop unit tests, documentation, and conduct code reviews to maintain coding standards
//                                 and application integrity.<br />
//                                 • Participate in the full software development lifecycle, from requirements gathering to
//                                 deployment and support.<br />

//                             </p>

//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-4 thirddive  pb-5 text-center">
//                     <div className="carde pb-3">
//                         <div className="card-body  pb-4">
//                             <h3 className="card-title ">Requirements:</h3>

//                             <p className="card-text text-justify pb-5">
//                                 • Bachelor&#39;s degree in Computer Science, Electrical Engineering, or a related field (or
//                                 equivalent work experience).<br />
//                                 • Proven experience (3+ years) in Java development, particularly with embedded systems.<br />
//                                 • Strong understanding of Java-based frameworks and libraries for embedded development.<br />
//                                 • Experience in integrating APIs and backend services in Java applications.<br />
//                                 • Knowledge of AI and machine learning fundamentals; experience with AI/ML libraries (e.g.,
//                                 TensorFlow, PyTorch) is a plus.<br />
//                                 • Experience with data processing and analysis for AI integration in automation tasks.<br />
//                                 • Proficiency in version control (e.g., Git) and familiarity with Agile project management tools
//                                 (Jira, Trello).<br />

//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <div className="container row zoho animated-text mt-5 mb-5 text-center ms-5" id="zohoanimated">

//             <div className="row trainningcard animated-text mt-2">
//                 <div className="col-md-6">
//                     <div className="carde pb-3">
//                         <div className="card-body text-justify">
//                             <h3 className="card-titles  ms-5 "><b>Preferred Skills:</b></h3>
//                             <ul>
//                                 <li>Familiarity with Java (for integration with AI and ML models).</li>

//                                 <li>  Experience in cloud platforms (AWS, Azure) and edge computing.</li>

//                                 <li>  Knowledge of cybersecurity principles for secure embedded systems.</li>

//                                 <li>
//                                     Understanding of embedded hardware interfaces, microcontrollers, and real-time operating
//                                     systems.
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-6 mt-2 text-center">
//                     <div className="carde  ">
//                         <div className="card-body text-justify">
//                             <h3 className="card-titles  ms-5 "><b>Benefits:</b></h3>
//                             <ul>
//                                 <li>
//                                     Competitive salary and performance incentives.
//                                 </li>
//                                 <li>
//                                     Opportunities for professional development, including training in AI and embedded system
//                                     technologies.
//                                 </li>
//                                 <li>
//                                     Flexible work arrangements and a supportive, collaborative work environment.
//                                 </li>
//                                 <li> The chance to work on cutting-edge technology and make a meaningful impact in AIpowered automation. </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
         
//         <div className="col-sm-12 zohotext mb-5 text-center">
//             <h4>How to Apply
//       <span className="decorative-line6"></span>

//             </h4>
//             <p className="text-justify fs-3 mb-5">
//                 Interested candidates should submit their resume, portfolio, and a cover letter detailing their
//                 experience and motivation for embedded-to-AI automation development to <b>info&#64;ciphershieldtech.com.</b>

//             </p>
//         </div>

        
//         <div className="formcontroler row mt-5 mb-5 text-center" id="registration">
//         <form onSubmit={handleSubmit}>
//       <div className="col-sm-8 formcont pt-5 mb-5">
//         <div className="formtext">
//           <h2>Application Form</h2>
//         </div>
//         <div className="row mb-2">
//           <div className="col-sm-2">
//             <label htmlFor="txtName" className="col-sm-2 col-form-label">Name:</label>
//           </div>
//           <div className="col-sm-8">
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               id="txtName"
//               placeholder="Enter Your Name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//             {errors.name && <span className="error-Message">{errors.name}</span>}
//           </div>
//         </div>
//         <div className="row mb-2">
//           <div className="col-sm-2">
//             <label htmlFor="txtEmailId" className="col-sm-2 col-form-label">Email:</label>
//           </div>
//           <div className="col-sm-8">
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               id="txtEmailId"
//               placeholder="Enter Your Email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             {errors.email && <span className="error-Message">{errors.email}</span>}
//           </div>
//         </div>
//         <div className="row mb-2">
//           <label htmlFor="inputState" className="col-sm-2 col-form-label">State:</label>
//           <div className="col-sm-8">
//             <input
//               type="text"
//               className="form-control"
//                 name="state"
//               id="inputState"
//               placeholder="Enter Your State"
//               value={formData.state}
//               onChange={handleChange}
//             />
//             {errors.state && <span className="error-Message">{errors.state}</span>}
//           </div>
//         </div>
//         <div className="row mb-2">
//           <label htmlFor="inputdesination" className="col-sm-2 col-form-label">Designation:</label>
//           <div className="col-sm-8">
//             <input
//               type="text"
//               className="form-control"
//               name="designation"
              
//               id="inputdesination"
//               placeholder="Enter Your Designation"
//               value={formData.designation}
//               onChange={handleChange}
//             />
//             {errors.designation && <span className="error-Message">{errors.designation}</span>}
//           </div>
//         </div>
//         <div className="row mb-1">
//           <label htmlFor="inputNumber" className="col-sm-2 col-form-label">Contact:</label>
//           <div className="col-sm-3">
//             <input
//               type="tel"
//               className="form-control"
//               name="contact"

//               id="inputNumber"
//               placeholder="Enter Your Number"
//               value={formData.contact}
//               onChange={handleChange}
//             />
//             {errors.contact && <span className="error-Message">{errors.contact}</span>}
//           </div>
//         </div>
//         <fieldset className="row">
//           <legend className="col-form-label col-sm-2 pt-0">Gender:</legend>
//           <div className="col-sm-3" id="genders">
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="gender"
//                 id="male"
//                 value="male"
//                 checked={formData.gender === 'male'}
//                 onChange={handleChange}
//               />
//               <label className="form-check-label" htmlFor="male">Male</label>
//             </div>
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="gender"
//                 id="female"
//                 value="female"
//                 checked={formData.gender === 'female'}
//                 onChange={handleChange}
//               />
//               <label className="form-check-label" htmlFor="female">Female</label>
//             </div>
//             <div className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name="gender"
//                 id="others"
//                 value="others"
//                 checked={formData.gender === 'others'}
//                 onChange={handleChange}
//               />
//               <label className="form-check-label" htmlFor="others">Others</label>
//             </div>
//           </div>
//           {errors.gender && <span className="error-Message">{errors.gender}</span>}
//         </fieldset>
//         <div className="row">
//           <div className="col-sm-2">
//             <label htmlFor="txtBody" className="col-sm-2 col-form-label">Message:</label>
//           </div>
//           <div className="col-sm-8">
//             <textarea
//               className="form-control"
//               name="message"
//               rows="4"
//               id="txtBody"
//               value={formData.message}
//               onChange={handleChange}
//             />
//             {errors.message && <span className="error-Message">{errors.message}</span>}
//           </div>
//         </div>
//         <br />
//         <div className="col-md-6 text-left">
//           <button type="submit" className="btn1 btn-success btn-lg mx-2" id="btnSubmit">Submit</button>
//           <button type="reset" className="btn btn-success btn-lg" id="btnReset">Reset</button>
//         </div>
//       </div>
//     </form>
//             <div className="col-sm-4 formimg my-5 ">
//             <picture>
//   {/* WebP Format */}
//   <source 
//     srcSet={`${img3Webp} 300w, ${img3Webp} 600w, ${img3Webp} 900w`} 
//     type="image/webp" 
//   />

//   {/* JPEG Format */}
//   <source 
//     srcSet={`${img3Jpeg} 300w, ${img3Jpeg} 600w, ${img3Jpeg} 900w`} 
//     type="image/jpeg" 
//   />

//   {/* Default Fallback (JPG) */}
//   <img 
//     src={img3Jpg} 
//     srcSet={`${img3Jpg} 300w, ${img3Jpg} 600w, ${img3Jpg} 900w`}
//     sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 900px"
//     loading="lazy"
//     alt="Career image - Join our team at CipherShield Technologies"
//     className="img-responsive "
//      width="100%"
//     height="auto"
//   />
// </picture>


//             </div>

//         </div>
//         </div>
//     </div>
//     </>
//   )
// }

// export default Career;



// 22-05-25
import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import axios from 'axios';
import WhatsAppButton from "../Components/WhatsAppButton";

import img1Webp from '/Images/Carrer_banner.webp';
import img1Jpeg from '/Images/Carrer_banner.webp';
import img1Jpg from '/Images/Carrer_banner.webp';

import img2Webp from '/Images/carr.webp';
import img2Jpeg from '/Images/carr.webp';
import img2Jpg from '/Images/carr.webp';

import img3Webp from '/Images/Java-Python.webp';
import img3Jpeg from '/Images/Java-Python.webp';
import img3Jpg from '/Images/Java-Python.webp';

const Career = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        state: '',
        designation: '',
        contact: '',
        gender: '',
        message: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Name is required.';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format.';
        }

        if (!formData.state) {
            newErrors.state = 'State is required.';
        }

        if (!formData.designation) {
            newErrors.designation = 'Designation is required.';
        }

        if (!formData.contact) {
            newErrors.contact = 'Contact is required.';
        } else if (!/^\d{10}$/.test(formData.contact)) {
            newErrors.contact = 'Contact must be 10 digits.';
        }

        if (!formData.gender) {
            newErrors.gender = 'Gender is required.';
        }

        if (!formData.message) {
            newErrors.message = 'Message is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (validateForm()) {
            try {
                const response = await axios.post('https://api.ciphershieldtech.com/submit-form', formData);
                if (response.status === 200) {
                    alert(response.data.message);
                    setFormData({
                        name: '',
                        email: '',
                        state: '',
                        designation: '',
                        contact: '',
                        gender: '',
                        message: '',
                    });
                } else {
                    alert('Failed to submit form. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to submit form. Please try again.');
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Career Opportunities at CipherShield Technologies | AI & Automation Solutions</title>
                <meta name="description" content="Join CipherShield Technologies for exciting career opportunities in AI, automation, and technology solutions. Contact us to be part of an innovative team!" />
                <meta name="keywords" content="career opportunities, CipherShield Technologies, automation jobs, AI solutions, technology careers, software development, contact CipherShield" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <WhatsAppButton/>

            <div className="career-page">
                {/* Hero Banner */}
                {/* <div className="career-banner">
                    <picture>
                        <source srcSet={`${img1Webp}`} type="image/webp" />
                        <source srcSet={`${img1Jpeg}`} type="image/jpeg" />
                        <img 
                            src={img1Jpg} 
                            alt="Career at CipherShield Technologies" 
                            className="img-fluid w-100"
                            loading="lazy"
                        />
                    </picture>
                </div> */}
<div className="row carre">
            <div className="col-lg-12 careimg">
                {/* <img src="~/Images/Carrer_banner.png" alt="carrer Image" height="400" width="1360" /> */}
                <picture>
  {/* WebP Format */}
  <source 
    srcSet={`${img1Webp} 300w, ${img1Webp} 600w, ${img1Webp} 1200w`} 
    type="image/webp" 
  />

  {/* JPEG Format */}
  <source 
    srcSet={`${img1Jpeg} 300w, ${img1Jpeg} 600w, ${img1Jpeg} 1200w`} 
    type="image/jpeg" 
  />

  {/* Default Fallback (JPG) */}
  <img 
    src={img1Jpg} 
    srcSet={`${img1Jpg} 300w, ${img1Jpg} 600w, ${img1Jpg} 1200w`}
    sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
    loading="lazy"
    alt="Career at CipherShield Technologies - Join Our Team" 
    className="img-responsive"
     width="100%"
    height="auto"
  />
</picture>

            </div>

        </div>
                {/* Main Heading */}
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1 className="career-main-heading">
                                Career Opportunities at CipherShield Technologies
                                                               <span className="decorative-line5"></span>

                            </h1>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="container mb-5">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <h2 className="section-title">Join CipherShield Technologies - Innovate with Us

                                                               <span className="decorative-line1"></span>

                            </h2>
                            <p className="section-text text-justify">
                                At <strong>CipherShield Technologies</strong>, we are passionate about <strong>technology solutions</strong> and innovation. We strive to provide the best solutions for our clients and foster a work environment where everyone can grow, learn, and contribute. If you're a driven individual with a strong background in development and a desire to work on exciting projects, we want to hear from you.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <picture>
                                <source srcSet={`${img2Webp}`} type="image/webp" />
                                <source srcSet={`${img2Jpeg}`} type="image/jpeg" />
                                <img 
                                    src={img2Jpg} 
                                    alt="About CipherShield Technologies" 
                                    className="img-fluid rounded"
                                    loading="lazy"
                                />
                            </picture>
                        </div>
                    </div>
                </div>

                {/* Python Developer Section */}
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-12 text-center mb-4">
                            <h3 className="job-position-heading">
                                Python Developer (2+ Years Experience) - Apply Now!
                              <span className="decorative-line5"></span>

                            </h3>
                        </div>
                    </div>

                    <div className="job-meta mb-4">
                        <p>
                            <strong>Job Title:</strong> Python Developer<br />
                            <strong>Company:</strong> CipherShield Technologies<br />
                            <strong>Location:</strong> On-site<br />
                            <strong>Employment Type:</strong> Full-Time
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="job-card h-100">
                                <div className="job-card-body">
                                    <h4 className="job-card-title">About Us:</h4>
                                    <p className="job-card-text text-justify">
                                        CipherShield Technologies is an innovative AI-driven company focused on automation solutions to transform businesses. As part of our mission, we specialize in creating efficient, scalable software and data solutions tailored for a range of industries. Our team values creativity, efficiency, and adaptability to leverage advanced technologies for positive impact.
                                    </p>
                                    <h4 className="job-card-title">Position Overview:</h4>
                                    <p className="job-card-text text-justify">
                                        We are seeking a talented and experienced Python Developer to join our growing team. The ideal candidate will have a strong foundation in Python and a passion for developing robust, scalable, and intelligent applications. AI, and software development teams to implement advanced features, particularly for our AI-augmented applications.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="job-card h-100">
                                <div className="job-card-body">
                                    <h4 className="job-card-title">Key Responsibilities:</h4>
                                    <p className="job-card-text text-justify">
                                        • Design, develop, and deploy Python applications and services, with a strong focus on automation and AI capabilities.<br />
                                        • Collaborate with cross-functional teams to integrate Python-based solutions into existing platforms and products.<br />
                                        • Enhance the efficiency and performance of applications by optimizing code, debugging issues, and implementing security best practices.<br />
                                        • Develop APIs and work on backend integrations to streamline data flow across platforms.<br />
                                        • Implement and maintain unit tests, documentation, and quality assurance for Python code.<br />
                                        • Work with machine learning and data science teams to integrate models into applications, automating data workflows and analysis.<br />
                                        • Troubleshoot, resolve, and document technical issues, adapting code as needed to enhance application performance.<br />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="job-card h-100">
                                <div className="job-card-body">
                                    <h4 className="job-card-title">Requirements:</h4>
                                    <p className="job-card-text text-justify">
                                        • Bachelor's degree in Computer Science, Engineering, or a related field (or equivalent work experience).<br />
                                        • <strong>Proven experience</strong> (2+ years) as a Python Developer in a professional setting, with a portfolio or code samples showcasing expertise.<br />
                                        • Strong knowledge of Python libraries and frameworks (e.g., Django, Flask, FastAPI).<br />
                                        • Proficiency in RESTful APIs, and backend integration techniques.<br />
                                        • <strong>Experience with AI/ML libraries</strong> (e.g., TensorFlow, scikit-learn) is a plus.<br />
                                        • Familiarity with SQL and NoSQL databases (e.g., PostgreSQL, MongoDB).<br />
                                        • <strong>Understanding of front-end technologies</strong> (JavaScript, HTML, CSS) for complete stack solutions is a bonus.<br />
                                        • Proficient in version control (e.g., Git) and Agile project management tools (Jira, Trello).<br />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="job-card h-100">
                                <div className="job-card-body">
                                    <h4 className="job-card-title"><strong>Preferred Skills</strong></h4>
                                    <ul className="job-list">
                                        <li>Knowledge of data analysis and data science concepts.</li>
                                        <li>Experience in cloud platforms like AWS, Azure, or Google Cloud.</li>
                                        <li>Familiarity with Docker and containerization.</li>
                                        <li>Interest in cybersecurity is a plus.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-4">
                            <div className="job-card h-100">
                                <div className="job-card-body">
                                    <h4 className="job-card-title"><strong>Benefits</strong></h4>
                                    <ul className="job-list">
                                        <li>Competitive salary and performance bonuses.</li>
                                        <li>Professional development opportunities, including training in AI and machine learning.</li>
                                        <li>Flexible work arrangements and a supportive, collaborative work environment.</li>
                                        <li>Chance to be part of a team pushing the boundaries in AI-powered automation.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Java Developer Section */}
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-12 text-center mb-4">
                            <h3 className="job-position-heading">
                                Java Developer (2+ Years Experience)
                               <span className="decorative-line5"></span>

                            </h3>
                        </div>
                    </div>

                    <div className="job-meta mb-4">
                        <p>
                            <strong>Job Title:</strong> Java Developer - Embedded to AI Automation<br />
                            <strong>Company:</strong> CipherShield Technologies<br />
                            <strong>Location:</strong> On-site<br />
                            <strong>Employment Type:</strong> Full-Time
                        </p>
                    </div>

                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="job-card h-100">
                                <div className="job-card-body">
                                    <h4 className="job-card-title">About Us:</h4>
                                    <p className="job-card-text">
                                        CipherShield Technologies is at the forefront of AI-driven solutions, empowering businesses through automation and intelligent applications. Our mission is to build advanced, adaptable, and efficient systems that leverage the latest in AI and embedded technology. Join our team and be part of a transformative journey into the future of intelligent automation.
                                    </p>
                                    <h4 className="job-card-title">Position Overview:</h4>
                                    <p className="job-card-text">
                                        We are looking for a skilled Java Developer with experience in embedded systems who is eager to expand into AI and automation applications. This role will involve updating existing Java-based embedded applications to incorporate AI-driven features and automation. The ideal candidate should have a strong foundation in Java, an understanding of embedded systems, and a keen interest in working with AI technologies.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="job-card h-100">
                                <div className="job-card-body">
                                    <h4 className="job-card-title">Key Responsibilities:</h4>
                                    <p className="job-card-text">
                                        • Develop, maintain, and optimize Java-based embedded applications, focusing on AI-enhanced automation features.<br />
                                        • Collaborate with AI and data science teams to integrate machine learning models into embedded systems and enhance system automation.<br />
                                        • Design and implement APIs to connect embedded systems with AI-driven platforms and applications.<br />
                                        • Refactor and optimize legacy code for improved performance, scalability, and adaptability to AI integrations.<br />
                                        • Debug, troubleshoot, and resolve technical issues in the application lifecycle, ensuring high performance and security.<br />
                                        • Develop unit tests, documentation, and conduct code reviews to maintain coding standards and application integrity.<br />
                                        • Participate in the full software development lifecycle, from requirements gathering to deployment and support.<br />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="job-card h-100">
                                <div className="job-card-body">
                                    <h4 className="job-card-title">Requirements:</h4>
                                    <p className="job-card-text">
                                        • Bachelor's degree in Computer Science, Electrical Engineering, or a related field (or equivalent work experience).<br />
                                        • Proven experience (3+ years) in Java development, particularly with embedded systems.<br />
                                        • Strong understanding of Java-based frameworks and libraries for embedded development.<br />
                                        • Experience in integrating APIs and backend services in Java applications.<br />
                                        • Knowledge of AI and machine learning fundamentals; experience with AI/ML libraries (e.g., TensorFlow, PyTorch) is a plus.<br />
                                        • Experience with data processing and analysis for AI integration in automation tasks.<br />
                                        • Proficiency in version control (e.g., Git) and familiarity with Agile project management tools (Jira, Trello).<br />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="job-card h-100">
                                <div className="job-card-body">
                                    <h4 className="job-card-title"><strong>Preferred Skills:</strong></h4>
                                    <ul className="job-list">
                                        <li>Familiarity with Java (for integration with AI and ML models).</li>
                                        <li>Experience in cloud platforms (AWS, Azure) and edge computing.</li>
                                        <li>Knowledge of cybersecurity principles for secure embedded systems.</li>
                                        <li>Understanding of embedded hardware interfaces, microcontrollers, and real-time operating systems.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-4">
                            <div className="job-card h-100">
                                <div className="job-card-body">
                                    <h4 className="job-card-title"><strong>Benefits:</strong></h4>
                                    <ul className="job-list">
                                        <li>Competitive salary and performance incentives.</li>
                                        <li>Opportunities for professional development, including training in AI and embedded system technologies.</li>
                                        <li>Flexible work arrangements and a supportive, collaborative work environment.</li>
                                        <li>The chance to work on cutting-edge technology and make a meaningful impact in AI-powered automation.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How to Apply Section */}
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h3 className="job-position-heading">
                                How to Apply
                 <span className="decorative-line3"></span>

                            </h3>
                            <p className="apply-text">
                                Interested candidates should submit their resume, portfolio, and a cover letter detailing their experience and motivation for embedded-to-AI automation development to <strong>info@ciphershieldtech.com</strong>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Application Form */}
                {/* <div className="container application-form mb-5">
                    <div className="row">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <form onSubmit={handleSubmit} className="form-container">
                                <h2 className="form-heading text-center mb-4">
                                    Application Form
                                    <span className="heading-line"></span>
                                </h2>
                                
                                <div className="mb-3">
                                    <label htmlFor="txtName" className="form-label">Name:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        name="name"
                                        id="txtName"
                                        placeholder="Enter Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="txtEmailId" className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        name="email"
                                        id="txtEmailId"
                                        placeholder="Enter Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="inputState" className="form-label">State:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                                        name="state"
                                        id="inputState"
                                        placeholder="Enter Your State"
                                        value={formData.state}
                                        onChange={handleChange}
                                    />
                                    {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="inputdesination" className="form-label">Designation:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
                                        name="designation"
                                        id="inputdesination"
                                        placeholder="Enter Your Designation"
                                        value={formData.designation}
                                        onChange={handleChange}
                                    />
                                    {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="inputNumber" className="form-label">Contact:</label>
                                    <input
                                        type="tel"
                                        className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                                        name="contact"
                                        id="inputNumber"
                                        placeholder="Enter Your Number"
                                        value={formData.contact}
                                        onChange={handleChange}
                                    />
                                    {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Gender:</label>
                                    <div className="gender-options">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                id="male"
                                                value="male"
                                                checked={formData.gender === 'male'}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="male">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                id="female"
                                                value="female"
                                                checked={formData.gender === 'female'}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="female">Female</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                id="others"
                                                value="others"
                                                checked={formData.gender === 'others'}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor="others">Others</label>
                                        </div>
                                    </div>
                                    {errors.gender && <div className="invalid-feedback d-block">{errors.gender}</div>}
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="txtBody" className="form-label">Message:</label>
                                    <textarea
                                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                                        name="message"
                                        rows="4"
                                        id="txtBody"
                                        value={formData.message}
                                        onChange={handleChange}
                                    />
                                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                                </div>
                                
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary btn-lg mx-2">Submit</button>
                                    <button type="reset" className="btn btn-outline-secondary btn-lg">Reset</button>
                                </div>
                            </form>
                        </div>
                        
                        <div className="col-lg-6 d-flex align-items-center justify-content-center">
                            <picture>
                                <source srcSet={`${img3Webp}`} type="image/webp" />
                                <source srcSet={`${img3Jpeg}`} type="image/jpeg" />
                                <img 
                                    src={img3Jpg} 
                                    alt="Join Our Team" 
                                    className="img-fluid rounded"
                                    loading="lazy"
                                />
                            </picture>
                        </div>
                    </div>
                </div> */}

                <div className="container application-form mb-5">
  <div className="row">
    <div className="col-lg-6 mb-4 mb-lg-0">
      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-heading text-center mb-4">
          Application Form
          <span className="heading-line"></span>
        </h2>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="txtName" className="form-label">Name:</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              name="name"
              id="txtName"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3 col-md-6">
            <label htmlFor="txtEmailId" className="form-label">Email:</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              name="email"
              id="txtEmailId"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="inputState" className="form-label">State:</label>
            <input
              type="text"
              className={`form-control ${errors.state ? 'is-invalid' : ''}`}
              name="state"
              id="inputState"
              placeholder="Enter Your State"
              value={formData.state}
              onChange={handleChange}
            />
            {errors.state && <div className="invalid-feedback">{errors.state}</div>}
          </div>

          <div className="mb-3 col-md-6">
            <label htmlFor="inputdesination" className="form-label">Designation:</label>
            <input
              type="text"
              className={`form-control ${errors.designation ? 'is-invalid' : ''}`}
              name="designation"
              id="inputdesination"
              placeholder="Enter Your Designation"
              value={formData.designation}
              onChange={handleChange}
            />
            {errors.designation && <div className="invalid-feedback">{errors.designation}</div>}
          </div>
        </div>

        <div className="row">
          <div className="mb-3 col-md-6">
            <label htmlFor="inputNumber" className="form-label">Contact:</label>
            <input
              type="tel"
              className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
              name="contact"
              id="inputNumber"
              placeholder="Enter Your Number"
              value={formData.contact}
              onChange={handleChange}
            />
            {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
          </div>

          <div className="mb-3 col-md-6">
            <label className="form-label d-block">Gender:</label>
            <div className="d-flex align-items-center gap">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="male">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="female">Female</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="others"
                  value="others"
                  checked={formData.gender === 'others'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="others">Others</label>
              </div>
            </div>
            {errors.gender && <div className="invalid-feedback d-block">{errors.gender}</div>}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="txtBody" className="form-label">Message:</label>
          <textarea
            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
            name="message"
            rows="4"
            id="txtBody"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <div className="invalid-feedback">{errors.message}</div>}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg mx-2">Submit</button>
          <button type="reset" className="btn btn-outline-secondary btn-lg">Reset</button>
        </div>
      </form>
    </div>

    <div className="col-lg-6 d-flex align-items-center justify-content-center">
      <picture>
        <source srcSet={`${img3Webp}`} type="image/webp" />
        <source srcSet={`${img3Jpeg}`} type="image/jpeg" />
        <img
          src={img3Jpg}
          alt="Join Our Team"
          className="img-fluid rounded"
          loading="lazy"
        />
      </picture>
    </div>
  </div>
</div>

            </div>
        </>
    );
};

export default Career;