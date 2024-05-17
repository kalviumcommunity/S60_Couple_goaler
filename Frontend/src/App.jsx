import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Entity from './EntityCard';
import Form from './Components/Form';
import Home from './Components/Home';
import Update from './Components/Update';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [entities, setEntities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/store')
      .then((res) => {
        console.log(res, 'pras');
        if (res.data.length > 0) {
          setEntities(res.data);
        }
        // setEntities(res.data);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }, []);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/Form" element={<Form />}></Route>
        <Route exact path="/Update/:id" element={<Update />}></Route>
      </Routes>
      {/* <h1>Enitites</h1>
      <div className="grid grid-cols-2 gap-x-8 gap-y-8">
        {entities.map((entity, index) => (
          <div
            className="w-10/12 h-32 border border-black ml-12 text-center p-2 "
            key={index}
          >
            <div>
              <Entity key={index} entity={entity} />
            </div>
            <div className="w-7/12 flex justify-evenly ml-24 p-0.5">
              <button className="border border-black">Delete</button>
              <button
                className="border border-black"
                onClick={() => {
                  navigate('/Form');
                }}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* <div>
        <Form />
      // </div> */}
    </div>
  );
}

export default App;
