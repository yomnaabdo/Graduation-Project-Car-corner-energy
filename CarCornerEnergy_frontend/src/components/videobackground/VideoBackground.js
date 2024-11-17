import React from 'react';
import { Link } from 'react-router-dom';
import "./VideoBackground.css"
import car from "..//..//assests/videos/background.mp4"

const VideoBackground = ({ showButtons }) => {
  return (
    <div className='background'>
      <div className='overlay'></div>
      <video src={car} autoPlay loop muted />
      <div className='content'>
        <h1>For all your electric car charging needs</h1>
        {showButtons && (
          <div>
            <Link to="/login"> {/* Link to the login page */}
              <button className="btn btn-outline-warning " style={{ width: '100px', height: '50px' }}>Login</button>
            </Link>
            <Link to="/register"> {/* Link to the register page */}
              <button className="btn btn-outline-light " style={{ width: '200px', height: '50px' }}>Register now</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoBackground;

