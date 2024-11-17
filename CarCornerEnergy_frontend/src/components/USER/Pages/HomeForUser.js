import React from 'react'
import './HomeForUser.css'
import backgroundImage from '../../../assests/imges/background.jpg';
  // Define your questions and answers here
  const questions = [

     "Natrn valley ",
    "Elmansora",
    "Kafr saad",
    "alex",
    "6th of October City",
    "Giza Governorate",
    " Tanta",
    "Sidi Gaber",
    "Borg El Arab",
    "Dahab",
    "Ismailia",
    "Sheikh Zayed City",
    "First 6th of October",
    " Markaz Ad Delingat",
    "Aga",
    "Kafr el-Sheikh",
    "Port Fouad City",
    "Faraskur",
    "Metoubes",
    "El Raml 1",
    "Port al-Basal",
    "El Alamein",
    "Nuweiba",
    "Luxor",
    "Al Farafra",
    "Al Faiyum Governorate Desert",
    "Ibsheway",
    "Belqas",
    "El Shorouk",
    "Al Obour",
    "Heliopolis",
    "Al Giza Desert",
    "Hosh Eissa",
    "Amreya 1"

  ];

  const answers = [
    "3 charging stations",
    "3 charging stations",
    "3 charging stations",         
    "2 charging stations",
    "2 charging stations",
    "2 charging stations",                               
    "2 charging stations",
    "2 charging stations",
    "2 charging stations",
    "2 charging stations",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
    "1 charging station",
   
    
  ];
function HomeForUser() {
  return (
    <div >
    <section className="text-center">
    <div className="p-5 bg-image" style={{ backgroundImage:`url(${backgroundImage})`, height: "300px" ,backgroundSize: "cover", backgroundPosition: "center" }}></div>
    <div className="card mx-4 mx-md-5 shadow-5-strong" style={{ marginTop: "-100px", background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(10px)", maxWidth: "92.5%" }}>
      <div className="card-body py-5 px-md-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-12">
            <h2 className="fw-bold mb-5">List of charging stations for electric vehicles in Egypt. Find the nearest EV charger for your electric car in Egypt</h2>
            <h3 className="text-secondary mb-5 text-center">there are 48 charging stations for electric cars in Egypt.</h3>
      
      <div className="home-container">
        {/* Render each question and answer */}
        {questions.map((question, index) => (
          <div className="home-item" key={index}>
            <div className="home-question">
              {question}
            </div>
            <div className="home-answer">{answers[index]}</div>
          </div>
        ))}
      </div>
      
    </div>
    </div>
    </div>
    </div>
    </section>
    </div>
  );
  
}

export default HomeForUser;
