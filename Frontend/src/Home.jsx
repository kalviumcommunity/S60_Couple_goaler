import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Entity from './EntityCard';
import Form from './Form';

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function Home() {
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
    <div className="bg-pink-200 ">
      <div className=" flex justify-center text-center">
        <h1 className="text-purple-500 text-3xl font-medium text-justify bg-fuchsia-950 w-1/4 p-2  flex justify-around rounded-3xl ">
          Enitites
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-8 mt-2.5">
        {entities.map((entity, index) => (
          <div
            className="w-10/12 rounded-2xl ml-12 text-center p-2 bg-pink-300 h-44 grid items-center	"
            key={index}
          >
            <div>
              <Entity key={index} entity={entity} />
            </div>
            <div className="w-7/12 flex justify-evenly ml-24 p-0.5">
              <button class="bg-red-500 text-black-300 border border-rose-300 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group">
                <span class="bg-rose-300 shadow-rose-300 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                Delete
              </button>
              <button
                class="bg-purple-500 text-black-300 border border-rose-300 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
                onClick={() => {
                  navigate('/Form');
                }}
              >
                <span class="bg-rose-300 shadow-rose-300 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* <div>
        <Form />
      </div> */}
    </div>
  );
}

export default Home;