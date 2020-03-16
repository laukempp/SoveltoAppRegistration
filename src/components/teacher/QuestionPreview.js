import React from "react";
import { Formik } from "formik";
import { postQuestion, postQuiz } from "../../service/Request";
import { questionValidationSchema } from "../../service/Validation";
import { questionValuesPost } from "../../service/FormProps";
import { uuid } from "uuidv4";
import socketIOClient from "socket.io-client";
import QuestionForm from "./Questionform";

const QuestionPreview = ({ formProps }) => {
  const socket = socketIOClient("http://localhost:5001");

  // Funktio, joka käsittelee quizin lähetyksen tietokantaan ja oppilaalle
  const handleSingleQuestionQuizSubmit = (question, istemporary) => {
    let data = {
      title: "Pop Quiz",
      question_ids: [question],
      quiz_author: sessionStorage.getItem("badge"),
      quiz_badge: uuid(),
      istemporary: istemporary
    };
    postQuiz(data).then(() => socket.emit("eventMessage", data));
  };

  return (
    <div className="singleQuestionFormContainer">
      <Formik
        initialValues={questionValuesPost}
        validationSchema={questionValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          if (values.isTemporary === 0) {
            postQuestion(values).then(res => {
              handleSingleQuestionQuizSubmit(
                res.data.id.toString(),
                values.istemporary
              );
            });
          } else {
            setSubmitting(true);
            postQuestion(values).then(res => {
              handleSingleQuestionQuizSubmit(
                res.data.id.toString(),
                values.istemporary
              );
            });
          }
          resetForm();
          setSubmitting(false);
        }}
      >
        {props => (
          <QuestionForm
            {...props}
            formProps={formProps}
            firstButtonProps={{
              buttonId: "first-button",
              buttonClass: "btnLogin",
              buttonText: "Tallenna kysymyspankkiin ja aloita tentti",
              handleClick: e => {
                props.setFieldValue("istemporary", 0);
                props.setFieldValue("q_tags", formProps.tagArray);
                props.handleSubmit(e);
              }
            }}
            secondButtonProps={{
              buttonId: "second-button",
              buttonClass: "btnLogin",
              buttonText: "Aloita tentti tallentamatta kysymystä",
              handleClick: e => {
                props.setFieldValue("istemporary", 1);
                props.setFieldValue("q_tags", formProps.tagArray);
                props.handleSubmit(e);
              }
            }}
          />
        )}
      </Formik>
    </div>
  );
};

export default QuestionPreview;
