import React from 'react';
import './WaitingForApprovalStyles.css'; // Create a separate CSS file for styling
import MainNavBar from '@/components/NavBar/MainNavBar';

const WaitingForApproval = () => {
  const bookDetails = {
    title: "Learn React",
    author: "Jane Doe",
    price: 100,
    quantity: 1,
  };

  return (
    <div className="waiting-container">
        <MainNavBar/>
      <h1 className="waiting-title">Waiting for Approval</h1>
      <div className="waiting-card">
        <h2 className="card-title">Purchase Details</h2>
        {bookDetails ? (
          <div className="book-details">
            <p><strong>Book Title:</strong> {bookDetails.title}</p>
            <p><strong>Author:</strong> {bookDetails.author}</p>
            <p><strong>Price:</strong> ${bookDetails.price}</p>
            <p><strong>Quantity:</strong> {bookDetails.quantity}</p>
          </div>
        ) : (
          <p>No purchase details available.</p>
        )}
        <button className="download-button" disabled>
          Download Book
        </button>
      </div>
    </div>
  );
};

export default WaitingForApproval;