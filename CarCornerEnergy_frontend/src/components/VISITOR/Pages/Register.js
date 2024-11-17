
import React,{ useState} from 'react'
//import { register } from '../apiService/apiService';
import backgroundImage from'../../../assests/imges/background.jpg'
//import { Link } from 'react-router-dom';
import '../css/Register.css'
import axios from 'axios';


function Register() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [role, setRole] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [formCompleted, setFormCompleted] = useState(false);

  const handleInputChange = (e) =>  {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    }
    else if (name === 'email') {
      setEmail(value);
    } 
    else if (name === 'phone') {
      setPhone(value);
    }
    else if (name === 'password') {
      setPassword(value);
    }
    else if (name === 'passwordConfirm') {
      setPasswordConfirm(value);
    } 
    else if (name === 'make') {
      setMake(value);
    }
    else if (name === 'model') {
      setModel(value);
    }
        
    setFormCompleted(name &&email  && password && passwordConfirm&& phone && make && model);
  };


  const handleRegisteration = async () => {
   
    if (!name || !passwordConfirm || !email || !phone ||  !password || !make || !model) {
      alert('Please fill in all fields.');
      return;
    }
    if (password !== passwordConfirm) {
      setRegistrationError('Passwords do not match');
      return;
    }
/////////////////////////  new try  code

    try {
      const userData = { name, email, password, passwordConfirm, phone, make,model };
      const response = await axios.post('/api/v1/auth/signup', userData);
    
      if (response.status >= 200 && response.status < 300) {
        alert('Registration successful!');
        window.location.replace('./USER'); // Use replace instead of href
         ////////////
        
      } else {
        const errorMessage = response.data.error || 'An error occurred while registering.';
        setRegistrationError(errorMessage);
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error || 'An error occurred while registering.';
        setRegistrationError(errorMessage);
      } else if (error.request) {
        setRegistrationError('No response received from the server.');
      } else {
        setRegistrationError('An error occurred while processing the request.');
      }
    }
    //////////////////////////////////////////////
    
   };
   

  return (
    <div>
      <section className="text-center">
        <div className="p-5 bg-image" style={{ backgroundImage:`url(${backgroundImage})`, height: "300px" ,backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <div className="card mx-4 mx-md-5 shadow-5-strong" style={{ marginTop: "-100px", background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(10px)", maxWidth: "92.5%" }}>
          <div className="card-body py-5 px-md-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <h2 className="fw-bold mb-5">Sign up now</h2>
                <form>
                  <div className="row">
                    <div className="col-12 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <input type="text" id="form3Example5" className="form-control" name="name"value={name} onChange={handleInputChange} placeholder="Your Name"/>
                        <label className="form-label" htmlFor="form3Example1">Your name</label>
                      </div>
                    </div>
                    {/* <div className="col-md-6 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <input type="text" id="form3Example6" className="form-control" value={passwordConfirm}onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="passwordConfirm" />
                        <label className="form-label" htmlFor="form3Example2">Last name</label>
                      </div>
                    </div> */}
                   
                  </div>
                  <div className="row">
                    <div className="col-12 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <input type="text" id="form3Example1" className="form-control"name="phone" value={phone} onChange={handleInputChange} placeholder="Your Phone"/>
                        <label className="form-label" htmlFor="form3Example1">Phone number</label>
                      </div>
                    </div>
                    <div className="col-12 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <input type="text" id="form3Example2" className="form-control" name="make"value={make} onChange={handleInputChange}  placeholder="make"/>
                        <label className="form-label" htmlFor="form3Example2">make</label>
                      </div>
                    </div>
                  </div>
                  <div data-mdb-input-init className="form-outline col-12 mb-4">
                    <input type="text" id="form3Example7" className="form-control" name="model" value={model} onChange={handleInputChange} placeholder="Your Model" />
                    <label className="form-label" htmlFor="form3Example7">Model</label>
                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="email" id="form3Example3" className="form-control" name="email" value={email} onChange={handleInputChange} placeholder="Your Email" />
                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="password" id="form3Example4" className="form-control" name="password"value={password} onChange={handleInputChange}  placeholder="Your Password"/>
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="password" id="form3Example6" className="form-control" name="passwordConfirm"value={passwordConfirm} onChange={handleInputChange}  placeholder="Your Password"/>
                    <label className="form-label" htmlFor="form3Example6">passwordConfirm</label>
                  </div>
                  {/* <div className="col-md-6 mb-4">
                      <div data-mdb-input-init className="form-outline">
                        <input type="text" id="form3Example6" className="form-control" value={passwordConfirm}onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="passwordConfirm" />
                        <label className="form-label" htmlFor="form3Example2">passwordConfirm</label>
                      </div>
                    </div> */}
                  <div>
                    <button
                      type="button"
                      className="btn btn-dark btn-lg btn-block mb-4"
                      onClick={handleRegisteration}
                    >
                      Sign up
                    </button>
                    {registrationError && <p style={{ color: 'red' }}>{registrationError}</p>}
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register
