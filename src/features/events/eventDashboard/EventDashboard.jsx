import React, { useEffect } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import EventList from './EventList';
import { useDispatch, useSelector } from 'react-redux';
import EventFilters from './EventFilters';
import { dataFromSnapshot, getEventsFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToEvents } from '../eventActions';
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../../../app/async/asyncReducer';

export default function EventDashboard() {

    const dispatch = useDispatch();
    const {events} = useSelector(state => state.event);

    useEffect(() => {
        dispatch(asyncActionStart())
        const unsubscribe = getEventsFromFirestore({

            next: snapshot => {dispatch(listenToEvents(snapshot.docs.map(docSnapshot => dataFromSnapshot(docSnapshot))));
            dispatch(asyncActionFinish()) },

            error: error => dispatch(asyncActionError(error)),

            complete: () => console.log('hidden')
        })

        return unsubscribe
    }, [dispatch])

    return(
        <Grid>
            <GridColumn width={10}>
                <EventList events={events} />
            </GridColumn>

            <GridColumn width={6}>
                <EventFilters />
            </GridColumn>
        </Grid>
    )

}
