import cuid from 'cuid';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Segment, Header, Button } from 'semantic-ui-react';

const EventForm = ({ setFormOpen, setEvents, createEvent, selectedEvent, updatedEvent }) => {
  const initialFormValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    venue: '',
    date: '',
  };
  const [formInputs, setFormInputs] = useState(initialFormValues);

  const handleFormSubmit = () => {
    selectedEvent
      ? updatedEvent({ ...selectedEvent, ...formInputs })
      : createEvent({ ...formInputs, id: cuid(), hostedBy: 'Bob', attendees: [] });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  return (
    <Segment clearing>
      <Header content={selectedEvent ? 'Edit the event' : 'Create new event'} />
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <input
            type="text"
            placeholder="Event Title"
            onChange={e => handleInputChange(e)}
            value={formInputs.title}
            name="title"
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Category"
            onChange={e => handleInputChange(e)}
            value={formInputs.category}
            name="category"
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Description"
            onChange={e => handleInputChange(e)}
            value={formInputs.description}
            name="description"
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Venue"
            onChange={e => handleInputChange(e)}
            value={formInputs.venue}
            name="venue"
          />
        </Form.Field>
        <Form.Field>
          <input
            type="date"
            placeholder="Date"
            onChange={e => handleInputChange(e)}
            value={formInputs.date}
            name="date"
          />
        </Form.Field>
        <Button.Group attached="bottom">
          <Button type="submit" basic color="purple" content="Submit" />
          <Button type="submit" basic color="red" content="Cancel" as={Link} to="/events" />
        </Button.Group>
      </Form>
    </Segment>
  );
};

export default EventForm;
