import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import { postQuestion, getTopics} from "../../service/Request";
import { Navigation } from "../../layout/Navbar";
import { questionValuesPost } from "../../service/FormProps";
import { questionValidationSchema } from "../../service/Validation";
import { uuid } from "uuidv4";
import auth from "../../service/Auth";
import QuestionForm from "./QuestionForm";

export default function QuestionTab() {
  const [topics, setTopics] = useState([]);
  const [tags, setTags] = useState([]);

  const authT = auth.sessionStorageGetItem();
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

  useEffect(() => {
    getTopics().then(res => setTopics(res));
  }, []);

  let topicInput = topics && topics[0] && topics.map(option => {
      return <option key={option.id} value={option.id} label={option.title} />;
    });
  
  const formProps = {
    handleAddition: handleAddition,
    handleDelete: handleDelete,
    onValidate: onValidate,
    topicInput: topicInput,
    tags: tags
  }

  if (authT) {
    return (
      <div>
        <Navigation title={"Soveltommi"} />
        <div className="questionFormContainer">
          <p className="text-white formTitle"> Luo uusi kysymys </p>
          <div className="user text-white">
            <Formik
              initialValues={questionValuesPost}
              validationSchema={questionValidationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                postQuestion(values)
                setTags([])
                resetForm();
                setSubmitting(false);
              }}
            >
              {props => (
                <QuestionForm
                  {...props}
                  formProps={formProps}
                  submitProps={{
                    buttonClass: "btnLogin",
                    buttonDisabled: props.isSubmitting,
                    buttonText: "Lähetä",
                    handleClick: e => {
                      props.setFieldValue("q_tags", tagArray);
                      props.handleSubmit(e);
                    }}}
                  deleteProps={{
                    buttonClass:"btnLogin formEmpty",
                    buttonText:"Tyhjennä",
                    handleClick: e => {
                      e.preventDefault();
                      props.handleReset();
                    }}}
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
