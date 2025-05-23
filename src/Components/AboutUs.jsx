// import React from 'react'
// // import img1 from '../../Images/ABOUT_US1.png';
// // import aboutUsBanner from '/Images/about_us1.webp';

// import aboutUsBannerWebp from '/Images/about_us1.webp';
// import aboutUsBannerJpeg from '/Images/about_us1.webp';
// import aboutUsBannerJpg from '/Images/about_us1.webp';

// import WhatsAppButton from "../Components/WhatsAppButton"


// import { Helmet } from "react-helmet";

// import img2Webp from '/Images/finance_AI.webp';
// import img2Jpeg from '/Images/finance_AI.webp';
// import img2Jpg from '/Images/finance_AI.webp';


// const AboutUs = () => {
//   return (
//     <>
//     <Helmet>
//     <title>AI Solutions & Automation | CipherShield Technologies</title>
//     <meta name="description" content="CipherShield Technologies provides AI-driven business automation solutions, improving efficiency, security, and innovation. Contact us to learn more!" />
//     <meta name="keywords" content="AI solutions, automation, CipherShield Technologies, business innovation, AI-driven security, contact us" />
//     <meta name="author" content="CipherShield Technologies" />
//     <meta name="robots" content="index, follow" />
// </Helmet>
// <WhatsAppButton/>

//     <div id='heade'></div>
//     <div className="container-fluid">
//         <div className="row carre text-center">
//             <div className="col-lg-5 text-center">
//             <picture>
//   {/* WebP Format */}
//   <source 
//     srcSet={`${aboutUsBannerWebp} 200w, ${aboutUsBannerWebp} 400w, ${aboutUsBannerWebp} 800w`} 
//     type="image/webp" 
//   />

//   {/* JPEG Format */}
//   <source 
//     srcSet={`${aboutUsBannerJpeg} 200w, ${aboutUsBannerJpeg} 400w, ${aboutUsBannerJpeg} 800w`} 
//     type="image/jpeg" 
//   />

//   {/* Default Fallback (JPG) */}
//   <img 
//     src={aboutUsBannerJpg} 
//     srcSet={`${aboutUsBannerJpg} 200w, ${aboutUsBannerJpg} 400w, ${aboutUsBannerJpg} 800w`}
//     sizes="(max-width: 600px) 200px, (max-width: 1200px) 400px, 800px"
//     loading="lazy"
//     alt="High Performance Image - Text Center"
//     className="responsive-img"
//   />
// </picture>


//             </div>

//         </div>
//         <div className="aboutcontainer">
//             <div className="row text-center Aboutrow">
//                 <div className="col-lg-6 col-md-6 col-sm-6 boxes text-center">
//                 <h1>AI Solutions & Automation - CipherShield Technologies</h1>
//                 <h2>Empowering Businesses with Smart AI Solutions</h2>
                   
//                     <p className="text-justify">
//                         CipherShield Technologies is dedicated to delivering advanced AI, machine learning, and automation solutions that redefine how businesses operate. Our team of experts works with organizations to design intelligent systems that automate manual tasks, reduce human error, and optimize workflows—leading to faster decision-making and better outcomes.
//                         We serve industries such as finance, healthcare, manufacturing, and cybersecurity, and our solutions are built to scale with your business. Whether it's automating processes, improving data security, or providing AI-powered insights, we create solutions that give you a competitive edge and enhance your bottom line.
//                     </p>
//                 </div>
//                 <div className=" col-lg-6 col-md-6 col-xl-6 boxes2 text-center mb-5">



// <picture>
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

//   {/* Default Fallback Image */}
//   <img 
//     src={img2Jpg} 
//     srcSet={`${img2Jpg} 300w, ${img2Jpg} 600w, ${img2Jpg} 900w`}
//     sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 900px"
//     loading="lazy"
//     alt="AboutUs Image - Text Centered"
//     className="responsive-img"
//     width="100%"
//     height="auto"
//   />
// </picture>


//                 </div>
//             </div>
//         </div>

       
//         <div className=" contant  animated-text mt-5 mb-5 text-center" id="zohoanimated">
//             <div className="col-sm-12 zohotext">
//                 <div className='container'>
//                 <h3>Why Choose CipherShield for AI & Automation?
//                 <span className="decorative-line"></span>
//                 </h3>
//                 </div>
//             </div>
//             <div className="row trainningcard2 animated-text mt-2 mb-5 pb-5">
//                 <div className="col-md-4">
//                     <div className="carde">
//                         <div className="card-body ">
//                             <h5 className="card-titles"><b>Proven ROI</b></h5>
//                             <p className="text-justify">Our solutions help businesses cut costs, increase operational efficiency, and drive profitability.</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-md-4 mt-2">
//                     <div className="carde">
//                         <div className="card-body ">
//                             <h5 className="card-titles "><b>Future-Proof</b></h5>
//                             <p className="text-justify">We deliver solutions that evolve with technology, ensuring your business remains competitive.</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-md-4 animated-text mt-2">
//                     <div className="carde">
//                         <div className="card-body ">
//                             <h5 className="card-titles "><b>Industry Expertise</b></h5>
//                             <p className="text-justify">Our solutions are tailored to the unique needs of each industry we serve, ensuring maximum impact.</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         </div>
//         </>
//   )
// }

