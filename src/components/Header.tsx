"use client";

import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "./Logo";
import { useAppContext } from "@/libs/AppContext";
import { signOut } from "next-auth/react";

const Header: React.FC = () => {
  const [showLinks, setShowLinks] = useState(false);
  const { user } = useAppContext();

  const handleScroll = () => {
    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY + 50;

    document.querySelectorAll(".link-ul a, .link-ul-show a").forEach((link) => {
      link.classList.remove("text-purple");
    });

    sections.forEach((section) => {
      const offsetTop = section.getBoundingClientRect().top + window.scrollY;
      const id = section.getAttribute("id") || "";
      const navLinks = document.querySelectorAll(
        `.link-ul a[href*="${id}"], .link-ul-show a[href*="${id}"]`
      );

      if (
        scrollPos >= offsetTop &&
        scrollPos < offsetTop + section.clientHeight
      ) {
        navLinks.forEach((navLink) => {
          navLink.classList.add("text-purple");
        });
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useGSAP(() => {
    if (showLinks) {
      gsap.to(".link-ul-show", {
        x: 0,
        stagger: {
          amount: 0.5,
        },
        duration: 0.1,
      });
    } else {
      gsap.to(".link-ul-show", {
        x: -150,
      });
    }
  }, [showLinks]);

  return (
    user && (
      <header className="fixed bg-body w-screen z-50">
        <div className="px-10 py-3 h-20 flex items-center justify-between">
          <div
            className="menu text-xl md:text-2xl lg:hidden ml-2"
            onClick={() => setShowLinks(!showLinks)}
          >
            <FontAwesomeIcon icon={faBarsStaggered} />
          </div>
          <Logo />
          <ul className="lg:flex items-center justify-center gap-10 hidden">
            <li className="p-2 link-ul">
              <Link href="#home">Home</Link>
            </li>
            <li className="p-2 link-ul">
              <Link href="#about-us">About Us</Link>
            </li>
            <li className="p-2 link-ul">
              <Link href="#features">Features</Link>
            </li>
            <li className="p-2 link-ul">
              <Link href="#contact">Contact Us</Link>
            </li>
          </ul>
          <a
            href={`${!user.error ? "/dashboard" : "/sign-in"}`}
            className="md:px-5 md:py-3 rounded-lg bg-purple shadow-sm shadow-purple-500/50 hover:shadow-lg hover:shadow-purple-500/80 hover:scale-105 md:text-lg px-2 py-1 text-xs"
          >
            {!user.error ? "Dashboard" : "Start Your Journey"}
          </a>
        </div>
        <ul className="lg:hidden flex flex-col items-start justify-center px-5 text-sm md:text-base">
          <li className="p-2 link-ul-show">
            <Link href="#home">Home</Link>
          </li>
          <li className="p-2 link-ul-show">
            <Link href="#about-us">About Us</Link>
          </li>
          <li className="p-2 link-ul-show">
            <Link href="#features">Features</Link>
          </li>
          <li className="p-2 link-ul-show">
            <Link href="#contact">Contact Us</Link>
          </li>
        </ul>
      </header>
    )
  );
};

export default Header;
