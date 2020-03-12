import React from "react";
import ReactTags from "react-tag-autocomplete";
import { Form, Field, ErrorMessage } from "formik";
import FormButton from "./FormButton"

const QuizForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  isSubmitting,
  showQuestion,
  toggleShow,
  formProps
}) => {
  const {tags,handleAddition,handleDelete,topicInput,suggestions, tagArray} = formProps;

  const openQuestionForm = () => {
    showQuestion();
    toggleShow()
  }

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <div className="form__group">
        <div className="em">
          <span className="detail_span">Tentin nimi</span>
          <ErrorMessage
            render={msg => <div className="invalidErrorBubble">{msg}</div>}
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
        className={touched.topics_id && errors.topics_id ? "error" : null}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.topics_id}
        style={{ display: "block" }}
      >
        <option defaultValue>Valitse aihe</option>
        {topicInput}
      </Field>
      <div>
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            onDelete={handleDelete}
            onAddition={handleAddition}
          />
        </div>
      <div className="ownQuestions">
        <div className={values.useBadge === "false" ? "inactiveRadioBtn" : null}>
      <label htmlFor="useBadge">Vain omat kysymykset</label></div>
        <Field
        type="checkbox"
        id="useBadge"
        name="useBadge"
        className="forCheckbox"
        checked={values.useBadge}
        />
      </div>
      <div>
      <label>Etenee kysymys kerrallaan</label>
        <Field
        type="checkbox"
        id="quizType"
        name="quiz_type"
        className="quizType"
        checked={values.quiz_type}
        />
      </div>
      <div className="em">
        <span className="detail_span text-center">Kysymysten lukumäärä</span>
        <ErrorMessage
          render={msg => <div className="invalidErrorBubble">{msg}</div>}
          name="number"
        />
        <Field name="questionCount">
          {({ field }) => (
            <div className="radioDiv">
              <div className="inline-block">
              <div className={values.questionCount === "true" ? "inactiveRadioBtn" : "activeRadioBtn"}>
                          <label htmlFor="kaikki">Kaikki</label></div>
                <input
                  {...field}
                  id="kaikki"
                  name="questionCount"
                  type="radio"
                  value="false"
                  checked={field.value === "false"}
                  onChange={handleChange}
                />
              </div>
              <div className="inline-block">
              <div className={values.questionCount === "false" ? "inactiveRadioBtn" : "activeRadioBtn"}>
                          <label htmlFor="valitse">Valitse</label></div>
                <input
                  {...field}
                  id="valitse"
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
        <div className={values.questionCount === "true" ? "em" : "hidden"}>
          <Field
            type="number"
            name="number"
            id="kysynum"
            placeholder="Kysymysten määrä"
            className={touched.number && errors.number ? "error" : null}
            onChange={e => {
              handleChange(e);
              setFieldValue("number", e.target.value);
            }}
            onBlur={handleBlur}
            value={values.number || ""}
          />
        </div>
        <div>
          <label>Muuta tentin aukioloaikaa (oletus 10 minuuttia)</label>
          <Field
            type="number"
            name="timer"
            id="timer"
            placeholder="Aukioloaika minuuteissa"
            className={touched.timer && errors.timer ? "error" : null}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.timer || ""}
          />
        </div>
        <br />
        <div className="em">
          <FormButton 
          buttonProps={{
            buttonId: "quizSubmitBtn",
            buttonClass: "btnLogin",
            buttonDisabled: isSubmitting,
            buttonText: "Tentti valmiista kysymyksistä",
            handleClick: e => {if (values.questionCount==="false") {setFieldValue("number", 1000)}
            setFieldValue("q_tags", tagArray);
            handleSubmit(e)}
          }}/>
        </div>
        <div>
          <div className="em">
          <FormButton 
          buttonProps={{
            buttonId: "quizResetBtn",
            buttonClass: "btnLogin",
            buttonText: "Luo kysymyksiä ja tenttejä",
            handleClick: openQuestionForm
          }}/>
          </div>
        </div>
      </div>
    </Form>
  );

};

export default QuizForm;

