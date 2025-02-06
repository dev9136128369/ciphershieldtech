import React from 'react'
// import img1 from '../../Images/ABOUT_US1.png';
import aboutUsBanner from '/Images/about_us1.png';

import img2 from '/Images/finance_AI.png';


const AboutUs = () => {
  return (
    <>
    <div id='header1'></div>
    <div className="container-fluid">
        <div className="row carre text-center">
            <div className="col-lg-5 text-center">
                  <img src={aboutUsBanner}  className='img-responsive' alt='highparformance Image text-center img' height={200}/>   
                
            </div>

        </div>
        <div className="aboutcontainer">
            <div className="row text-center Aboutrow">
                <div className="col-lg-6 col-md-6 col-sm-6 boxes text-center">
                    <h1>Ciphershield Technologies</h1>
                    <p className="text-justify">
                        Empowering Businesses to Thrive with AI and Automation.
                    </p>
                    <p className="text-justify">
                        CipherShield Technologies is dedicated to delivering advanced AI, machine learning, and automation solutions that redefine how businesses operate. Our team of experts works with organizations to design intelligent systems that automate manual tasks, reduce human error, and optimize workflows—leading to faster decision-making and better outcomes.
                        We serve industries such as finance, healthcare, manufacturing, and cybersecurity, and our solutions are built to scale with your business. Whether it's automating processes, improving data security, or providing AI-powered insights, we create solutions that give you a competitive edge and enhance your bottom line.
                    </p>
                </div>
                <div className=" col-lg-6 col-md-6 col-xl-6 boxes2 text-center mb-5">
                <img src={img2}  className='img-responsive' alt='AboutUs Image text-center img' />   

                </div>
            </div>
        </div>

       
        <div className=" contant  animated-text mt-5 mb-5 text-center" id="zohoanimated">
            <div className="col-sm-12 zohotext">
                <h4>Why Choose Us?</h4>
            </div>
            <div className="row trainningcard2 animated-text mt-2 mb-5 pb-5">
                <div className="col-md-4">
                    <div className="carde">
                        <div className="card-body ">
                            <h5 className="card-titles"><b>Proven ROI</b></h5>
                            <p className="text-justify">Our solutions help businesses cut costs, increase operational efficiency, and drive profitability.</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mt-2">
                    <div className="carde">
                        <div className="card-body ">
                            <h5 className="card-titles "><b>Future-Proof</b></h5>
                            <p className="text-justify">We deliver solutions that evolve with technology, ensuring your business remains competitive.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 animated-text mt-2">
                    <div className="carde">
                        <div className="card-body ">
                            <h5 className="card-titles "><b>Industry Expertise</b></h5>
                            <p className="text-justify">Our solutions are tailored to the unique needs of each industry we serve, ensuring maximum impact.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
        </>
  )
}

export default AboutUs
