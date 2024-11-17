import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoginImage from '../../../assests/imges/pexels-photo-12205370.jpeg';
import Logo from '../../../assests/imges/logo2.png';
import '../css/Login.css';


function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      setPasswordError('Please enter your email.');
      return;
    }

    if (!newPassword) {
      setPasswordError('Please enter a new password.');
      return;
    }

    try {
      const response = await axios.put('/api/v1/auth/resetPassword', { email, newPassword });
      console.log('Password reset successful:', response);
      alert('Password reset successfully!');
      window.location.href = "./Login";
    } catch (error) {
      console.error('Error resetting password:', error);
      setPasswordError('Error resetting password. Please try again later.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
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
                          <span className="h1 fw-bold mb-0">Reset Password</span>
                        </div>
                        <div data-mdb-input-init className="form-outline mb-4">
                        <input type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="Enter new password" value={newPassword} onChange={handleNewPasswordChange} />
      <button onClick={handleResetPassword}>Reset Password</button>
      {passwordError && <div>{passwordError}</div>}
                        </div>
                        {/* <div className="pt-1 mb-4">
                          <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="button" onClick={handleResetPassword}>Reset Password</button>
                        </div> */}
                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
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

export default ResetPassword;
