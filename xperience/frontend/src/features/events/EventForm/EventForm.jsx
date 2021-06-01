import { Field, Formik, Form, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Confirm, FormField, Header, Segment} from 'semantic-ui-react';
import { createPost, toggleEvent, updatePost } from '../eventActions';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import * as api from '../../../api/index.js';

export default function EventForm({match, history}) {


    const dispatch = useDispatch();

    const [confirmOpen, setConfirmOpen] = useState(false);

    const selectedEvent = useSelector(state => state.event.events.find(e => e._id === match.params.id));
    //console.log(selectedEvent?.title);

    //const { loading, error } = useSelector((state) => state.async);

    var eSelect = null;

    async function handle() {
        const { data } = await api.fetchPosts();
        data.forEach(p => {
            if(p.title === selectedEvent?.title) {
                //console.log(p._id);
                eSelect = p._id;
            }
           });
    }
    handle();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const initialValues = selectedEvent ?? {

        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: '',
        time: '',
        hostUid: user.result._id,
        hostedBy: user.result.displayName,
        hostPhotoURL: user?.result?.photoURL || '/assets/user.png',
        isCancelled: false
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
          dispatch(toggleEvent(event._id, !event.isCancelled));
        } 
        catch (error) {
          toast.error(error.message);
        }
      }

    

    return(
        <Segment clearing>
            <Header content={selectedEvent ? 'Edit my event' : 'Create new event'} />

                <Formik initialValues={initialValues} 
                    validationSchema={validationSchema} 
                    onSubmit={ async (values, { setSubmitting }) => {

                        try {
                            console.log(values);
                            selectedEvent ? dispatch(updatePost(eSelect, values)) : dispatch(createPost(values));
                            setSubmitting(false);
                            history.push('/events');
                            document.location.reload();
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
                            <Field name='city' placeholder='City' option />
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

                        <FormField>
                            <Field name='time' placeholder='Event Time' type='time' />
                        </FormField>

                        <Button 
                        loading={isSubmitting} 
                        disabled={!isValid || !dirty || isSubmitting} 
                        type='submit' floated='right' positive content='Submit' />

                        <Button disabled={isSubmitting} as={Link} to='/' type='submit' floated='right' content='Cancel' />

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