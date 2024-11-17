import React from 'react'
import { Link } from 'react-router-dom';
import "./header.css"
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import logo from "../../assests/imges/logo.png"





const Header = () => {
  return (
    
<nav className="navbar navbar-dark fixed-top"style={{ backgroundColor: 'var(--color-darker) '}}> 
  <div className="container-fluid">
  <Link className="navbar-brand" to="/home"> {/* Use Link component for Home */}
          <img src={logo} alt="" length={200} width={100} />
        </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end text-bg-dark " tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel" style={{ backgroundColor: 'var(--color-darker) '}}>
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Car Corner Energy</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
          <Link className="nav-link active" to="/home">Home</Link> {/* Use Link component for Home */}
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link> 
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/freqentlyaskedquestions">FAQ</Link> 
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="google.com" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Others
            </a>
            <ul class="dropdown-menu dropdown-menu-dark">
              {/* <li><Link className="dropdown-item" to="/offers">offers</Link></li> */}
              <li><Link className="dropdown-item" to="/contactus">ContactUs</Link></li>
              <li>
                <hr className="dropdown-divider"></hr> 
              </li>
              {/* <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
              <li><Link className="dropdown-item" to="/EnergyConsumptionPrediction">Model</Link></li> */}
            </ul>
          </li>
        </ul>
        <form className="d-flex mt-3" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
          <button className="btn btn-warning" type="submit">Search</button>
        </form>
      </div>
    </div>
  </div>
</nav>

  )
}

export default Header


// text-bg-dark