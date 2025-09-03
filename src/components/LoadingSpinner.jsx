import React from 'react';

// LoadingSpinner component for loading states

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
      <p className="loading-text">Loading weather data...</p>
    </div>
  );
};

export default LoadingSpinner;
