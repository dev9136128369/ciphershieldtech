import React from 'react'

import img1 from '/Images/autogif9.gif';

import img2 from '/Images/autoscrol1.png';
import img3 from '/Images/autoscrol3.png';
import img4 from '/Images/autoscrol4.png';
import img5 from '/Images/autoscrol6.png';
import img6 from '/Images/autoscrol7.jpg';


const Automation = () => {
  return (
    <>
<div id='header6'></div>

    <div className="container-fluid">

        <div className="main">

            <div className="page1">
                {/* <!-- <div className="video_div">
        <video className="w-100" autoplay loop muted>
            <source src="/Images/automat.mp4" type="video/mp4">
        </video>
    </div>--> */}
     
    
                <h1>Automation</h1>
                <p>Automation tools and services can streamline <br/>processes, reduce manual effort, and increase efficiency across various tasks and industries. </p>

            </div>
                <div className="scrolle">
                    <div className="scroll">
                        <h2>  
                            AUTOMATION
                        </h2>
                        <h2>
                            AUTOMATION
                        </h2>
                        <h2>
                            AUTOMATION
                        </h2>
                        <h2>
                            AUTOMATION
                        </h2>
                    </div>
                    <div className="scroll">
                        <h2>
                            AUTOMATION
                        </h2>
                        <h2>
                            AUTOMATION
                        </h2>
                        <h2>
                            AUTOMATION
                        </h2>
                        <h2>
                            AUTOMATION
                        </h2>
                    </div>
                </div>
            
            <div className="page2">

                <div className="row autom">
                    <div className="col-sm-6 automtext">
                        <h3>Automation</h3>
                        <p className="text-justify">Automation refers to the use of technology to perform tasks with minimal human intervention. This can involve a wide range of processes and systems, from simple mechanical devices to complex computer algorithms. Essentially, automation aims to increase efficiency, accuracy, and consistency by allowing machines or software to handle repetitive or complex tasks that would otherwise require human effort.</p>
                        <br/>
                        <p className="text-justify">Examples include:</p>
                        <ol type="i pb-3">
                            <li><b>Industrial Automation: </b>Using robots and machinery to assemble products on a production line.</li>
                            <li><b>Software Automation: </b>Implementing scripts or programs to handle routine data entry, analysis, or system monitoring.</li>
                            <li><b>Home Automation: </b>Controlling home systems like lighting, heating, and security through smart devices.</li>
                        </ol>
                    </div>
                    <div className="col-sm-6 automimg ">
                         <img src={img1}  className='img-responsive' alt='Automation img'/>   
                    </div>
                </div>

                <div className="row cards ">
                    <div className="container row text-center">
                        <div className="col-md-4 thirddive   ">
                            <div className="carde ">
                                <div className="card-body ">
                                    <h3 className="card-title"> Business Process Automation (BPA)</h3>
                                    <b className="calar ">Tools:</b>
                                    <p className="card-text pt-1 text-justify">

                                        <b>UiPath: </b>For robotic process automation (RPA) that automates repetitive tasks.
                                        <b> Automation Anywhere: </b>Another RPA tool for automating workflows.<br/>
                                        <b>Blue Prism: </b>Provides RPA solutions for enterprise automation.
                                    </p>
                                    <b className="calar ">Services:</b>
                                    <p className="card-text mb-5">
                                        <b>Zapier: </b>Connects various apps and automates workflows between them.
                                        <b>Integromat (now Make): </b>Automates tasks by connecting different services and apps.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 thirddive ">
                            <div className="carde">
                                <div className="card-body pb-5">
                                    <h3 className="card-title">IT Process Automation</h3>
                                    <b className="calar ">Tools:</b>
                                    <p className="card-text text-justify pb-4">

                                        <b>Ansible: </b>An open-source tool for configuration management and automation.<br/>
                                        <b>Puppet: </b>Manages and automates IT infrastructure.<br/>
                                        <b>Chef: </b>Automates configuration management and deployment.

                                    </p>
                                    <b className="calar ">Services:</b>
                                    <p className="card-text ">
                                        <b>AWS Lambda: </b>Serverless compute service that automatically runs code in response to events.<br/>
                                        <b>Microsoft Azure Automation: </b>Provides process automation and configuration management for Azure and other environments.

                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 thirddive ">
                            <div className="carde">
                                <div className="card-body mb-5 pb-5">
                                    <h3 className="card-title">Marketing Automation</h3>
                                    <b className="calar ">Tools:</b>
                                    <p className="card-text pt-3 text-justify">

                                        <b>HubSpot: </b>Offers tools for email marketing, social media, and CRM automation.<br/>
                                        <b>Marketo: </b>Provides marketing automation for lead management, email marketing, and analytics.<br/>
                                        <b>Pardot (by Salesforce): </b>Focuses on B2B marketing automation and lead generation.

                                    </p>
                                    <b className="calar ">Services:</b>
                                    <p className="card-text ">
                                        <b>Mailchimp: </b>Automates email campaigns and customer engagement.
                                        <b>ActiveCampaign: </b>Integrates email marketing, automation, and CRM.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container row text-center">
                        <div className="col-md-4 thirddive ">
                            <div className="carde ">
                                <div className="card-body mb-5 pb-5">
                                    <h3 className="card-title">Customer Service Automation</h3>
                                    <b className="calar ">Tools:</b>
                                    <p className="card-text text-justify">

                                        <b>Zendesk: </b>Automates customer support workflows and ticketing.<br/>
                                        <b>Freshdesk: </b>Provides automated ticketing and customer service solutions.<br/>
                                        <b>Intercom: </b>Automates customer interactions through chatbots and messaging.


                                    </p>
                                    <b className="calar ">Services:</b>
                                    <p className="card-text ">
                                        <b>Drift: </b>Automates lead qualification and customer communication through chatbots.<br/>
                                        <b>Olark: </b>Offers live chat automation and customer support features.

                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 thirddive ">
                            <div className="carde">
                                <div className="card-body mb-5 pb-5">
                                    <h3 className="card-title">DevOps and CI/CD Automation</h3>
                                    <b className="calar ">Tools:</b>
                                    <p className="card-text  text-justify">

                                        <b>Jenkins: </b>Automates building, testing, and deployment of code.<br/>
                                        <b>GitLab CI/CD: </b>Provides integrated continuous integration and deployment.<br/>
                                        <b>CircleCI: </b>Automates testing and deployment pipelines.
                                    </p>
                                    <b className="calar ">Services:</b>
                                    <p className="card-text text-justify">
                                        <b>AWS CodePipeline: </b>Fully managed service for continuous integration and delivery.<br/>
                                        <b>Azure DevOps: </b>Provides tools for continuous integration and continuous delivery.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 thirddive ">
                            <div className="carde mb-5 pb-3">
                                <div className="card-body mb-5 pb-4">
                                    <h3 className="card-title">Sales Automation</h3>
                                    <b className="calar ">Tools:</b>
                                    <p className="card-text text-justify">

                                        <b>Salesforce Sales Cloud: </b>Automates sales processes, lead management, and reporting.<br/>
                                        <b>Pipedrive: </b>Provides sales pipeline management and automation features.<br/>
                                        <b>Zoho CRM: </b>Automates sales workflows and customer relationship management.

                                    </p>
                                    <b className="calar ">Services:</b>
                                    <p className="card-text text-justify">
                                        <b>Outreach: </b>Automates sales outreach and engagement.<br/>
                                        <b>SalesLoft: </b>Provides tools for automating sales communications and workflows.

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 zohotext mt-5 ">
                    <h4>Browsing Automation</h4>
                </div>
                <div className="container row zoho-section1 animated-text ms-5" id="zohoanimated">

                    <div className="row trainningcard1 animated-text mt-2 pb-5">
                        <div className="col-md-4">
                            <div className="carde">
                                <div className="card-body text-justify pb-5">
                                    <h5 className="card-titles animate__animated animate__rotateInDownRight"><b>Web Scraping Tools:</b></h5>
                                    <ul>
                                        <li><b>BeautifulSoup: </b>A Python library for parsing HTML and XML documents; commonly used for web scraping.</li>
                                        <li><b>Scrapy: </b>An open-source web crawling framework for extracting data from websites.<br/></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mt-2 pb-5 ">
                            <div className="carde ">
                                <div className="card-body text-justify pb-5 ">
                                    <h5 className="card-titles animate__animated animate__rotateInDownRight"><b>Browser Automation Tools:</b></h5>
                                    <ul>
                                        <li><b>iMacros:  </b>Browser extension for automating repetitive web tasks such as form filling and data extraction.</li>
                                        <li><b>Katalon Studio:  </b>Provides browser automation capabilities and supports web testing.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 animated-text ">
                            <div className="carde">
                                <div className="card-body text-justify pb-5">
                                    <h5 className="card-titles animate__animated animate__rotateInDownRight"><b> Headless Browsers:</b></h5>
                                    <ul>
                                        <li><b> Headless Chrome:  </b>Runs Chrome in a non-GUI mode for automated testing and scraping.<br/></li>
                                        <li><b>PhantomJS:  </b>A discontinued headless browser; still used in some legacy systems.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 zohotext mt-5 ">
                    <h4>Mailing Automation</h4>
                </div>
                <div className="container row zoho-section1 animated-text ms-5" id="zohoanimated">

                    <div className="row trainningcard1 animated-text mt-2 pb-4">
                        <div className="col-md-4 ">
                            <div className="carde ">
                                <div className="card-body mb-5 pb-5 text-justify">
                                    <h5 className="card-titles animate__animated animate__rotateInDownRight "><b>Email Marketing Platforms:</b></h5>
                                    <ul>
                                        <li><b>Mailchimp: </b>Automates email campaigns, segmentation, and analytics.<br/></li>
                                        <li><b>SendGrid: </b>Provides transactional and marketing email automation services.<br/></li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 ">
                            <div className="carde">
                                <div className="card-body text-justify ">
                                    <h5 className="card-titles animate__animated animate__rotateInDownRight"><b>Transactional Email Services:</b></h5>
                                    <ul>
                                        <li><b>Amazon SES (Simple Email Service): </b>Allows you to send marketing, notification, and transactional emails.</li>
                                        <li><b>Mandrill (by Mailchimp): </b>For transactional emails with advanced tracking and analytics.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 animated-text mt-2">
                            <div className="carde ">
                                <div className="card-body mb-5  text-justify ">
                                    <h5 className="card-titles animate__animated animate__rotateInDownRight"><b> Email Automation Tools:</b></h5>
                                    <ul>
                                        <li><b>Zapier: </b>Can automate email workflows, such as sending emails based on triggers from other apps.</li>
                                        <li><b>Integromat (Make): </b>Provides similar email automation capabilities as Zapier.</li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 zohotext pt-5">
                    <h4>Data Extraction</h4>
                </div>

                <div className="container row zoho-section1 animated-text mb-5 ms-5" id="zohoanimated">

                    <div className="row trainningcard1 animated-text mt-2">
                        <div className="col-md-4">
                            <div className="carde">
                                <div className="card-body text-justify">
                                    <h5 className="card-titles "><b>Data Extraction Tools:</b></h5>
                                    <ul>
                                        <li><b> Octoparse: </b>A no-code web scraping tool for extracting data from websites.</li>
                                        <li><b> Diffbot: </b>Uses machine learning to extract data from web pages and provides structured data via APIs.</li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mt-2">
                            <div className="carde  ">
                                <div className="card-body  text-justify">
                                    <h5 className="card-titles "><b>APIs for Data Extraction:</b></h5>
                                    <ul>
                                        <li><b>Google Custom Search API: </b>Allows you to extract search results from Google Search.</li>
                                        <li><b> Webhose.io: </b>Provides access to web data and content from a range of sources.</li>

                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 animated-text ">
                            <div className="carde">
                                <div className="card-body text-justify">
                                    <h5 className="card-titles "><b> Data Integration Tools:</b></h5>
                                    <ul>
                                        <li><b> Talend: </b>Provides data integration, transformation, and extraction solutions.</li>
                                        <li><b> Informatica: </b>Offers a suite of tools for data extraction, transformation, and loading (ETL).</li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
<div className="scrollr">
  <div className="scrollo ">
    <img src={img2} className='img-responsive' alt='Automation img' height={30} width={30}/>   
    <img src={img3} className='img-responsive' alt='Automation img' height={30} width={30}/>   
    <img src={img4} className='img-responsive' alt='Automation img' height={30} width={30}/>   
    <img src={img5} className='img-responsive' alt='Automation img' height={30} width={30}/>   
    <img src={img6} className='img-responsive' alt='Automation img' height={30} width={30}/>   
 
    <img src={img2} className='img-responsive' alt='Automation img' height={30} width={30}/>   
    <img src={img3} className='img-responsive' alt='Automation img' height={30} width={30}/>   
    <img src={img4} className='img-responsive' alt='Automation img' height={30} width={30}/>   
    <img src={img5} className='img-responsive' alt='Automation img' height={30} width={30}/>   
    <img src={img6} className='img-responsive' alt='Automation img' height={30} width={30}/>   
  
    <img src={img2} className='img-responsive' alt='Automation img' height={30} width={30}/>   
    <img src={img3} className='img-responsive' alt='Automation img' height={30} width={30}/>   
    <img src={img4} className='img-responsive' alt='Automation img' height={30} width={30}/>   
    <img src={img5} className='img-responsive' alt='Automation img' height={30} width={30}/>   
    <img src={img6} className='img-responsive' alt='Automation img' height={30} width={30}/>   
  </div>
</div>

                <div className="card-container ">
                    <div className="automa" id="automa1">
                        <div className="overlay">
                            <h6>Fixed/Hard Automation</h6>
                            <p className="text-justify">Fixed or hard automation refers to a type of automation specifically designed for high-volume production processes with repetitive tasks.</p>
                        </div>
                    </div>
                    <div className="automa" id="automa2">
                        <div className="overlay">
                            <h6>Programmable Automation</h6>
                            <p className="text-justify">Programmable automation is a type of automation that allows for reprogramming and flexibility in production processes.</p>
                        </div>
                    </div>
                    <div className="automa" id="automa3">
                        <div className="overlay">
                            <h6>Flexible Automation</h6>
                            <p className="text-justify">Flexible automation is an advanced type of automation that allows for the quick and efficient production of a wide variety of products with minimal downtime.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Automation;
