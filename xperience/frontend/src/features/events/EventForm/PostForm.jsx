import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormField, Header, Segment } from 'semantic-ui-react';
import { createPost } from '../eventActions';

export default function EventForm({history}) {


    const dispatch = useDispatch();

    const [postData, setPostData] = useState({

        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: ''
    });

    return(
        <Segment clearing>
            <Header content={'Create new event'} />

                <Formik initialValues={postData} onSubmit={ async (values, { setSubmitting }) => {

                        try {
                            dispatch(createPost(values));
                            setSubmitting(false);
                            history.push('/events');
                        }

                        catch(error) {
                            console.log(error);
                            setSubmitting(false);
                        }
                }} >

                    {({ isSubmitting, dirty, isValid }) => (

                        <Form className='ui form' >
                        <FormField>
                            <Field name='title' placeholder='Event title' />
                        </FormField>

                        <FormField>
                            <Field name='category' placeholder='Category' as='select'>
                                <option value="None">None</option>
                                <option value="travel">Travel</option>
                                <option value="drinks">Drinks</option>
                                <option value="food">Food</option>
                                <option value="music">Music</option>
                                <option value="culture">Culture</option>
                                <option value="film">Film</option>
                            </Field>
                        </FormField>

                        <FormField>
                            <Field name='description' placeholder='Description' as='textarea' />
                        </FormField>

                        <FormField>
                            <Field name='city' placeholder='City' />
                        </FormField>

                        <FormField>
                            <Field name='venue' placeholder='Venue' />
                        </FormField>

                        <FormField>
                            <Field name='date' placeholder='Event Date' type='date' />
                        </FormField>

                        <Button 
                        loading={isSubmitting} 
                        disabled={!isValid || !dirty || isSubmitting} 
                        type='submit' floated='right' positive content='Submit' />

                        </Form>
                    )}
                    
                </Formik>
        </Segment>
    
    )
}