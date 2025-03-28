import React from "react";
import { Helmet } from "react-helmet";
import HeaderSlider from "../components/HeaderSlider";

import video from '/Images/Ai_animation1.mov';


import scroll1 from '/Images/scrole.mp4';
import scroll2 from '/Images/scrol1.mp4';
import scroll3 from '/Images/scrol3.mp4';
import scroll4 from '/Images/scrol5.mp4';
import scroll5 from '/Images/scrol7.mp4';

const Home = () => {
    return (
        <>
            {/* SEO Meta Tags */}
            <Helmet>
            <title>AI & Automation Solutions | CipherShield Technologies</title>
<meta name="description" content="CipherShield Technologies offers AI-driven business automation, security solutions, and deep-tech innovations for smarter business growth."/>
<meta name="keywords" content="AI solutions, business automation, deep learning, AI security, automation technology, smart business solutions"/>

                <meta name="author" content="CipherShield Technologies" />
                <meta name="robots" content="index, follow" />
            </Helmet>

            <div id="heade"></div>
            <HeaderSlider />

            <div className="container-fluid">
                {/* About Section */}
                <div className="row Aboutss text-center mt-5">
                    <div className="col-lg-6 col-md-6 col-sm-12 box2 mt-5 pt-5 text-center">
                    <figure>
      <div className="fixed-wrap">
        <video id="fixed" autoPlay muted loop playsInline>
          <source src={video} type="video/mp4" />
          <source src={video.replace(".mp4", ".webm")} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </figure>

                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mt-5 text-center">
                        <div className="boxe animate__animated animate__rotateInDownRight mt-5 text-justify">
                        <h1>CipherShield Technologies - AI & Automation Experts</h1>
                        <h2>Transform Your Business with AI-Driven Solutions</h2>
                            <p>
                                Revolutionizing industries with cutting-edge AI, automation, and deep-tech solutions designed to unlock efficiency, growth, and future-ready success. 
                                Artificial Intelligence (AI) has become a cornerstone of innovation across various industries, transforming how businesses operate, compete, and grow. 
                                By leveraging AI technologies, companies are unlocking smarter business solutions that improve efficiency, enhance customer experiences, and drive competitive advantage.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Introduction Section */}
                <div className="container care mt-5 text-center">
                    <h2 className="mb-5">Introduction to AI-Driven Business Solutions</h2>
                    <div className="container care text-center">
                        <p className="fonts font-medium text-justify mt-2">
                            At CipherShield Technologies, we are building the future of business with artificial intelligence (AI), automation, and deep-tech innovations. 
                            Our smart solutions are not just about improving processes—they&#39;re about transforming industries, increasing profitability, and driving growth. 
                            With a strong focus on security, scalability, and data-driven decision-making, we deliver high-impact solutions that help businesses stay ahead in today’s fast-paced digital world. 
                            We use advanced AI to automate operations, reduce costs, and maximize productivity, allowing companies to focus on innovation and market expansion.
                        </p>
                    </div>
                </div>

                {/* Image Section */}
                <div className="container text-center mb-5">
                    <div className="col-lg-8 col-md-10 col-sm-12 career text-center">
                        <h3 className="text-center mt-5 mb-5">AI & Deep Learning in Business</h3>
  
<div className="video-container text-center">
    <video 
      autoPlay 
      loop 
      muted 
      playsInline 
      className="responsive-video ms-5"
    >
      <source src='/Images/Deeplerning.mp4' type="video/mp4" />
      <source src='/Images/Deeplerning.webm' type="video/webm" />
  
    </video>
  </div>
                    </div>
                </div>

                {/* Scrolling Images Section */}
                <div className="scroller1 mb-5 pb-5 text-center">
                    <h3>Our AI-Driven Business Technologies</h3>
                  
                    <div className="scroll-container">
  {Array(10) // Repeat the video set 10 times
    .fill([scroll1,scroll2,scroll3,scroll4,scroll5,scroll1,scroll2,scroll3,scroll4,scroll5,scroll1,scroll2,scroll3,scroll4,scroll5,scroll1,scroll2,scroll3,scroll4,scroll5,scroll1,scroll2,scroll3,scroll4,scroll5])
    .flat()
    .map((src, index) => (
      <video
        key={index}
        autoPlay
        loop
        muted
        playsInline
        className="scroll-video"
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace(".mp4", ".webm")} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    ))}
</div>
                    </div>
                </div>
            
        </>
    );
}

export default Home;
