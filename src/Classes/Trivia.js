import React from "react";
import parse from "html-react-parser";

const getRandom = (n) => {
  return Math.floor(Math.random() * n);
};

const randomiseOptions = (correct, incorrect) => {
  try {
    let answers = [];

    const index = getRandom(4);
    console.log("inside randomise Options", correct);
    answers[index] = parse(correct);

    let i = 0;
    while (i < 3) {
      console.log("index ", (index + i + 1) % 4);
      answers[(index + i + 1) % 4] = parse(incorrect[i]);
      i++;
    }
    console.log("answers", answers);
    console.log("c_index", index);
    return {
      answers: answers,
      correct_index: index,
    };
  } catch (e) {
    console.log("Error at randomiseOptions");
    console.error(e);
  }
};

export { getRandom, randomiseOptions };
