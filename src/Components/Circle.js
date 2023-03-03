import React from "react";
import "./circle.css";

export default function Circle({ circles }) {
  let id = 1;
  return (
    <>
      {circles.map(() => (
        <div key={id++} className="circle">
          {id}
        </div>
      ))}
    </>
  );
}
