import React from "react";
import Logo from "./Logo";
import { useAppContext } from "@/libs/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTelegram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Footer() {
  const { user } = useAppContext();

  return user &&(
    <footer className="bg-blue px-16 py-10">
      <div className="flex justify-between py-5">
        <div>
          <div className="mb-8">
            <Logo />
          </div>
          <a
            href={`${!user.error ? "/dashboard" : "/sign-in"}`}
            className="rounded-lg px-5 py-2 bg-purple shadow-sm shadow-purple-500/50 hover:shadow-lg hover:shadow-purple-500/80 hover:scale-105"
          >
            {!user.error ? "Dashboard" : "Start Your Journey"}
          </a>
          <div className="mt-8 flex items-center gap-5">
            <Link
              href={"/"}
              className="icon w-8 h-8 rounded-full bg-white border border-purple-500 text-purple flex items-center justify-center hover:scale-110"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link
              href={"/"}
              className="icon w-8 h-8 rounded-full bg-white border border-purple-500 text-purple flex items-center justify-center hover:scale-110"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link
              href={"/"}
              className="icon w-8 h-8 rounded-full bg-white border border-purple-500 text-purple flex items-center justify-center hover:scale-110"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link
              href={"/"}
              className="icon w-8 h-8 rounded-full bg-white border border-purple-500 text-purple flex items-center justify-center hover:scale-110"
            >
              <FontAwesomeIcon icon={faTelegram} />
            </Link>
          </div>
          <div className="flex gap-5 items-center mt-5">
            <p>selfmastery@gmail.com</p>
            <p>+1 (201) 895-3801</p>
          </div>
        </div>
        <div>
          <ul className="flex flex-col gap-5 ">
            <li>Home</li>
            <li>About Us</li>
            <li>Features</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
      <div className="border-t-2 border-purple-500 pt-5">
        <p>
          &copy; {new Date().getFullYear()} SelfMastery Inc. All Right Reserved
        </p>
      </div>
    </footer>
  );
}
