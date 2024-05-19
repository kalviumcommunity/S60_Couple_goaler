import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Home';

function Login(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //   console.log(formData);
      const res = await axios.post('http://localhost:8080/login', formData);
      document.cookie = 'username=' + res.data.name;
      console.log(res.data);
      if (res.data.message === 'Login sucessful') {
        setIsLoggedIn(true);
        navigate('/');
      } else {
        alert(res.data.message);
        navigate('/');
      }
    } catch (error) {
      console.log('error on fetching', error);
    }
  };

  const handleLogout = async () => {
    try {
      // Send a POST request to the /logout endpoint
      console.log('ewj');
      document.cookie = 'username=; expires=';
      location.reload();
      //   setFormData({ email: '', password: '' });
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="bg-[#ffffff] h-screen ">
      <form
        className=" flex justify-around items-center"
        onSubmit={handleSubmit}
      >
        <div className="relative py-3 w-1/3">
          <div className="relative px-4 py-10 mx-8 md:mx-0 shadow rounded-3xl sm:p-10 border ">
            <div className="flex items-center justify-center">
              <h1 className="font-bold text-sky-500 text-4xl">Couple-Goaler</h1>
            </div>
            <br />
            <h2 className="text-2xl font-bold text-sky-500 ">Login</h2>
            <div className="max-w-md mx-auto text-white">
              <div className="flex items-center space-x-5 justify-center"></div>
              <div className="mt-5">
                <label
                  className="font-semibold text-sm text-gray-600 pb-1 block"
                  htmlFor="login"
                >
                  E-mail
                </label>
                <input
                  className="border border-slate-500 outline-none bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full  text-black"
                  type="text"
                  id="login"
                  name="email"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <label
                  className="font-semibold text-sm text-gray-600 pb-1 block"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border border-slate-500 outline-none bg-gray-100 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-black"
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>

              <div className="mt-5">
                <button
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  type="submit"
                  onClick={() => {
                    handleSubmit;
                  }}
                >
                  Log in
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                <p
                  className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  onClick={() => {
                    navigate(`/Signup`);
                  }}
                >
                  or sign up
                </p>
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="mt-5">
        <button
          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
      <div className="border border-black"></div>
    </div>
  );
}
export default Login;
