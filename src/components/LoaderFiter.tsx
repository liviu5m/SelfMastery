import React from "react";

export default function LoaderFiter() {
  return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="loading-wave ">
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
          <div className="loading-bar"></div>
        </div>
      </div>
  );
}
