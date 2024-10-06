"use client";

import ModalDashboard from "@/components/ModalDashboard";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";

export default function Page () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState("");

  return (
    <div>
      {isModalOpen ? (
        <ModalDashboard task={task} setIsModalOpen={setIsModalOpen} />
      ) : (
        ""
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl mb-10">Your Tasks</h1>
        <div className="flex items-center justify-center gap-5">
          <Link href={"/books"}>
            <button className="bg-purple px-5 py-3 rounded-xl">
              Search Books
            </button>
          </Link>
          <Link href={"/gym"}>
            <button className="bg-purple px-5 py-3 rounded-xl">
              Choose A Gym Split
            </button>
          </Link>
          <Link href={"/recipe"}>
            <button className="bg-purple px-5 py-3 rounded-xl">
              Get A Clean Diet
            </button>
          </Link>
        </div>
      </div>
      <ul className="grid grid-cols-4">
        <li>
          <img className="w-60 my-10" src="/imgs/meditation.png" alt="" />
          <div className="flex items-center justify-between gap-3 w-40">
            <span>Meditate</span>
            <FontAwesomeIcon
              icon={faCaretRight}
              className="p-2 text-blue cursor-pointer"
              onClick={(e) => {
                setTask("meditate");
                setIsModalOpen(true);
              }}
            />
          </div>
        </li>
        <li>
          <img className="w-60 my-10" src="/imgs/prayer.png" alt="" />
          <div className="flex items-center justify-between gap-3 w-40">
            <span>Praying</span>
            <FontAwesomeIcon
              icon={faCaretRight}
              className="p-2 text-blue cursor-pointer"
              onClick={(e) => {
                setTask("praying");
                setIsModalOpen(true);
              }}
            />
          </div>
        </li>
        <li>
          <img className="w-60 my-10" src="/imgs/gym.png" alt="" />
          <div className="flex items-center justify-between gap-3 w-40">
            <span>Gym</span>
            <FontAwesomeIcon
              icon={faCaretRight}
              className="p-2 text-blue cursor-pointer"
              onClick={(e) => {
                setTask("gym");
                setIsModalOpen(true);
              }}
            />
          </div>
        </li>
        <li>
          <img className="w-60 my-10" src="/imgs/reading.png" alt="" />
          <div className="flex items-center justify-between gap-3 w-40">
            <span>Reading</span>
            <FontAwesomeIcon
              icon={faCaretRight}
              className="p-2 text-blue cursor-pointer"
              onClick={(e) => {
                setTask("reading");
                setIsModalOpen(true);
              }}
            />
          </div>
        </li>
        <li>
          <img className="w-60 my-10" src="/imgs/water.png" alt="" />
          <div className="flex items-center justify-between gap-3 w-40">
            <span>Water</span>
            <FontAwesomeIcon
              icon={faCaretRight}
              className="p-2 text-blue cursor-pointer"
              onClick={(e) => {
                setTask("water");
                setIsModalOpen(true);
              }}
            />
          </div>
        </li>
        <li>
          <img className="w-60 my-10" src="/imgs/working.png" alt="" />
          <div className="flex items-center justify-between gap-3 w-40">
            <span>Deep Work</span>
            <FontAwesomeIcon
              icon={faCaretRight}
              className="p-2 text-blue cursor-pointer"
              onClick={(e) => {
                setTask("work");
                setIsModalOpen(true);
              }}
            />
          </div>
        </li>
        <li>
          <img className="w-60 my-10" src="/imgs/journal.png" alt="" />
          <div className="flex items-center justify-between gap-3 w-40">
            <span>Journaling</span>
            <FontAwesomeIcon
              icon={faCaretRight}
              className="p-2 text-blue cursor-pointer"
              onClick={(e) => {
                setTask("journal");
                setIsModalOpen(true);
              }}
            />
          </div>
        </li>
        <li>
          <img className="w-60 my-10" src="/imgs/diet.png" alt="" />
          <div className="flex items-center justify-between gap-3 w-40">
            <span>Clean Diet</span>
            <FontAwesomeIcon
              icon={faCaretRight}
              className="p-2 text-blue cursor-pointer"
              onClick={(e) => {
                setTask("diet");
                setIsModalOpen(true);
              }}
            />
          </div>
        </li>
      </ul>
    </div>
  );
}
