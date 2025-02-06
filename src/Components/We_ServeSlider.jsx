import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; // CSS imports yahin kar sakte hain

import img from '/Images/Finance_Banking.png';

import img2 from '/Images/heltcare.png';
import img3 from '/Images/Manufacturing.jpg';
import img4 from '/Images/Cybersecurity.png';


const We_ServeSlider = () => {
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

export default We_ServeSlider;
