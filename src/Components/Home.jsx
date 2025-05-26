// import React from "react";
// import { Helmet } from "react-helmet";
// import HeaderSlider from "../components/HeaderSlider";

// import WhatsAppButton from "../Components/WhatsAppButton"
// // import video from '/Images/Ai_animation1.mov';

// import AIAutomationJpeg from '/Images/AIAutomation.webp';
// import AIAutomationWebp from '/Images/AIAutomation.webp';
// import AIAutomationJpg from '/Images/AIAutomation.webp';



// import AIDeepLearningJpeg from '/Images/AIDeepLearning.webp';
// import AIDeepLearningwebp from '/Images/AIDeepLearning.webp';
// import AIDeepLearningJpg from '/Images/AIDeepLearning.webp';

// import scroll from '/Images/AIAutomation.webp';
// import scroll1 from '/Images/slider2.webp';
// import scroll2 from '/Images/slider3.webp';
// import scroll3 from '/Images/slider4.webp';
// import scroll4 from '/Images/slider5.webp';
// import scroll5 from '/Images/slider6.webp';
// import scroll6 from '/Images/slider7.webp';

// const Home = () => {
//     return (
//         <>
//         <WhatsAppButton/>
//             {/* SEO Meta Tags */}
//             <Helmet>
//             <title>AI & Automation Solutions | CipherShield Technologies</title>
// <meta name="description" content="CipherShield Technologies offers AI-driven business automation, security solutions, and deep-tech innovations for smarter business growth."/>
// <meta name="keywords" content="AI solutions, business automation, deep learning, AI security, automation technology, smart business solutions"/>

//                 <meta name="author" content="CipherShield Technologies" />
//                 <meta name="robots" content="index, follow" />
//             </Helmet>

//             <div id="heade"></div>
//             <HeaderSlider />

//             <div className="container-fluid">
//                 {/* About Section */}
//                 <div className="row Aboutss text-center mt-5">
//                     <div className="col-lg-6 col-md-6 col-sm-12 box2 mt-5 pt-5 text-center">
//                     {/* <figure>
//       <div className="fixed-wrap">
//         <video id="fixed" autoPlay muted loop playsInline>
//           <source src={video} type="video/mp4" />
//           <source src={video.replace(".mp4", ".webm")} type="video/webm" />
//           Your browser does not support the video tag.
//         </video>
//       </div>
//     </figure> */}
//        <picture>
//     {/* WebP Format */}
//     <source 
//       srcSet={`${AIAutomationWebp} 300w, ${AIAutomationWebp} 600w, ${AIAutomationWebp} 1200w`} 
//       type="image/webp" 
//     />
  
//     {/* JPEG Format */}
//     <source 
//       srcSet={`${AIAutomationJpeg} 300w, ${AIAutomationJpeg} 600w, ${AIAutomationJpeg} 1200w`} 
//       type="image/jpeg" 
//     />
  
//     {/* Default Fallback (JPG) */}
//     <img 
//       src={AIAutomationJpg} 
//       srcSet={`${AIAutomationJpg} 300w, ${AIAutomationJpg} 600w, ${AIAutomationJpg} 1200w`}
//       sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
//       loading="lazy"
//       alt="Ai-Power img" 
//       className="img-responsive" 
//      width="100%"
//       height="auto"
//     />
//   </picture>

//                     </div>
//                     <div className="col-lg-6 col-md-6 col-sm-12 mt-5 text-center">
//                         <div className="boxe animate__animated animate__rotateInDownRight mt-5 text-justify">
//                         <h1 className="heading-with-line text-center">
//   CipherShield Technologies - AI & Automation Experts
//   <span className="decorative-line3"></span>
// </h1>
//                         <h2>Transform Your Business with AI-Driven Solutions</h2>
//                             <p>
//                                 Revolutionizing industries with cutting-edge AI, automation, and deep-tech solutions designed to unlock efficiency, growth, and future-ready success. 
//                                 Artificial Intelligence (AI) has become a cornerstone of innovation across various industries, transforming how businesses operate, compete, and grow. 
//                                 By leveraging AI technologies, companies are unlocking smarter business solutions that improve efficiency, enhance customer experiences, and drive competitive advantage.
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Introduction Section */}
//                 <div className="container care mt-5 text-center">
//                     <h2 className="mb-5">Introduction to AI-Driven Business Solutions
//       <span className="decorative-line"></span>

