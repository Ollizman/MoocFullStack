import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = props => {
  const [selected, setSelected] = useState(0);
  const [mostVotes, setMostVotes] = useState(0);
  const [topAne, setTopAne] = useState(0);
  const { anecdotes } = props;

  const rand = () => Math.floor(Math.random() * 6);

  let votesit = [];
  anecdotes.map(event => votesit.push(event.votes));

  const voteClickHandler = () => {
    console.log("toimii");
    anecdotes[selected].votes++;
    for (let i = 0; i < 6; i++) {
      if (anecdotes[i].votes > mostVotes) {
        setMostVotes(anecdotes[i].votes);
        setTopAne(i);
      }
    }
  };

  return (
    <div>
      {anecdotes[selected].text} <br />
      Votes: {anecdotes[selected].votes} <br />
      <button onClick={() => setSelected(rand)}>New anecdote!</button>
      <button onClick={() => voteClickHandler()}>Vote</button> <br /> <br />
      {console.log(selected, votesit)}
      Anecdote with most votes: <br />
      {anecdotes[topAne].text}
    </div>
  );
};

const anecdotes = [
  { text: "If it hurts, do it more often", votes: 0 },
  {
    text: "Adding manpower to a late software project makes it later!",
    votes: 0
  },
  {
    text:
      "The first 90 percent of the code accounts for the first 90 percent of the development time...The " +
      "remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    votes: 0
  },
  {
    text:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    votes: 0
  },
  { text: "Premature optimization is the root of all evil.", votes: 0 },
  {
    text:
      "Debugging is twice as hard as writing the code in the first place. " +
      "Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    votes: 0
  }
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
