import React, { useState, useEffect } from "react";
import favicon from "../Icons/favicon.ico";

const Navbar = (props) => {
  return (
    <div
      style={{
        display: "grid",
        width: `100vw`,
        minHeight: "3rem",
        alignItems: "center",
        background: "rgba(10, 90, 80, 0.6)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", padding: "0 20pt" }}>
        <img
          src={favicon}
          alt="Trivia Logo"
          height="40px"
          width="40px"
          style={{ padding: "0 20pt" }}
        />
        <h2 style={{ margin: "0pt", padding: "0 20pt" }}>Trivia</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
            fontSize: "0.9rem",
          }}
        >
          <div
            style={{
              maxWidth: "300pt",
              width: "100%",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <span>{props.username}: </span>
            <span>{props.points}pts</span>
            <span>|</span>
            <span>
              0:{props.time < 10 ? "0" + props.time : props.time || "00"}
            </span>
            <span>|</span>
            <span> {props.count}/10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
