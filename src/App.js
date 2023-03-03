import React, { useState, useEffect } from "react";
import Circle from "./Components/Circle";
import "./style.css";

function App() {
  const randomGenerator = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  const generateDices = () => randomGenerator(1, 5);
  const generateTarget = () => randomGenerator(25, 50);
  const generateAttempt = () => randomGenerator(1, 25);

  const [dice, setDice] = useState();
  const [target, setTarget] = useState(generateTarget());
  const [score, setScore] = useState();
  const [attempt, setAttempt] = useState(generateAttempt());
  const [remainingAttempt, setReaminingAttempt] = useState();
  const [level, setlevel] = useState();
  const [end, setEnd] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [circles, setCircles] = useState([]);

  function newGame() {
    if (!localStorage.level) localStorage.level = 1;
    const genAttempt = generateAttempt();
    setTarget(generateTarget());
    setAttempt(genAttempt);
    setDice(0);
    setScore(0);
    setlevel(localStorage.level);
    setReaminingAttempt(genAttempt);
    setCircles([]);
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
      setEnd(true);
      setlevel(1);
      localStorage.level = 1;
    }
  }

  function clickHandler() {
    let addCircle = false;
    const dicevalue = generateDices();
    setDice(dicevalue);
    if (score + dicevalue <= target) {
      addCircle = !addCircle;
      setScore((prevScore) => prevScore + dicevalue);
    }
    if (addCircle) {
      for (let i = 0; i < dicevalue; i++) {
        circles.push(i);
      }
      setCircles([...circles]);
      addCircle = !addCircle;
    }

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
    console.log();
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
          <div className="display-box">
            <Circle circles={circles} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
