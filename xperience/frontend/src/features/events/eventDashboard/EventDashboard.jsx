import React, { useEffect, useState } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import EventList from './EventList';
import { useDispatch, useSelector } from 'react-redux';
import EventFilters from './EventFilters';
import { listenToEventsFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToEvents, loadEvents } from '../eventActions';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import EventListItem from './EventListItem';

export default function EventDashboard() {

    const dispatch = useDispatch();
    const {events} = useSelector((state) => state.event);
    const {loading} = useSelector((state) => state.async);

    const [filterEvent, setfilterEvent] = useState(new Map([
        ['startDate', new Date()],
        ['filter', 'all']
    ]));

    function handlefilterEvent(key, value) {
        setfilterEvent(new Map(filterEvent.set(key, value)))
    }

    
    useFirestoreCollection({
        query: () => listenToEventsFromFirestore(),
        data: events => dispatch(listenToEvents(events)),
        deps: [dispatch]
    })
    
    
    //console.log(events);
   
    return(
        <Grid>
            <GridColumn width={10}>
                <EventList events={events} />
                {/*
                {events.map((post) => (
                    <EventListItem event={post} key={post._id} />
                ))}
                */}
            </GridColumn>

            <GridColumn width={6}>
                <EventFilters filterEvent={filterEvent} setfilterEvent={handlefilterEvent} loading={loading} />
            </GridColumn>
        </Grid>
    )

}
