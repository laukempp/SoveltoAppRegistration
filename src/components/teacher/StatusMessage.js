import React from "react";

const StatusMessage = ({ alertmessage }) => {
  return (
    <div className="alert alert-success" role="alert">
      {alertmessage}
    </div>
  );
};

export default StatusMessage;
