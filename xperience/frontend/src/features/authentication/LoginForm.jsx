import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Divider, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import { signin } from './authActions';
import { GoogleLogin } from 'react-google-login';
import { SIGN_UP_USER } from './authConstants';
import { useHistory } from 'react-router';

export default function LoginForm() {

    const dispatch = useDispatch();
    const history = useHistory();

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
                            <ErrorMessage name="email"> 
                                { msg => <Label basic color='red' style={{marginTop: 1}} >{msg}</Label> }
                            </ErrorMessage>
                            <Divider hidden />

                        <Field name='password' placeholder='Password' type='password' />
                            <ErrorMessage name="password"> 
                                { msg => <Label basic color='red' style={{marginTop: 1}} >{msg}</Label> }
                            </ErrorMessage>
                            <Divider hidden />
                        
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

                        <Divider horizontal>Or</Divider>

                        <GoogleLogin
                            clientId="92980069783-5l339n1i0e1t6ecrjvinbl0uoh8quts2.apps.googleusercontent.com"
                            render={(renderProps) => (
                            <Button onClick={renderProps.onClick} icon='google' 
                                fluid color='google plus' content='Login with Google' />
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