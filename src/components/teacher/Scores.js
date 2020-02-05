import React, { useEffect, useState } from "react";
import { getScores } from ".//../../service/Request";
import ScoreItem from "./ScoreItem";
import {Navigation} from '../../layout/Navbar';

const Scores = () => {
  const [scoreData, setScoreData] = useState([]);
  // const [questionData, setQuestiondata] = useState([]);

  // const fetchScores = () => {
  //   getScores().then(res => setScore(res));
  // };

  const id = sessionStorage.getItem('badge')
  const badge = {teacher_badge: parseInt(id)};

  console.log(badge)

  useEffect(() => {
    getScores(badge).then(res => {
      setScoreData(res);
    });
  }, []);
  console.log(scoreData);

  // const scores = scoreData.map(result => {
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

  return <div className="text-white">
    <Navigation title={'Soveltommi'} />
    <br />
    <h3>Quiz id: {id.quiz_id}</h3>
    {scores}</div>;

  // console.log(data);

  // const modifiedQuestionArray = questionData.map(question => {
  //   // Combining answers to one array
  //   const allAnswers = question.wrong_answer.concat(question.correct_answer);
  //   console.log(allAnswers);
  //   // Adding value of of "isCorrect" to answers
  //   const allAnswersMapped = allAnswers.map(answer => {
  //     return {
  //       answer,
  //       isCorrect: answer.includes(question.correct_answer)
  //     };
  //   });
  //   // Finalizing the array
  //   return {
  //     question: question.question,
  //     answers: allAnswersMapped,
  //     correctOne: question.correct_answer
  //   };
  // });

  // const modifiedScore = scoreData.map(score => {
  //   return score.user_answer;
  // });

  // console.log(modifiedQuestionArray);

  // const array = modifiedQuestionArray.map((question, index) => {

  //     <div>
  //       <ScoreItem
  //         key={question.id}
  //         question={question.question}
  //         answers={question.answers}
  //         correctOne={question.correctOne}
  //         studentAnswer={scoreData[0].user_answer[index]}
  //       />
  //     </div>
  //   );
  // });

  // return <div>{array}</div>;
};

export default Scores;

// return (
//   <div>
//     {modifiedQuestionArray.map(question => (
//       <div>
//         <h4>{question.question}</h4>

//         <ul>
//           {question.answers.map(sub => (
//             <li>{sub.answer} </li>
//           ))}
//         </ul>
//       </div>
//     ))}
//   </div>
// );

//
// return (
//   <div>
//     {transformQuizQuestions.map(question => (
//       <div>
//         {typeof question.answers == "object" ? (
//           <div>
//             {question.answers.map(details => (
//               <div>{details.answer}</div>
//             ))}
//           </div>
//         ) : null}
//       </div>
//     ))}
//   </div>
// );

// };

// export default Scores;
