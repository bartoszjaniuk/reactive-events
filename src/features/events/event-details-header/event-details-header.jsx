import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';

const overlayStyle = {
  filter: 'brightness(70%)',
};

const eventContentStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  color: 'white',
};

const EventDetailsHeader = () => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: 0 }}>
        <Image src={'/assets/events/crossfit.jpg'} fluid style={overlayStyle} />
        <Segment basic style={eventContentStyle}>
          <Item.Group>
            <Item.Content>
              <Header size="huge" content="Event Title" style={{ color: 'white' }} />
              <p>Event date</p>
              <p>Max number attendees</p>
              <p>Hosted by Bartol</p>
            </Item.Content>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment attached="bottom">
        <Button content="Cancel my place" />
        <Button color="teal" content="Join this event" />
        <Button as={Link} to={`/manage/`} color="orange" content="Manage event" floated="right" />
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailsHeader;
