import cuid from 'cuid';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormField, Header, Segment} from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import * as Yup from 'yup';

export default function EventForm({match, history}) {


    const dispatch = useDispatch();

    const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id));

    const initialValues = selectedEvent ?? {

        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: ''
    }

    const validationSchema = Yup.object({
        title: Yup.string().required(),
        category: Yup.string().required(),
        description: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
        date: Yup.string().required()

    })


    return(
        <Segment clearing>
            <Header content={selectedEvent ? 'Edit my event' : 'Create new event'} />
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={values => {
                    selectedEvent ? dispatch(updateEvent({...selectedEvent, ...values})) :
                    dispatch(createEvent({
                        ...values, 
                        id: cuid(), 
                        hostedBy: 'Olivia', 
                        attendees: [], 
                        hostPhotoURL: '/assets/user.png'
                    }));
            
                    history.push('/events');
                }} >

                    {({ isSubmitting, dirty, isValid }) => (

                        <Form className='ui form' >
                        <FormField>
                            <Field name='title' placeholder='Event title' />
                            <ErrorMessage name='title' />
                        </FormField>

                        <FormField>
                            <Field name='category' placeholder='Category' as='select'>
                                <option value="travel">Travel</option>
                                <option value="drinks">Drinks</option>
                                <option value="food">Food</option>
                                <option value="music">Music</option>
                                <option value="culture">Culture</option>
                                <option value="film">Film</option>
                            </Field>
                            <ErrorMessage name='category' />
                        </FormField>

                        <FormField>
                            <Field name='description' placeholder='Description' as='textarea' />
                            <ErrorMessage name='description' />
                        </FormField>

                        <FormField>
                            <Field name='city' placeholder='City' />
                            <ErrorMessage name='city' />
                        </FormField>

                        <FormField>
                            <Field name='venue' placeholder='Venue' />
                            <ErrorMessage name='venue' />
                        </FormField>

                        <FormField>
                            <Field name='date' placeholder='Event Date' type='date' />
                            <ErrorMessage name='date' />
                        </FormField>

                        <Button 
                        loading={isSubmitting} 
                        disabled={!isValid || !dirty || isSubmitting} 
                        type='submit' floated='right' positive content='Submit' />

                        <Button disabled={isSubmitting} as={Link} to='/events' type='submit' floated='right' content='Cancel' />

                        </Form>
                    )}
                    
                </Formik>
        </Segment>
    
    )
}