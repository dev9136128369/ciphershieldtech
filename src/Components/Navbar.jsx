// import React from 'react'
// import { Link } from 'react-router-dom'
// import img1 from '/Images/logo.jpg';


// const Navbar = () => {
//     const isLoggedIn = localStorage.getItem('token') !== null;
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light sticky sticky-top mainHeader" id='heade'>
//     <div className="col-lg-1 col-md-1 col-sm-1 logo">
//     <a className="navbar-brand" to ="/Home"> <img src={img1}  className='images' alt='logo img' />
//     </a>
//     </div>
//     <div className="col-lg-3 col-md-3 col-sm-3 cypher ms-3">
//         <p>CipherShield Technologies</p>
//     </div>
   
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//            <i className="fa-solid fa-bars"></i>
//         </button>
    
//     <div className="collapse navbar-collapse" id="navbarNav">
        
//         <ul className="navbar-nav">
//             <li className="nav-item">
//             <Link className="nav-link" to ="/">Home </Link>
//             </li>
//             <li className="nav-item">
//             <Link className="nav-link" to ="/AboutUs">About Us </Link>
//                 {/* <a className="nav-link me-2" href="/AboutUs">About Us</a> */}
//             </li>
//             <li className="nav-item">
//             <Link className="nav-link" to ="/Services">Services </Link>

//                 {/* <a className="nav-link me-2" href="/Services">Services</a> */}
//             </li>
//             <li className="nav-item">
//             <Link className="nav-link" to ="/Automation">Automation </Link>

//                 {/* <a className="nav-link me-2" href="/Automation">Automation</a> */}
//             </li>
//             <li className="nav-item">
//             <Link className="nav-link" to ="/ValueforInvestors">Value for Investors</Link>

//                 {/* <a className="nav-link me-2" href="/Value_for_Investors">Value for Investors</a> */}
//             </li>
//             <li className="nav-item">
//             <Link className="nav-link" to ="/WeServe">We Serve </Link>

//                 {/* <a className="nav-link me-2" href="/We_Serve">We Serve</a> */}
//             </li>
//             <li className="nav-item">
//             <Link className="nav-link" to ="/Career">Career </Link>

//                 {/* <a className="nav-link me-2" href="/Career">Career</a> */}
//             </li>

//             <li className="nav-item">
//             <Link className="nav-link" to ="/DashboardLayout
//             ">Dashboard</Link>
//                 {/* <a className="nav-link me-2" href="/Career">Career</a> */}
//             </li>

           
//             {/* {isLoggedIn && (
//   <Link to="/blog-editor" className="nav-link">
//     Create Blog
//   </Link>
// )} */}
//             <li className="nav-item">
//             <Link className="nav-link" to ="/ContactUs">Contact Us </Link>

//                 {/* <a className="nav-link me-5" href="/ContactUs">Contact Us</a> */}
//             </li>
     
//         </ul>
//         </div>
   
// </nav>
//   )
// }

// export default Navbar




import React from 'react'
// import { Link } from 'react-router-dom'
import img1 from '/Images/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      setIsLoggedIn(false);
      navigate('/');
    };
    // const isLoggedIn = localStorage.getItem('token') !== null;
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky sticky-top mainHeader" id='heade'>
    <div className="col-lg-1 col-md-1 col-sm-1 logo">
    <a className="navbar-brand" to ="/Home"> <img src={img1}  className='images' alt='logo img' />
    </a>
    </div>
    <div className="col-lg-3 col-md-3 col-sm-3 cypher ms-3">
        <p>CipherShield Technologies</p>
    </div>
   
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
           <i className="fa-solid fa-bars"></i>
        </button>
    
    <div className="collapse navbar-collapse" id="navbarNav">
        
        <ul className="navbar-nav">
            <li className="nav-item">
            <Link className="nav-link" to ="/" onClick={() => scrollToSection('heade')}>Home </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to ="/AboutUs" onClick={() => scrollToSection('heade')}>About Us </Link>
                {/* <a className="nav-link me-2" href="/AboutUs">About Us</a> */}
            </li>
            <li className="nav-item">
            <Link className="nav-link" to ="/Services" onClick={() => scrollToSection('heade')}>Services </Link>

                {/* <a className="nav-link me-2" href="/Services">Services</a> */}
            </li>
            <li className="nav-item">
            <Link className="nav-link" to ="/Automation" onClick={() => scrollToSection('heade')}>Automation </Link>

                {/* <a className="nav-link me-2" href="/Automation">Automation</a> */}
            </li>
            <li className="nav-item">
            <Link className="nav-link" to ="/ValueforInvestors" onClick={() => scrollToSection('heade')}>Value for Investors</Link>

                {/* <a className="nav-link me-2" href="/Value_for_Investors">Value for Investors</a> */}
            </li>
            <li className="nav-item">
            <Link className="nav-link" to ="/WeServe" onClick={() => scrollToSection('heade')}>We Serve </Link>

                {/* <a className="nav-link me-2" href="/We_Serve">We Serve</a> */}
            </li>
            <li className="nav-item">
            <Link className="nav-link" to ="/Career" onClick={() => scrollToSection('heade')}>Career </Link>

                {/* <a className="nav-link me-2" href="/Career">Career</a> */}
            </li>

            <li className="nav-item">
            <Link className="nav-link" to ="/DashboardLayout
            " onClick={() => scrollToSection('heade')}>Dashboard</Link>
                {/* <a className="nav-link me-2" href="/Career">Career</a> */}
            </li>
        
           
            {/* {isLoggedIn && (
  <Link to="/blog-editor" className="nav-link">
    Create Blog
  </Link>
)} */}
            <li className="nav-item">
            <Link className="nav-link" to ="/ContactUs" onClick={() => scrollToSection('heade')}>Contact Us </Link>

                {/* <a className="nav-link me-5" href="/ContactUs">Contact Us</a> */}
            </li>
         <div className="d-flex">
            {isLoggedIn ? (
              <>
                {/* <Link className="btn btn-primary me-2" to="/dashboard">
                  Dashboard
                </Link> */}
                <button className="btns " onClick={handleLogout} >
                  Logout
                </button>
              </>
            ) : (
              <Link className="btns " to="/login" onClick={() => scrollToSection('heade')} >
                Login
              </Link>
            )}
          </div>
        </ul>
        </div>
   
</nav>
  )
}

export default Navbar
