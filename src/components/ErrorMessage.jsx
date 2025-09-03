import React from 'react';

// ErrorMessage component for error handling

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <div className="error-icon">
        <i className="fas fa-exclamation-triangle"></i>
      </div>
      <div className="error-content">
        <h3 className="error-title">Error</h3>
        <p className="error-message">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
