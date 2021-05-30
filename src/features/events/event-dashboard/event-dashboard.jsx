import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from '../event-list/event-list';
import { useDispatch, useSelector } from 'react-redux';
import { loadEvents } from '../../../app/redux/event/event.actions';
import EventListItemPlaceholder from '../event-list-item-placeholder/event-list-item-placeholder';
import EventFilters from '../event-filters/event-filters';

const EventDashboard = () => {
  const { events } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadEvents());
  }, [events]);
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
