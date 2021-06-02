import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../event-list/event-list';
import { useDispatch, useSelector } from 'react-redux';
import { listenToEvents } from '../../../app/redux/event/event.actions';
import EventListItemPlaceholder from '../event-list-item-placeholder/event-list-item-placeholder';
import EventFilters from '../event-filters/event-filters';
import { listenToEventsFromFirestore } from '../../../app/firebase/firestoreService';

import useFireStoreCollection from '../../../app/hooks/useFireStoreCollection';

const EventDashboard = () => {
  const { events } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);
  const dispatch = useDispatch();

  useFireStoreCollection({
    firestoreQuery: () => listenToEventsFromFirestore(),
    data: events => dispatch(listenToEvents(events)),
    dependencies: [dispatch],
  });
  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          {loading ? (
            <>
              <EventListItemPlaceholder />
              <EventListItemPlaceholder />
            </>
          ) : (
            <EventList events={events} />
          )}
        </Grid.Column>
        <Grid.Column width={6}>
          <EventFilters />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default EventDashboard;
