import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { Button, FormField } from 'semantic-ui-react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addComment } from '../eventActions';

export default function EventDetailedChatForm({ eventId }) {

    const user = JSON.parse(localStorage.getItem('profile'));

    const chat = [{ displayName:'', description:'', date: new Date() }];

    const dispatch = useDispatch();

    return (
        <Formik
        initialValues={{ comment:'' }}

        validationSchema={Yup.object({
            comment: Yup.string().required()
        })}

        onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
            chat[0].displayName = user.result.displayName;
            chat[0].description = values.comment;
            console.log(chat);
            dispatch(addComment(eventId, chat));
            resetForm();
            } 
            catch (error) {
            toast.error(error.message);
            } 
            finally {
            setSubmitting(false);
            }
        }}
        >
        {({ isSubmitting }) => (

            <Form className='ui form'>
                <FormField>
                    <Field name='comment' placeholder='Please enter your comment here' />
                    <ErrorMessage name='comment' />
                </FormField>
                <Button loading={isSubmitting} icon='edit' primary type='submit' content='Add reply' />
            </Form>
        )}
        </Formik>
    );
}