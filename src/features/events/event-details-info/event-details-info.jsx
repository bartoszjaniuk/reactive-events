import React from 'react';
import { Button, Grid, Icon, Segment } from 'semantic-ui-react';

const EventDetailsInfo = () => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon size="large" color="purple" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>Event Description</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon size="large" color="purple" name="calendar" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>Event Date</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon size="large" color="purple" name="marker" />
          </Grid.Column>
          <Grid.Column width={11}>
            <p>Event Venue</p>
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
