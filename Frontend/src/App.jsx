import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Entity from './EntityCard';

const Entities = [
  {
    places: 'Library',
    Rating: 4.5,
    Security: 'least',
  },
];

function App() {
  return (
    <>
      <div>
        <h1>Enitites</h1>
        {Entities.map((entity, index) => (
          <Entity key={index} entity={entity} />
        ))}
      </div>
    </>
  );
}

export default App;
