import React from 'react'
import image from '/Images/highparformances.png'
import image1 from '/Images/groth.png'

const Value_for_Investors = () => {
  return (
    <>
    <div id='header4'></div>

    <div className="container-fluid">
        <div className="row carre">
            <div className="col-lg-5">
                 <img src={image}  className='img-responsive' alt='logo img'/>   
            </div>

        </div>
        <div className="col-lg-12 caree pt-5 mb-5">
            <h1>Transforming Business Operations <br />with AI &#45; For Better Growth and Return on Investment (ROI)</h1>
        </div>
        <div className="row Aboutss  mt-5">
            <div className="col-lg-6 col-md-6 col-sm-6 box2 ">
            <img src={image1}  className='img-responsive ' alt='logo img'/>  
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="boxe animate__animated animate__rotateInDownRight">
                    <p className="text-justify">
                        Investing in CipherShield means investing in the future of business innovation.<br />


                        As an investor, you &#39; re looking for long-term growth, competitive advantage, and high <b>ROI</b>. CipherShield Technologies delivers all of this and more by harnessing the power of AI, automation, and deep-tech solutions to revolutionize how businesses operate.<br/>
                        •	<b>Scalable Impact: </b>Our AI and automation solutions are designed to grow with your business, ensuring continuous improvement and profitability.<br />
                        •	<b>Increased Efficiency: </b>By automating routine tasks and improving decision-making, businesses can significantly reduce costs and drive higher profits.<br />
                        •	<b>Data-Driven Growth: </b>Our deep-tech solutions enable businesses to leverage data more effectively, uncovering opportunities for expansion and market leadership.<br />
                        •	<b>AI-Powered Security: </b>With cybersecurity threats increasing, our AI-driven security solutions ensure that your business data is always protected, preventing costly breaches.<br />
                        By investing in CipherShield, you are backing a company that is building the next-generation of business technology that will reshape industries and deliver exponential value in the years ahead.

                    </p>
                    {/* <button type="button" id="aboutbtn" className="btn btn-light btn-lg">Know More</button> */}
                </div>
            </div>
        </div>

       
    </div>
    </>
  )
}

export default Value_for_Investors
