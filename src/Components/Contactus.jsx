import React from 'react'
import img1 from '/Images/B-7JS.png';
import img2 from '/Images/contactNumber.png';
import img3 from '/Images/Email.png';

const Contactus = () => {
  return (
    <>
<div id='header8'></div>
    <div className="container-fluid">
        <div className="row contactus">
            <div className="col-sm-12 contactslide">
            </div>
        </div>
        <div className="row formcontrol mt-5">
            <div className="col-sm-6 boxex pt-5">
                <div className="row">
                    <div className="col-sm-2">
                        <label for="email-field" className="pb-2">Name</label>
                    </div>
                    <div className="col-sm-8">
                        <input type="text" onkeydown="return /[a-z]/i.test(event.key)" className="form-control" name="email" id="txtName" required=""/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <label for="email-field" className="pb-2">EmailId</label>
                    </div>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="email" id="txtEmailId" required=""/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <label for="email-field" className="pb-2">Subject</label>
                    </div>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="Subject" id="txtSubject" required=""/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2 text-center">
                        <label for="email-field" className="pb-2">Message</label>
                    </div>
                    <div className="col-sm-8">
                        <textarea className="form-control" name="Body" rows="8" id="txtBody" required=""></textarea>
                    </div>

                </div>
                <br />
                <div className="col-md-12 text-left">
                    <button type="button" className="btn btn-success btn-lg" id="btnSubmit">Submit</button>
                </div>
            </div>
            <div className="col-sm-6 boxex1">
                <h3><i className="fa fa-map-marker fa-spin" aria-hidden="true"></i> &nbsp; Address</h3>
                  <img src={img1}  className='img-responsive' alt='Address img'/>   
                
               
                <h3><i className="fa fa-phone fa-spin" aria-hidden="true"></i>&nbsp; Call Us</h3>
                <img src={img2}  className='img-responsive' alt='Contact img'/>   
                
                
                <h3><i className="fa fa-envelope fa-spin" aria-hidden="true"></i>&nbsp; Email Us</h3>
                <img src={img3}  className='img-responsive' alt='Email img'/>   
                
                
            </div>

        </div>
        <div className="container map mt-5 mb-5">
            <div className="col-md-12">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14015.678522053231!2d77.3240682!3d28.572176!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6c80af5d7e9a74c1%3A0x3712cd302f4b63a0!2sCipherShield%20Technologies!5e0!3m2!1sen!2sin!4v1719750714447!5m2!1sen!2sin" width="1000" height="500" allowfullscreen=" " loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </div>
    </>
  )
}

export default Contactus
