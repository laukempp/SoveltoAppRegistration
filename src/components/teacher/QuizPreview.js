import React, { useState } from "react";
import Checkbox from "./Checkbox";
import socketIOClient from "socket.io-client";
import FormButton from "./FormButton";
import { postQuiz } from "../../service/Request";
import { uuid } from "uuidv4";

export default function QuizPreview({ formProps }) {
  const {
    questions,
    tags,
    quizSettings,
    handleClose,
    showSuccessMessage
  } = formProps;

  //Muodostetaan valittuja kysymyksiä varten alkutila, jossa otetaan serveriltä tuotujen kysymysten id:t ja asetetaan ne avaimiksi -> jokainen olio on alkuun muotoa {1:false}, jossa 1 on se id-numero, joka on vastaavalla kysymyksellä eli se voi olla mikä vaan numero.
  const [checkedArray, setCheckedArray] = useState({
    checkboxes: questions.reduce(
      (options, option) => ({ ...options, [option.id]: false }),
      {}
    )
  });

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
  const idArray = Object.keys(checkedArray.checkboxes)
    .filter(checkbox => checkedArray.checkboxes[checkbox])
    .map(checkbox => checkbox);

  //Käsitellään lomakkeen lähetys - tarkistetaan ensin, onko kysymyksiä valittu, jos on, muodostetaan datasetti ja lähetetään se tietokantaan, sitten suljetaan modaali
  const handleQuizSubmit = e => {
    e.preventDefault();

    if (idArray.length === 0) {
      alert(
        "Tyhjää tenttiä ei voi lähettää, ole hyvä ja valitse kysymyksiä lähetettäväksi"
      );
    } else {
      let data = {
        title: quizSettings.title,
        question_ids: idArray,
        quiz_author: sessionStorage.getItem("badge"),
        quiz_badge: uuid(),
        istemporary: 0,
        timer: quizSettings.timer,
        quiz_type: quizSettings.quiz_type
      };
      postQuiz(data)
        .then(res => {
          showSuccessMessage(res.success);
        })
        .then(() => socket.emit("eventMessage", data))
        .then(() => handleClose());
    }
  };

  //Tämän funktion tehtävä on käydä läpi jokaisen kysymyksen q_tags -array ja filtteröidä siitä pois ne tagit, joita käyttäjä ei käyttänyt kyselyssä (koska kysymyksellä voi olla hyvin monta tagia ja käyttäjä esim. käytti vain 2 hakiessaan kysymyksiä)
  const tagFilter = (array1, array2) => {
    array1.forEach(element => {
      if (element.q_tags) {
        element.q_tags = element.q_tags.filter(item => {
          return array2.includes(item);
        });
      }
    });
    return array1;
  };

  //Tämän funktion tehtävä on järjestää kysymykset uudestaan niin, että ylimpänä ovat ne kysymykset, joilla on eniten käyttäjähakua vastaavia tageja ja viimeisenä ne, joilla on vain yksi
  const sortedQuestions = tagFilter(questions, tags).sort((array1, array2) => {
    if (array2[0]) {
      return array2.q_tags.length - array1.q_tags.length;
    }
    return "";
  });

  //Muodostetaan checkbox-inputit käymällä läpi kaikki kysymykset
  let checkBoxInput = sortedQuestions.map(option => {
    let count = 0;
    return (
      <Checkbox
        option={option}
        count={count}
        key={option.id}
        toggleChecked={toggleChecked}
        isSelected={checkedArray.checkboxes[option.id]}
      />
    );
  });

  return (
    <div>
      <form onSubmit={handleQuizSubmit}>
        {questions[0] ? (
          <div>
            <FormButton
              buttonProps={{
                buttonText: "Valitse kaikki",
                handleClick: e => {
                  selectAll(true);
                },
                buttonClass: "chooseAll"
              }}
            />
            <FormButton
              buttonProps={{
                buttonText: "Poista valinnat",
                handleClick: e => {
                  selectAll(false);
                },
                buttonClass: "removeAll"
              }}
            />
          </div>
        ) : null}
        {checkBoxInput}
        <div className="input-row">
          <FormButton
            buttonProps={{
              buttonType: "submit",
              buttonClass: "btnLogin",
              buttonText: "Lähetä tentti"
            }}
          />
        </div>
        <br />
        <div className="input-row">
          <FormButton
            buttonProps={{
              buttonClass: "btnLogin",
              buttonText: "Sulje ikkuna",
              handleClick: handleClose
            }}
          />
        </div>
      </form>
    </div>
  );
}
