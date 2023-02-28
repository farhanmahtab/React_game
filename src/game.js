import React, { useState } from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generatePoints() {
  const points = [];
  for (let i = 0; i < 5; i++) {
    points.push(getRandomInt(5) + 1);
  }
  return points;
}

function generateTarget() {
  return getRandomInt(26) + 25;
}

function Game() {
  const [points, setPoints] = useState(generatePoints());
  const [target, setTarget] = useState(generateTarget());
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);

  function handlePointClick(point) {
    const newScore = score + point;
    setScore(newScore);
    if (newScore >= target) {
      alert(`Congratulations! You reached the target in ${attempts} attempts.`);
      setPoints(generatePoints());
      setTarget(generateTarget());
      setAttempts(0);
      setScore(0);
    } else {
      setAttempts(attempts + 1);
    }
  }

  const grid = [];
  for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      const point = points[i];
      const isActive = i * 10 + j < point;
      const className = `circle ${isActive ? "active" : ""}`;
      row.push(
        <div
          key={`${i}-${j}`}
          className={className}
          onClick={() => handlePointClick(point)}
        />
      );
    }
    grid.push(
      <div key={i} className="row">
        {row}
      </div>
    );
  }

  return (
    <div className="game">
      <div className="grid">{grid}</div>
      <div className="score">Score: {score}</div>
      <div className="target">Target: {target}</div>
      <div className="attempts">Attempts: {attempts}</div>
    </div>
  );
}

export default Game;
