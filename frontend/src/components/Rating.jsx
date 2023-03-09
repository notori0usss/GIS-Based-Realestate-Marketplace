import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ onChange }) => {
  const [rating, setRating] = useState(null);

  const handleClick = (value) => {
    setRating(value);
    onChange(value);
  };

  return (
    <div className="flex w-1/2 justify-between">
      {[...Array(5)].map((_, index) => {
        const value = index + 1;
        return (
          <FaStar
            key={value}
            onClick={() => handleClick(value)}
            color={value <= rating ? '#ffc107' : '#ABB0B8'}
            size={24}
            style={{ cursor: 'pointer' }}
          />
        );
      })}
    </div>
  );
};

export default Rating;
