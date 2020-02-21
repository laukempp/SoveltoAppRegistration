import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchQuestions, getTopics, postQuiz } from "../../service/Request";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SingleQuestionform from "../teacher/SingleQuestionform";

import socketIOClient from "socket.io-client";
import Preview from "./Preview";
import { uuid } from "uuidv4";

//validointi lomakkeeseen
const quizformSchema = Yup.object().shape({
  name: Yup.string().required("Tentillä täytyy olla nimi")
});

const quizformSelectNumberScema = Yup.object().shape({
  name: Yup.string().required("Tentillä täytyy olla nimi"),
  number: Yup.number()
    .positive("Numeron täytyy olla positiivinen luku ja suurempi kuin 0")
    .integer("Numeron täytyy olla kokonaisluku")
    .lessThan(10001, "Luku saa olla enintään 10000")
});

export default function QuizForm() {
  const [questions, setQuestions] = useState([]);
  const [show, setShow] = useState(false);
  const [showQuestionform, setShowQuestionform] = useState(false);
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState();
  const [nro, setNumber] = useState();

  //Muotoilee tulosten keräämiseen tarvittavan arrayn siten, että key on jokaisen kysymyksen id ja arvoksi tulee false
  const [checkedArray, setCheckedArray] = useState({
    checkboxes: questions.reduce(
      (options, option) => ({ ...options, [option.id]: false }),
      {}
    )
  });
  console.log(checkedArray);

  //Hakee aihealueet tietokannasta lomakekenttää varten
  const fetchTopics = () => {
    getTopics().then(res => setTopics(res));
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const socket = socketIOClient("http://localhost:5001");

  const eventMessage = object => {
    return new Promise(resolve => {
      socket.emit("eventMessage", object);
      resolve();
    });
  };

  socket.on("renderScore", event => {
    console.log("tässä tulee oppilaan vastausdata", event);
  });

  //Funktio, joka kerää tulokset. Klikkaamalla checkboxia avaimen arvo muuttuu välillä true/false
  const toggleChecked = e => {
    const { name } = e.target;
    setCheckedArray(checkedArray => ({
      checkboxes: {
        ...checkedArray.checkboxes,
        [name]: !checkedArray.checkboxes[name]
      }
    }));
  };

  //Funktio, joka rakentaa tulosarraysta arrayn, jossa on pelkästään valittujen kysymysten id:t (eli ne, joiden arvo on true)
  const createIdArray = () => {
    return Object.keys(checkedArray.checkboxes)
      .filter(checkbox => checkedArray.checkboxes[checkbox])
      .map(checkbox => checkbox);
  };

  //Funktio, joka sulkee modaali-ikkunan
  const handleClose = () => {
    setCheckedArray({
      checkboxes: questions.reduce(
        (options, option) => ({ ...options, [option.id]: false }),
        {}
      )
    });
    setShow(false);
  };

  //Funktio, joka käsittelee quizin lähetyksen tietokantaan ja oppilaalle
  const handleQuizSubmit = e => {
    e.preventDefault();
    let data = {
      title: title,
      question_ids: createIdArray(),
      quiz_author: sessionStorage.getItem("badge"),
      quiz_badge: uuid(),
      istemporary: 0
    };
    console.log(data);
    postQuiz(data)
      .then(() => eventMessage(data))
      .then(() => handleClose())
      .then(() =>
        setCheckedArray({
          checkboxes: questions.reduce(
            (options, option) => ({ ...options, [option.id]: false }),
            {}
          )
        })
      );
  };

  console.log(topics);

  const openQuestionform = () => {
    setShowQuestionform(true);
  };

  const closeQuestionform = () => {
    setShowQuestionform(false);
  };

  /*const eventClick = () => {
    socket.emit('eventClick', 'tämä tulee quizformista')
  }*/

  return (
    <>
      <div className="qFormContainer text-white">
        <h3 className="detail_header formTitle">Luo uusi tentti</h3>
        <div className="user">
          <Formik
            initialValues={{
              name: "",
              topics_id: 1,
              number: 0,
              questionCount: "true"
            }}
            validationSchema={quizformSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              values.number = values.questionCount === "true" ? 1000 : nro;
              setSubmitting(true);
              console.log(values);
              fetchQuestions(values)
                .then(res => setQuestions(res))
                .then(() => setTitle(values.name))
                .then(() => setShow(true));
              resetForm();
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit
            }) => (
              <Form className="form" onSubmit={handleSubmit}>
                <div className="form__group">
                  <div className="em">
                    <span className="detail_span">Tentin nimi</span>
                    <ErrorMessage
                      render={msg => (
                        <div className="invalidErrorBubble">{msg}</div>
                      )}
                      name="name"
                    />
                    <Field
                      type="name"
                      name="name"
                      placeholder="Tentin nimi"
                      id="kysynimi"
                      className={touched.name && errors.name ? "error" : null}
                      onChange={handleChange}
                      autoComplete="off"
                      onBlur={handleBlur}
                      value={values.name || ""}
                    />
                  </div>
                </div>
                <span className="detail_span">Tentin aihe</span>
                <Field
                  as="select"
                  name="topics_id"
                  id="quiztopic"
                  className={
                    touched.topics_id && errors.topics_id ? "error" : null
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.topics_id}
                  style={{ display: "block" }}
                >
                  {topics.length > 1 &&
                    topics.map(option => (
                      <option
                        key={option.id}
                        value={option.id}
                        label={option.title}
                      />
                    ))}
                </Field>
                <div className="em">
                  <span className="detail_span text-center">
                    Kysymysten lukumäärä
                  </span>
                  <ErrorMessage
                    render={msg => (
                      <div className="invalidErrorBubble">{msg}</div>
                    )}
                    name="number"
                  />

                  <Field
                    name="questionCount"
                    render={({ field }) => (
                      <div>
                        <div className="inline-block">
                          <label>Kaikki: </label>
                          <input
                            {...field}
                            name="questionCount"
                            type="radio"
                            value="true"
                            checked={field.value === "true"}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="inline-block">
                          <label>Valitse: </label>
                          <input
                            {...field}
                            type="radio"
                            name="questionCount"
                            value="false"
                            checked={field.value === "false"}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}
                  />

                  <div
                    className={
                      values.questionCount === "true" ? "hidden" : "em"
                    }
                  >
                    <Field
                      type="number"
                      name="number"
                      id="kysynum"
                      placeholder="Kysymysten määrä"
                      className={
                        touched.number && errors.number ? "error" : null
                      }
                      onChange={e => {
                        handleChange(e);
                        setNumber(e.target.value);
                      }}
                      onBlur={handleBlur}
                      value={values.number || ""}
                    />
                  </div>

                  <div className="em">
                    <button
                      className="btnLogin"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Tentti valmiista kysymyksistä
                    </button>
                  </div>
                  <div>
                    <div className="em">
                      <button
                        className="btnLogin"
                        type="button"
                        onClick={openQuestionform}
                      >
                        Luo kysymyksiä ja tenttejä
                      </button>
                    </div>
                  </div>
                </div>{" "}
              </Form>
            )}
          </Formik>
          {/*  <button onClick={buttonHappen}>send message</button> */}

          <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleQuizSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Esikatselu Quizille #12</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="quizPreview">
                  <Preview
                    questions={questions}
                    toggleChecked={toggleChecked}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Sulje
                </Button>
                <Button className="sendQ" type="submit">
                  Lähetä quiz
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
          <Modal show={showQuestionform} onHide={closeQuestionform}>
            <div>
              <Modal.Header>
                <Modal.Title>Luo kysymys ja tentti</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <SingleQuestionform />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={closeQuestionform}>Sulje</Button>
              </Modal.Footer>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}
