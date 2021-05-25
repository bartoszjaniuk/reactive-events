import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailsHeader from '../event-details-header/event-details-header';
import EventDetailsSidebar from '../event-details-sidebar/event-details-sidebar';
import EventDetailsInfo from '../event-details-info/event-details-info';
import EventDetailsChat from '../event-details-chat/event-details-chat';

const EventDetailsPage = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailsHeader />
        <EventDetailsInfo />
        <EventDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailsSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default EventDetailsPage;
