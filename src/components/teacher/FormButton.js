import React from 'react';

const Button = ({ handleClick, buttonText, buttonClass, buttonId, buttonType, buttonDisabled }) => {
  return (
      <button 
        className={buttonClass} 
        type={buttonType || "button"} 
        onClick={handleClick || null} 
        id={buttonId || null}
        disabled={buttonDisabled || false}>
        {buttonText}</button>
  )
};

export default Button;