import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import './reg.scss';
import * as Yup from "yup";
import { registerUser } from "../../serviceRequest";

export default function Register() {
  const [message, setMessage] = useState({ message: "", success: false });

  const userSchema = Yup.object().shape({
    login: Yup.string()
      .required("This field is required.")
      .email("username has to be an email address."),
    password: Yup.string()
      .required("password is required")
      .min(8, "password has to be at least 8 characters long")
      .max(128, "password too long, 128 characters is the max")
      .matches(/^(?=.*\d).{8,}$/, "password must contain at least one number"),
    passwordConfirm: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password")], "Passwords must match")
  });
  if (!message.success) {
    return (
      <div className="user">
        <h1 className="user__title">Soveltommi rekisteröityminen</h1>
        <Formik
          initialValues={{ login: "", password: "" }}
          validationSchema={userSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
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
                <ErrorMessage
                  component="div"
                  name="login"
                  className="invalidEmail"
                />
                <div className="form__group">
                  <div className="form__input">
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
                  name="password"
                  className="invalidPassword"
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
                <ErrorMessage
                  component="div"
                  name="passwordConfirm"
                  className="invalidPassword"
                />

                <button className="btn" type="submit" disabled={isSubmitting}>
                  Rekisteröidy
              </button>
              </Form>
            )}
        </Formik>
        <div>{message.message}</div>
      </div>
    );
  } else if (message.success) {
    return <div className="user__title">Käyttäjä luotu, voit nyt kirjautua sisään.</div>;
  }
}
