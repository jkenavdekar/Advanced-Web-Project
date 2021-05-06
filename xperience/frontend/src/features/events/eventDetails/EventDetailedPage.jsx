import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Loader } from 'semantic-ui-react';
import { listenToSingleEventFromFirestore } from '../../../app/firestore/firestoreService';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToEvents, loadEvents } from '../eventActions';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';

export default function EventDetailedPage({match}) {

    const event = useSelector(state => state.event.events.find(e => e._id === match.params.id));

    const { loading, error } = useSelector((state) => state.async);

    const user = JSON.parse(localStorage.getItem('profile'));

    const isHost = event?.hostUid === user?.result._id;

    const isGoing = event?.attendees?.some((a) => a === user?.result.displayName);
    //console.log(event.attendees);

    /*

    useFirestoreDoc({
        query: () => listenToSingleEventFromFirestore(match.params.id),
        data: (event) => dispatch(listenToEvents([event])),
        deps: [match.params.id, dispatch],
      });

    
    */
    if(loading || !event) return <Loader content='Loading your event...' /> 

    if (error) return <Loader content='Cannot find the document!' /> 


    return(
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event} isHost={isHost} isGoing={isGoing} />
                <EventDetailedInfo event={event} />
                {/* <EventDetailedChat /> */}
            </Grid.Column>

            <Grid.Column width={6}>
                <EventDetailedSidebar attendees={event?.attendees} />
            </Grid.Column>
        </Grid>
    )
}