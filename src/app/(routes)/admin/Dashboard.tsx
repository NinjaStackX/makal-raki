"use client";
import React, { useState } from "react";
import { delAction } from "./curd";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Dialog from "./Dialog";

type props = {
  users: any;
  comments: any;
  posts: any;
};

const Dashboard = ({ users, comments, posts }: props) => {
  const [s, setS] = useState([]);
  return (
    <>
      <Dialog s={s} setS={setS} authors={users} />
      <div className="bg-fuchsia-800 rounded-2xl flex-col justify-center items-center gap-2.5 p-1.5 m-2">
        <div className="text-center m-1.5  text-white">
          Users:
          <hr />
        </div>
        <div className="grid gap-3 justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users?.map((usr: any) => (
            <div key={usr.id} className="bg-amber-500 p-5 rounded-2xl">
              username: <span className="font-bold">{usr.name}</span>
              <br />
              email: <span className="font-bold">{usr.email}</span>
              <br />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-300 rounded-2xl flex-col justify-center items-center gap-2.5 p-1.5 m-2">
        <div className=" flex justify-center gap-5 text-center m-1.5 items-center">
          <h3>Total Comments: {comments.length}</h3>|
          <h5>Total Posts: {posts.length}</h5>
          {/* =================  create ================== */}
          <button
            onClick={() => {
              setS(["create", "article"]);
            }}
          >
            <div className="my-2 bg-green-700 rounded-2xl p-2.5 text-amber-50 m-0.5">
              <Plus />
            </div>
          </button>
          {/* =================================== */}
        </div>
        <div className="grid gap-3 justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts?.map((pt: any) => (
            <div key={pt.id} className="bg-amber-500 p-5 rounded-2xl">
              <h2 className="font-bold">{pt.title}</h2>
              <hr />
              <br />
              <h4>{pt.body}</h4>
              {/* =================  Delete ================== */}
              <button
                onClick={() => {
                  setS(["delete", "article", pt.id]);
                }}
              >
                <div className="my-2 bg-red-700 rounded-2xl p-2.5 text-amber-50 m-0.5">
                  <Trash2 />
                </div>
              </button>
              {/* =================================== */}
              {/* =================  Update ================== */}
              <button
                onClick={() => {
                  setS(["update", "article", pt.id]);
                }}
              >
                <div className="my-2 bg-blue-700 rounded-2xl p-2.5 text-amber-50 m-0.5">
                  <Edit />
                </div>
              </button>
              {/* =================================== */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
