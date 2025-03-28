import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; // CSS imports yahin kar sakte hain

import imgWebp from '/Images/AiAutomationes.webp';
import imgJpeg from '/Images/AiAutomationes.webp';
import imgJpg from '/Images/AiAutomationes.webp';


import img2Webp from '/Images/risk-managmeent-ipad.webp';
import img2Jpeg from '/Images/risk-managmeent-ipad.webp';
import img2Jpg from '/Images/risk-managmeent-ipad.webp';



import img3Webp from '/Images/AIPredictive.webp';
import img3Jpeg from '/Images/AIPredictive.webp';
import img3Jpg from '/Images/AIPredictive.webp';


import img4Webp from '/Images/ScalableAutomation.webp';
import img4Jpeg from '/Images/ScalableAutomation.webp';
import img4Jpg from '/Images/ScalableAutomation.webp';


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
      <div className='serviceSlider'>
      <picture>
  {/* WebP Format */}
  <source 
    srcSet={`${imgWebp} 300w, ${imgWebp} 600w, ${imgWebp} 1200w`} 
    type="image/webp" 
  />

  {/* JPEG Format */}
  <source 
    srcSet={`${imgJpeg} 300w, ${imgJpeg} 600w, ${imgJpeg} 1200w`} 
    type="image/jpeg" 
  />

  {/* Default Fallback (JPG) */}
  <img 
    src={imgJpg} 
    srcSet={`${imgJpg} 300w, ${imgJpg} 600w, ${imgJpg} 1200w`}
    sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
    loading="lazy"
    alt="Logo img" 
    className="img-responsive"
    width="100%"
    height="auto"
  />
</picture>

 </div>
      <div className='serviceSlider'>
      <picture>
  {/* WebP Format */}
  <source 
    srcSet={`${img2Webp} 300w, ${img2Webp} 600w, ${img2Webp} 900w`} 
    type="image/webp" 
  />

  {/* JPEG Format */}
  <source 
    srcSet={`${img2Jpeg} 300w, ${img2Jpeg} 600w, ${img2Jpeg} 900w`} 
    type="image/jpeg" 
  />

  {/* Default Fallback (JPG) */}
  <img 
    src={img2Jpg} 
    srcSet={`${img2Jpg} 300w, ${img2Jpg} 600w, ${img2Jpg} 900w`}
    sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 900px"
    loading="lazy"
    alt="Logo img" 
    className="img-responsive"
    width="100%"
    height="auto"
  />
</picture>

 </div>
      <div className='serviceSlider'>
      <picture>
  {/* WebP Format */}
  <source 
    srcSet={`${img3Webp} 300w, ${img3Webp} 600w, ${img3Webp} 900w`} 
    type="image/webp" 
  />

  {/* JPEG Format */}
  <source 
    srcSet={`${img3Jpeg} 300w, ${img3Jpeg} 600w, ${img3Jpeg} 900w`} 
    type="image/jpeg" 
  />

  {/* Default Fallback (JPG) */}
  <img 
    src={img3Jpg} 
    srcSet={`${img3Jpg} 300w, ${img3Jpg} 600w, ${img3Jpg} 900w`}
    sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 900px"
    loading="lazy"
    alt="Logo img" 
    className="img-responsive"
    width="100%"
    height="auto"
  />
</picture>


      </div>
      <div className='serviceSlider'>
      <picture>
  {/* WebP Format */}
  <source 
    srcSet={`${img4Webp} 300w, ${img4Webp} 600w, ${img4Webp} 900w`} 
    type="image/webp" 
  />

  {/* JPEG Format */}
  <source 
    srcSet={`${img4Jpeg} 300w, ${img4Jpeg} 600w, ${img4Jpeg} 900w`} 
    type="image/jpeg" 
  />

  {/* Default Fallback (JPG) */}
  <img 
    src={img4Jpg} 
    srcSet={`${img4Jpg} 300w, ${img4Jpg} 600w, ${img4Jpg} 900w`}
    sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 900px"
    loading="lazy"
    alt="Logo img" 
    className="img-responsive"
    width="100%"
    height="auto"
  />
</picture>


      </div>
    </Slider>
  );
}

export default ServiceSlider;
