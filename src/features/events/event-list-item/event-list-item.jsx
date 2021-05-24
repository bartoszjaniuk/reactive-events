import React from 'react';
import { Button, Icon, Item, List, Segment } from 'semantic-ui-react';
import EventListMember from '../event-list-member/event-list-member';

const EventListItem = ({ event, selectEvent, deleteEvent }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description>Hosted by {event.hostedBy} </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Segment>
        <span>
          <Icon name="clock" /> {event.date}
          <Icon name="marker" /> {event.venue}
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
          onClick={() => deleteEvent(event.id)}
        />
        <Button
          floated="right"
          content="View"
          className="view"
          onClick={() => selectEvent(event)}
        />
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;
