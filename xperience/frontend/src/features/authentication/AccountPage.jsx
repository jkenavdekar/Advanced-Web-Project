import React from 'react';
import { Segment, Header, Button, Label, Divider } from 'semantic-ui-react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { updatePass } from './authActions';
import { useHistory } from 'react-router';

export default function AccountPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <Segment>

            <Header dividing size='large' content='Account' />

                <Header color='teal' sub content='Change Password' />

                <Formik initialValues={{ newPassword1: '', newPassword2: '' }}
                    validationSchema= {Yup.object({
                        newPassword1: Yup.string().required('Password is required'),
                        newPassword2: Yup.string().oneOf([Yup.ref('newPassword1'), null], 'Passwords do not match'),
                        })}

                    onSubmit= {async (values, {setSubmitting, setErrors}) => {
                        try {
                            const user = JSON.parse(localStorage.getItem('profile'));
                            console.log(user.result._id);
                            console.log(values.newPassword2);
                            dispatch(updatePass(user.result._id, values.newPassword2));
                            setSubmitting(false);
                            history.push('/events');
                        }
                        catch(error) {
                            setErrors({auth: error.message});
                            setSubmitting(false);
                        }
                    }}
                >
                
                {({ errors, isSubmitting, isValid, dirty }) => (
                    <Form className='ui form'>
                        
                        <Field name='newPassword1' type='text' placeholder='New Password'  />
                            <ErrorMessage name='newPassword1' />
                            <Divider hidden />

                        <Field name='newPassword2' type='password' placeholder='Confirm Password' />
                            <ErrorMessage name='newPassword2' />
                            <Divider hidden />
                    
                        {errors.auth && ( <Label basic color='red' style={{ marginBottom: 10 }} content={errors.auth} /> )}

                        <Button style={{display: 'block'}} type='submit' disabled={!isValid || isSubmitting || !dirty} 
                            loading={isSubmitting} size='large' positive content='Update password' />

                    </Form>
                )}

                </Formik>
        </Segment>
    );
}