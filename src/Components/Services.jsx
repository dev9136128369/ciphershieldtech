import React from 'react'
import { Helmet } from 'react-helmet';
import ServiceSlider from "../Components/ServiceSlider";

import img1Webp from '/Images/AI-Powered.webp';
import img1Jpeg from '/Images/AI-Powered.webp';
import img1Jpg from '/Images/AI-Powered.webp';

import WhatsAppButton from "../Components/WhatsAppButton"

const Services = () => {
  return (
    <>
     <Helmet>
        <title>AI-Powered Solutions | CipherShield Technologies - Automation & Contact</title>
        <meta
          name="description"
          content="Discover innovative AI-powered solutions from CipherShield Technologies. Our automation and technology solutions drive business growth. Contact us to learn more."
        />
        <meta
          name="keywords"
          content="solutions, ciphershield, technologies, automation, contact, AI-powered solutions, business automation"
        />
      </Helmet>

      <WhatsAppButton/>


    <div id='heade'></div>
    <ServiceSlider/>
    <div className="container-fluid" >
  

        {/* <div class="row">
            <div class="col-sm-12">
                <div class="owl-carousel owl-theme">

                    <div class="slide">
                        <img src="~/Images/AiAutomationes.png" class="animate" alt="AiAutomationes Image" height="500" width="468" />

                    </div>
                    @*<img src="~/Images/e1.png" class="animate" />*@
                    <div class="slide">
                        <img src="~/Images/risk-managmeent-ipad.png" class="animate" alt="risk-managmeent-ipad Image" height="1400" width="500" />

                    </div>
                    <img src="~/Images/AIPredictive.png" class="animate" alt="AIPredictive Image" height="1349" width="410" />
                    @*<img src="~/Images/360_F_467930159_UcfrOkjhFG436zoT9fSetYccBgpNkokp.jpg" class="animate divpart" />*@
                    <img src="~/Images/ScalableAutomation.jpg" class="animate divpart" alt="ScalableAutomation Image" height="1500" width="553" />
                </div>
            </div>
        </div> */}
<div className="container mx-auto mt-20 text-center mt-5">
          <h1 className="font-bold text-5xl underline mb-6 drop-shadow-2xl text-indigo-900">
            AI-Powered Solutions for Business Growth
          </h1>
        </div>
        <div className="container row language mb-5 text-center">
            <div className="col-lg-6 col-md-6 col-xl-6  text-center">
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
    alt="Ai-Power img" 
    className="img-responsive" 
   width="100%"
    height="auto"
  />
</picture>


            </div>
            <div className="col-lg-6 col-md-6 languagepart mt-5">
            <h2 className="text-4xl font-bold">Our Technology Solutions</h2>
                <p className="textparte  text-justify mt-4">
                    From automation to deep-tech innovations, we offer solutions that drive efficiency, security, and scalability.AI-powered solutions provide companies with innovative tools to enhance productivity, optimize processes, and make data-driven decisions that can accelerate business growth. Below are key areas where AI-driven technologies can help businesses scale and thrive in today’s competitive landscape.
                </p>
            </div>
        </div>
        <div className='appraper'>
        <div className="container   mt-5 text-center">
            <div className="col-lg-6   appboxes lefttxtpart1">
                <div className="mb-3">
                    <div className="row g-0">

                        <div className="col-md-10 txte">
                            <div>
                                <h3 className="card-title  lefttxtpart1 animate__animated animate__fadeInRight fs-2 ms-5 mb-3">AI and Automation Solutions</h3>
                                <p className="card-text  lefttxtpart1 animate__animated animate__fadeInLeft text-justify ms-5">
                                    o	<b>Boost Efficiency: </b>Automate repetitive tasks, streamline workflows, and reduce overhead costs.<br />
                                    o	<b>Smarter Decision Making: </b>Use AI-driven insights to make data-backed decisions that improve performance and profits.<br />
                                    o	<b>Tailored to Your Needs: </b>Our AI solutions are customized to solve specific challenges within your business.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6  appboxes lefttxtpart1 mt-2">
                <div className="mb-3">
                    <div className="row g-0">

                        <div className="col-md-10 txte">
                            <div>
                                <h3 className="card-title ryttxtpart1 animate__animated animate__fadeInRight fs-2 ms-5 mb-3">	Cybersecurity and Risk Management</h3>
                                <p className="card-text  ryttxtpart1 animate__animated animate__fadeInLeft text-justify ms-5">
                                    o	<b>AI for Cybersecurity: </b>Protect your data and systems with AI-driven security tools that identify and mitigate threats before they impact your business.<br />
                                    o	<b>Predictive Risk Assessment: </b>Utilize AI to predict and prevent future risks, reducing the chance of financial loss.

                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div className="container Application text-center mb-5">
            <div className="col-lg-6  appboxes lefttxtpart1 mt-2">
                <div className="mb-3">
                    <div className="row g-0">

                        <div className="col-md-10 txte">
                            <div>
                                <h3 className="card-title  lefttxtpart1 animate__animated animate__fadeInRight fs-2 ms-5 mb-3">Predictive Analytics and Business Intelligence</h3>
                                <p className="card-text  lefttxtpart1 animate__animated animate__fadeInLeft text-justify ms-5">
                                    o	<b>Data-Driven Insights: </b>Use AI and machine learning to analyze historical and real-time data, predicting trends and optimizing strategies.<br />
                                    o	<b>Cost-Effective Forecasting: </b>Make smarter financial and operational decisions with AI-based forecasting tools.

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6  appboxes ryttxtpart1 ">
                <div className="mb-3">
                    <div className="row g-0">

                        <div className="col-md-10 txte">
                            <div>
                                <h3 className="card-title ryttxtpart1 animate__animated animate__fadeInRight fs-2 ms-5 mb-3">Scalable Automation for Every Industry</h3>
                                <p className="card-text  ryttxtpart1 animate__animated animate__fadeInLeft text-justify ms-5">
                                    o	<b>Manufacturing: </b>Optimize supply chains, reduce downtime, and improve production lines with AI-powered robots and automation tools.<br />
                                    o	<b>Healthcare: </b>Enhance patient care, streamline administrative tasks, and accelerate medical research with AI and machine learning.<br />
                                    o	<b>Finance: </b>Improve risk management, automate processes.
                                </p>

                            </div>
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

export default Services;
