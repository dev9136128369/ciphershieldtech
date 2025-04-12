import React from 'react'

import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom'



// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { faTwitter } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
  return (
    <>
    <Helmet>
        <title>Contact CipherShield Technologies | AI & Automation Solutions</title>
        <meta name="description" content="Get in touch with CipherShield Technologies for cutting-edge AI and automation solutions. Contact us today for business inquiries and support." />
        <meta name="keywords" content="CipherShield, technology solutions, automation, AI services, contact CipherShield Technologies" />
      </Helmet>
    <div className='container-fluide'>
      <footer id="footer" className="footer">
        <div className="container footer-top">
            <div className="row gy-4">
                <div className="col-lg-3 col-md-6 footer-about">
                    <a href="index.html" className="d-flex align-items-center">
                        <span className="sitename">CipherShield</span>
                    </a>
                    <div className="footer-contact pt-3">
                        <p>B-7, JS Arcade</p>
                        <p> Sector 18,Noida</p>
                        <p className="mt-3"><strong>Phone:</strong> <span>+91 8882171554</span></p>
                        <p><strong>Email:</strong> <span>info&#64;ciphershieldtech.com</span></p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-3 footer-links">
                    <h4 className="ms-5">Useful Links</h4>
                    <ul>
                        <li>
              
<Link className="nav-link" href ="/" onClick={() => scrollToSection('heade')}>Home </Link>

</li>
<li>                   
<Link className="nav-link" href ="/AboutUs" onClick={() => scrollToSection('heade')}>About Us </Link>
</li>
<li>
                 
<Link className="nav-link" href ="/Services" onClick={() => scrollToSection('heade')}>Services </Link>

</li>
                        

                     <li>
                   
<Link className="nav-link" href ="/ValueforInvestors" onClick={() => scrollToSection('heade')}>Value for Investors </Link>

</li>   
                    

                    </ul>
                </div>

                <div className="col-lg-3 col-md-4 footer-links">
                    <h4 className="ms-5">Useful Links</h4>
                    <ul>
                    <li> 
<Link className="nav-link" href ="/WeServe" onClick={() => scrollToSection('heade')}>We Serve </Link>
</li>   
                    
<li>
                    
<Link className="nav-link" href ="/Automation" onClick={() => scrollToSection('heade')}>Automation </Link>

</li>   
                        
<li>
                  
<Link className="nav-link" href ="/Career" onClick={() => scrollToSection('heade')}>Career </Link>

</li>   
                        
<li>
                  
<Link className="nav-link" href ="/ContactUs" onClick={() => scrollToSection('heade')} >Contact Us </Link>

</li>   
                        
                    </ul>

                </div>

                <div className="col-lg-3 col-md-12 signup"> 
                    <h4 className="ms-4">Sign Up</h4>
                    <div className="social-links d-flex">
      <a href="https://x.com/CiphershieldT">
      <FontAwesomeIcon icon={faTwitter} className='spin'spin />
      </a>
      <a href="https://www.instagram.com/ciphershieldtechnologies?utm_source=qr&igsh=a2YzMWlmMWEwZTN2">
    
      <FontAwesomeIcon icon={faInstagram} className='spin' spin />
      </a>
      <a href="https://www.facebook.com/people/Ciphershield-Technology-Pvtltd/61561870779061/">
      <FontAwesomeIcon icon={faFacebook} className='spin' spin />
      </a>
      <a href="https://www.linkedin.com/company/ciphershieldtechnologies/?viewAsMember=true">
      <FontAwesomeIcon icon={faLinkedin} className='spin' spin />
      </a>
      <a href="https://www.youtube.com/@CipherShieldTechnologies">
      <FontAwesomeIcon icon={faYoutube} className='spin' spin />
      </a>
    </div>
    <div className='mt-4 text-white'>
        <a href='https://www.google.com/search?q=CipherShield+Technologies+Pvt.Ltd'><u>CipherShield Technologies</u></a>
    </div>

    <div className='mt-4 text-white'>
        <a href='https://www.linkedin.com/company/ciphershieldtechnologies/?viewAsMember=true' 
  target="_blank" 
  rel="noopener noreferrer"><u>Follow me on LinkedIn</u></a>
    </div>
    {/* <a 
  href='https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=ciphershieldtechnologies' 
  target="_blank" 
  rel="noopener noreferrer"
>
  <u>Follow me on LinkedIn</u>
</a> */}
                </div>

            </div>
        </div>
       
       
        <div className="row Policy animate__animated animate__slideInUp" id="AcceptCokkies">
            <div className="col-lg-12 col-md-12 col-sm-12 tranceparant">
                <div className="col-lg-7 col-md-7 col-sm-7 lefttermpart">
                    <ul typeof="none">
                        <li><a href="/PrivacyPolicy"> PrivacyPolicy  |</a></li>
                        <li><a href="/RefundPolicy"> Return-Policy  |</a></li>
                        <li>Tearm Of Use |</li>
                        <li>Security |</li>
                        <li>Policy |</li>
                        <li>Infringement |</li>
                    </ul>
                </div>

                <div className="col-lg-2 col-md-2 col-sm-2 ModdilePart">
                    <p>© 2024-2025 ciphershieldtech.com</p>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-3 righttermpart">
                    <p>Need help? Visit the <a href="#">Help Center </a>or <a href="/Contactus">Contact Us</a></p>
                </div>
            </div>
        </div>

    </footer> 
    </div>
    </>
  )
}

export default Footer
