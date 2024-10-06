"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Logo from "@/components/Logo";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Target = () => {
  const createTargetLayer = (
    radius: number,
    color: string | number,
    zPos: number,
    yPos: number
  ) => (
    <mesh position={[0, yPos, zPos]}>
      <cylinderGeometry args={[radius, radius, 0.1, 64]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );

  return (
    <>
      {createTargetLayer(5, 0xff0000, 0, 0)}
      {createTargetLayer(4, 0xffffff, 0.01, 0.01)}
      {createTargetLayer(3, 0xff0000, 0.02, 0.02)}
      {createTargetLayer(2, 0xffffff, 0.03, 0.03)}
      {createTargetLayer(1, 0xff0000, 0.04, 0.04)}
      {createTargetLayer(4, 0xffffff, 0.01, -0.01)}
      {createTargetLayer(3, 0xff0000, 0.02, -0.02)}
      {createTargetLayer(2, 0xffffff, 0.03, -0.03)}
      {createTargetLayer(1, 0xff0000, 0.04, -0.04)}
    </>
  );
};

const Arrow = () => (
  <>
    <mesh position={[0, -5, 0]} rotation={[0, 0, 0]}>
      <cylinderGeometry args={[0.1, 0.1, 10, 32]} />
      <meshBasicMaterial color={0x000000} />
    </mesh>
    <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <coneGeometry args={[0.3, 1, 32]} />
      <meshBasicMaterial color={0x0000ff} />
    </mesh>
  </>
);

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.4} />
      <Target />
      <Arrow />
      <OrbitControls
        maxDistance={100} // Set the maximum zoom-out distance
        minDistance={30} // Set the minimum zoom-in distance
      />
      <perspectiveCamera position={[0, 10, 20]} />
      <perspectiveCamera position={[0, 10, 20]} />
    </Canvas>
  );
};

export default function Page() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    axios
      .post("/api/journey")
      .then((res) => {
        console.log(res.data);
        axios
          .post("/api/user", {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            password_confirmation: formData.get("password_confirmation"),
            journey_id: res.data.id,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.code == "P2002") {
              toast("Email Or Username already registered");
              return 0;
            }
            if (res.data.error) {
              toast(res.data.error);
              return 0;
            }
            router.push("/sign-in");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-body">
      <div className="flex">
        <div className="w-3/5 h-screen bg-cover">
          <Scene />
        </div>
        <div className="w-2/5 h-screen p-10 flex flex-col items-center gap-40">
          <Link href={"/"}>
            <Logo />
          </Link>
          <div className="w-80">
            <h1 className="text-3xl font-bold">Welcome Back !</h1>
            <h3>Please sign up to continue</h3>
            <form className="mt-10" onSubmit={(e) => handleSubmit(e)}>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-80 rounded-2xl outline-none border border-gray-400 bg-body px-5 py-3 z-10"
                />
                <label
                  htmlFor="username"
                  className="absolute -top-3 left-5 bg-body z-20 px-2"
                >
                  Username
                </label>
              </div>
              <div className="relative mt-5">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-80 rounded-2xl outline-none border border-gray-400 bg-body px-5 py-3 z-10"
                />
                <label
                  htmlFor="email"
                  className="absolute -top-3 left-5 bg-body z-20 px-2"
                >
                  Email
                </label>
              </div>
              <div className="relative mt-5">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-80 rounded-2xl outline-none border border-gray-400 bg-body px-5 py-3 z-10"
                />
                <label
                  htmlFor="password"
                  className="absolute -top-3 left-5 bg-body z-20 px-2"
                >
                  Password
                </label>
              </div>
              <div className="relative mt-5">
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  className="w-80 rounded-2xl outline-none border border-gray-400 bg-body px-5 py-3 z-10"
                />
                <label
                  htmlFor="password_confirmation"
                  className="absolute -top-3 left-5 bg-body z-20 px-2"
                >
                  Confirm Password
                </label>
              </div>

              <button className="bg-purple w-80 py-3 text-center mt-10 rounded-2xl shadow-sm shadow-purple-500 hover:shadow-lg hover:shadow-purple-500">
                Sign Up
              </button>
            </form>
            <h4 className="mt-10 text-disabled">
              Already Have an account{" "}
              <Link href="/sign-in" className="text-purple underline">
                Sign In
              </Link>
            </h4>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
