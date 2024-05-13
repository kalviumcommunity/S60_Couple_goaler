import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import Home from "./Home"

function Update() {
  const navigate = useNavigate();
  const [update, setUpdate] = useState({
    places: '',
    Rating: '',
    PriceApprox: '',
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setUpdate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const {id}=useParams()
  const updatingTheitem = () => {
    console.log('Upd');
    axios
      .put(`http://localhost:8080/store/${id}`,update)
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => {
        console.log(err, 'error');
      });
  };
  return (
    <div>
      <div className="max-w-md mx-auto mt-10 relative overflow-hidden z-10 bg-rose-100 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
        <h2 className="text-2xl text-sky-900 font-bold mb-6">
          Update location
        </h2>

        <form method="post" action="#">
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              for="name"
            >
              Place Name
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="text"
              placeholder="Placename"
              name="places"
              value={update.places}
              onChange={handlechange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              for="Rating"
            >
              Rating
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              name="Rating"
              id="Rating"
              type="text"
              placeholder="Rating"
              value={update.Rating}
              onChange={handlechange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              for="PriceApprox"
            >
              Price Approximation
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              rows="1"
              type="text"
              placeholder="Approx Pricing"
              name="PriceApprox"
              value={update.PriceApprox}
              id="PriceApprox"
              onChange={handlechange}
            ></input>
          </div>
        </form>

        <div className="flex justify-end">
          <button
            className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
            type="submit"
            onClick={updatingTheitem}
          >
            Add Profile
          </button>
        </div>
      </div>
    </div>
  );
}
export default Update;
