import React from 'react'
import { Link } from "react-router-dom";

import { Link as ScrollLink } from "react-scroll";

// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { faTwitter } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faFacebook, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
  return (
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
                        <p><strong>Email:</strong> <span>info@ciphershieldtech.com</span></p>
                    </div>
                </div>

                <div className="col-lg-3 col-md-3 footer-links">
                    <h4 className="ms-5">Useful Links</h4>
                    <ul>
                        <li>
                    <ScrollLink to="header" smooth={true} duration={200}>
<Link class="nav-link" to ="/">Home </Link>
</ScrollLink>
</li>
<li>
                    <ScrollLink to="header1" smooth={true} duration={200}>
<Link class="nav-link" to ="/AboutUs">About Us </Link>
</ScrollLink>
</li>
<li>
                    <ScrollLink to="header3" smooth={true} duration={200}>
<Link class="nav-link" to ="/Services">Services </Link>
</ScrollLink>
</li>
                        

                     <li>
                    <ScrollLink to="header4" smooth={true} duration={200}>
<Link class="nav-link" to ="/Value_for_Investors">Value for Investors </Link>
</ScrollLink>
</li>   
                    

                    </ul>
                </div>

                <div className="col-lg-3 col-md-4 footer-links">
                    <h4 className="ms-5">Useful Links</h4>
                    <ul>
                    <li>
                    <ScrollLink to="header5" smooth={true} duration={200}>
<Link class="nav-link" to ="/We_Serve">We Serve </Link>
</ScrollLink>
</li>   
                    
<li>
                    <ScrollLink to="header6" smooth={true} duration={200}>
<Link class="nav-link" to ="/Automation">Automation </Link>
</ScrollLink>
</li>   
                        
<li>
                    <ScrollLink to="header7" smooth={true} duration={200}>
<Link class="nav-link" to ="/Career">Career </Link>
</ScrollLink>
</li>   
                        
<li>
                    <ScrollLink to="header8" smooth={true} duration={200}>
<Link class="nav-link" to ="/ContactUs">Contact Us </Link>
</ScrollLink>
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
      <a href="https://in.linkedin.com/in/ciphershield-technologies-421135314">
      <FontAwesomeIcon icon={faLinkedin} className='spin' spin />
      </a>
      <a href="https://www.youtube.com/@CipherShieldTechnologies">
      <FontAwesomeIcon icon={faYoutube} className='spin' spin />
      </a>
    </div>
                </div>

            </div>
        </div>
       
       
        <div className="row Policy animate__animated animate__slideInUp" id="AcceptCokkies">
            <div className="col-lg-12 col-md-12 col-sm-12 tranceparant">
                <div className="col-lg-7 col-md-7 col-sm-7 lefttermpart">
                    <ul typeof="none">
                        <li><a href="~/Master/PrivacyPolicy"> PrivacyPolicy  |</a></li>
                        <li><a href="~/Master/RefundPolicy"> Return-Policy  |</a></li>
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
                    <p>Need help? Visit the <a href="#">Help Center </a>or <a href="~/Master/ContactUs">Contact Us</a></p>
                </div>
            </div>
        </div>

    </footer> 
    </div>
  )
}

export default Footer
