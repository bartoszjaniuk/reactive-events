/* global google */

import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {Segment, Header, Button, Confirm} from 'semantic-ui-react';
import {listenToSelectedEvent} from '../../../app/redux/event/event.actions';

import TextAreaInput from '../../form-inputs/text-area-input/text-area-input';
import SelectInput from '../../form-inputs/select-input/select-input';
import TextInput from '../../form-inputs/text-input/text-input';
import DateInput from '../../form-inputs/date-input/date-input';
import * as Yup from 'yup';
import {Formik, Form} from 'formik';
import {categoryOptions} from '../../../app/api/categoryOptions';
import CustomPlaceInput from '../../form-inputs/custom-place-input/custom-place-input';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import {
  addEventToFirestore,
  cancelEventToggle,
  listenToEventFromFirestore,
  updateEventInFirestore,
} from '../../../app/firebase/firestoreService';
import EventListItemPlaceholder from '../event-list-item-placeholder/event-list-item-placeholder';
const EventForm = ({match, history}) => {
  const dispatch = useDispatch();
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const {loading, error} = useSelector(state => state.async);
  const {selectedEvent} = useSelector(state => state.event);
  const initialFormValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: {
      address: '',
      latLng: null,
    },
    venue: {
      address: '',
      latLng: null,
    },
    date: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.object().shape({
      address: Yup.string().required('City is required'),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required('Venue is required'),
    }),
    date: Yup.string().required(),
  });

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    firestoreQuery: () => listenToEventFromFirestore(match.params.id),
    data: event => dispatch(listenToSelectedEvent(selectedEvent)),
    deps: [match.params.id, dispatch],
  });

  const handleCancelToggle = async event => {
    setConfirmOpen(false);
    setLoadingCancel(true);
    try {
      await cancelEventToggle(event);
      setLoadingCancel(false);
    } catch (error) {
      setLoadingCancel(true);
      console.log(error.message);
    }
  };

  // const handleFormSubmit = async formInputs => {
  //   try {
  //     selectedEvent
  //       ? await updateEventInFirestore(formInputs)
  //       : await addEventToFirestore(formInputs);
  //     setSubmitting(false);
  //     history.push('/events');
  //   } catch (error) {
  //     console.log(error.message);
  //     setSubmitting(false);
  //   }
  // };

  if (loading) return <EventListItemPlaceholder />;
  if (error) return <Redirect to="/error" />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={async (formInputs, {setSubmitting}) => {
          try {
            selectedEvent
              ? await updateEventInFirestore(formInputs)
              : await addEventToFirestore(formInputs);
            setSubmitting(false);
            history.push('/events');
          } catch (error) {
            console.log(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({isSubmitting, dirty, isValid, values}) => (
          <Form className="ui form">
            <Header sub color="purple" content="Event Details" />
            <TextInput name="title" placeholder="Event title" />
            <SelectInput name="category" placeholder="Event category" options={categoryOptions} />
            <TextAreaInput name="description" placeholder="Description" rows={3} />
            <Header sub color="purple" content="Event Location Details" />
            <CustomPlaceInput name="city" placeholder="City" />
            <CustomPlaceInput
              disabled={!values.city.latLng}
              name="venue"
              placeholder="Venue"
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types: ['establishment'],
              }}
            />
            {/* <TextInput name="venue" placeholder="Venue" /> */}
            <DateInput
              name="date"
              placeholderText="Event date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm a"
            />

            {selectedEvent && (
              <Button
                loading={loadingCancel}
                // disabled={!isValid || !dirty || isSubmitting}
                type="button"
                floated="left"
                color={selectedEvent.isCancelled ? 'green' : 'red'}
                content={selectedEvent.isCancelled ? 'Re-activate event' : 'Cancel Event'}
                onClick={() => setConfirmOpen(true)}
              />
            )}

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
      <Confirm
        content={
          selectedEvent?.isCancelled
            ? 'This will reactivate the event'
            : 'This will cancel the event'
        }
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => handleCancelToggle(selectedEvent)}
      />
    </Segment>
  );
};

export default EventForm;
