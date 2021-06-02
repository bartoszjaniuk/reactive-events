import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, List, Segment, Label } from 'semantic-ui-react';
import EventListMember from '../event-list-member/event-list-member';
import format from 'date-fns/format';
import { deleteEventFromFirestore } from '../../../app/firebase/firestoreService';

const EventListItem = ({ event }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description>Hosted by {event.hostedBy} </Item.Description>
              {event.isCancelled && (
                <Label
                  style={{ top: '-20px' }}
                  ribbon="right"
                  color="red"
                  content="This event has been cancelled"
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment>
        <span>
          <Icon name="clock" /> {format(event.date, 'MMMM d, yyyy h:mm a')}
          <Icon name="marker" /> {event.venue.address}
        </span>
      </Segment>

      <Segment secondary>
        <List horizontal>
          {event.attendees.map(attende => (
            <EventListMember attende={attende} key={attende.id} />
          ))}
        </List>
      </Segment>

      <Segment clearing>
        <div>{event.description}</div>
        <Button
          floated="right"
          content="Delete"
          className="view"
          onClick={() => deleteEventFromFirestore(event.id)}
        />
        <Button
          as={Link}
          to={`/events/${event.id}`}
          floated="right"
          content="View"
          className="view"
        />
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;
