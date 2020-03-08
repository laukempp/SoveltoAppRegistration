import React, {useState} from "react";
import Checkbox from './Checkbox'
import socketIOClient from "socket.io-client";
import FormButton from "./FormButton";
import {postQuiz} from "../../service/Request";
import { uuid } from "uuidv4";

export default function QuizPreview({ formProps }) {

  const {questions, tags, title, handleClose, timer} = formProps;

  const [checkedArray, setCheckedArray] = useState({checkboxes: questions.reduce(
    (options, option) => ({ ...options, [option.id]: false }), {}
  )}) 

  console.log(timer)
  const socket = socketIOClient("http://localhost:5001");

  //Funktio, joka kerää opettajan valitsemat kysymykset. Klikkaamalla checkboxia avaimen arvo muuttuu välillä true/false
  const toggleChecked = e => {
    const { name } = e.target;
    setCheckedArray(checkedArray => ({
      checkboxes: {
        ...checkedArray.checkboxes,
        [name]: !checkedArray.checkboxes[name]
      }
    }));
  };

  //Funktio, jolla voi valita kaikki checkboxit tai tyhjentää kaikki valinnat
  const selectAll = isSelected => {
    Object.keys(checkedArray.checkboxes).forEach(checkbox => {
      setCheckedArray(checkArray => ({
        checkboxes: {
          ...checkArray.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  //Funktio, joka rakentaa valituista checkboxeista arrayn, jossa on pelkästään valittujen kysymysten id:t (eli ne, joiden arvo on true)
  const idArray = checkedArray && Object.keys(checkedArray.checkboxes)
      .filter(checkbox => checkedArray.checkboxes[checkbox])
      .map(checkbox => checkbox);

  const handleQuizSubmit = e => {
    e.preventDefault();

    if (idArray.length === 0) {
      alert("Tyhjää tenttiä ei voi lähettää, ole hyvä ja valitse kysymyksiä lähetettäväksi")
    } else {
    let data = {
      title: title,
      question_ids: idArray,
      quiz_author: sessionStorage.getItem("badge"),
      quiz_badge: uuid(),
      istemporary: 0,
      timer: timer
    };
    postQuiz(data)
      .then(() => socket.emit("eventMessage", data))
      .then(() => handleClose())
  }};

  const tagFilter = (array1, array2) => {
      array1.forEach(element => {
     if(element.q_tags) {element.q_tags = element.q_tags.filter(item => {
      return array2.includes(item)
    })}
    })
    return array1
  }

  const sortedQuestions = tagFilter(questions, tags).sort((array1, array2) => {
     if(array2[0]) {return array2.q_tags.length - array1.q_tags.length}
     return ""
  })

  let checkBoxInput = sortedQuestions.map(option => {
    let count = 0;
    return (
        <Checkbox option = {option} count = {count} key = {option.id} toggleChecked = {toggleChecked} isSelected={checkedArray.checkboxes[option.id]}/>
      )
    })

  return (
    <div>
      <form onSubmit={handleQuizSubmit}>
      {questions[0] ? (<div>
        <FormButton buttonProps={{buttonText: "Valitse kaikki", handleClick: e => {selectAll(true)}}}/>
        <FormButton buttonProps={{buttonText: "Poista valinnat", handleClick: e => {selectAll(false)}}}/>
      </div>) : null}
      {checkBoxInput}
      <div className="input-row">
        <FormButton 
        buttonProps={{
          buttonType: "submit",
          buttonClass: "btnLogin",
          buttonText: "Lähetä tentti",
        }} />
      </div>
      <br/>
      <div className="input-row">
        <FormButton buttonProps={{
          buttonClass: "btnLogin",
          buttonText: "Sulje ikkuna",
          handleClick: handleClose
        }} />
      </div>
      </form>
    </div>
  );
}
