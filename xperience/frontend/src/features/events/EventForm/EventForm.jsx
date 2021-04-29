import { Field, Formik, Form, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Confirm, FormField, Header, Loader, Segment} from 'semantic-ui-react';
import { listenToEvents } from '../eventActions';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export default function EventForm({match, history}) {


    const dispatch = useDispatch();

    const [confirmOpen, setConfirmOpen] = useState(false);

    const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id));

    const { loading, error } = useSelector((state) => state.async);

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

    async function handleCancelEvent(event) {
        setConfirmOpen(false);
        try {
         // await cancelEventToggle(event);
        } 
        catch (error) {
          toast.error(error.message);
        }
      }

/*
    useFirestoreDoc({
        query: () => listenToSingleEventFromFirestore(match.params.id),
        data: event => dispatch(listenToEvents([event])),
        deps: [match.params.id, dispatch],
        shouldExecute: !!match.params.id
      });
    */

    if(loading) return <Loader content='Loading your event...' /> 

    if (error) return <Loader content='Cannot find the document!' /> 


    return(
        <Segment clearing>
            <Header content={selectedEvent ? 'Edit my event' : 'Create new event'} />

                <Formik initialValues={initialValues} 
                    validationSchema={validationSchema} 
                    onSubmit={ async (values, { setSubmitting }) => {

                        try {
                            console.log(values);
                           // selectedEvent ? await updateEventInFirestore(values) : await addEventToFirestore(values);
                            setSubmitting(false);
                            history.push('/events');
                        }

                        catch(error) {
                            toast.error(error.message);
                            setSubmitting(false);
                        }
                }} >

                    {({ isSubmitting, dirty, isValid }) => (

                        <Form className='ui form' >
                        <FormField>
                            <Field name='title' placeholder='Event title' />
                            <ErrorMessage name='title' />
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

                        {selectedEvent && ( <Button type='button' floated='left'
                                color= {selectedEvent.isCancelled ? 'green' : 'red'}
                                content= {selectedEvent.isCancelled ? 'Reactivate event': 'Cancel Event'}
                                onClick= { () => setConfirmOpen(true) } />
                            )}

                        </Form>
                    )}
                    
                </Formik>

                <Confirm content= { selectedEvent?.isCancelled ? 'Do you want to reactivate the event?' : 
                    'This will cancel the event - are you sure?' }
                    open={confirmOpen}
                    onCancel={() => setConfirmOpen(false)}
                    onConfirm={() => handleCancelEvent(selectedEvent)} />
        </Segment>
    
    )
}