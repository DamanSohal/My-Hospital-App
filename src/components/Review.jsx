


import React, { useState } from "react";

const Review = () => {
  const [reviewText, setReviewText] = useState("");

  const submitReview = () => {
    // logic to submit the review
    alert("Review submitted!");
  };

  return (
    <div>
      <h1>Add Review</h1>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here"
      />
      <button onClick={submitReview}>Submit Review</button>
    </div>
  );
};

export default Review;