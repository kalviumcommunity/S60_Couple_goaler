import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Entity from './EntityCard';

// const Entities = [
//   {
//     places: 'Library',
//     Rating: 4.5,
//     Security: 'least',
//   },
// ];
// const getting = axios
//   .get('http://localhost:8080/store')
//   .then((response) => {
//     console.log(response, 'pras');
//   })
//   .catch((err) => {
//     console.log('error', err);
//   });

function App() {
  const [entity, setEntity] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8080/store')
      .then((res) => {
        console.log(res, 'pras');
        if (res.data.length > 0) {
          setEntity(res.data[0]);
        }
        // setEntities(res.data);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }, []);
  return (
    <>
      <div>
        <h1>Enitites</h1>

        {entity && (
          <div>
            <p>Places: {entity.places}</p>
            <p>Rating: {entity.Rating}</p>
            <p>PriceApprox: {entity.PriceApprox}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
