import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginUser } from "../../service/Auth";
import auth from '../../service/Auth';
import { Redirect, Link } from "react-router-dom";
import Footer from "../../layout/Footer";
import '../../styles/login.scss';
import {loginSchema} from "../../service/Validation"

export default function Login() {
  const [authT, setAuthT] = useState(auth.isAuthenticated());
  const [message, setMessage] = useState();
  
  return (
    <>
      {authT ? <Redirect to="/dashboard" /> : null}
      <div className="user">
        <h1 className="user__title">Soveltommi Login</h1>
        {!authT ? (<div id="invalidCreds" className="text-white hidden invalidErrorBubble">{message}</div> ): null}
        <Formik
          initialValues={{ login: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            loginUser(values).then(res => {
              setAuthT(auth.isAuthenticated())
              let authMsg = document.getElementById("invalidCreds")
              if(auth.isAuthenticated() === false){
                setMessage("Väärä sähköposti tai salasana")
                if(authMsg.classList.contains("hidden"))  {
                    authMsg.classList.remove("hidden")
                }
              }             
            })
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
              <button className="btnLogin" type="submit" disabled={isSubmitting} id="loginBtn">
                Login 
              </button>
              <p className="text-white" id="regLink">Uusi käyttäjä? <Link className="registerUser" as={Link} to="/register">Rekisteröidy</Link></p>
            </Form>
            
          )}
          
        </Formik>
        
        <Footer />
        
      </div>
      
    </>
    
  );
  
}
