import React from "react";
import { Form, Field, ErrorMessage, FieldArray, getIn } from "formik";
import ReactTags from "react-tag-autocomplete";
import CreatableSelect from 'react-select/creatable';
import FormButton from "./FormButton";

const QuestionForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  formProps,
  firstButtonProps,
  secondButtonProps
}) => { 
  
  const {tags, handleAddition, handleDelete, onValidate, handleTopicAdd, options, suggestions} = formProps;

  return (
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
      <ErrorMessage
        component="div"
        name="question"
        className="invalidQuestion"
      />
        <CreatableSelect
        isClearable
        onChange={handleTopicAdd}
        onInputChange={handleTopicAdd}
        options={options}
        placeholder={"Valitse aihe tai luo uusi"}
        />
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        onDelete={handleDelete}
        onAddition={handleAddition}
        allowNew={true}
        placeholderText={"Lisää tägi"}
        onValidate={onValidate}
        allowBackspace={false}
      />
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
                          className={`wrongAnsInput ${
                            touchedAnswer && errorAnswer ? "has-error" : null
                          }`}
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
                          className={`wrongAnsInput ${
                            touchedAnswer && errorAnswer ? "has-error" : null
                          }`}
                        />
                        <ErrorMessage
                          component="div"
                          name={`wrong_answer.${index}`}
                          className="invalidCorrectAnswer"
                        />
                      </div>
                      <div className="col">
                        <FormButton buttonProps = {{buttonText: "X", buttonType:"button", buttonClass: "qFormRemoveBtn", handleClick: () => remove(index)}}
                        />
                      </div>
                    </div>
                  );
                }
              })}
            <FormButton buttonProps = {{buttonType: "button", buttonClass: "secondary btnLogin", buttonText: "Lisää väärä vastaus",
                handleClick: () => { if (values.wrong_answer.length < 3) {push("")}}}} 
            />
          </div>
        )}
      />
      <br />

      <div className="input-row">
        <FormButton buttonProps={firstButtonProps} />
      </div>
      <br/>
      <div className="input-row">
        <FormButton buttonProps={secondButtonProps} />
      </div>
    </Form>
  );
};

export default QuestionForm;
