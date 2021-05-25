import React from 'react';
import EventListItem from '../event-list-item/event-list-item';

const EventList = ({ events }) => {
  return (
    <>
      {events.map(event => (
        <EventListItem key={event.id} event={event} />
      ))}
    </>
  );
};

export default EventList;
