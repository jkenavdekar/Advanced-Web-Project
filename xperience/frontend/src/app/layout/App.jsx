import React, { useEffect } from 'react';
import { Route, useLocation } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import AccountPage from '../../features/authentication/AccountPage';


import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/eventDetails/EventDetailedPage';
import EventForm from '../../features/events/EventForm/EventForm';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar';
import ModalManager from '../common/modals/ModalManager';
import PostForm from '../../features/events/EventForm/PostForm';
import { useDispatch } from 'react-redux';
import { loadEvents } from '../../features/events/eventActions';

function App() {

  const {key} = useLocation();

  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]); 

  return (
    <>
      <ModalManager/>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (

        <>
          <NavBar />
          <Container className='main'>
            <Route exact path='/events' component={EventDashboard} />
            <Route exact path='/posts' component={PostForm} />
            <Route path='/events/:id' component={EventDetailedPage} />
            <Route path={['/createEvent', '/manage/:id']} component={EventForm} key={key} />
            <Route path='/account' component={AccountPage} />
        </Container>
        
        </>
      )} />

    </>
  );
}

export default App;
