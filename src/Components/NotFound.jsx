import { Link } from "react-router-dom";

import WhatsAppButton from "../Components/WhatsAppButton"


const NotFound = () => {
  return (
    <>
        <WhatsAppButton/>

    <div className="videoauter" >
      
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
         className="videoinner"
      >
        <source src="/Images/404Error.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="NotDiv" >
        <h1>404 - Page Not Found</h1>
        <p>Oops! Yeh page exist nahi karta.</p>
        <Link to="/" className="NotLink" >
          🏠 Home Page par wapas jayein
        </Link>
      </div>

    </div>
    </>
  );
};

export default NotFound;
