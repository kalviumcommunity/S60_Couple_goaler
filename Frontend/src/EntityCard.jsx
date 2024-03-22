import React from 'react';

const EntityCard = ({entity}) => {
  return (
    <div>
      <h2>{entity.places}</h2>
      <p>Rating:{entity.Rating}</p>
      <p>Security:{entity.Security}</p>
    </div>
  );
};
export default EntityCard;
