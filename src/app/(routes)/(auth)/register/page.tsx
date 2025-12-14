"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [formi, setFormi] = useState({ username: "", email: "", password: "" });
  const submitHandler = (e: FocusEvent) => {
    e.preventDefault();
    if (!formi.email || !formi.password || !formi.username)
      toast.error("error");
  };
  return (
    <section className="fix-height container m-auto px-7 flex items-center justify-center">
      <div className="m-auto bg-white rounded-lg p-5 w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">Sign Up</h1>

        <div className=" ">
          <form onSubmit={submitHandler} className="flex flex-col ">
            <input
              className="mb-4 border rounded p-2 text-xl"
              type="text"
              placeholder="Enter Your Username"
              value={formi.username}
              onChange={(e) => setFormi({ ...formi, username: e.target.value })}
            />
            <input
              className="mb-4 border rounded p-2 text-xl"
              type="email"
              placeholder="Enter Your Email"
              value={formi.email}
              onChange={(e) => setFormi({ ...formi, email: e.target.value })}
            />
            <input
              className="mb-4 border rounded p-2 text-xl"
              type="password"
              placeholder="Enter Your Password"
              value={formi.password}
              onChange={(e) => setFormi({ ...formi, password: e.target.value })}
            />
            <button
              disabled={false}
              type="submit"
              className="text-2xl text-white bg-blue-800 p-2 rounded-lg font-bold"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
