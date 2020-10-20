import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const Results = () => {
  const result = JSON.parse(sessionStorage.getItem("result"));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignContent: "center",
      }}
    >
      <h1>
        Good Game,
        <span style={{ color: "green", textShadow: "10px 10px 20px black" }}>
          {result.username}
        </span>
      </h1>

      <h3>
        {" "}
        score: <span> {result.points}</span>
      </h3>
      <div style={{ marginTop: "auto", marginBottom: "80pt" }}>
        <ButtonGroup size="large" aria-label="small outlined button group">
          {" "}
          <Button href="/trivia-game"> Retry</Button>
          <Button href="https://google.com">Exit</Button>
        </ButtonGroup>
      </div>

      <div></div>
    </div>
  );
};
export default Results;
