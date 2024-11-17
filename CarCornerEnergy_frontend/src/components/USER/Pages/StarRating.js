import React from 'react';

const StarRating = ({ rating }) => {
  const filledStars = [];
  for (let i = 0; i < rating; i++) {
    filledStars.push(
      <span key={i} className="star-filled">
        &#9733; {/* Unicode star character */}
      </span>
    );
  }
  return <div className="star-rating">{filledStars}</div>;
};

export default StarRating;
