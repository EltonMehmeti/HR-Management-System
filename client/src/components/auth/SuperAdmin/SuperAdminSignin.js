import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SuperAdminSignin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/auth/superadmin/login',
        formData
      );
      Cookies.set('token', response.data.token, { expires: 1, secure: true });
      Cookies.set('user',JSON.stringify({...response.data.superAdmin, role:'admin'}), { expires: 1, secure: true });
      toast.success("Login successful! Welcome " +formData.email);
      window.location.href = "/dashboard";
      setFormData({
        email: "",
        password: ""
      });

    } catch (error) {
      toast.error("Invalid email or password");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="bg-blue-400 p-20 relative ">
      <section className="bg-white rounded-lg h-screen flex flex-col md:flex-row justify-center items-center md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample image" />
        </div>
        <form className="md:w-1/3 max-w-sm" onSubmit={handleSubmit}>
          <div className="text-center md:text-left">
            <label className="mr-1">Admin Sign in </label>
          </div>
          <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            {/* <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p> */}
          </div>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            
            <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Login
            </button>
          </div>
 
        </form>
      </section>
      <ToastContainer />

    </div>
  )
}
