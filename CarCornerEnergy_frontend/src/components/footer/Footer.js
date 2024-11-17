// import React from 'react'
// import './footer.css'
// // import facebook from '../../assests/imges/facebook.png'
// // import instagram from '../../assests/imges/instagram.png'
// // import github from '../../assests/imges/github.png'
// // import twitter from '../../assests/imges/twitter.png'



// function Footer() {
//   return (  
//     <div className='footerContainer'>
//         <div className='socialIcons'> 
//             <a href=''><i className='fa-brands fa-facebook'></i>   </a>
//             <a href=''><i className='fa-brands fa-instagram'></i>  </a>
//             <a href=''><i className='fa-brands fa-twitter'></i>   </a>
//             <a href=''><i className='fa-brands fa-github'></i>   </a>
//         </div> 
//         <div className='footerNav'>
//           <ul>
//             <li><a href=''>Home</a></li>
//             <li><a href=''>News</a></li>
//             <li><a href='/About'>About</a></li>
//             <li><a href='/ContactUs'>Contact Us </a></li>
//             <li><a href=''> Our Team </a></li>
//           </ul>
//         </div>
//           <div className='footerBottom'>
//             <p>copyright &copy; 2024; designend by <span className='designer'>//</span></p>
//           </div>



//     </div>




//       )
// }

// export default Footer





// <a href=''><i className='fa-brands fa-facebook'></i>  <img src={facebook} alt="" height={50} width={50}></img> </a>
// <a href=''><i className='fa-brands fa-instagram'></i>  <img src={instagram} alt=""  height={50} width={50}></img> </a>
// <a href=''><i className='fa-brands fa-twitter'></i>  <img src={twitter} alt="" height={50} width={50}></img> </a>
// <a href=''><i className='fa-brands fa-github'></i>  <img src={github} alt="" height={50} width={50}></img> </a>
// </div> 



import React from 'react';
function Footer() {
  return (
    <div style = {{marginTop:'100px'}}
     >
      {/* Footer */}
      <footer className="footer py-3 border-top border-dark-subtle">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="py-3">
                Built by <a  className="link-secondary text-decoration-none">FRONT END TEAM </a> with <span className="text-accent">&#9829;</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
