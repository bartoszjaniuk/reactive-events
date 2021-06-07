import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailsHeader from '../event-details-header/event-details-header';
import EventDetailsSidebar from '../event-details-sidebar/event-details-sidebar';
import EventDetailsInfo from '../event-details-info/event-details-info';
import EventDetailsChat from '../event-details-chat/event-details-chat';
import { useDispatch, useSelector } from 'react-redux';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToEvents } from '../../../app/redux/event/event.actions';
import { listenToEventFromFirestore } from '../../../app/firebase/firestoreService';
import EventListItemPlaceholder from '../event-list-item-placeholder/event-list-item-placeholder';
import { Redirect } from 'react-router';

const EventDetailsPage = ({ match }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const event = useSelector(state => state.event.events.find(e => e.id === match.params.id));
  const { loading, error } = useSelector(state => state.async);
  const isHost = event?.hostUid === currentUser.uid;
  const isGoing = event?.attendees?.some(a => a.id === currentUser.uid);
  useFirestoreDoc({
    firestoreQuery: () => listenToEventFromFirestore(match.params.id),
    data: event => dispatch(listenToEvents([event])),
    deps: [match.params.id, dispatch],
  });

  if (loading || (!event && !error)) return <EventListItemPlaceholder />;
  if (error) return <Redirect to="/error" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailsHeader event={event} isHost={isHost} isGoing={isGoing} />
        <EventDetailsInfo event={event} />
        <EventDetailsChat eventId={event.id} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailsSidebar event={event} attendees={event?.attendees} hostUid={event.hostUid} />
      </Grid.Column>
    </Grid>
  );
};

export default EventDetailsPage;
