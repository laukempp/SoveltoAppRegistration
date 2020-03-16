import React from "react";

const StatusMessage = ({ successMessage }) => {
  return (
    <div className="alert alert-success" role="alert">
      {successMessage}
    </div>
  );
};

export default StatusMessage;
