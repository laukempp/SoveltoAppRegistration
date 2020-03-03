import React from "react";
import { Form, Field, ErrorMessage, FieldArray, getIn } from "formik";
import FormButton from "./FormButton";
const QuestionForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  handleReset,
  topicInput
}) => (
  <Form className="form" onSubmit={handleSubmit}>
    <Field
      type="text"
      name="question"
      id="question"
      autoComplete="off"
      placeholder="Kirjoita uusi kysymys"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.question}
      className={touched.question && errors.question ? "has-error" : null}
    />
    <ErrorMessage component="div" name="question" className="invalidQuestion" />
    <Field
      as="select"
      name="topics_id"
      id="topic_id"
      autoComplete="off"
      className={touched.topics_id && errors.topics_id ? "error" : null}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.topics_id}
      style={{ display: "block" }}
    >
      {topicInput}
    </Field>

    <Field
      type="text"
      name="correct_answer"
      id="correct_answer"
      autoComplete="off"
      placeholder="Oikea vastaus tähän"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.correct_answer}
      className={
        touched.correct_answer && errors.correct_answer ? "has-error" : null
      }
    />
    <ErrorMessage
      component="div"
      name="correct_answer"
      className="invalidCorrectAnswer"
    />
    <FieldArray
      className="wrongAns"
      name="wrong_answer"
      render={({ remove, push }) => (
        <div className="wrongAns">
          <label className="wrongAnsLabel">Väärät vastaukset</label>
          {values.wrong_answer &&
            values.wrong_answer.length > -1 &&
            values.wrong_answer.map((one_wrong_answer, index) => {
              const wrong_answer = `one_wrong_answer[${index}]`;
              const touchedAnswer = getIn(touched, wrong_answer);
              const errorAnswer = getIn(errors, wrong_answer);

              if (index < 1) {
                return (
                  <div className="row" id={index} key={index}>
                    <div className="col">
                      <Field
                        type="text"
                        autoComplete="off"
                        value={one_wrong_answer}
                        name={`wrong_answer.${index}`}
                        placeholder="Lisää uusi"
                        className={`wrongAnsInput ${touchedAnswer && errorAnswer ? "has-error" : null}`}
                      />
                      <ErrorMessage
                        component="div"
                        name={`wrong_answer.${index}`}
                        className="invalidCorrectAnswer"
                      />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="row" id={index} key={index}>
                    <div className="col">
                      <Field
                        type="text"
                        autoComplete="off"
                        value={one_wrong_answer}
                        name={`wrong_answer.${index}`}
                        placeholder="Lisää uusi"
                        className={`wrongAnsInput ${touchedAnswer && errorAnswer ? "has-error" : null}`}
                      />
                      <ErrorMessage
                        component="div"
                        name={`wrong_answer.${index}`}
                        className="invalidCorrectAnswer"
                      />
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        className="qFormRemoveBtn"
                        onClick={() => remove(index)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          <button
            type="button"
            className="secondary btnLogin"
            onClick={() => {if(values.wrong_answer.length < 3) {push("")}}}
          >
            Lisää väärä vastaus
          </button>
        </div>
      )}
    />
    <br />

    <div className="input-row">
      <FormButton
        buttonClass={"btnLogin"}
        buttonType={"submit"}
        buttonDisabled={isSubmitting}
        buttonText={"Lähetä"}
      />
    </div>

    <div className="input-row">
      <FormButton
        buttonClass={"btnLogin formEmpty"}
        buttonText={"Tyhjennä"}
        handleClick={event => {
          event.preventDefault();
          handleReset();
        }}
      />
    </div>
  </Form>
);

export default QuestionForm;
