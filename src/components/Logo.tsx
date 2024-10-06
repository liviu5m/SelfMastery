import React from "react";

export default function Logo() {
  return (
    <div className="logo flex items-center md:gap-3">
      <img
        src="/imgs/logo.png"
        className="w-7 md:w-10"
        alt="SelfMastery logo"
      />
      <span className="md:text-3xl font-bold text-sm">SelfMastery</span>
    </div>
  );
}
