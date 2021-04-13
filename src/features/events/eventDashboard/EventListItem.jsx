import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, List, Segment } from 'semantic-ui-react';
import EventAttendee from './EventAttendee';
import {deleteEvent} from '../eventActions'

export default function EventListItem({event}) {

  const dispatch = useDispatch();

  return (
    <Segment.Group>
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image size='tiny' circular src={event.hostPhotoURL} />
          <Item.Content>
            <Item.Header content={event.title} />
            <Item.Description>
                Hosted by {event.hostedBy}
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>

    <Segment clearing>
      <span>
        <Icon name='clock' /> {event.date}
        <Icon name='marker' /> {event.venue}
      </span>
    </Segment>

    <Segment secondary clearing>
      <List horizontal >
        {event.attendees.map((attendee) => (
          <EventAttendee key={attendee.id} attendee={attendee} />
        ))}
      </List>
    </Segment>

    <Segment clearing>
      <div> {event.description} </div>
      <Button onClick={() => dispatch(deleteEvent(event.id))} color='red' floated='right' content='Delete'/>
      <Button as={Link} to={`/events/${event.id}`} color='teal' floated='right' content='View'/>
    </Segment>

    
  </Segment.Group>
  )
}