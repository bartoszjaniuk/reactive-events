import React from 'react';
import { Form, Segment, Header, Button } from 'semantic-ui-react';

const EventForm = ({ setFormOpen }) => {
  return (
    <Segment clearing>
      <Header content="Create new event" />
      <Form>
        <Form.Field>
          <input type="text" placeholder="Event Title"></input>
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Category"></input>
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Description"></input>
        </Form.Field>
        <Form.Field>
          <input type="text" placeholder="Venue"></input>
        </Form.Field>
        <Form.Field>
          <input type="date" placeholder="Date"></input>
        </Form.Field>
        <Button.Group attached="bottom">
          <Button type="submit" basic color="purple" content="Submit" />
          <Button
            type="submit"
            basic
            color="red"
            content="Cancel"
            onClick={() => setFormOpen(false)}
          />
        </Button.Group>
      </Form>
    </Segment>
  );
};

export default EventForm;
