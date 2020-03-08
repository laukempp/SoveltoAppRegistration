import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../service/Auth";
import auth from '../../service/Auth';
import { Redirect, Link } from "react-router-dom";
import Footer from "../../layout/Footer";
import '../../styles/login.scss';
export default function Login() {
  const [authT, setAuthT] = useState(auth.isAuthenticated());
  

  const loginSchema = Yup.object().shape({
    login: Yup.string().required("Käytä s-postia kirjautuaksesi sisään."),
    password: Yup.string().required("Salasana ei voi olla tyhjä.")
  });
  return (
    <>
      {authT ? <Redirect to="/dashboard" /> : null}
      <div className="user">
        <h1 className="user__title">Soveltommi Login</h1>
        <Formik
          initialValues={{ login: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            loginUser(values).then(res => {
              setAuthT(auth.isAuthenticated())
            })
            
          
              /* .then(res => {
                return checkItem();
              })
              .then(item => {
                setToDash(item);
              }); */
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
              />
              

              <button className="btnLogin" type="submit" disabled={isSubmitting}>
                Login 
              </button>
              <p className="text-white">Uusi käyttäjä? <Link className="registerUser" as={Link} to="/register">Rekisteröidy</Link></p>
            </Form>
            
          )}
          
        </Formik>
        
        <Footer />
        
      </div>
      
    </>
    
  );
  
}
