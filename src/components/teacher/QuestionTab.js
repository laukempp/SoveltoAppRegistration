import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Formik} from "formik";
import { postQuestion, getTopics, getTags } from "../../service/Request";
import { Navigation } from "../../layout/Navbar";
import { questionValuesPost} from "../../service/FormProps"
import { questionValidationSchema} from "../../service/Validation"
import { uuid } from "uuidv4";
import auth from "../../service/Auth";
import QuestionForm from "./QuestionForm"

export default function QuestionTab() {
  const [topics, setTopics] = useState([]);
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState();

  const authT = auth.sessionStorageGetItem();

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    tag["id"] = uuid();
    setTags(tags => [...tags, tag]);
  };

  useEffect(() => {
    getTopics().then(res => setTopics(res))
    getTags().then(res => setSuggestions(res));
  }, []);

  const createTagArray = array => {
    let modified = array.map(item => item.name);
    return Object.values(modified);
  };

  function onValidate(tag) {
    return tag.name.length <= 20 && tag.name.length >= 2;
  }

  let topicInput = topics && topics[0] && topics.map(option => {
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
                values.q_tags = createTagArray(tags);
                postQuestion(values);
                resetForm();
                setSubmitting(false);
              }}>{(props) => <QuestionForm {...props} topicInput={topicInput} handleAddition={handleAddition} handleDelete={handleDelete} tags={tags} suggestions={suggestions} onValidate={onValidate} createTagArray={createTagArray}/>}</Formik>
              
          
          </div>
        </div>
      </div>
    );
  } else {
   return <Redirect to="/login" />;
  }
}
