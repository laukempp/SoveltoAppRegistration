import React, { useEffect, useState } from "react";
import { getScores } from ".//../../service/Request";
import ScoreItem from "./ScoreItem";
import { Navigation } from "../../layout/Navbar";
import socketIOClient from "socket.io-client";
import auth from '../../service/Auth'

const Scores = () => {
  const authT = auth.sessionStorageGetItem(); 
  const [scoreData, setScoreData] = useState([]);
  const [reRender,setreRender] = useState(false);
  

  const socket = socketIOClient("http://localhost:5001");
  
  //Muutos 27.2. Anna -> badge siirretty useEffectin sisään
  useEffect(() => {
      const badge = { teacher_badge: parseInt(sessionStorage.getItem("badge")) };

      getScores(badge).then(res => {
      setScoreData(res);
    });
  },[]);

  
  socket.on("renderScore", ev => {
    setreRender(true)
    
  },10);

 useEffect(() => {
    const badge = { teacher_badge: parseInt(sessionStorage.getItem("badge")) };

    let timerSet = setTimeout(() => {
    getScores(badge).then(res => {
    setScoreData(res);
    })}, 500)

    setreRender(false)

    return () => {
      clearTimeout(timerSet, 3000)
    }
  
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

  //Lasketaan oikeiden vastausten määrä koko quizin osalta
  let howManyCorrect = 0;
  let howManyAnswers = scoreData[0] && scoreData[0].respondents * scoreData.length;
  let howManyRespondents = scoreData[0] && scoreData[0].respondents;
  
  scoreData[0] && scoreData.forEach(result => {
    result.results.forEach(answer => {
      if (answer.isCorrect === true) {
        howManyCorrect += answer.count;
      }
    });
  });

  console.log(howManyCorrect)

 /*  console.log(answers);
  console.log(howManyCorrect); */
    let totalCorrect = Math.round((howManyCorrect / howManyAnswers) * 100 * 100) / 100;
  
    if(reRender){
    return (
      <div>
      {authT ? <div className="text-white">
      <Navigation title={"Soveltommi"} />
   <br />
   
   <h4>
     Quiz Total Score:{" "}
     {totalCorrect ? totalCorrect : 0}%
   </h4>
   <p>
     Vastaajien määrä:{" "}
     {howManyRespondents}
   </p>
   <div>
    {scores}</div>
    </div> : (window.location.assign('login'))}
    </div>
       );
}
    else
       return (
         <div>
         {authT ? <div className="text-white">
         <Navigation title={"Soveltommi"} />
      <br />
      
      <h4>
        Quiz Total Score:{" "}
        {totalCorrect ? totalCorrect : 0}%
      </h4>
      <p>
      Vastaajien määrä:{" "}
      {howManyRespondents}
    </p>
      <div></div>
      {scores}
       </div> : (window.location.assign('/login'))}
        </div>
         );
    
  
 
  
};

export default Scores;