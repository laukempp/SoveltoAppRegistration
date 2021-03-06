import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage} from "formik";
import './reg.scss';
import * as Yup from "yup";
import { registerUser } from "../../service/registerUser";

import RegRedirect from "../registration/RegRedirect";

export default function Register() {
  const [message, setMessage] = useState({ message: "", success: false });

  //validation schema for user register
  const userSchema = Yup.object().shape({
    login: Yup.string()
      .required("Tämä kenttä vaaditaan.")
      .email("Käyttäjänimen täytyy olla sähköposti."),
    password: Yup.string()
      .required("Tämä kenttä vaaditaan")
      .min(8, "Salasanan pitää olla vähintään 8 merkkiä")
      .max(128, "Salasana ei saa olla yli 128 merkkiä")
      .matches(/^(?=.*\d).{8,}$/, "Salasanassa pitää olla vähintään yksi numero."),
    passwordConfirm: Yup.string()
      .required("Kirjoita salasana uudelleen")
      .oneOf([Yup.ref("password")], "Salasanojen täytyy täsmätä.")
  })
  //creating a badge for teacher upon registration that students will use in url to start the right quiz
  const badge = Math.round(Math.random() * 100000);

  if (!message.success) {
    return (
      <div className="user text-white">
        <h1 className="user__title">Soveltommi rekisteröityminen</h1>
        <Formik
          initialValues={{ login: "", password: "", teacher_badge: ""}}
          validationSchema={userSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            values.teacher_badge = badge;
            setSubmitting(true);
            registerUser(values).then(res => {
              setMessage(res);
            });
            resetForm();
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          }) => (
              <Form className="form" onSubmit={handleSubmit}>
                <div className="form__group">
                  <ErrorMessage
                  component="div"
                  name="login"
                  className="text-white invalidErrorBubble"
                />
                  <Field
                    type="email"
                    name="login"
                    placeholder="email@sovelto.com"
                    id="emailfield"
                    className={touched.login && errors.login ? "error" : null}
                    onChange={handleChange}
                    autoComplete="off"
                    onBlur={handleBlur}
                    value={values.login || ""}
                  /></div>
                
                <div className="form__group">
                  <div className="form__input">
                   <ErrorMessage
                  component="div"
                  name="password"
                  className="text-white invalidErrorBubble"
                /> 
                    <Field
                      type="password"
                      name="password"
                      placeholder="*********"
                      id="passfield"
                      className={touched.password && errors.password ? "error" : null}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password || ""}
                    /></div></div>
                
                <ErrorMessage
                  component="div"
                  name="passwordConfirm"
                  className="text-white invalidErrorBubble"
                />
                <Field
                  type="password"
                  name="passwordConfirm"
                  placeholder="*********"
                  id="passfieldConfirm"
                  className={
                    touched.passwordConfirm && errors.passwordConfirm
                      ? "error"
                      : null
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.passwordConfirm || ""}
                />
                

                <button className="btnLogin" type="submit" disabled={isSubmitting}>
                  Rekisteröidy
              </button>
              <p className="text-white">Oletko jo rekisteröitynyt? <Link className="registerUser" as={Link} to="/login">Kirjaudu sisään</Link></p>
              </Form>
            )}
        </Formik>
        <div>{message.message}</div>
      </div>
    );
  } else if (message.success) {
    return <div className="text-white"><p>Käyttäjä luotu, voit nyt kirjautua sisään. </p>
    <RegRedirect /></div>;
  }
}
