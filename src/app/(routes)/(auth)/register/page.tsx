"use client";
import React from "react";
import { toast } from "react-toastify";

const page = () => {
  const notify = () => toast("Wow so easy !");
  return (
    <div className="grid place-items-center h-dvh bg-zinc-900/15">
      <button onClick={notify}>Notify !</button>
    </div>
  );
};

export default page;
