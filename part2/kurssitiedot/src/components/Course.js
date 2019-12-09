import React from "react";


const Course = props => {
  return (
    <>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  );
};

const Header = ({ name }) => <h2>{name}</h2>;

const Content = ({ parts }) => {
  console.log(parts)
  return parts.map(element => {
    return (
      <Part
        name={element.name}
        exercises={element.exercises}
        key={element.id}
      />
    );
  });
};

const Part = ({ name, exercises }) => {
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((acc, item) => {
    return acc + item.exercises;
  }, 0);

  return (
    <p>
      <b>Total: </b> {total} exercises
    </p>
  );
};
export default Course