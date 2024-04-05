import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router';

function Form() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    places: '',
    Rating: '',
    PriceApprox: '',
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    // e.preventDefault();
    console.log(state);
    axios
      .post('http://localhost:8080/store', state)
      .then((Res) => {
        console.log(Res);
        navigate('/');
      })
      .catch((err) => {
        console.log('bhiuu', err);
      });
  };
  

  return (
    <div>
      <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
        <h2 className="text-2xl text-sky-900 font-bold mb-6">
          Add your lovable location
        </h2>

        <form method="post" action="#">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" for="name">
              Place Name
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="text"
              placeholder="Placename"
              name="places"
              value={state.places}
              onChange={handlechange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" for="Rating">
              Rating
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              name="Rating"
              id="Rating"
              type="text"
              placeholder="Rating"
              value={state.Rating}
              onChange={handlechange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600" for="PriceApprox">
              Price Approximation
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              rows="1"
              type="text"
              placeholder="Approx Pricing"
              name="PriceApprox"
              value={state.PriceApprox}
              id="PriceApprox"
              onChange={handlechange}
            ></input>
          </div>
        </form>

        <div className="flex justify-end">
          <button
            className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
            type="submit"
            onClick={handleSubmit}
          >
            Add Profile
          </button>
        </div>
      </div>

      {/* <form className="border border-radius grid">
        <input
          type="text"
          placeholder="Placename"
          name="places"
          value={state.places}
          onChange={handlechange}
        />
        <input
          type="text"
          placeholder="Rating"
          name="Rating"
          onChange={handlechange}
          value={state.Rating}
        />
        <input
          type="text"
          placeholder="Approx Pricing"
          name="PriceApprox"
          value={state.PriceApprox}
          onChange={handlechange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </form> */}
    </div>
  );
}

export default Form;
