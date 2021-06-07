import React, {useState} from "react";
import {Grid} from "semantic-ui-react";
import EventList from "../event-list/event-list";
import {useDispatch, useSelector} from "react-redux";
import {listenToEvents} from "../../../app/redux/event/event.actions";
import EventListItemPlaceholder from "../event-list-item-placeholder/event-list-item-placeholder";
import EventFilters from "../event-filters/event-filters";
import {listenToEventsFromFirestore} from "../../../app/firebase/firestoreService";

import useFireStoreCollection from "../../../app/hooks/useFireStoreCollection";
import EventsFeed from "../events-feed/events-feed";

const EventDashboard = () => {
  const {events} = useSelector(state => state.event);
  const {loading} = useSelector(state => state.async);
  const {authenticated} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["filter", "all"],
    ])
  );

  const handleSetPredicate = (key, value) => {
    setPredicate(new Map(predicate.set(key, value)));
  };

  useFireStoreCollection({
    firestoreQuery: () => listenToEventsFromFirestore(predicate),
    data: events => dispatch(listenToEvents(events)),
    dependencies: [dispatch, predicate],
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
          {authenticated && <EventsFeed />}
          <EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading} />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default EventDashboard;
