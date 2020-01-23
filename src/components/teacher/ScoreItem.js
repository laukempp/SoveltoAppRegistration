import React from "react";

const ScoreItem = ({ result, id, question, count, isCorrect }) => {
  console.log(result);

  return (
    <div>
      <h2>{question}</h2>
    </div>
  );

  // return (
  //   <div>
  //     <h5>{question}</h5>
  //     {answers.map(item => {
  //       let color = { backgroundColor: "#fff" };
  //       if (item.answer === correctOne && item.answer === studentAnswer) {
  //         color = { backgroundColor: "#00800" };
  //       } else if (
  //         item.answer === correctOne &&
  //         item.answer !== studentAnswer
  //       ) {
  //         color = { backgroundColor: "#fff73f" };
  //       } else if (item.answer === studentAnswer) {
  //         color = { backgroundColor: "#008000" };
  //       }
  //       return <div style={color}>{item.answer}</div>;
  //     })}
  //   </div>
  // );
};

export default ScoreItem;
