import React, { useState, useEffect } from 'react';


const WhatsAppButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Show button after scrolling 300px
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    // Add event listener immediately
    window.addEventListener('scroll', handleScroll);
    
    // Initial check in case page loads scrolled
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '918882171554';  // ✅ WhatsApp number (without + sign)
    const message = 'Hello, I am interested in your services!';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`whatsapp-container ${showButton ? 'visible' : ''}`}>
      <button className="whatsapp-btn" onClick={handleWhatsAppClick}>
        <img 
          src="/Images/Newwhatshap.png"  // Updated path - store in public/assets
          alt="WhatsApp" 
          className="whatsapp-icon"
        />
      </button>
    </div>
  );
};

export default WhatsAppButton;