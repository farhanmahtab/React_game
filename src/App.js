import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import "./style.css";

function App() {
  function randomGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const [dice, setDice] = useState();
  const [target, setTarget] = useState(generateTarget());
  const [score, setScore] = useState();
  const [attempt, setAttempt] = useState(generateAttempt());
  const [remainingAttempt, setReaminingAttempt] = useState();
  const [level, setlevel] = useState();
  const [end, setEnd] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [visibility , setvisibility] = useState(false);

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
    setDice(0);
    setScore(0);
    setlevel(localStorage.level);
    setReaminingAttempt(genAttempt);
    setvisibility(false);
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
      localStorage.level = parseInt(level) + 1;
    } else if (remainingAttempt <= 0 && score < target) {
      alert(`Oops you lost. Remaining points ${target - score}`);
      newGame();
      setlevel(1);
      localStorage.level = 1;

    }
  }

  function clickHandler() {
    const dicevalue = generateDices();
    setDice(dicevalue);
    if (score + dicevalue <= target)
      setScore((prevScore) => prevScore + dicevalue);

    setReaminingAttempt((prevAttempt) => {
      return prevAttempt - 1;
    });
    console.log(
      `dice :${dice} targetAttempt:${attempt} attemptLeft:${remainingAttempt} `
    );
    console.log(`Targetpoint:${target} CurrentPoint:${score} `);
  }

  useEffect(() => {
    setTimeout(() => {
      chcekForEnd();
    }, 0);
  });

  if (end) {
    setIsButtonDisabled(true);
    newGame();
    setEnd(false);
    setIsButtonDisabled(false);
    console.log()
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
              disabled={isButtonDisabled}
            >
              Roll
            </button>
            <h2>dice Rolled : {dice}</h2>
          </div>
          <div className="display-box">{drawCircles()}</div>
        </div>
        {visibility && <Alert
          attemptsForSuccess={attempt - remainingAttempt}
          level={level}
          newGame={newGame}
        />} 
        
      </div>
    </>
  );
}

export default App;
