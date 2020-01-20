import React, { useEffect, useState } from "react";
import { getScores } from ".//../../service/Request";
import ScoreItem from "./ScoreItem";

const Scores = () => {
  const [scoreData, setScoreData] = useState([]);
  const [questionData, setQuestiondata] = useState([]);

  // const fetchScores = () => {
  //   getScores().then(res => setScore(res));
  // };

  useEffect(() => {
    getScores().then(res => {
      setScoreData(res.score);
      setQuestiondata(res.quizQuestions);
    });
  }, []);
  console.log(scoreData);
  console.log(questionData);

  const modifiedQuestionArray = questionData.map(question => {
    // Combining answers to one array
    const allAnswers = question.wrong_answer.concat(question.correct_answer);
    console.log(allAnswers);
    // Adding value of of "isCorrect" to answers
    const allAnswersMapped = allAnswers.map(answer => {
      return {
        answer,
        isCorrect: answer.includes(question.correct_answer)
      };
    });
    // Finalizing the array
    return {
      question: question.question,
      answers: [allAnswersMapped]
    };
  });

  console.log(modifiedQuestionArray);

  // const array = transformQuizQuestions.map(question => (
  //   <ScoreItem question={question.question} answers={question.answers} />
  // ));

  return (
    <div>
      {modifiedQuestionArray.map(question => (
        <div>
          <h4>{question.question}</h4>

          <ul>
            {question.answers.map(sub => (
              <li>{sub.answer} </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Scores;

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