//                     </h2>
//                     <div className="container care text-center">
//                         <p className="fonts font-medium text-justify mt-2">
//                             At CipherShield Technologies, we are building the future of business with artificial intelligence (AI), automation, and deep-tech innovations. 
//                             Our smart solutions are not just about improving processes—they&#39;re about transforming industries, increasing profitability, and driving growth. 
//                             With a strong focus on security, scalability, and data-driven decision-making, we deliver high-impact solutions that help businesses stay ahead in today’s fast-paced digital world. 
//                             We use advanced AI to automate operations, reduce costs, and maximize productivity, allowing companies to focus on innovation and market expansion.
//                         </p>
//                     </div>
//                 </div>

//                 {/* Image Section */}
//                 <div className="container text-center mb-5">
//                     <div className="col-lg-8 col-md-10 col-sm-12 career text-center">
//                         <h3 className="text-center mt-5 mb-5">AI & Deep Learning in Business
//       <span className="decorative-line2"></span>

//                         </h3>
  
// {/* <div className="video-container text-center">
//     <video 
//       autoPlay 
//       loop 
//       muted 
//       playsInline 
//       className="responsive-video ms-5"
//     >
//       <source src='/Images/Deeplerning.mp4' type="video/mp4" />
//       <source src='/Images/Deeplerning.webm' type="video/webm" />
  
//     </video>
//   </div> */}

//           <picture>
//     {/* WebP Format */}
//     <source 
//       srcSet={`${AIDeepLearningwebp} 300w, ${AIDeepLearningwebp} 600w, ${AIDeepLearningwebp} 1200w`} 
//       type="image/webp" 
//     />
  
//     {/* JPEG Format */}
//     <source 
//       srcSet={`${AIDeepLearningJpeg} 300w, ${AIDeepLearningJpeg} 600w, ${AIDeepLearningJpeg} 1200w`} 
//       type="image/jpeg" 
//     />
  
//     {/* Default Fallback (JPG) */}
//     <img 
//       src={AIDeepLearningJpg} 
//       srcSet={`${AIDeepLearningJpg} 300w, ${AIDeepLearningJpg} 600w, ${AIDeepLearningJpg} 1200w`}
//       sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
//       loading="lazy"
//       alt="Ai-Power img" 
//       className="img-responsive" 
//      width="100%"
//       height="auto"
//     />
//   </picture>
//                     </div>
//                 </div>

//                 {/* Scrolling Images Section */}
//                 <div className="scroller1 mb-5 pb-5 text-center">
//                     <h3>Our AI-Driven Business Technologies</h3>
                  
//                     <div className="scroll-container">
//   {/* {Array(10) // Repeat the video set 10 times
//     .fill([scroll1,scroll2,scroll3,scroll4,scroll5,scroll6,scroll1,scroll2,scroll3,scroll4,scroll5,scroll1,scroll2,scroll3,scroll4,scroll5,scroll1,scroll2,scroll3,scroll4,scroll5,scroll1,scroll2,scroll3,scroll4,scroll5])
//     .flat()
//     .map((src, index) => (
//       <video
//         key={index}
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="scroll-video"
//       >
//         <source src={src} type="video/mp4" />
//         <source src={src.replace(".mp4", ".webm")} type="video/webm" />
//         Your browser does not support the video tag.
//       </video>
//     ))} */}
//     {Array(10) // Repeat image set 10 times
//   .fill([scroll,
//     scroll1, scroll2, scroll3, scroll4, scroll5, scroll6,scroll,
//     scroll1, scroll2, scroll3, scroll4, scroll5,scroll6,scroll,
//     scroll1, scroll2, scroll3, scroll4, scroll5,scroll6,scroll,
//     scroll1, scroll2, scroll3, scroll4, scroll5,scroll6,scroll,
//     scroll1, scroll2, scroll3, scroll4, scroll5,scroll6,scroll,
//   ])
//   .flat()
//   .map((src, index) => (
//     <img
//       key={index}
//       src={src}
//       alt={`scroll-img-${index}`}
//       className="scroll-image"
//       loading="lazy"
//     />
// ))}
// </div>
//                     </div>
//                       {/* <div className='mt-5 text-white'>
//         <a href='www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=ciphershieldtechnologies'><u>Follow me on LinkedIn</u></a>
//     </div> */}
//                 </div>
            
