import React from 'react';

const CustomButton = ({ onClick, children, variant = 'primary', icon: Icon, className = '' }) => {
  const variantMap = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger'
  };

  return (
    <button onClick={onClick} className={`btn-base ${variantMap[variant] || ''} ${className}`}>
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

export default CustomButton;