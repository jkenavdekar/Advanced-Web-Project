import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import { signup } from './authActions';

export default function RegisterForm({history}) {

    const dispatch = useDispatch();

    return (
        <ModalWrapper size='mini' header='Register to Xperience'>
            <Formik
                initialValues={{displayName: '', email: '', password: ''}}

                validationSchema= { Yup.object({
                    displayName: Yup.string().required(), 
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}

                onSubmit={ async (values, {setSubmitting, setErrors}) => {

                    try {
                        dispatch(signup(values));
                        setSubmitting(false);
                        dispatch(closeModal());
                    }
                    catch(error) {
                        setErrors({auth: error.message});
                        setSubmitting(false);
                    }
                }}
            >
                {({isSubmitting, isValid, dirty, errors}) => (

                    <Form className='ui form'>

                        <Field name='displayName' placeholder='Your Name' />
                            <ErrorMessage name='displayName' />

                        <Field name='email' placeholder='Email Address' />
                            <ErrorMessage name='email' />

                        <Field name='password' placeholder='Password' type='password' />
                            <ErrorMessage name='password' />
                        
                        {errors.auth && <Label basic color='red' style={{marginBottom: 10}} content={errors.auth} />}

                        <Button 
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type='submit'
                            fluid
                            size='large'
                            color='teal'
                            content='Register'
                        />
                    </Form>
                    )}
            </Formik>
        </ModalWrapper>
    )
}