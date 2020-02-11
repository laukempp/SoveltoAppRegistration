import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { postQuestion, getTopics } from "../../service/Request";
import * as Yup from "yup";
import { Navigation } from "../../layout/Navbar";

const validationSchema = Yup.object().shape({
  question: Yup.string()
    .min(2, "Kysymyksen täytyy sisältää vähintään kaksi merkkiä.")
    .max(255, "Kysymys ei voi olla pidempi kuin 255 merkkiä.")
    .required("Kirjoita uusi kysymys."),
  correct_answer: Yup.string()
    .min(2, "Vastauksen täytyy sisältää vähintään kaksi merkkiä.")
    .max(255, "Vastaus ei voi olla pidempi kuin 255 merkkiä.")
    .required("Anna oikea vastaus"),
  wrong_answer: Yup.array()
    .min(1, "Vähintään yksi väärä vastaus.")
    .max(3, "Enintään kolme väärää vastausta")
    .required("Vähintään yksi väärä vastaus vaaditaan")
});

const SingleQuestionform = () => {
  const [topics, setTopics] = useState([]);

  const fetchTopics = () => {
    getTopics().then(res => setTopics(res));
  };
  useEffect(() => {
    fetchTopics();
  }, []);

  return <div>MOROT TISKIIN</div>;
};

export default SingleQuestionform;
