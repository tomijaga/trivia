import React, { useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";
import "./TriviaButton.css";

const TriviaButton = (props) => {
  const onClickHandler = async (event) => {
    let x = await event.target.getAttribute("id");

    if (x !== null) {
      console.log(props.correctIndex);
      x = x * 1;
      console.log(x);
      if (typeof x === "number") {
        props.tellParent(x === props.correctIndex);
      }
    }
  };

  const renderButtons = (selection) => {
    let style;

    let correctOption = {
      backgroundColor: "green",
      cursor: "auto",
    };

    let wrongOption = {
      backgroundColor: "rgba(255, 30, 30, 0.9)",
      cursor: "auto",
    };

    let option = {
      backgroundColor: "lightskyblue",
    };

    if (selection) {
      style = [wrongOption, correctOption];
    } else {
      style = [option];
    }

    if (typeof props.buttonInfo === "object") {
      return props.buttonInfo.map((info, i) => {
        const alpha = ["A", "B", "C", "D"];
        return (
          <Button
            className="options"
            style={style[i === props.correctIndex && props.selected ? 1 : 0]}
            type="button"
            size="lg"
            key={i}
            id={i}
            onClick={onClickHandler}
            disabled={props.selected}
          >
            {alpha[i]}. {info}
          </Button>
        );
      });
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
      }}
    >
      {renderButtons(props.selected)}
    </div>
  );
};

export default TriviaButton;
