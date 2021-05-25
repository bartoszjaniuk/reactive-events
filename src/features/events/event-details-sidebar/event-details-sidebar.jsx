import React from 'react';
import { Segment, Image, Item } from 'semantic-ui-react';

const EventDetailsSidebar = () => {
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
          <Image src={'/assets/user.png'} size="tiny" circular />
        </Segment>
        <Segment textAlign="center" style={{ borderTop: 'none' }}>
          Instruktor: Bartol
        </Segment>

        <Segment textAlign="center" style={{ border: 'none' }} inverted color="purple">
          Liczba uczestników : 2
        </Segment>
        <Segment attached>
          <Item.Group relaxed divided>
            <Item style={{ position: 'relative' }}>
              <Item.Image circular size="tiny" src="/assets/user.png" />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <span>Tom</span>
                </Item.Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment attached>
          <Item.Group relaxed divided>
            <Item style={{ position: 'relative' }}>
              <Item.Image circular size="tiny" src="/assets/user.png" />
              <Item.Content verticalAlign="middle">
                <Item.Header as="h3">
                  <span>Jerry</span>
                </Item.Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment.Group>
    </>
  );
};

export default EventDetailsSidebar;
