import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Divider, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import { signup } from './authActions';
import GoogleLogin from 'react-google-login';
import { SIGN_UP_USER } from './authConstants';

export default function RegisterForm({history}) {

    const dispatch = useDispatch();

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
        dispatch({ type: SIGN_UP_USER, payload: { result, token } });
        dispatch(closeModal());
        history.push('/events');
        }

        catch (error) {
            console.log(error);
        }
    }
    
    const googleError = () => alert('Google Sign In was unsuccessful');

    return (
        <ModalWrapper size='mini' header='Register to Xperience'>
            <Formik
                initialValues={{displayName: '', email: '', password: '', photoURL: '',}}

                validationSchema= { Yup.object({
                    displayName: Yup.string().required(), 
                    email: Yup.string().required().email(),
                    password: Yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
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
                            <Divider hidden />

                        <Field name='email' placeholder='Email Address' />
                            <ErrorMessage name='email' />
                            <Divider hidden />

                        <Field name='password' placeholder='Password' type='password' />
                            <ErrorMessage name='password' />
                            <Divider hidden />
                        
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

                        <Divider horizontal>Or</Divider>

                        <GoogleLogin
                            clientId="92980069783-5l339n1i0e1t6ecrjvinbl0uoh8quts2.apps.googleusercontent.com"
                            render={(renderProps) => (
                            <Button onClick={renderProps.onClick} icon='google' 
                                fluid color='google plus' content='SignUp with Google' />
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleError}
                            cookiePolicy="single_host_origin"
                        />
                    </Form>
                    )}
            </Formik>
        </ModalWrapper>
    )
}