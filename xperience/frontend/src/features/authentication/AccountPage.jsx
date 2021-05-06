import React from 'react';
import { Segment, Header, Button, Label } from 'semantic-ui-react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

export default function AccountPage() {

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
                            //await updateUserPassword(values);
                            setSubmitting(false);
                        }
                        catch(error) {
                            setErrors({auth: error.message});
                            setSubmitting(false);
                        }
                    }}
                >
                
                {({ errors, isSubmitting, isValid, dirty }) => (
                    <Form className='ui form'>
                        
                        <Field name='newPassword1' type='password' placeholder='New Password' />
                            <ErrorMessage name='newPassword1' />

                        <Field name='newPassword2' type='password' placeholder='Confirm Password' />
                            <ErrorMessage name='newPassword1' />
                    
                        {errors.auth && ( <Label basic color='red' style={{ marginBottom: 10 }} content={errors.auth} /> )}

                        <Button style={{display: 'block'}} type='submit' disabled={!isValid || isSubmitting || !dirty} 
                            loading={isSubmitting} size='large' positive content='Update password' />

                    </Form>
                )}

                </Formik>
        </Segment>
    );
}