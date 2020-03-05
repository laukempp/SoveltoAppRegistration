import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {fetchQuestions,getTopics,postQuiz,getTags} from "../../service/Request";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import QuestionPreview from "./QuestionPreview";
import { quizValidationSchema } from "../../service/Validation";
import socketIOClient from "socket.io-client";
import Preview from "./Preview";
import ReactTags from "react-tag-autocomplete";
import { uuid } from "uuidv4";

export default function QuizForm() {
  const [questions, setQuestions] = useState([]);
  const [show, setShow] = useState(false);
  const [showQuestionform, setShowQuestionform] = useState(false);
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState();
  const [nro, setNumber] = useState();
  const [suggestions, setSuggestions] = useState();
  const [tags, setTags] = useState([]);

  const tagArray = Object.values(tags && tags.map(item => item.name));

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    tag["id"] = uuid();
    setTags(tags => [...tags, tag]);
  };

  const onValidate = tag => {
    return tag.name.length <= 20 && tag.name.length >= 2;
  }

  //Muotoilee tulosten keräämiseen tarvittavan arrayn siten, että key on jokaisen kysymyksen id ja arvoksi tulee false
  const [checkedArray, setCheckedArray] = useState({
    checkboxes: questions.reduce(
      (options, option) => ({ ...options, [option.id]: false }),
      {}
    )
  });

  //Hakee aihealueet tietokannasta lomakekenttää varten
  useEffect(() => {
    getTopics().then(res => setTopics(res));
    getTags().then(res => setSuggestions(res));
  }, []);

  const socket = socketIOClient("http://localhost:5001");

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
      .then(() => socket.emit("eventMessage", data))
      .then(() => handleClose())
      .then(() => setTags([]))
      .then(() =>
        setCheckedArray({
          checkboxes: questions.reduce(
            (options, option) => ({ ...options, [option.id]: false }),
            {}
          )
        })
      );
  };

  const openQuestionform = () => {
    setShowQuestionform(true);
  };

  const closeQuestionform = () => {
    setShowQuestionform(false);
  };

  let topicInput = topics && topics[0] && topics.map(option => {
    return <option key={option.id} value={option.id} label={option.title} />;
  });

  const formProps = {
    handleAddition: handleAddition,
    handleDelete: handleDelete,
    onValidate: onValidate,
    topicInput: topicInput,
    tags: tags,
    suggestions: suggestions,
  }

  return (
    <>
      <div className="qFormContainer text-white">
        <h3 className="detail_header formTitle">Luo uusi tentti</h3>
        <br />
        <p>tunnuksesi on: {sessionStorage.getItem("badge")}</p>
        <div className="user">
          <Formik
            initialValues={{
              name: "",
              topics_id: 0,
              number: 0,
              questionCount: "false",
              q_tags: []
            }}
            validationSchema={quizValidationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              values.number = values.questionCount === "true" ? nro : 1000;
              values.q_tags = tagArray;
              setSubmitting(true);
              fetchQuestions(values)
                .then(res => setQuestions(res))
                .then(() => setTags([]))
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
                  placeholder="Valitse aihe"
                  className={
                    touched.topics_id && errors.topics_id ? "error" : null
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.topics_id}
                  style={{ display: "block" }}
                >
                <option defaultValue>Valitse aihe</option>
                  {topics && topics.length > 1 &&
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

                  <Field name="questionCount">
                    {({ field }) => (
                      <div>
                        <div className="inline-block">
                          <label>Kaikki: </label>
                          <input
                            {...field}
                            name="questionCount"
                            type="radio"
                            value="false"
                            checked={field.value === "false"}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="inline-block">
                          <label>Valitse: </label>
                          <input
                            {...field}
                            type="radio"
                            name="questionCount"
                            value="true"
                            checked={field.value === "true"}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}
                  </Field>

                  <div
                    className={
                      values.questionCount === "true" ? "em" : "hidden"
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
                  <div>
                  <ReactTags
                      tags={tags}
                      suggestions={suggestions}
                      onDelete={handleDelete}
                      onAddition={handleAddition}
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
                    tags={tags}
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
                  <QuestionPreview
                  formProps={formProps}
                  tagArray={tagArray} />
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
