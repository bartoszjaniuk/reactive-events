import cuid from 'cuid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Segment, Header, Button } from 'semantic-ui-react';
import { createEvent } from '../../../app/redux/event/event.actions';
import { updateEvent } from '../../../app/redux/event/event.actions';
import TextAreaInput from '../../text-area-input/text-area-input';
import SelectInput from '../../select-input/select-input';
import TextInput from '../../text-input/text-input';
import DateInput from '../../date-input/date-input';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { categoryOptions } from '../../../app/api/categoryOptions';
const EventForm = ({ match, history }) => {
  const selectedEvent = useSelector(state =>
    state.event.events.find(e => e.id === match.params.id)
  );
  const initialFormValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    venue: '',
    date: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  });

  const dispatch = useDispatch();

  const handleFormSubmit = formInputs => {
    selectedEvent
      ? dispatch(updateEvent({ ...selectedEvent, ...formInputs }))
      : dispatch(createEvent({ ...formInputs, id: cuid(), hostedBy: 'Bob', attendees: [] }));
    history.push('/events');
  };

  return (
    <Segment clearing>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={values => handleFormSubmit(values)}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className="ui form">
            <Header sub color="purple" content="Event Details" />
            <TextInput name="title" placeholder="Event title" />
            <SelectInput name="category" placeholder="Event category" options={categoryOptions} />
            <TextAreaInput name="description" placeholder="Description" rows={3} />
            <Header sub color="purple" content="Event Location Details" />
            <TextInput name="city" placeholder="City" />
            <TextInput name="venue" placeholder="Venue" />
            <DateInput
              name="date"
              placeholderText="Event date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            />

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              floated="right"
              positive
              content="Submit"
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to="/events"
              type="submit"
              floated="right"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default EventForm;
