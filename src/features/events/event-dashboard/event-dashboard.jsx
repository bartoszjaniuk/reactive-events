import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../event-list/event-list';
import { useSelector } from 'react-redux';

const EventDashboard = () => {
  const { events } = useSelector(state => state.event);

  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <h3>Event Filters</h3>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default EventDashboard;
