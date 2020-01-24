import React from "react";

const ScoreItem = ({ result, id, question, data }) => {
  console.log(data);

  return (
    <div className="resultBG">
      <h5>{question}</h5>

      {data.map(res => {
        let color = { backgroundColor: "#fff" };
        if (res.isCorrect === true) {
          color = { backgroundColor: "#33dd22" };
        } else {
          color = { backgroundColor: "#eedd9d" };
        }
        return (
          
          <div >
          <div className="resultContainer resCount" style={color}>
            <div>
             <span className="resValue"> {res.value}</span>
              
            </div>
            
          </div><span className="resNumber">{res.count} respondents</span>
          </div>
          
        );
      })}
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
