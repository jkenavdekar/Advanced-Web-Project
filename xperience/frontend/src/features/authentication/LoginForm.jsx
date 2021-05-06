import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import { signin } from './authActions';

export default function LoginForm() {

    const dispatch = useDispatch();

    return (
        <ModalWrapper size='mini' header='Sign in to Xperince'>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema = { Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}

                onSubmit={ async (values, {setSubmitting, setErrors}) => {

                    try {
                        dispatch(signin(values));
                        //await signInWithEmail(values);
                        setSubmitting(false);
                        dispatch(closeModal());
                    }
                    catch(error){
                        setErrors({auth: 'username or password does not exist!'});
                        setSubmitting(false);
                    }
                }}
            >
                {({isSubmitting, isValid, dirty, errors}) => (

                    <Form className='ui form'>

                        <Field name='email' placeholder='Email Address' />
                            <ErrorMessage name='email' />

                        <Field name='password' placeholder='Password' type='password' />
                            <ErrorMessage name='email' />
                        
                        {errors.auth && <Label basic color='red' style={{marginBottom: 10}} content={errors.auth} />}

                        <Button 
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type='submit'
                            fluid
                            size='large'
                            color='teal'
                            content='Login'
                        />
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    )
}