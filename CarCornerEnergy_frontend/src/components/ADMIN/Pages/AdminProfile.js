import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Background from '../../../assests/imges/background.jpg';

function AdminProfile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    make: '',
    model: '',
    avatar: ''
  });

  const [avatarPreview, setAvatarPreview] = useState(() => {
    const storedAvatarPreview = localStorage.getItem('avatarPreview');
    return storedAvatarPreview ? storedAvatarPreview : 'https://th.bing.com/th/id/OIP.Oo_9EZ_mdqBnbOIUVHbFAAHaHa?w=1200&h=1200&rs=1&pid=ImgDetMain';
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    localStorage.setItem('avatarPreview', avatarPreview);
  }, [avatarPreview]);

  const fetchUserProfile = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }
      const response = await axios.get('/api/v1/profile/getMe', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.data;
      setFormData(userData);
      if (userData.avatar) {
        setAvatarPreview(userData.avatar);
      }
      setLoading(false);
      // alert('Your profile data has been successfully fetched!');
    } catch (error) {
      alert('Failed to fetch profile data!');
      setError('An error occurred while fetching user profile.');
      console.error('Error fetching user profile:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: file
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      const updatedUserData = new FormData();
      updatedUserData.append('name', formData.name);
      updatedUserData.append('email', formData.email);
      updatedUserData.append('phone', formData.phone);
      updatedUserData.append('make', formData.make);
      updatedUserData.append('model', formData.model);
      if (formData.avatar) {
        updatedUserData.append('avatar', formData.avatar);
      }

      await axios.put('/api/v1/profile/updateMe', updatedUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Your profile has been successfully updated!');
      setLoading(false);
      setIsEditing(false);
    } catch (error) {
      alert('Your profile update failed!');
      setError('An error occurred while updating user profile.');
      console.error('Error updating user profile:', error);
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ backgroundImage: `url(${Background})`, height: "300px", backgroundSize: "cover", backgroundPosition: "center" }}>
        {/* Background image */}
      </div>
      <section>
        <div className="container py-5" >
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4" 
                style={{ marginTop: "-180px", background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(1px)", borderRadius: '20px' }}>
                <div className="card-body text-center">
                  <img src={avatarPreview} alt="avatar" className="rounded-circle img-fluid" style={{ width: '150px', height:'150px' }} />
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="form-control mt-3" />
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4"
                style={{ background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(1px)", borderRadius: '20px' }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name} 
                          onChange={handleChange} 
                          className="form-control"
                        />
                      ) : (
                        <p className="text-muted mb-0">{formData.name}</p>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      {isEditing ? (
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email} 
                          onChange={handleChange} 
                          className="form-control"
                        />
                      ) : (
                        <p className="text-muted mb-0">{formData.email}</p>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="phone"
                          value={formData.phone} 
                          onChange={handleChange} 
                          className="form-control"
                        />
                      ) : (
                        <p className="text-muted mb-0">{formData.phone}</p>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Make</p>
                    </div>
                    <div className="col-sm-9">
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="make"
                          value={formData.make} 
                          onChange={handleChange} 
                          className="form-control"
                        />
                      ) : (
                        <p className="text-muted mb-0">{formData.make}</p>
                      )}
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                 <div className="col-sm-3">
                       <p className="mb-0">Model</p>
                    </div>
                     <div className="col-sm-9">
                       {isEditing ? (
                         <input 
                           type="text" 
                           name="model"
                           value={formData.model} 
                           onChange={handleChange} 
                          className="form-control"
                         />
                       ) : (
                         <p className="text-muted mb-0">{formData.model}</p>
                      )}
                     </div>
                  </div>
                  <hr />
                   {isEditing ? (
                    <button onClick={handleSaveChanges} className="btn btn-warning">Save Changes</button>
                   ) : (
                    <button onClick={() => setIsEditing(true)} className="btn btn-warning">Update Profile</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminProfile;
