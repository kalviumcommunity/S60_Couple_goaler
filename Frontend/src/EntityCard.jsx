import React from 'react';
import './App.css';

const EntityCard = ({ entity }) => {
  return (
    <div>
      <h3 className="font-bold">{entity.places}</h3>
      <p>Rating: {entity.Rating}⭐</p>
      <p>Price: Rs. {entity.PriceApprox}</p>
    </div>
  );
};
export default EntityCard;
