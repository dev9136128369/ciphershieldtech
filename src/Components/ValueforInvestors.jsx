import React from 'react'
import { Helmet } from 'react-helmet';

import WhatsAppButton from "../Components/WhatsAppButton"


import imageWebp from '/Images/highparformances.webp'
import imageJpeg from '/Images/highparformances.webp'
import imageJpg from '/Images/highparformances.webp'


import image1Webp from '/Images/groth.webp'
import image1Jpeg from '/Images/groth.webp'
import image1Jpg from '/Images/groth.webp'

const Value_for_Investors = () => {
  return (
    <>
    <Helmet>
        <title>Invest in AI Solutions | CipherShield Technologies</title>
        <meta
          name="description"
          content="Invest in CipherShield Technologies to leverage AI-powered automation, cybersecurity, and business innovation for high ROI and long-term growth."
        />
        <meta
          name="keywords"
          content="AI solutions, CipherShield, Technologies, Business automation, Cybersecurity, Investors, High ROI"
        />
        <meta name="author" content="CipherShield Technologies" />
        
        {/* ✅ Open Graph (OG) Tags for Social Media */}
        <meta property="og:title" content="Invest in AI Solutions | CipherShield Technologies" />
        <meta property="og:description" content="Invest in CipherShield Technologies to leverage AI-powered automation, cybersecurity, and business innovation for high ROI and long-term growth." />
        <meta property="og:image" content="https://www.ciphershieldtech.com/images/investment-banner.jpg" />
        <meta property="og:url" content="https://www.ciphershieldtech.com/value-for-investors" />
        
        {/* ✅ Twitter Meta Tags */}
        <meta name="twitter:title" content="Invest in AI Solutions | CipherShield Technologies" />
        <meta name="twitter:description" content="Invest in CipherShield Technologies to leverage AI-powered automation, cybersecurity, and business innovation for high ROI and long-term growth." />
        <meta name="twitter:image" content="https://www.ciphershieldtech.com/images/investment-banner.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <WhatsAppButton/>

    <div id='heade'></div>

    <div className="container-fluid">
        <div className="row carre">
            <div className="col-lg-5">
            <picture>
  {/* WebP Format */}
  <source 
    srcSet={`${imageWebp} 300w, ${imageWebp} 600w, ${imageWebp} 900w`} 
    type="image/webp" 
  />

  {/* JPEG Format */}
  <source 
    srcSet={`${imageJpeg} 300w, ${imageJpeg} 600w, ${imageJpeg} 900w`} 
    type="image/jpeg" 
  />

  {/* Default Fallback (JPG) */}
  <img 
    src={imageJpg} 
    srcSet={`${imageJpg} 300w, ${imageJpg} 600w, ${imageJpg} 900w`}
    sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 900px"
    loading="lazy"
    alt="Logo img" 
    className="img-responsive"
    width="100%"
    height="auto"
  />
</picture>

 </div>

        </div>
        <div className="col-lg-12 caree pt-5 mb-5">
            <h1>Transforming Business Operations <br />with AI &#45; For Better Growth and Return on Investment (ROI)</h1>
        </div>
        <div className="row Aboutss  mt-5">
            <div className="col-lg-6 col-md-6 col-sm-6 box2 ">
            <picture>
  {/* WebP Format */}
  <source 
    srcSet={`${image1Webp} 300w, ${image1Webp} 600w, ${image1Webp} 900w`} 
    type="image/webp" 
  />

  {/* JPEG Format */}
  <source 
    srcSet={`${image1Jpeg} 300w, ${image1Jpeg} 600w, ${image1Jpeg} 900w`} 
    type="image/jpeg" 
  />

  {/* Default Fallback (JPG) */}
  <img 
    src={image1Jpg} 
    srcSet={`${image1Jpg} 300w, ${image1Jpg} 600w, ${image1Jpg} 900w`}
    sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 900px"
    loading="lazy"
    alt="Logo img" 
    className="img-responsive"
    width="100%"
    height="auto"
  />
</picture>

  </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="boxe animate__animated animate__rotateInDownRight">
                    <p className="text-justify">
                        Investing in CipherShield means investing in the future of business innovation.<br />


                        As an investor, you &#39; re looking for long-term growth, competitive advantage, and high <b>ROI</b>. CipherShield Technologies delivers all of this and more by harnessing the power of AI, automation, and deep-tech solutions to revolutionize how businesses operate.<br/>
                        •	<b>Scalable Impact: </b>Our AI and automation solutions are designed to grow with your business, ensuring continuous improvement and profitability.<br />
                        •	<b>Increased Efficiency: </b>By automating routine tasks and improving decision-making, businesses can significantly reduce costs and drive higher profits.<br />
                        •	<b>Data-Driven Growth: </b>Our deep-tech solutions enable businesses to leverage data more effectively, uncovering opportunities for expansion and market leadership.<br />
                        •	<b>AI-Powered Security: </b>With cybersecurity threats increasing, our AI-driven security solutions ensure that your business data is always protected, preventing costly breaches.<br />
                        By investing in CipherShield, you are backing a company that is building the next-generation of business technology that will reshape industries and deliver exponential value in the years ahead.

                    </p>
                    {/* <button type="button" id="aboutbtn" className="btn btn-light btn-lg">Know More</button> */}
                </div>
            </div>
        </div>

       
    </div>
    </>
  )
}

export default Value_for_Investors
