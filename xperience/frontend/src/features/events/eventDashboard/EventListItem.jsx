import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, List, Loader, Segment } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { deletePost, updateCount } from '../eventActions';
import { toast } from 'react-toastify';

export default function EventListItem({event, loading}) {

  const dispatch = useDispatch();

  if(loading || !event) return <Loader content='Loading your event...' />

  const user = JSON.parse(localStorage.getItem('profile'));
  const c = JSON.parse(localStorage.getItem('Counter'));

  console.log(c);

  if(event?.count && user?.result._id === event?.hostUid && c === null ) {
    toast.error(`${event.count} users commented on your event`);
    localStorage.setItem("Counter", 1);
  }

  return (
    <Segment.Group>
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image size='tiny' circular src={ event?.hostPhotoURL || 'https://randomuser.me/api/portraits/women/22.jpg'} />
          <Item.Content>
            <Item.Header content={event.title} />
            <Item.Description>
                Hosted by {event.hostedBy}
            </Item.Description>
            {event?.isCancelled && ( 
              <Label style={{top: '-40px'}} ribbon='right' color='red' content='This event has been cancelled' />
              )}
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>

    <Segment clearing>
      <span>
        <Icon name='clock' /> {event.date}  {/* { ' | ' + event?.time + ' '} */}
        <Icon name='marker' /> {event.venue}
      </span>
    </Segment>

    <Segment secondary clearing>
      <List horizontal >
        {/*
        {event.attendees.map((attendee) => (
          <EventAttendee key={attendee.id} attendee={attendee} />
        ))}
        */}
      </List>
    </Segment>

    <Segment clearing>
      <div> {event.description} </div>
      <Button as={Link} to={`/events/${event._id}`} color='teal' floated='right' content='View'/>
    </Segment>

    
  </Segment.Group>
  )
}