//         </>
//     );
// }

// export default Home;




// 22-05-25

import React from "react";
import { Helmet } from "react-helmet";
import HeaderSlider from "./HeaderSlider";
import WhatsAppButton from "../Components/WhatsAppButton";

import AIAutomationJpeg from '/Images/AIAutomation.webp';
import AIAutomationWebp from '/Images/AIAutomation.webp';
import AIAutomationJpg from '/Images/AIAutomation.webp';

import AIDeepLearningJpeg from '/Images/AIDeepLearning.webp';
import AIDeepLearningwebp from '/Images/AIDeepLearning.webp';
import AIDeepLearningJpg from '/Images/AIDeepLearning.webp';

import scroll from '/Images/AIAutomation.webp';
import scroll1 from '/Images/slider2.webp';
import scroll2 from '/Images/slider3.webp';
import scroll3 from '/Images/slider4.webp';
import scroll4 from '/Images/slider5.webp';
import scroll5 from '/Images/slider6.webp';
import scroll6 from '/Images/slider7.webp';

const Home = () => {
    return (
        <>
            <WhatsAppButton/>
            {/* SEO Meta Tags */}
            <Helmet>
                <title>AI & Automation Solutions | CipherShield Technologies</title>
                <meta name="description" content="CipherShield Technologies offers AI-driven business automation, security solutions, and deep-tech innovations for smarter business growth."/>
                <meta name="keywords" content="AI solutions, business automation, deep learning, AI security, automation technology, smart business solutions"/>
                <meta name="author" content="CipherShield Technologies" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>

            <div id="heade"></div>
            <HeaderSlider />

            <div className="container-fluid px-0">
                {/* About Section */}
                <div className="row Aboutss text-center mx-0">
                    <div className="col-lg-6 col-md-6 col-sm-12 box2 order-md-1 order-2 mt-md-5 pt-md-5">
                        <picture>
                            <source 
                                srcSet={`${AIAutomationWebp} 300w, ${AIAutomationWebp} 600w, ${AIAutomationWebp} 1200w`} 
                                type="image/webp" 
                            />
                            <source 
                                srcSet={`${AIAutomationJpeg} 300w, ${AIAutomationJpeg} 600w, ${AIAutomationJpeg} 1200w`} 
                                type="image/jpeg" 
                            />
                            <img 
                                src={AIAutomationJpg} 
                                srcSet={`${AIAutomationJpg} 300w, ${AIAutomationJpg} 600w, ${AIAutomationJpg} 1200w`}
                                sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                                loading="lazy"
                                alt="AI-Powered Automation" 
                                className="img-fluid w-100"
                                width="100%"
                                height="auto"
                            />
                        </picture>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 order-md-2 order-1">
                        <div className="boxe p-3 p-md-5 text-md-left text-center">
                            <h1 className="heading-with-line">
                                CipherShield Technologies - AI & Automation Experts
                                <span className="decorative-line3"></span>
                            </h1>
                            <h2 className="h4">Transform Your Business with AI-Driven Solutions</h2>
                            <p className="mb-0">
                                Revolutionizing industries with cutting-edge AI, automation, and deep-tech solutions designed to unlock efficiency, growth, and future-ready success. 
                                Artificial Intelligence (AI) has become a cornerstone of innovation across various industries, transforming how businesses operate, compete, and grow.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Introduction Section */}
                <div className="container care py-5">
                    <h2 className="mb-4 text-center">
                        Introduction to AI-Driven Business Solutions
                                                       <span className="decorative-line3"></span>

                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <p className="text-justify">
                                At CipherShield Technologies, we are building the future of business with artificial intelligence (AI), automation, and deep-tech innovations. 
                                Our smart solutions are not just about improving processes—they're about transforming industries, increasing profitability, and driving growth. 
                                With a strong focus on security, scalability, and data-driven decision-making, we deliver high-impact solutions that help businesses stay ahead in today's fast-paced digital world.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <h3 className="text-center mb-5 pb-5">
                                AI & Deep Learning in Business
                                <span className="decorative-line"></span>
                            </h3>
                            <picture>
                                <source 
                                    srcSet={`${AIDeepLearningwebp} 300w, ${AIDeepLearningwebp} 600w, ${AIDeepLearningwebp} 1200w`} 
                                    type="image/webp" 
                                />
                                <source 
                                    srcSet={`${AIDeepLearningJpeg} 300w, ${AIDeepLearningJpeg} 600w, ${AIDeepLearningJpeg} 1200w`} 
                                    type="image/jpeg" 
                                />
                                <img 
                                    src={AIDeepLearningJpg} 
                                    srcSet={`${AIDeepLearningJpg} 300w, ${AIDeepLearningJpg} 600w, ${AIDeepLearningJpg} 1200w`}
                                    sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                                    loading="lazy"
                                    alt="AI Deep Learning" 
                                    className="img-fluid w-100 "
                                />
                            </picture>
                        </div>
                    </div>
                </div>

                {/* Scrolling Images Section */}
                 <div className="scroller1 mb-5 pb-5 text-center">
                    <h3>Our AI-Driven Business Technologies</h3>
                  
                    <div className="scroll-container">
  {/* {Array(10) // Repeat the video set 10 times
    .fill([scroll1,scroll2,scroll3,scroll4,scroll5,scroll6,scroll1,scroll2,scroll3,scroll4,scroll5,scroll1,scroll2,scroll3,scroll4,scroll5,scroll1,scroll2,scroll3,scroll4,scroll5,scroll1,scroll2,scroll3,scroll4,scroll5])
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
    ))} */}
    {Array(10) // Repeat image set 10 times
  .fill([scroll,
    scroll1, scroll2, scroll3, scroll4, scroll5, scroll6,scroll,
    scroll1, scroll2, scroll3, scroll4, scroll5,scroll6,scroll,
    scroll1, scroll2, scroll3, scroll4, scroll5,scroll6,scroll,
    scroll1, scroll2, scroll3, scroll4, scroll5,scroll6,scroll,
    scroll1, scroll2, scroll3, scroll4, scroll5,scroll6,scroll,
  ])
  .flat()
  .map((src, index) => (
    <img
      key={index}
      src={src}
      alt={`scroll-img-${index}`}
      className="scroll-image"
      loading="lazy"
    />
))}
</div>
                    </div>
                {/* <div className="scroller1 py-5">
                    <div className="container">
                        <h3 className="text-center mb-4">Our AI-Driven Business Technologies</h3>
                        <div className="scroll-container">
                            {Array(10)
                                .fill([scroll,
    scroll1, scroll2, scroll3, scroll4, scroll5, scroll6,scroll,
    scroll1, scroll2, scroll3, scroll4, scroll5,scroll6,scroll,
    scroll1, scroll2, scroll3, scroll4, scroll5,scroll6,scroll,
    scroll1, scroll2, scroll3, scroll4, scroll5,scroll6,scroll,
    scroll1, scroll2, scroll3, scroll4, scroll5,scroll6,scroll,])
                                .flat()
                                .map((src, index) => (
                                    <img
                                        key={index}
                                        src={src}
                                        alt={`AI Technology ${index}`}
                                        className="scroll-image"
                                        loading="lazy"
                                    />
                                ))}
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default Home;