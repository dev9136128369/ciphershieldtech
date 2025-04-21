import React from 'react';
import { Helmet } from 'react-helmet';
import We_ServeSlider from "../Components/We_ServeSlider";
// import img1 from '/Images/scrol.mp4';

import AIAutomationJpeg from '/Images/AutomationSolution.webp';
import AIAutomationWebp from '/Images/AutomationSolution.webp';
import AIAutomationJpg from '/Images/AutomationSolution.webp';

import WhatsAppButton from "../Components/WhatsAppButton"

const We_Serve = () => {
  return (
<>
<Helmet>
        <title>We Serve: AI & Automation Solutions | CipherShield Technologies - Contact Us</title>
        <meta
          name="description"
          content="Discover tailored AI and automation solutions from CipherShield Technologies. We serve key industries with innovative technology solutions. Contact us to learn more."
        />
        <meta
          name="keywords"
          content="solutions, ciphershield, technologies, automation, contact, AI solutions, technology solutions"
        />
      </Helmet>
      <WhatsAppButton/>

<div id='heade'></div>

    <We_ServeSlider />
    <div className="container-fluid">
       <div className="container mx-auto mt-20 text-center mt-5">
          <h1 className="font-bold text-5xl underline mb-6 drop-shadow-2xl text-indigo-900">
            We Serve: AI & Automation Solutions by CipherShield Technologies
      <span className="decorative-line2"></span>

          </h1>
        </div>
        <div className="container row language mb-5">
            <div className="col-lg-6 col-md-6 languagepart1 mt-5">
                <h2>Tailored AI Solutions for Key Industries</h2>
                <p className="textparte  mt-5 mb-5 text-justify">
                    We specialize in delivering targeted AI and automation solutions for the industries that matter most.
                    Artificial Intelligence (AI) has become a transformative force in various industries, driving efficiency, enhancing customer experiences, and unlocking new business opportunities. AI's flexibility and versatility enable businesses in every sector to leverage customized solutions that address their unique challenges.
                </p>
            </div>
            <div className="col-lg-6 col-md-6 languagepart1 ">
           {/* <div className="video-container">
               <video 
                 autoPlay 
                 loop 
                 muted 
                 playsInline 
                 className="responsive-video  mb-5 mt-5"
                 width={600}
               >
                 <source src='/Images/scrol.mp4' type="video/mp4" />
                 <source src='/Images/scrol.webm' type="video/webm" />
             
               </video>
             </div> */}
             <picture>
                 {/* WebP Format */}
                 <source 
                   srcSet={`${AIAutomationWebp} 300w, ${AIAutomationWebp} 600w, ${AIAutomationWebp} 1200w`} 
                   type="image/webp" 
                 />
               
                 {/* JPEG Format */}
                 <source 
                   srcSet={`${AIAutomationJpeg} 300w, ${AIAutomationJpeg} 600w, ${AIAutomationJpeg} 1200w`} 
                   type="image/jpeg" 
                 />
               
                 {/* Default Fallback (JPG) */}
                 <img 
                   src={AIAutomationJpg} 
                   srcSet={`${AIAutomationJpg} 300w, ${AIAutomationJpg} 600w, ${AIAutomationJpg} 1200w`}
                   sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                   loading="lazy"
                   alt="Ai-Power img" 
                   className="img-responsive" 
                  width="100%"
                   height="auto"
                 />
               </picture>
             
 </div>
        </div>

        <div className="appraper">
            <div className="container Application1 mt-2">
                <div className="col-lg-6 appboxes lefttxtpart1">
                    <div className="mb-3">
                        <div className="row g-0">
                            <div className="col-md-10 txte">
                                <h3 className="card-title lefttxtpart1  ms-5 mb-3">
                                    Finance & Banking
                                </h3>
                                <p className="card-text lefttxtpart1  text-justify ms-5">
                                    o <b>Fraud Prevention: </b>AI tools to detect and prevent fraud in real time.<br />
                                    o <b>Smart Compliance: </b>Automate regulatory compliance with AI-driven monitoring systems.<br />
                                    o <b>Automated Trading & Risk Management: </b>Leverage AI to optimize trading strategies and manage financial risks.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 appboxes lefttxtpart1 mt-2">
                    <div className="mb-3">
                        <div className="row g-0">
                            <div className="col-md-10 txte">
                                <h3 className="card-title ryttxtpart1  ms-5 mb-3">
                                    Healthcare
                                </h3>
                                <p className="card-text ryttxtpart1  text-justify ms-5">
                                    o <b>Patient Data Analysis: </b>Use AI to analyze health data and improve treatment outcomes.<br />
                                    o <b>Automation of Administrative Tasks: </b>Reduce administrative overhead by automating appointment scheduling, billing, and patient communications.<br />
                                    o <b>AI-Powered Diagnostics: </b>Speed up diagnosis with AI-driven image analysis and predictive healthcare tools.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container Application1">
                <div className="col-lg-6 appboxes lefttxtpart1 mt-2">
                    <div className="mb-3">
                        <div className="row g-0">
                            <div className="col-md-10 txte">
                                <h3 className="card-title lefttxtpart1  ms-5 mb-3">
                                    Manufacturing
                                </h3>
                                <p className="card-text lefttxtpart1  text-justify ms-5">
                                    o <b>Predictive Maintenance: </b>Use AI to predict and prevent equipment failure, reducing costly downtime.<br />
                                    o <b>Smart Supply Chain Management: </b>Automate inventory management and logistics for a more efficient supply chain.<br />
                                    o <b>Robotic Process Automation (RPA): </b>Deploy AI-powered robots for more accurate and efficient production processes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 appboxes ryttxtpart1 mt-2">
                    <div className="mb-3">
                        <div className="row g-0">
                            <div className="col-md-10 txte">
                                <h3 className="card-title ryttxtpart1  ms-5 mb-3">
                                    Cybersecurity
                                </h3>
                                <p className="card-text ryttxtpart1  text-justify ms-5">
                                    o <b>AI Threat Detection: </b>Use machine learning to detect and respond to cyber threats faster than traditional methods.<br />
                                    o <b>Automated Incident Response: </b>Deploy AI to automatically handle security breaches, minimizing damage.<br />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default We_Serve;
