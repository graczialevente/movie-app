import React from "react";

export function Loader() {
  const commonAnimateTransform = {
    attributeName: "transform",
    dur: "600ms",
    type: "translate",
    values: "0 3 ; 0 -3; 0 3",
    repeatCount: "indefinite",
  };

  return (
    <div className="flex w-full items-center justify-center">
      <svg
        className="w-1/3"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle fill="currentColor" stroke="none" cx="6" cy="16" r="3">
          <animateTransform {...commonAnimateTransform} begin="0.1" />
        </circle>
        <circle fill="currentColor" stroke="none" cx="16" cy="16" r="3">
          <animateTransform {...commonAnimateTransform} begin="0.2" />
        </circle>
        <circle fill="currentColor" stroke="none" cx="26" cy="16" r="3">
          <animateTransform {...commonAnimateTransform} begin="0.3" />
        </circle>
      </svg>
    </div>
  );
}
