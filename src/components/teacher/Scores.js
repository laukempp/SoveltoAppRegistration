import React, { useEffect, useState } from "react";
import { getScores } from ".//../../service/Request";
import ScoreItem from "./ScoreItem";
import { Navigation } from "../../layout/Navbar";

const Scores = () => {
  const [scoreData, setScoreData] = useState([]);

  const id = sessionStorage.getItem("badge");
  const badge = { teacher_badge: parseInt(id) };

  console.log(badge);

  //Haetaan opettajan viimeisimmän quizin tulokset
  useEffect(() => {
    getScores(badge).then(res => {
      setScoreData(res);
    });
  }, []);
  console.log(scoreData);

  // Valuetaan tulostiedot ScoreItem-komponentille
  const scores = scoreData.map(result => {
    return (
      <ScoreItem
        result={result}
        id={result.id}
        question={result.question}
        data={result.results}
      />
    );
  });

  //Lasketaan oikeiden vastausten määrä koko quizin osalta
  let howManyCorrect = 0;
  let howManyAnswers = 0;
  const answers = scoreData.map(result => {
    const answerss = result.results;
    console.log(answerss);
    answerss.map(answerr => {
      howManyAnswers += answerr.count;
      if (answerr.isCorrect === true) {
        howManyCorrect += answerr.count;
      }
    });
  });
  console.log(answers);
  console.log(howManyCorrect);

  return (
    <div className="text-white">
      <Navigation title={"Soveltommi"} />
      <br />
      {/* <h3>Quiz id: {id.quiz_id}</h3> */}
      <h4>
        Quiz Total Score:{" "}
        {Math.round((howManyCorrect / howManyAnswers) * 100 * 100) / 100}%
      </h4>
      <div></div>
      {scores}
    </div>
  );
};

export default Scores;
