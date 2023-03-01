import React from "react";

export default function Alert({attemptsForSuccess, level, newGame}) {
  return (
    <div className="alertbox">
      <h3>
        Congratulations! You reached the target in {attemptsForSuccess}{" "}
        attempts.
      </h3>
      <h3>Welcome to level {level}</h3>
      <button type="button" className="restartButton" onClick={newGame}>
        Play Again
      </button>
    </div>
  );
}
