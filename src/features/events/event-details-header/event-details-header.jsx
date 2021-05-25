import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';

const overlayStyle = {
  filter: 'brightness(70%)',
};

const eventContentStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
  color: 'white',
};

const EventDetailsHeader = ({ event }) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: 0 }}>
        <Image src={'/assets/events/crossfit.jpg'} fluid style={overlayStyle} />
        <Segment basic style={eventContentStyle} textAlign="center">
          <Item.Group>
            <Item.Content>
              <Header size="huge" content={event.title} style={{ color: 'white' }} />
            </Item.Content>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment attached="bottom">
        <Button content="Cancel my place" />
        <Button color="teal" content="Join this event" />
        <Button
          as={Link}
          to={`/manage/${event.id}`}
          color="orange"
          content="Manage event"
          floated="right"
        />
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailsHeader;