// export default AboutUs


// 22-05-25 

import React from 'react';
import aboutUsBannerWebp from '/Images/about_us1.webp';
import aboutUsBannerJpeg from '/Images/about_us1.webp';
import aboutUsBannerJpg from '/Images/about_us1.webp';

import img2Webp from '/Images/finance_AI.webp';
import img2Jpeg from '/Images/finance_AI.webp';
import img2Jpg from '/Images/finance_AI.webp';

import WhatsAppButton from "../Components/WhatsAppButton";
import { Helmet } from "react-helmet";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>AI Solutions & Automation | CipherShield Technologies</title>
        <meta name="description" content="CipherShield Technologies provides AI-driven business automation solutions, improving efficiency, security, and innovation. Contact us to learn more!" />
        <meta name="keywords" content="AI solutions, automation, CipherShield Technologies, business innovation, AI-driven security, contact us" />
        <meta name="author" content="CipherShield Technologies" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <WhatsAppButton />

      <div id='heade'></div>
    <div className="container-fluid">
        <div className="row carre text-center">
            <div className="col-lg-5 text-center">
            <picture>
  {/* WebP Format */}
  <source 
    srcSet={`${aboutUsBannerWebp} 200w, ${aboutUsBannerWebp} 400w, ${aboutUsBannerWebp} 800w`} 
    type="image/webp" 
  />

  {/* JPEG Format */}
  <source 
    srcSet={`${aboutUsBannerJpeg} 200w, ${aboutUsBannerJpeg} 400w, ${aboutUsBannerJpeg} 800w`} 
    type="image/jpeg" 
  />

  {/* Default Fallback (JPG) */}
  <img 
    src={aboutUsBannerJpg} 
    srcSet={`${aboutUsBannerJpg} 200w, ${aboutUsBannerJpg} 400w, ${aboutUsBannerJpg} 800w`}
    sizes="(max-width: 600px) 200px, (max-width: 1200px) 400px, 800px"
    loading="lazy"
    alt="High Performance Image - Text Center"
    className="responsive-img"
  />
</picture>


            </div>

        </div>

        <div className="aboutcontainer  mt-4">
          <div className="row text-center Aboutrow align-items-center">
            <div className="col-lg-6 col-md-12 text-section">
              <h1>AI Solutions & Automation - CipherShield Technologies</h1>
              <h2>Empowering Businesses with Smart AI Solutions</h2>
              <p>
                CipherShield Technologies is dedicated to delivering advanced AI, machine learning, and automation solutions that redefine how businesses operate.
                Our team of experts works with organizations to design intelligent systems that automate manual tasks, reduce human error, and optimize workflows—leading to faster decision-making and better outcomes.
                We serve industries such as finance, healthcare, manufacturing, and cybersecurity, and our solutions are built to scale with your business.
              </p>
            </div>
            <div className="col-lg-6 col-md-12 image-section">
              <picture>
                <source srcSet={`${img2Webp}`} type="image/webp" />
                <source srcSet={`${img2Jpeg}`} type="image/jpeg" />
                <img
                  src={img2Jpg}
                  alt="AboutUs Image - Text Centered"
                  className="img-fluid responsive-img"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
        </div>

        <div className="contant animated-text  mb-5 text-center" id="zohoanimated">
          <div className="col-sm-12 zohotext">
            <div className='container'>
              <h3>
                Why Choose CipherShield for AI & Automation?
                <span className="decorative-line"></span>
              </h3>
            </div>
          </div>
          <div className="row trainningcard2 animated-text mt-4 mb-5 pb-5 justify-content-center">
            <div className="col-md-4 col-sm-12 mb-3">
              <div className="carde h-100">
                <div className="card-body">
                  <h5 className="card-titles"><b>Proven ROI</b></h5>
                  <p>Our solutions help businesses cut costs, increase operational efficiency, and drive profitability.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 mb-3">
              <div className="carde h-100">
                <div className="card-body">
                  <h5 className="card-titles"><b>Future-Proof</b></h5>
                  <p>We deliver solutions that evolve with technology, ensuring your business remains competitive.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 mb-3">
              <div className="carde h-100">
                <div className="card-body">
                  <h5 className="card-titles"><b>Industry Expertise</b></h5>
                  <p>Our solutions are tailored to the unique needs of each industry we serve, ensuring maximum impact.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
