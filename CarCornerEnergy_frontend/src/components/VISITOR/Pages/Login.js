import React , { useState}from 'react';
//import '..//apiService/apiService.js'
//import { login  } from'../apiService/apiService'
import { Link } from 'react-router-dom';
// import Header from '../components/header/Header';
// import Footer from '../components/footer/Footer';
//import '../css/Login.css';
import LoginImge from '../../../assests/imges/pexels-photo-12205370.jpeg';

import logo from '../../../assests/imges/logo2.png'

import '../css/Login.css'
import axios from 'axios';
//import { useHistory } from 'react-router-dom';


function Login() {
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
const [password, setPassword] = useState('')

 // const history = useHistory(); 

  const handleInputChange = (e) =>  {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  
 
  
const handleLogin = async () => {

  if ( !email ||  !password) {
    alert('Please fill in all fields.');
    return;
  }

  try {
    const userData = { email, password };
    const response = await axios.post('/api/v1/auth/login ',userData);
    //const response = await login(userData);
    console.log('Login response:', response);
    localStorage.setItem('authToken', response.data.token);
    // Check if login was successful

      // Redirect to HomeForUser page upon successful login
      
      //alert('Login successful!,,Happy to see you again use promocode(promo5)');
      // window.location.href = './HomeForUser';
      if (email === 'admin@gmail.com') {
      // If the user role is admin, redirect to the admin page
       
        window.location.href = './ADMIN';
      } else {
        
      
      // Display error message
      // setEmailError('Invalid email or password');
      // setPasswordError('Invalid email or password');
      alert('Login successful!');
      window.location.href = "./USER";
    }
    
  } catch (error) {
    console.error('Error logging in:', error);
    // Handle error
    if (error.response && error.response.data.errorType === 'email') {
      setEmailError('Invalid email address');
    } else if (error.response && error.response.data.errorType === 'password') {
      setPasswordError('Invalid password');
    } else {
      setEmailError('An error occurred while logging in');
    }
  }
};




  // const handleLogin = async () => {
  //   try {
  //     const userData = { email, password };
  //     const response = await login(userData);
  //     console.log('Login response:', response);
  //     // Here you can navigate to the home page or perform any other action
  //     if (response.success) {
  //       // إذا كانت العملية ناجحة، قم بتوجيه المستخدم إلى الصفحة الرئيسية
  //      // history.push('/HomeForUser');
  //      console.log('login successful');

  //     } else {
  //       // إذا كان هناك خطأ في عملية تسجيل الدخول، يمكنك إظهار رسالة خطأ أو اتخاذ إجراء آخر هنا
  //       console.error('Login failed:', response.error);

  //       // if (response.errorType === 'email') {
  //       //   setEmailError('Invalid email address');
  //       // } else if (response.errorType === 'password') {
  //       //   setPasswordError('Invalid password');
  //       // }
  //       if (response.error) {
  //         setEmailError(response.error); // يمكن تحديد طريقة عرض رسالة الخطأ هنا
  //       } else {
  //         setEmailError('Unknown error occurred');
  //       }
  //     }



  //   } catch (error) {
  //     console.error('Error logging in:', error);

  //     // if (response.errorType === 'email') {
  //     //   setEmail('Invalid email address');
  //     // } else if (response.errorType === 'password') {
  //     //   setPassword('Invalid password');
  //     // }
  //     const response = error.response; // تعريف response داخل catch
  //     if (response && response.errorType === 'email') {
  //       setEmailError('Invalid email address');
  //     } else if (response && response.errorType === 'password') {
  //       setPasswordError('Invalid password');
  //     }

  //   }
  // };


  return (
    <div>
              
      
      <section className="vh-100" >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }} >
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src= {LoginImge}
                      alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" , width: "100%", height: "100%"}} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">

                      <form>

                        <div className="d-flex align-items-center mb-3 pb-1">
                          <img src={logo} alt="Logo" className="img-fluid" style={{ width: "70px", height: "70px", marginRight: "10px" }} />
                          {/* Replace path_to_your_image with the actual path to your image */}
                          <span className="h1 fw-bold mb-0">Welcome</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>

                        <div data-mdb-input-init className="form-outline mb-4">
                        <input type="email" id="form2Example17" className="form-control form-control-lg" name="email" value={email} onChange={handleInputChange} placeholder="Email address" />
                          {/* <input type="email" id="form2Example17" className="form-control form-control-lg" value={email} onChange={handleInputChange} /> */}
                          <label className="form-label" htmlFor="form2Example17">Email address</label>
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                        <input type="password" id="form2Example27" className="form-control form-control-lg" name="password" value={password} onChange={handleInputChange} placeholder="Password" />
                          {/* <input type="password" id="form2Example27" className="form-control form-control-lg"  value={password} onChange={handleInputChange}/> */}
                          <label className="form-label" htmlFor="form2Example27">Password</label>
                        </div>

                        <div className="pt-1 mb-4">
                         
                          <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="button" onClick={handleLogin}>Login</button>
                          {/* <Link to ="/HomeForUser"> </Link> */}
                        </div>

                        <div>
       
      {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
      {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
      
      
    </div>




                        
                        
                        <Link to="/ForgotPassword" className="small text-muted">Forgot password?</Link>

                        <Link to="/register">
                        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Don't have an account? <a href="#!" style={{ color: "#393f81" }}>Register here</a></p>
                        </Link>
                        <a href="#!" className="small text-muted">Terms of use.</a>
                        <a href="#!" className="small text-muted">Privacy policy</a>
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



// import React, { useState } from 'react';
// import { login } from '../apiService/apiService';
// import { Link } from 'react-router-dom';
// import LoginImge from '../assests/imges/pexels-photo-12205370.jpeg';
// import logo from '../assests/imges/logo2.png'

// import '../css/Login.css';


// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'email') {
//       setEmail(value);
//     } else if (name === 'password') {
//       setPassword(value);
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const userData = { email, password };
//       const response = await login(userData);
//       console.log('Login response:', response);
//       // هنا يمكنك توجيه المستخدم لصفحة الرئيسية أو القيام بأي عمل آخر
//     } catch (error) {
//       console.error('Error logging in:', error);
//     }
//   };

//   return (
//     <div>
//       <section className="vh-100">
//         <div className="container py-5 h-100">
//           <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col col-xl-10">
//               <div className="card" style={{ borderRadius: "1rem" }}>
//                 <div className="row g-0">
//                   <div className="col-md-6 col-lg-5 d-none d-md-block">
//                     <img src={LoginImge} alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem", width: "100%", height: "100%" }} />
//                   </div>
//                   <div className="col-md-6 col-lg-7 d-flex align-items-center">
//                     <div className="card-body p-4 p-lg-5 text-black">
//                       <form>
//                         <div className="d-flex align-items-center mb-3 pb-1">
//                           <img src={logo} alt="Logo" className="img-fluid" style={{ width: "70px", height: "70px", marginRight: "10px" }} />
//                           <span className="h1 fw-bold mb-0">Welcome</span>
//                         </div>
//                         <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sign into your account</h5>
//                         <div className="form-outline mb-4">
//                           <input type="email" id="form2Example17" className="form-control form-control-lg" name="email" value={email} onChange={handleInputChange} placeholder="Email address" />
//                         </div>
//                         <div className="form-outline mb-4">
//                           <input type="password" id="form2Example27" className="form-control form-control-lg" name="password" value={password} onChange={handleInputChange} placeholder="Password" />
//                         </div>
//                         <div className="pt-1 mb-4">
//                           <button className="btn btn-dark btn-lg btn-block" type="button" onClick={handleLogin}>Login</button>
//                         </div>
//                         <Link to="/ForgotPassword" className="small text-muted">Forgot password?</Link>
//                         <Link to="/register">
//                           <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>Don't have an account? <a href="#!" style={{ color: "#393f81" }}>Register here</a></p>
//                         </Link>
//                         <a href="#!" className="small text-muted">Terms of use.</a>
//                         <a href="#!" className="small text-muted">Privacy policy</a>
//                       </form>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Login;


