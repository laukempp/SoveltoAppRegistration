import React, { useEffect, useState } from "react";
import { getScores } from ".//../../service/Request";
import ScoreItem from "./ScoreItem";
import { Navigation } from "../../layout/Navbar";
import socketIOClient from "socket.io-client";
import ScoreIndividual from './ScoreIndividual';

const Scores = () => {
  const [scoreData, setScoreData] = useState([]);
  const [reRender,setreRender] = useState(false);
  // const [questionData, setQuestiondata] = useState([]);

  // const fetchScores = () => {
  //   getScores().then(res => setScore(res));
  // };

  const socket = socketIOClient("http://localhost:5001");
  
  const id = sessionStorage.getItem("badge");
  const badge = { teacher_badge: parseInt(id) };

  useEffect(() => {
      getScores(badge).then(res => {
      setScoreData(res);
    });
  },[]);
 

  
  /* const customEventHandler = () => {
    getScores(badge).then(res => {
      setScoreData(res);
    });
  } */
  socket.on("renderScore", ev => {
    setreRender(true)
    
  },10);
  const timerSet = () => {setTimeout(() => {
    getScores(badge).then(res => {
    setScoreData(res);
  })}, 500)}
  const timerClear = () => { clearTimeout(timerSet(), 3000)}
 useEffect(() => {
  timerSet()
  timerClear()
  setreRender(false)
 },[reRender])
    
 
  
  let keyCount = 0;
  const scores = scoreData.map(result => {
    keyCount++;
    return (
      <ScoreItem
        key={keyCount}
        result={result}
        id={result.id}
        scoreData={scoreData}
        question={result.question}
        data={result.results}
      />
    );
  });

  
  
  let howManyCorrect = 0;
  let howManyAnswers = 0;
  const answers = scoreData.map(result => {
    const answerss = result.results;
    /* console.log(answerss); */
    answerss.map(answerr => {
      howManyAnswers += answerr.count;
      if (answerr.isCorrect === true) {
        howManyCorrect += answerr.count;
      }
    });
  });
 /*  console.log(answers);
  console.log(howManyCorrect); */
    let totalCorrect = Math.round((howManyCorrect / howManyAnswers) * 100 * 100) / 100;
  
    if(reRender){
    return (
      <div className="text-white">
        <Navigation title={"Soveltommi"} />
     <br />
     
     <h4>
       Quiz Total Score:{" "}
       {totalCorrect ? totalCorrect : 0}%
     </h4>
     <div>
      {scores}</div>
     {/*  <div>
         {scorePerQuestion}
       </div> */}
      </div>
       );
}
    else
       return (
        <div className="text-white">
          <Navigation title={"Soveltommi"} />
       <br />
       
       <h4>
         Quiz Total Score:{" "}
         {totalCorrect ? totalCorrect : 0}%
       </h4>
       <div></div>
       {scores}
       {/* <div>
         {scorePerQuestion}
       </div> */}
        </div>
         );
    
  
 
  
};

export default Scores;

