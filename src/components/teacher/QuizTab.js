import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { fetchQuestions, getTopics, getTags } from "../../service/Request";
import { quizValidationSchema } from "../../service/Validation";
import { quizValues } from "../../service/FormProps";
import QuestionPreview from "./QuestionPreview";
import QuizForm from "./Quizform";
import QuizPreview from "./QuizPreview";
import useToggle from "../hooks/useToggle";
import Modal from "react-bootstrap/Modal";
import { uuid } from "uuidv4";

//Regex queryn ja tagilistan vertaamista varten, jotta funktio osaa katsoa, mitkä tagit muistuttavat querya
function escapeForRegExp(query) {
  return query.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
}

export default function QuizTab({ showSuccessMessage }) {
  const [questions, setQuestions] = useState([]);
  const [topics, setTopics] = useState([]);
  const [quizSettings, setQuizSettings] = useState({
    title: "",
    timer: 0,
    quiz_type: false
  });
  const [suggestions, setSuggestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  //Tuodaan toggle-hook komponentin käyttöön
  const { show, toggleShow, content, showQuiz, showQuestion } = useToggle();

  //Hakee aihealueet tietokannasta lomakekenttää varten
  useEffect(() => {
    getTopics().then(res => setTopics(res));
    getTags().then(res => setSuggestions(res));
  }, []);

  //Funktio, joka asettaa topicin valinnan - käyttää erillistä react-select -kirjastoa & funktio valutetaan alastapäin formin käyttöön
  const handleTopicAdd = selectedOption => {
    setSelectedOption(selectedOption);
  };

  //Muodostetaan tietokantaan lähetettävä tag-Array (array koostuu pelkistä stringeistä)
  const tagArray = tags[0] && Object.values(tags.map(item => item.name));

  //Tagien poistofunktio
  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  //Tagien lisäysfunktio
  const handleAddition = tag => {
    tag["id"] = uuid();
    setTags(tags => [...tags, tag]);
  };

  //Suodattaa tagilistalta ne ehdotukset, jotka näytetään. Ensin katsoo, löytyykö valittujen tagien listalta query ja sitten katsoo, sopiiko query regexiin. Tarkoitus on, ettei käyttäjä voi lisätä samaa tagia useampaa kertaa valittujen listaan
  const checkTagDouble = (suggestion, query) => {
    const regex = new RegExp(`(?:^|\\s)${escapeForRegExp(query)}`, "i");
    if (tags.includes(suggestion)) {
      return false;
    } else if (regex.test(suggestion.name)) {
      return true;
    }
    return false;
  };

  //Funktio, joka sulkee modaali-ikkunan ja samalla resetoi komponentin tilan
  const handleClose = () => {
    setQuizSettings({ title: "", timer: 0, quiz_type: false });
    setMessage("");
    setTags([]);
    toggleShow();
    setSelectedOption(null);
  };

  //Mapataan auki aiheet Formikia varten ja muodostetaan niistä Select-componentille sopivanmuotoinen olio-array
  let options = topics[0] && topics
  .sort((a, b) => a.title.localeCompare(b.title, 'fi', {ignorePunctuation: true, sensitivity: 'base'}))
  .map(option => {return {value: option.id, label: option.title};});

  //Kerätään yhteen kaikki propsit, jotka komponentin täytyy välittää lapsille.
  const formProps = {
    handleAddition: handleAddition,
    handleDelete: handleDelete,
    handleClose: handleClose,
    quizSettings: quizSettings,
    tags: tags,
    suggestions: suggestions,
    tagArray: tagArray,
    questions: questions,
    options: options,
    selectedOption: selectedOption,
    handleTopicAdd: handleTopicAdd,
    showSuccessMessage: showSuccessMessage,
    checkTagDouble: checkTagDouble
  };

  return (
    <>
      <div className="qFormContainer text-white" id="qFormContainer">
        <h3 className="detail_header formTitle">Luo uusi tentti</h3>
        <br />
        <p id="teacherTagP">Tunnuksesi on: {sessionStorage.getItem("badge")}</p>
        <div className="user">
          <Formik
            initialValues={quizValues}
            validationSchema={quizValidationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              fetchQuestions(values)
                .then(res => {
                  if (res.message) {
                    setMessage(res.message);
                  } else {
                    setQuestions(res);
                  }
                })
                .then(() =>
                  setQuizSettings({
                    title: values.name,
                    timer: values.timer,
                    quiz_type: values.quiz_type
                  })
                )
                .then(() => showQuiz())
                .then(() => toggleShow());
              resetForm();
              setSubmitting(false);
            }}
          >
            {props => (
              <QuizForm
                {...props}
                formProps={formProps}
                toggleShow={toggleShow}
                showQuestion={showQuestion}
              />
            )}
          </Formik>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {content
                  ? "Esikatselu Quizille " + quizSettings.title
                  : "Luo uusi kysymys ja tentti"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                {message.length > 1 && <div>{message}</div>}
                <div className="quizPreview">
                  {content ? (
                    <QuizPreview formProps={formProps} />
                  ) : (
                    <QuestionPreview
                      formProps={formProps}
                      toggleShow={toggleShow}
                    />
                  )}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div>
                <br />
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}
