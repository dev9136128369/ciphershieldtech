import React from "react";
import HeaderSlider from "../components/HeaderSlider";

import video from '/Images/Ai_animation1.mp4';
import img1 from '/Images/Deeplerning.gif';

import scroll1 from '/Images/scrole.gif';
import scroll2 from '/Images/scrol1.gif';
import scroll3 from '/Images/scrol3.gif';
import scroll4 from '/Images/scrol5.gif';
import scroll5 from '/Images/scrol7.gif';

const Home = () => {
    return (
        <>
        <div id="header"></div>
            <HeaderSlider />
            <div className="container-fluid" >
                <div className="row Aboutss text-center mt-5"  >
                    <div className="col-lg-6 col-md-6 col-sm-12 box2 mt-5 pt-5 text-center">
                        <figure>
                            <div className='fixed-wrap'>
                                <video id="fixed" autoPlay muted loop>
                                    <source src={video} type="video/mp4" />
                                </video>
                            </div>
                        </figure>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mt-5 text-center" >
                        <div className="boxe animate__animated animate__rotateInDownRight mt-5 test-justify">
                            <h1>About CipherShield Technologies</h1>
                            <h2>AI-Driven Innovation for Smarter Business Solutions</h2>
                            <p className="text-justify">
                                Revolutionizing industries with cutting-edge AI, automation, and deep-tech solutions designed to unlock efficiency, growth, and future-ready success. Artificial Intelligence (AI) has become a cornerstone of innovation across various industries, transforming how businesses operate, compete, and grow. By leveraging AI technologies, companies are unlocking smarter business solutions that improve efficiency, enhance customer experiences, and drive competitive advantage.
                            </p>
                            {/* <button type="button" id="aboutbtn" className="btn btn-light btn-lg">Know More</button> */}
                        </div>
                    </div>
                </div>
                <div className="container care mt-5 text-center">
                    <h2 className="mb-5">Introduction</h2>
                    <div className="container care text-center">
                        <p className="fonts font-medium text-justify mt-2">
                            At CipherShield Technologies, we are building the future of business with artificial intelligence (AI), automation, and deep-tech innovations. Our smart solutions are not just about improving processes—they’re about transforming industries, increasing profitability, and driving growth. With a strong focus on security, scalability, and data-driven decision-making, we deliver high-impact solutions that help businesses stay ahead in today’s fast-paced digital world. We use advanced AI to automate operations, reduce costs, and maximize productivity, allowing companies to focus on innovation and market expansion.
                        </p>
                    </div>
                </div>
                <div className="container text-center mb-5">
                    <div className="col-lg-8 col-md-10 col-sm-12 career text-center">
                        <img src={img1} className='img-responsive' alt='GIF img' height={300} width={600} />
                    </div>
                </div>
                <div className="scroller mb-5 pb-5 text-center">
                    <div className="scroll1 mb-5">
                        {[scroll1, scroll2, scroll3, scroll4, scroll5,scroll1, scroll2, scroll3, scroll4, scroll5,scroll1, scroll2, scroll3, scroll4, scroll5].map((src, index) => (
                            <img key={index} src={src} className="img-responsives list-group-item" alt={`scroll Image ${index + 1}`} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
