import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; // CSS imports yahin kar sakte hain

import img from '/Images/AiAutomationes.png';

import img2 from '/Images/risk-managmeent-ipad.png';
import img3 from '/Images/AIPredictive.png';
import img4 from '/Images/ScalableAutomation.jpg';


const ServiceSlider = () => {
  const settings = {
    loop:true,
  items: 4,   
   navigation : false,
   dots:false,
autoplay:true,
autoplayTimeout:2000,
autoplayHoverPause: true
  };

  return (
    <Slider {...settings}>
      <div>
      <img src={img}  className='img-responsive' alt='logo img' style={{height:"50vh", width:"100%"}}/>
      </div>
      <div>
      <img src={img2}  className='img-responsive' alt='logo img' style={{height:"50vh", width:"100%"}}/>

      </div>
      <div>
      <img src={img3}  className='img-responsive' alt='logo img' style={{height:"50vh", width:"100%"}}/>

      </div>
      <div>
      <img src={img4}  className='img-responsive' alt='logo img' style={{height:"50vh", width:"100%"}}/>

      </div>
    </Slider>
  );
}

export default ServiceSlider;
