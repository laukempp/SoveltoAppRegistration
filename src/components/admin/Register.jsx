import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
export default function Register() {
    const userSchema = Yup.object().shape({
        login: Yup.string()
        .required("This field is required.")
        .email("username has to be an email address."),
        password: Yup.string()
        .required("password is required")
        .min(8, "password has to be at least 8 characters long")
        .max(128, "password too long, 128 characters is the max")
        .matches(/^(?=.*\d).{8,}$/, "password must contain at least one number")
    })
    return (
        <Formik 
        initialValues={{ login: '', password: ''}}
        validationSchema={userSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
            setSubmitting(true);
            resetForm();
            setSubmitting(false);
        }}>
            {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit}) => (
                <Form onSubmit={handleSubmit}>
                    <Field type="email" name="login" placeholder="email@example.com"
                    className={touched.login && errors.login ? "error": null}
                    onChange={handleChange}
                    autoComplete="off"
                    onBlur={handleBlur}
                    value={values.login||''} />
                    <ErrorMessage
                    component="div"
                    name="login"
                    className="invalidEmail" />

                    <Field type="password" name="password" placeholder="*********"
                    className={touched.password && errors.password ? "error": null}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password||''} />
                    <ErrorMessage
                    component="div"
                    name="password"
                    className="invalidPassword" />
                    
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </Form>
            )}
        </Formik>

       
    )
}
