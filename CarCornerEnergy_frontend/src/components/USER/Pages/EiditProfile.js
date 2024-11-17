import React, { useState } from 'react';
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import './EiditProfile.css'; // import CSS file for styling
import axios from 'axios';
import Background from '../../../assests/imges/background.jpg';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    make: '',
    model: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('User not authenticated');
        return;
      }

      const updatedUserData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        make: formData.make,
        model: formData.model
      };

      await axios.put('/api/v1/users/updateMe', updatedUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setMessage('Your profile has been successfully updated!');
    } catch (error) {
      setMessage('Failed to update your profile.');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ backgroundImage: `url(${Background})`, height: "300px", backgroundSize: "cover", backgroundPosition: "center" }}>
        {/* Background image */}
      </div>
      <section className="bg-light py-3 py-md-5" style={{ marginTop: "-120px", background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(10px)", borderRadius: '20px', maxWidth: '1100px', margin: '0 auto' }}>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <h2 className="mb-4 display-5 text-center">Edit Profile</h2>
              <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle"/>
            </div>
          </div>
        </div>
        {message && <div className={message.includes('successfully') ? 'success-message' : 'error-message'}>{message}</div>}
        <div className="container">
          <div className="form-group">
            <label className="label-visible">
              <AiOutlineUser className="icon" />
              Name:
            </label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="label-visible">
              <AiOutlineMail className="icon" />
              Email:
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="label-visible">
              <AiOutlinePhone className="icon" />
              Phone:
            </label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="label-visible">
              Make:
            </label>
            <input type="text" name="make" value={formData.make} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="label-visible">
              Model:
            </label>
            <input type="text" name="model" value={formData.model} onChange={handleChange} />
          </div>
          <div className="button-container">
            <button onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
