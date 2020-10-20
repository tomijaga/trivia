import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TriviaPage from "./TriviaPage";
import HomePage from "./HomePage";
import Results from "./Results";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/trivia-game">
              <TriviaPage />
            </Route>
            <Route path="/results">
              <Results />
            </Route>
            <Route path="*">
              <HomePage />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
