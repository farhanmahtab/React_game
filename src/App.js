import React, { useState } from "react";
import "./style.css";

function App() {
  function randomGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const [dice, setDice] = useState(generateDices());
  const [target, setTarget] = useState(generateTarget());
  const [score, setScore] = useState(null);
  const [attempt, setAttempt] = useState(generateAttempt());
  const [remainingAttempt, setReaminingAttempt] = useState(attempt);
  const [level, setlevel] = useState(1);
  const [end, setEnd] = useState(true);

  function generateDices() {
    return randomGenerator(1, 5);
  }
  function generateTarget() {
    return randomGenerator(25, 50);
  }
  function generateAttempt() {
    return randomGenerator(1, 25);
  }

  const drawCircles = () => {
    const circles = [];
    for (let i = 0; i < score; i++) {
      circles.push(<div key={i} className="circle"></div>);
    }
    return circles;
  };

  function newGame() {
    const genAttempt = generateAttempt();
    setTarget(generateTarget());
    setAttempt(genAttempt);
    setScore(0);
    setlevel(localStorage.level);
    setReaminingAttempt(genAttempt);
  }

  function chcekForEnd() {
    if (score === target) {
      setEnd(true);
      alert(
        `Congratulations! You reached the target in ${
          attempt - remainingAttempt
        } attempts.`
      );
      setlevel((prevLevel) => prevLevel + 1);
      localStorage.level = level + 1;
    } else if (remainingAttempt <= 0 && score < target) {
      setEnd(true);
      alert(`Oops you lost .Remaining points ${target - score}`);
      newGame();
      setlevel(1);
      localStorage.level = 1;
    }
  }

  if (end) {
    newGame();
    setEnd(false);
  }

  function clickHandler() {
    setDice(() => generateDices());
    if (score + dice <= target) setScore(score + dice);
    setReaminingAttempt((prevAttemp) => {
      return prevAttemp - 1;
    });
    console.log(
      `dice :${dice} targetAttempt:${attempt} attemptLeft:${remainingAttempt} `
    );
    console.log(`Targetpoint:${target} CurrentPoint:${score} `);
    chcekForEnd();
  }

  return (
    <>
      <div className="main-container">
        <div className="conatiner">
          <div className="level">
            <h1>Level : {level}</h1>
          </div>
          <div className="score-board">
            <h2>Scored: {score}</h2>
            <h2>Target:{target}</h2>
          </div>
          <div className="attempt-board">
            <h2>Attempt Left:{remainingAttempt}</h2>
            <h2>Total Attempts:{attempt}</h2>
          </div>
          <div className="dice">
            <button
              type="button"
              className="dice-button"
              onClick={clickHandler}
            >
              Roll
            </button>
            <h2>dice Rolled : {dice}</h2>
          </div>
          <div className="display-box">{drawCircles()}</div>
        </div>
      </div>
    </>
  );
}

export default App;
