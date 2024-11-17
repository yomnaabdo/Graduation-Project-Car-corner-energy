import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css';
// import LoginImage from '../../../assets/images/pexels-photo-12205370.jpeg';
import LoginImage from '../../../assests/imges/pexels-photo-12205370.jpeg';
// import Logo from '../../../assets/images/logo2.png';
import Logo from '../../../assests/imges/logo2.png'


function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      setEmailError('Please enter your email address.');
      return;
    }

    try {
      const response = await axios.post('/api/v1/auth/forgotPassword', { email });
      console.log('Forgot password request successful:', response);
      alert('Password reset email sent successfully!');
      window.location.href = "./VerifyResetCode";
    } catch (error) {
      console.error('Error sending password reset request:', error);
      setEmailError('Error sending password reset request. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }} >
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src={LoginImage} alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem", width: "100%", height: "100%" }} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <img src={Logo} alt="Logo" className="img-fluid" style={{ width: "70px", height: "70px", marginRight: "10px" }} />
                          <span className="h1 fw-bold mb-0">Forgot Password?</span>
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input type="email" id="form2Example17" className="form-control form-control-lg" name="email" value={email} onChange={handleInputChange} placeholder="Email address" />
                          <label className="form-label" htmlFor="form2Example17">Email address</label>
                        </div>
                        <div className="pt-1 mb-4">
                          <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="button" onClick={handleForgotPassword}>Send</button>
                        </div>
                        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                        <Link to="/login" className="small text-muted">Back to Login</Link>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;