import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventForm from '../event-form/event.form';
import EventList from '../event-list/event-list';
import { sampleData } from '../../../app/api/sampleData';

const EventDashboard = ({ formOpen, setFormOpen, selectedEvent, selectEvent }) => {
  const [events, setEvents] = useState(sampleData);

  const handleCreateEvent = event => {
    setEvents([...events, event]);
  };

  const handleUpdateEvent = updatedEvent => {
    setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
    selectEvent(null);
  };

  const handleDeleteEvent = eventId => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} selectEvent={selectEvent} deleteEvent={handleDeleteEvent} />
        </Grid.Column>
        <Grid.Column width={6}>
          {formOpen && (
            <EventForm
              setFormOpen={setFormOpen}
              setEvents={setEvents}
              createEvent={handleCreateEvent}
              selectedEvent={selectedEvent}
              updatedEvent={handleUpdateEvent}
              key={selectedEvent ? selectedEvent.id : null}
            />
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default EventDashboard;
