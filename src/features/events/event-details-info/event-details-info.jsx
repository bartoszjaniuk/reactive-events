import React from 'react';
import { Button, Grid, Icon, Segment } from 'semantic-ui-react';

const EventDetailsInfo = ({ event }) => {
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
            <p>{event.date}</p>
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
            <p>{event.venue}</p>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button color="purple" size="tiny" content="Show Map" />
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailsInfo;
