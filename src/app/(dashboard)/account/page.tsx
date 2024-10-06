"use client";

import Loader from "@/components/Loader";
import { useAppContext } from "@/libs/AppContext";
import axios from "axios";
import { signOut } from "next-auth/react";
import React from "react";

export default function Page() {
  const { user } = useAppContext();
  if (!user) return <Loader />;

  const updateData = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    axios
      .put("/api/user/" + user.id, {
        username: formData.get("username"),
        email: formData.get("email"),
        currentEmail: user.email,
        currentUsername: user.username,
        type: "data",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    axios
      .put("/api/user/" + user.id, {
        current_password: formData.get("current_password"),
        new_password: formData.get("new_password"),
        confirm_password: formData.get("confirm_password"),
        password: user.password,
        type: "password",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    user && (
      <div>
        <div className="flex gap-10">
          <div className="w-1/2 flex items-center flex-col">
            <h1 className="text-2xl mb-10">Update Account Data</h1>
            <form
              className="flex flex-col gap-8"
              onClick={(e) => updateData(e)}
            >
              <input
                type="text"
                className="px-5 py-3 rounded-lg w-80 outline-none focus:shadow-lg focus:shadow-blue-500 text-black"
                placeholder="Username"
                name="username"
                defaultValue={user.username}
              />
              <input
                type="email"
                className="px-5 py-3 rounded-lg w-80 outline-none focus:shadow-lg focus:shadow-blue-500 text-black"
                placeholder="Email"
                name="email"
                defaultValue={user.email}
              />
              <button className="px-5 py-3 rounded-lg w-80 outline-none bg-purple hover:shadow-lg hover:shadow-purple-500 text-white">
                Update
              </button>
            </form>
          </div>
          <div className="w-1/2 flex items-center flex-col">
            <h1 className="text-2xl mb-10">Update Account Password</h1>
            <form
              className="flex flex-col gap-8"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                updatePassword(e)
              }
            >
              <input
                type="password"
                className="px-5 py-3 rounded-lg w-80 outline-none focus:shadow-lg focus:shadow-blue-500 text-black"
                placeholder="Current Password"
                name="current_password"
              />
              <input
                type="password"
                className="px-5 py-3 rounded-lg w-80 outline-none focus:shadow-lg focus:shadow-blue-500 text-black"
                placeholder="New Password"
                name="new_password"
              />
              <input
                type="password"
                className="px-5 py-3 rounded-lg w-80 outline-none focus:shadow-lg focus:shadow-blue-500 text-black"
                placeholder="Confirm Password"
                name="confirm_password"
              />
              <button className="px-5 py-3 rounded-lg w-80 outline-none bg-purple hover:shadow-lg hover:shadow-purple-500 text-white">
                Update
              </button>
            </form>
          </div>
        </div>
        <div className="flex items-center justify-center mt-40">
          <button
            className="px-5 py-3 rounded-lg w-1/2 outline-none bg-blue hover:shadow-lg hover:shadow-blue-500 text-white"
            onClick={() => {
              signOut({
                callbackUrl: "/", 
              });
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    )
  );
}
