import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import { postQuestion, getTopics, getTags } from "../../service/Request";
import { Navigation } from "../../layout/Navbar";
import { questionValuesPost } from "../../service/FormProps";
import { questionValidationSchema } from "../../service/Validation";
import { uuid } from "uuidv4";
import auth from "../../service/Auth";
import QuestionForm from "./Questionform";
import StatusMessage from "./StatusMessage";

export default function QuestionTab() {
  const [topics, setTopics] = useState([]);
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState();
  const [successMessage, setSuccessMessage] = useState(false);

  const authT = auth.sessionStorageGetItem();
  const tagArray = Object.values(tags && tags.map(item => item.name));

  const showSuccessMessage = msg => {
    if (msg) {
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 2000);
    }
  };

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    tag["id"] = uuid();
    setTags(tags => [...tags, tag]);
  };

  const onValidate = tag => {
    return tag.name.length <= 20 && tag.name.length >= 2;
  };

  useEffect(() => {
    getTopics().then(res => setTopics(res));
    getTags().then(res => setSuggestions(res));
  }, []);

  let topicInput =
    topics &&
    topics[0] &&
    topics.map(option => {
      return <option key={option.id} value={option.id} label={option.title} />;
    });

  const formProps = {
    handleAddition: handleAddition,
    handleDelete: handleDelete,
    onValidate: onValidate,
    topicInput: topicInput,
    tags: tags,
    suggestions: suggestions,
    showSuccessMessage: showSuccessMessage
  };

  if (authT) {
    return (
      <div>
        {successMessage ? (
          <StatusMessage successMessage={"Kysymys tallennettu."} />
        ) : null}
        <Navigation title={"Soveltommi"} />
        <div className="questionFormContainer">
          <p className="text-white formTitle"> Luo uusi kysymys </p>
          <div className="user text-white">
            <Formik
              initialValues={questionValuesPost}
              validationSchema={questionValidationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                postQuestion(values).then(res => {
                  console.log(res.data.id);
                  showSuccessMessage(res.success);
                });
                setTags([]);
                resetForm();
                setSubmitting(false);
              }}
            >
              {props => (
                <QuestionForm
                  {...props}
                  formProps={formProps}
                  firstButtonProps={{
                    buttonId: "firstQuesButton",
                    buttonClass: "btnLogin",
                    buttonDisabled: props.isSubmitting,
                    buttonText: "Lähetä",
                    handleClick: e => {
                      props.setFieldValue("q_tags", tagArray);
                      props.handleSubmit(e);
                    }
                  }}
                  secondButtonProps={{
                    buttonId: "secondQuesButton",
                    buttonClass: "btnLogin formEmpty",
                    buttonText: "Tyhjennä",
                    handleClick: e => {
                      e.preventDefault();
                      props.handleReset();
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
