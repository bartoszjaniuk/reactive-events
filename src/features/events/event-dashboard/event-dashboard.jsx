import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../event-list/event-list';
import { sampleData } from '../../../app/api/sampleData';

const EventDashboard = () => {
  const [events, setEvents] = useState(sampleData);

  // const handleCreateEvent = event => {
  //   setEvents([...events, event]);
  // };

  // const handleUpdateEvent = updatedEvent => {
  //   setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
  // };

  const handleDeleteEvent = eventId => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} deleteEvent={handleDeleteEvent} />
        </Grid.Column>
        <Grid.Column width={6}>
          <h3>Event Filters</h3>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default EventDashboard;
