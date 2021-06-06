import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Image, Item, Label } from 'semantic-ui-react';

const EventDetailsSidebar = ({ attendees, event, hostUid }) => {
  const { hostedBy, hostPhotoURL } = event;
  return (
    <>
      <Segment.Group>
        <Segment
          attached="top"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: 'none',
          }}
        >
          <Image src={hostPhotoURL || '/assets/user.png'} size="tiny" circular />
        </Segment>
        <Segment textAlign="center" style={{ borderTop: 'none' }}>
          Instruktor: {hostedBy}
        </Segment>

        <Segment textAlign="center" style={{ border: 'none' }} inverted color="purple">
          Liczba uczestników : {attendees.length}
        </Segment>
        <Segment attached>
          <Item.Group relaxed divided>
            {attendees.map(attende => (
              <Item
                as={Link}
                to={`/profile/${attende.id}`}
                key={attende.id}
                style={{ position: 'relative' }}
              >
                {hostUid === attende.id && (
                  <Label
                    style={{ position: 'absolute' }}
                    color="orange"
                    ribbon="right"
                    content="Host"
                  />
                )}
                <Item.Image circular size="tiny" src={attende.photoURL || '/assets/user.png'} />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <span>{attende.displayName}</span>
                  </Item.Header>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Segment>
      </Segment.Group>
    </>
  );
};

export default EventDetailsSidebar;
