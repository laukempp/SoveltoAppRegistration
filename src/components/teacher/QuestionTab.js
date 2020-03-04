import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import { postQuestion, getTopics} from "../../service/Request";
import { Navigation } from "../../layout/Navbar";
import { questionValuesPost } from "../../service/FormProps";
import { questionValidationSchema } from "../../service/Validation";
import useTags from "../hooks/useTags"
import auth from "../../service/Auth";
import QuestionForm from "./QuestionForm";

export default function QuestionTab() {
  const [topics, setTopics] = useState([]);

  const authT = auth.sessionStorageGetItem();

  const {tags} = useTags();

  useEffect(() => {
    getTopics().then(res => setTopics(res));
  }, []);

  let topicInput =
    topics &&
    topics[0] &&
    topics.map(option => {
      return <option key={option.id} value={option.id} label={option.title} />;
    });

  if (authT) {
    return (
      <div>
        <Navigation title={"Soveltommi"} />
        <div className="questionFormContainer">
          <p className="text-white formTitle">Luo uusi kysymys</p>
          <div className="user text-white">
            <Formik
              initialValues={questionValuesPost}
              validationSchema={questionValidationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                postQuestion(values);
                resetForm();
                setSubmitting(false);
              }}
            >
              {props => (
                <QuestionForm
                  {...props}
                  topicInput={topicInput}
                  submitProps={{
                    buttonClass: "btnLogin",
                    buttonDisabled: props.isSubmitting,
                    buttonText: "Lähetä",
                    handleClick: e => {
                      props.setFieldValue("q_tags", 1);
                      props.handleSubmit(e);
                      console.log("Tässä tagit", tags)
                    }
                  }}
                />
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
}
