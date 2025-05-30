



// 22-05-25
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import img1 from '/Images/logo.jpg';

// const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
//     const navigate = useNavigate();
//     const [isOpen, setIsOpen] = useState(false);

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('currentUser');
//         setIsLoggedIn(false);
//         navigate('/');
//     };

//     const scrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//         setIsOpen(false);
//     };

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <nav className="main-navbar">
//             <div className="navbar-container">
//                 <div className="navbar-brand-container">
//                     <Link className="navbar-brand" to="/" onClick={scrollToTop}>
//                         <img src={img1} className="navbar-logo" alt="CipherShield Technologies Logo" />
//                         <span className="navbar-company-name">CipherShield Technologies</span>
//                     </Link>
//                 </div>

//                 <button 
//                     className={`navbar-toggler ${isOpen ? 'active' : ''}`} 
//                     type="button" 
//                     onClick={toggleMenu}
//                     aria-label="Toggle navigation"
//                 >
//                     <span className="toggler-icon"></span>
//                     <span className="toggler-icon"></span>
//                     <span className="toggler-icon"></span>
//                 </button>

//                 <div className={`navbar-collapse ${isOpen ? 'show' : ''}`}>
//                     <ul className="navbar-nav">
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/" onClick={scrollToTop}>Home</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/AboutUs" onClick={scrollToTop}>About Us</Link>
//                         </li>
//                         {/* <li className="nav-item">
//                             <Link className="nav-link" to="/Services" onClick={scrollToTop}>Services</Link>
//                         </li> */}
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/Automation" onClick={scrollToTop}>Automation</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/ValueforInvestors" onClick={scrollToTop}>Value for Investors</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/WeServe" onClick={scrollToTop}>We Serve</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/Career" onClick={scrollToTop}>Career</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/CategoryPage" onClick={scrollToTop}>Portfolio</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/BlogFront" onClick={scrollToTop}>Blog</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/partners" onClick={scrollToTop}>Partners</Link>
//                         </li>
//                         {isLoggedIn && (
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/DashboardLayout" onClick={scrollToTop}>Dashboard</Link>
//                             </li>
//                         )}
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/ContactUs" onClick={scrollToTop}>Contact Us</Link>
//                         </li>
//                     </ul>




//                     <div className="navbar-auth">
//                         {isLoggedIn ? (
//                             <button className="btn-logout" onClick={handleLogout}>
//                                 Logout
//                             </button>
//                         ) : (
//                             <Link className="btn-login" to="/login" onClick={scrollToTop}>
//                                 Login
//                             </Link>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;



// 30-05-25
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img1 from '/Images/logo.jpg';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        setIsLoggedIn(false);
        navigate('/');
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="main-navbar">
            <div className="navbar-container">
                <div className="navbar-brand-container">
                    <Link className="navbar-brand" to="/" onClick={scrollToTop}>
                        <img src={img1} className="navbar-logo" alt="CipherShield Technologies Logo" />
                        <span className="navbar-company-name">CipherShield Technologies</span>
                    </Link>
                </div>

                <button 
                    className={`navbar-toggler ${isOpen ? 'active' : ''}`} 
                    type="button" 
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                </button>

                <div className={`navbar-collapse ${isOpen ? 'show' : ''}`}>
                    {/* Add 'small-font' class if logged in */}
                    <ul className={`navbar-nav ${isLoggedIn ? 'small-font' : ''}`}>
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={scrollToTop}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/AboutUs" onClick={scrollToTop}>About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Automation" onClick={scrollToTop}>Automation</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/ValueforInvestors" onClick={scrollToTop}>Value for Investors</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/WeServe" onClick={scrollToTop}>We Serve</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Career" onClick={scrollToTop}>Career</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/CategoryPage" onClick={scrollToTop}>Portfolio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/BlogFront" onClick={scrollToTop}>Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/partners" onClick={scrollToTop}>Partners</Link>
                        </li>
                        {isLoggedIn && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/DashboardLayout" onClick={scrollToTop}>Dashboard</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link" to="/ContactUs" onClick={scrollToTop}>Contact Us</Link>
                        </li>
                    </ul>

                    <div className="navbar-auth">
                        {isLoggedIn ? (
                            <button className="btn-logout" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <Link className="btn-login" to="/login" onClick={scrollToTop}>
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
