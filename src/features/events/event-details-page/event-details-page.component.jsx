import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailsHeader from '../event-details-header/event-details-header';
import EventDetailsSidebar from '../event-details-sidebar/event-details-sidebar';
import EventDetailsInfo from '../event-details-info/event-details-info';
import EventDetailsChat from '../event-details-chat/event-details-chat';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToEvents } from '../../../app/redux/event/event.actions';
import { listenToEventFromFirestore } from '../../../app/firebase/firestore';
import EventListItemPlaceholder from '../event-list-item-placeholder/event-list-item-placeholder';
import { Redirect } from 'react-router';

const EventDetailsPage = ({ match }) => {
  const event = useSelector(state => state.event.events.find(e => e.id === match.params.id));
  const { loading, error } = useSelector(state => state.async);
  const dispatch = useDispatch();
  useFirestoreDoc({
    firestoreQuery: () => listenToEventFromFirestore(match.params.id),
    data: event => dispatch(listenToEvents([event])),
    dependencies: [match.params.id, dispatch],
  });

  if (loading || (!event && !error)) return <EventListItemPlaceholder />;
  if (error) return <Redirect to="/error" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailsHeader event={event} />
        <EventDetailsInfo event={event} />
        <EventDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailsSidebar event={event} attendees={event?.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default EventDetailsPage;
