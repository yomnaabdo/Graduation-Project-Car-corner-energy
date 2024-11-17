import React from 'react';
import { BsSearch, BsJustify } from 'react-icons/bs';
import axios from 'axios';

function HeaderForAdmin({ OpenSidebar, onLogout }) {
  const iconStyle = { color: 'white' }; // Define inline style for icons

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      try {
        await axios.post('/api/v1/auth/logout');
        window.location.href = '/Home';
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }

    onLogout();
  };

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} style={iconStyle} />
      </div>
      <div className='header-left'>
        <BsSearch className='icon' />
      </div>
      <div className='header-right'>
        <button type="button" className="btn btn-warning me-3" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

// Add default prop for onLogout
HeaderForAdmin.defaultProps = {
  onLogout: () => {
    console.warn('onLogout is not provided');
  },
};

export default HeaderForAdmin;
