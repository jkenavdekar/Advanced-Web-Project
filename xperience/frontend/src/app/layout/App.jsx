import React, { useEffect } from 'react';
import { Route, useLocation } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import AccountPage from '../../features/authentication/AccountPage';


import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/eventDetails/EventDetailedPage';
import EventForm from '../../features/events/EventForm/EventForm';
import NavBar from '../../features/nav/NavBar';
import ModalManager from '../common/modals/ModalManager';
import { useDispatch } from 'react-redux';
import { loadEvents } from '../../features/events/eventActions';
import ProfilePage from '../../features/profile/ProfilePage';
import PhotosTab from '../../features/profile/PhotoTab';

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
      <NavBar />
      <Container className='main'>

      <Route exact path='/' component={EventDashboard} />
      </Container>

      <Route path={'/(.+)'} render={() => (

        <>
          <NavBar />
          <Container className='main'>
            <Route path='/:id' component={EventDetailedPage} />
            <Route path={['/createEvent', '/manage/:id']} component={EventForm} key={key} />
            <Route path='/account' component={AccountPage} />
            <Route path='/profile/:id' component={ProfilePage} />
            <Route path='/profile/photo/:id' component={PhotosTab} />
        </Container>
        
        </>
      )} />

    </>
  );
}

export default App;
