import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad, total }) => {
  const average = (good - bad) / total;
  const positive = (good / total) * 100 + ' %';
  return (
    <>
      <table>
        <Statistic name="Good " value={good} />
        <Statistic name="Neutral " value={neutral} />
        <Statistic name="Bad " value={bad} />
        <Statistic name="Total " value={total} />
        <Statistic name="Average " value={average} />
        <Statistic name="Positive " value={positive} />
      </table>

    </>
  );
};

const Statistic = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>
      {value}
    </td>
  </tr>
);

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const counter = good + neutral + bad;

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="Good" handleClick={() => setGood(good + 1)} />
      <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" handleClick={() => setBad(bad + 1)} />
      <br /> <br />
      {counter > 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} total={counter} />
      ) : (
        "No feedback given yet"
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
