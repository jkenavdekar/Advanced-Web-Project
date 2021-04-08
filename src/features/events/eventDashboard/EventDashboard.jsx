import React, { useState } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import EventForm from '../EventForm/EventForm';
import EventList from './EventList';

import { sampleData } from '../../../app/api/sampleData';

export default function EventDashboard({formOpen, setFormOpen, selectEvent, selectedEvent}) {

    const [events, setEvents] = useState(sampleData);

    function handleCreateEvent(event) {

        setEvents([...events, event]);
    }

    function handleUpdateEvent(updatedEvent) {
        setEvents(events.map(evt => evt.id === updatedEvent.id ? updatedEvent : evt));
        selectEvent(null);
    }

    function handleDeleteevent(deleteEventID) {
        setEvents(events.filter(evt => evt.id !== deleteEventID));
    }

    return(
        <Grid>
            <GridColumn width={10}>
                <EventList 
                    events={events} 
                    selectEvent={selectEvent}
                    deleteEvent={handleDeleteevent}
                />
            </GridColumn>

            <GridColumn width={6}>
                {formOpen && <EventForm 
                    setFormOpen={setFormOpen} 
                    setEvents={setEvents} 
                    createEvent={handleCreateEvent}
                    selectedEvent={selectedEvent}
                    updateEvent={handleUpdateEvent}
                    key={selectedEvent ? selectedEvent.id : null}
                /> }
            </GridColumn>
        </Grid>
    )

}
