import React from "react";

export default function Loader() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-body z-20">
      <div className="w-full h-full flex items-center justify-center">
        <div className="loading-wave ">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      </div>
    </div>
  );
}
