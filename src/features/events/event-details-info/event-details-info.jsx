import React, { useState } from 'react';
import { Button, Grid, Icon, Segment } from 'semantic-ui-react';
import format from 'date-fns/format';
import EventDetailsMap from '../event-details-map/event-details-map';

const EventDetailsInfo = ({ event }) => {
  const [mapOpen, setMapOpen] = useState(false);
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon size="large" color="purple" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{event.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon size="large" color="purple" name="calendar" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{format(event.date, 'MMMM d, yyyy h:mm a')}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon size="large" color="purple" name="street view" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>Max attendees: 18</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon size="large" color="purple" name="marker" />
          </Grid.Column>
          <Grid.Column width={11}>
            <p>{event.venue.address}</p>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              color="purple"
              size="tiny"
              content={mapOpen ? 'Hide Map' : 'Open Map'}
              onClick={() => setMapOpen(!mapOpen)}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {mapOpen && <EventDetailsMap latLng={event.venue.latLng} />}
    </Segment.Group>
  );
};

export default EventDetailsInfo;
