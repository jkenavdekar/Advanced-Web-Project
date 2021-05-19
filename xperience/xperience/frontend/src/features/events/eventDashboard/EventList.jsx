import React from 'react';
import EventListItem from './EventListItem';

export default function EventList({events, loading}) {
  return (
      <> 
        { events.map(event => (
          <EventListItem event={event} loading={loading} key={event._id} />
        ))}
      </>
  )
}