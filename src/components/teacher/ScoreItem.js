import React from "react";
import ScoreIndividual from './ScoreIndividual';
import { Link } from 'react-router-dom';
const ScoreItem = ({ result, id, question, data, scoreData }) => {
  /* console.log(data); */
 
 
  const countAndScore = data.map(score => {
    return { count: score.count, isCorrect: score.isCorrect };
  });
  /* console.log(data) */
   /* console.log(countAndScore); */
  /* console.log(result)
  console.log(data) */
  let counter = 0;
  let keyCount = 0;
 const scorePath = "/scores/"
  return (
    
    <div key={keyCount++} className="resultBG">
      <Link to={{
        pathname: `${scorePath}${result.id}`,
        result: {
          name: result,
          scoreData: scoreData
        }
        }}><h5 class="registerUser">{question} </h5></Link>
      
      {countAndScore.map(score => {
       /*  console.log(score); */
        counter += score.count;
        /* console.log(counter); */
        if (score.isCorrect === true) {
          return <span key={keyCount++}>{Math.round((score.count / counter) * 100)}% got it right</span>;
        }
      })}

      {data.map(res => {
        let color = { backgroundColor: "#fff" };
        if (res.isCorrect === true) {
          color = { backgroundColor: "#33dd22" };
        } else {
          color = { backgroundColor: "#eedd9d" };
        }
        return (
          <div key={`key`+ keyCount++} className="thisd">
            <div className="resultContainer resCount" style={color}>
              <div className="valueContainer">
                <span className="resValue"> {res.value}</span>
              </div>
            </div>
            <div className="resNumber">
              {res.count ? res.count : 0} respondents ({Math.round((res.count / counter) * 100)}%)
            </div>
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
