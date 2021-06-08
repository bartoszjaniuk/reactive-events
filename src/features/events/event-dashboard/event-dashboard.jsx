import React, {useEffect, useState} from 'react';
import {Grid, Loader} from 'semantic-ui-react';
import EventList from '../event-list/event-list';
import {useDispatch, useSelector} from 'react-redux';
import {clearEvents, fetchEvents} from '../../../app/redux/event/event.actions';
import EventListItemPlaceholder from '../event-list-item-placeholder/event-list-item-placeholder';
import EventFilters from '../event-filters/event-filters';
import EventsFeed from '../events-feed/events-feed';

const EventDashboard = () => {
  const limit = 2;
  const {events, moreEvents} = useSelector(state => state.event);
  const {loading} = useSelector(state => state.async);
  const {authenticated} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [predicate, setPredicate] = useState(
    new Map([
      ['startDate', new Date()],
      ['filter', 'all'],
    ])
  );
  const [lastDocSnapshot, setLastDocSnapshot] = useState(null);
  const [loadingInital, setLoadingInitial] = useState(false);

  const handleSetPredicate = (key, value) => {
    dispatch(clearEvents());
    setLastDocSnapshot(null);
    setPredicate(new Map(predicate.set(key, value)));
  };

  // useFireStoreCollection({
  //   firestoreQuery: () => listenToEventsFromFirestore(predicate),
  //   data: events => dispatch(listenToEvents(events)),
  //   dependencies: [dispatch, predicate],
  // });

  useEffect(() => {
    setLoadingInitial(true);
    dispatch(fetchEvents(predicate, limit)).then(lastVisible => {
      setLastDocSnapshot(lastVisible);
      setLoadingInitial(false);
    });
    return () => {
      dispatch(clearEvents());
    };
  }, [dispatch, predicate]);

  const handleFetchNextEvents = () => {
    dispatch(fetchEvents(predicate, limit, lastDocSnapshot)).then(lastVisible => {
      setLastDocSnapshot(lastVisible);
    });
  };

  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          {loadingInital ? (
            <>
              <EventListItemPlaceholder />
              <EventListItemPlaceholder />
            </>
          ) : (
            <>
              <EventList
                events={events}
                getNextEvents={handleFetchNextEvents}
                loading={loading}
                moreEvents={moreEvents}
              />
            </>
          )}
        </Grid.Column>
        <Grid.Column width={6}>
          {authenticated && <EventsFeed />}
          <EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading} />
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loading} />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default EventDashboard;
