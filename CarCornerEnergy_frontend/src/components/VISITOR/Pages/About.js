import React from 'react';
import './About.css'; // Import CSS file for styling
import { AiOutlineCar } from 'react-icons/ai';
import backgroundImage from'../../../assests/imges/background.jpg'

const AboutUs = () => {
  return (
 

    
    <section className="text-center">
      <div className="p-5 bg-image" style={{ backgroundImage:`url(${backgroundImage})`, height: "300px" ,backgroundSize: "cover", backgroundPosition: "center" }}></div>
      <div className="card mx-4 mx-md-5 shadow-5-strong" style={{ marginTop: "-100px", background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(10px)" , maxWidth: "92.5%"}}>
        <div className="card-body py-5 px-md-5">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-5">About Us</h2>
      <div className="about-us-content">
        <AiOutlineCar className="icon-about" />
        <p>
          Welcome to our car  service! Our objective is to develop an efficient application that assists electric car users in finding the nearest charging stations along their routes, ensuring a seamless and convenient charging experience.  
         



          Purpose
The motivation behind this project stems from the challenges faced by electric car users in locating nearby charging stations and planning their routes effectively. Existing navigation systems often lack accurate and up-to-date information on charging station availability, leading to inconvenience and disruptions during journeys. Our application aims to address these challenges by providing a comprehensive and user-friendly solution for electric car users, enhancing their overall driving experience.
        </p>
      </div>
     </div>
     </div>
     </div>
     </div>
    
        
      
      </section>
    

  );
};
      
 


export default AboutUs;