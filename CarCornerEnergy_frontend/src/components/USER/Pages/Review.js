import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from './StarRating'; // Import the StarRating component
import './ReviewApp.css'; // Import your CSS file for styling
import backgroundImage from '../../../assests/imges/background.jpg';
import Alert from 'react-bootstrap/Alert';

const ReviewApp = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ title: '', body: '', rating: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/v1/reviews/ViewAllreviews');
      setReviews(response.data);
      // alert('list of reviews');
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // alert('dont sent');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/reviews/Addreview', formData);
      console.log('Review created:', response.data);
      setFormData({ title: '', body: '', rating: '' });
      fetchReviews();
      setShowAlert(true);
          setAlertMessage('review added successfully');
     
    } catch (error) {
      console.error('Error creating review:', error);
      alert('failed to add review');
    }
  };

  return (
    <div>
     
    <section className="text-center">
    <div className="p-5 bg-image" style={{ backgroundImage:`url(${backgroundImage})`, height: "300px" ,backgroundSize: "cover", backgroundPosition: "center" }}></div>
    <div className="card mx-4 mx-md-5 shadow-5-strong" style={{ marginTop: "-100px", background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(10px)", maxWidth: "92.5%" }}>
      <div className="card-body py-5 px-md-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8">
            <h2 className="fw-bold mb-5">Review App</h2>

    <div className="containerD">
    <form onSubmit={handleSubmit} className="mt-3">
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title:</label>
    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="form-control" required />
  </div>

  <div className="mb-3">
    <label htmlFor="body" className="form-label">Body:</label>
    <textarea id="body" name="body" value={formData.body} onChange={handleChange} className="form-control" required />
  </div>

  <div className="mb-3">
    <label htmlFor="rating" className="form-label">Rating:</label>
    <input type="number" id="rating" name="rating" min="1" max="5" value={formData.rating} onChange={handleChange} className="form-control" required />
  </div>

  <button type="submit" className="btn btn-warning">Submit Review</button>
  {showAlert && <Alert variant="success">{alertMessage}</Alert>}
</form>


      <div className="cardd-container">
        {reviews.map((review) => (
          <div key={review._id} className="cardd">
            <h3>{review.title}</h3>
            <p>{review.body}</p>
            <p>
            <StarRating rating={parseInt(Math.max(Math.min(review.rating, 5), 1))} />
            </p>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
    </div>
    
  );
};

export default ReviewApp;

