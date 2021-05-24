import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventForm from '../event-form/event.form';
import EventList from '../event-list/event-list';
import { sampleData } from '../../../app/api/sampleData';

const EventDashboard = ({ formOpen, setFormOpen }) => {
  const [events, setEvents] = useState(sampleData);
  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} />
        </Grid.Column>
        <Grid.Column width={6}>{formOpen && <EventForm setFormOpen={setFormOpen} />}</Grid.Column>
      </Grid>
    </div>
  );
};

export default EventDashboard;
