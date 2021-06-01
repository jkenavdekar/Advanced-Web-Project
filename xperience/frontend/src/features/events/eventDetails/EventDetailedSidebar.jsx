import React from 'react';
import {Segment, Item} from 'semantic-ui-react';

export default function EventDetailedSidebar({event}) {

    return(
        <>
            <Segment
                textAlign="center"
                style={{border: 'none'}}
                attached="top"
                secondary
                inverted
                color="teal"
            >
                {event?.attendees.length} {event?.attendees.length > 1 ? 'People' : 'Person'} Going
            </Segment>

            <Segment attached>
                <Item.Group relaxed divided>

                    {event?.attendees.map(attendee => (

                        <Item key={attendee?.id} style={{position: 'relative'}}>
                        <Item.Image size="tiny" src={'/assets/user.png'} />
                        <Item.Content verticalAlign="middle">
                            <Item.Header as="h3">
                                <span> {attendee} </span>
                            </Item.Header>
                        </Item.Content>
                        </Item>

                    ))}
                    

                </Item.Group>
            </Segment>
        </>
    );
}