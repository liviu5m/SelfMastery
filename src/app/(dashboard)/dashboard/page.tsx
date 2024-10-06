"use client";

import { useAppContext } from "@/libs/AppContext";
import Loading from "@/libs/customFunction";
import Link from "next/link";
import React from "react";

export default function Page() {
  const { user } = useAppContext();

  if (!user) return <Loading />;
  return (
    <div className="w-full height-custom bg-gradient-to-tr from-purple-500 to-blue-500 rounded-3xl py-10 px-60">
      <h1 className="text-center text-3xl ">
        Welcome <span className="text-main">{user.username}</span> !
      </h1>
      <p className="mt-10 text-justify indent-10">
        Your journey to becoming the best version of yourself begins here. Our
        platform is dedicated to empowering you with the tools, resources, and
        guidance you need to achieve personal growth and self-improvement.
        Whether you&apos;re looking to build better habits, enhance your mental
        and physical well-being, or unlock your true potential, we provide
        actionable insights and proven strategies to help you succeed. Join a
        community of like-minded individuals committed to lifelong learning and
        transformation. Let&apos;s embark on this journey together and create a
        life of purpose, fulfillment, and mastery.
      </p>
      <ul className="mt-10 list-disc pl-4 flex flex-col gap-5 text-blue font-bold">
        <li>
          <Link href="/tasks">Tasks</Link>
        </li>
        <li>
          <Link href="/journey">Tracking Progress</Link>
        </li>
        <li>
          <Link href="/books">Access To A Library</Link>
        </li>
        <li>
          <Link href="/gym">Personalized Gym Data</Link>
        </li>
        <li>
          <Link href="/recipe">Client Diet</Link>
        </li>
        <li>
          <Link href="/journaling">Journaling</Link>
        </li>
      </ul>
    </div>
  );
}
