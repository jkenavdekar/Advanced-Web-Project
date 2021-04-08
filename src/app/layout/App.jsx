import React, {useState} from 'react';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';

function App() {

  const [formOpen, setFormOpen] = useState(false);

  const [selectEvent, setSelectEvent] = useState(null);

  function handleCreateFormOpen() {
    setSelectEvent(null);
    setFormOpen(true);

  }

  function handleSelectEvent(event) {
    setSelectEvent(event);
    setFormOpen(true);

  }

  return (
    <>
      <NavBar setFormOpen={handleCreateFormOpen} />
      <Container className='main'>
        <EventDashboard 
          formOpen={formOpen} 
          setFormOpen={setFormOpen}
          selectEvent={handleSelectEvent}
          selectedEvent={selectEvent}
        />
      </Container>
    </>
  );
}

export default App;
