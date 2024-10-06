"use client";

import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftRotate,
  faArrowRight,
  faBook,
  faClipboardCheck,
  faDumbbell,
  faEye,
  faListCheck,
  faRoute,
  faUser,
  faUtensils,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-1/4 bg-purple fixed top-8 left-8 height-custom rounded-xl p-8">
      <div>
        <Link href={"/"}>
          <Logo />
        </Link>
        <ul className="mt-16 flex flex-col items-start justify-center gap-10">
          <Link
            href={"/dashboard"}
            className={`w-full px-5 py-3 rounded-xl flex items-center justify-start gap-5 hover-blue ${
              pathname == "/dashboard" ? "bg-blue" : ""
            }`}
          >
            <FontAwesomeIcon className="w-5 h-5" icon={faEye} />
            <span>Overview</span>
          </Link>
          <Link
            href={"/tasks"}
            className={`px-5 py-3 rounded-xl flex items-center justify-start gap-5 w-full hover-blue ${
              pathname == "/tasks" ? "bg-blue" : ""
            }`}
          >
            <FontAwesomeIcon className="w-5 h-5" icon={faListCheck} />
            <span>Tasks</span>
          </Link>
          <Link
            href={"/journey"}
            className={`px-5 py-3 rounded-xl flex items-center justify-start gap-5 w-full hover-blue ${
              pathname == "/journey" ? "bg-blue" : ""
            }`}
          >
            <FontAwesomeIcon className="w-5 h-5" icon={faRoute} />
            <span>Journey</span>
          </Link>
          <Link
            href={"/books"}
            className={`px-5 py-3 rounded-xl flex items-center justify-start gap-5 w-full hover-blue ${
              pathname == "/books" ? "bg-blue" : ""
            }`}
          >
            <FontAwesomeIcon className="w-5 h-5" icon={faBook} />
            <span>Search Books</span>
          </Link>
          <Link
            href={"/gym"}
            className={`px-5 py-3 rounded-xl flex items-center justify-start gap-5 w-full hover-blue ${
              pathname == "/gym" ? "bg-blue" : ""
            }`}
          >
            <FontAwesomeIcon className="w-5 h-5" icon={faDumbbell} />
            <span>Gym Split</span>
          </Link>
          <Link
            href={"/recipe"}
            className={`px-5 py-3 rounded-xl flex items-center justify-start gap-5 w-full hover-blue ${
              pathname == "/recipe" ? "bg-blue" : ""
            }`}
          >
            <FontAwesomeIcon className="w-5 h-5" icon={faUtensils} />
            <span>Recipe Finder x Calorie Tracker</span>
          </Link>
          <Link
            href={"/journaling"}
            className={`px-5 py-3 rounded-xl flex items-center justify-start gap-5 w-full hover-blue ${
              pathname == "/journaling" ? "bg-blue" : ""
            }`}
          >
            <FontAwesomeIcon className="w-5 h-5" icon={faBook} />
            <span>Journaling</span>
          </Link>
          <Link
            href={"/account"}
            className={`px-5 py-3 rounded-xl flex items-center justify-start gap-5 w-full hover-blue ${
              pathname == "/account" ? "bg-blue" : ""
            }`}
          >
            <FontAwesomeIcon className="w-5 h-5" icon={faUser} />
            <span>Account</span>
          </Link>
        </ul>
      </div>
    </aside>
  );
}
