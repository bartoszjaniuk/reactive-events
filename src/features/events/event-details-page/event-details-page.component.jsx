import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailsHeader from '../event-details-header/event-details-header';
import EventDetailsSidebar from '../event-details-sidebar/event-details-sidebar';
import EventDetailsInfo from '../event-details-info/event-details-info';
import EventDetailsChat from '../event-details-chat/event-details-chat';
import { useSelector } from 'react-redux';

const EventDetailsPage = ({ match }) => {
  const event = useSelector(state => state.event.events.find(e => e.id === match.params.id));
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailsHeader event={event} />
        <EventDetailsInfo event={event} />
        <EventDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailsSidebar event={event} attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default EventDetailsPage;
