import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import { registerInFirebase } from '../../app/firestore/firebaseService';
import { signInUser } from './authActions';

export default function RegisterForm() {

    const dispatch = useDispatch();

    return (
        <ModalWrapper size='mini' header='Register to Xperience'>
            <Formik
                initialValues={{displayName: '', email: '', password: ''}}
                validationSchema={Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required()
                })}

                onSubmit={ (values, {setSubmitting}) => {
                    dispatch(signInUser(values))
                    setSubmitting(false)
                    dispatch(closeModal())
                }}
            >
                {({isSubmitting, isValid, dirty}) => (

                    <Form className='ui form'>

                        <Field name='email' placeholder='Email Address' />
                            <ErrorMessage name='email' />

                        <Field name='password' placeholder='Password' type='password' />
                            <ErrorMessage name='email' />
                        
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