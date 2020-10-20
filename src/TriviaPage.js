import React, { useState, useEffect } from "react";
import TriviaButton from "./Components/TriviaButton";
import { randomiseOptions } from "./Classes/Trivia";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import wrongImg from "./Icons/wrong.png";
import successImg from "./Icons/success.png";
import "./TriviaPage.css";
import parse from "html-react-parser";
import Navbar from "./Components/Navbar";
import { Link } from "react-router-dom";

const TriviaPage = (props) => {
  const [question, setQuestion] = useState("");
  const [received, setReceived] = useState(false);
  const [selected, setSelected] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [correct_index, setCorrect_index] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [count, setCount] = useState(1);
  const [success, setSuccess] = useState(null);
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(30);
  const username = sessionStorage.getItem("username");
  let user_performance;

  useEffect(() => {
    proceedToNextQuestion();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("selected", selected);
      if (selected) {
      } else {
        setTime((time) => {
          if (time === 1) {
            verifyAnswer(false);
          }
          if (time > 0) {
            //console.log(time);
            return time - 1;
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selected]);

  const userResults = (correct) => {
    user_performance = {
      correct: correct,
      difficulty: difficulty,
      points: 1,
      time: 1,
    };
  };

  const verifyAnswer = (solved) => {
    setSelected(true);
    setPoints(solved ? points + Math.floor((time ** 3 / 3.9) * 7) : points + 0);
    console.log("solved", solved);
    setSuccess(solved);

    if (solved) {
      userResults(true);
    } else {
      userResults(false);
    }
  };

  const showResult = (proceed) => {
    if (proceed !== null) {
      // console.log("@showResult");
      // console.log(proceed);

      if (proceed === true) {
        // console.log(success);
        // console.log("right");

        return (
          <div>
            <Alert variant="primary">
              <img
                src={successImg}
                alt="success img"
                height="30pt"
                width="30pt"
              />
              <Alert.Heading>Correct</Alert.Heading>
            </Alert>
          </div>
        );
      } else if (proceed === false) {
        console.log(success);
        console.log("wrong");
        return (
          <Alert show={true} variant="danger">
            <img src={wrongImg} height="30pt" width="30pt" />
            <Alert.Heading>Failed</Alert.Heading>
          </Alert>
        );
      }
    }
  };

  const arrangeData = (resp) => {
    const { question, correct_answer, incorrect_answers, difficulty } = resp;

    setQuestion(parse(question));
    setDifficulty(difficulty);

    const { answers, correct_index } = randomiseOptions(
      correct_answer,
      incorrect_answers
    );

    setAnswers(answers);
    setCorrect_index(correct_index);

    console.log("Options set");
  };

  const proceedToNextQuestion = () => {
    setSelected(false);
    setQuestion("");
    setAnswers([]);
    setSuccess(null);
    setCorrect_index(null);
    setDifficulty("");
    setTime(30);

    console.log("count", count);

    // fetch("http://localhost:3001/trivia", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ user_performance }),
    // })
    //   .then((resp) => resp.json())
    //   .then((resp) => {
    //     console.log("Question" + count, resp);
    //     setOptions(resp);
    //   });

    const url = `https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple`;
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => resp.results[0])
      .then((resp) => {
        console.log("Question " + count, resp);
        return resp;
      })
      .then((resp) => arrangeData(resp));
  };

  const calculatePoints = () => {
    console.log("calculating ...");
    const newPoints = time * 7;
    setPoints(points + newPoints);
  };

  const next = (proceed) => {
    if (proceed === true) {
      // setPoints(1);
      return (
        <Button
          className="next_button"
          variant="warning"
          block={true}
          onClick={() => {
            if (count < 10) {
              proceedToNextQuestion();
              setCount(count + 1);
            } else {
              const result = {
                username: username,
                points: points,
              };
              sessionStorage.setItem("result", JSON.stringify(result));
            }
          }}
          style={{
            fontStyle: "italic",
            backgroundColor: "gold",
            borderRadius: "10pt",
            width: "auto",
            marginLeft: "auto",
            fontWeight: "bolder",
          }}
          type="submit"
        >
          <Link
            to={count < 10 ? "#" : "/results"}
            style={{ color: "rgb(0, 70, 140)", textDecoration: "none" }}
          >
            {" "}
            {count < 10 ? "NEXT" : "RESULTS"}{" "}
            <span className="animate_arrow">&gt;&gt;</span>
          </Link>
        </Button>
      );
    }
  };

  const questionAnswered = (proceed) => {
    if (proceed) {
      calculatePoints();
      return next(proceed);
    }
  };

  return (
    <>
      <Navbar count={count} points={points} time={time} username={username} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "800pt",
          height: "80vh",
        }}
      >
        <h2> {question} </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TriviaButton
            buttonInfo={answers}
            correctIndex={correct_index}
            tellParent={verifyAnswer}
            selected={selected}
            trigger={selected}
          ></TriviaButton>

          <div style={{ textAlign: "right", width: "100%" }}>
            {next(selected)}
          </div>
          {showResult(success)}
        </div>
      </div>
    </>
  );
};

export default TriviaPage;
