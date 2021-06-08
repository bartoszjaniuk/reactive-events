import React from 'react';
import EventListItem from '../event-list-item/event-list-item';
import InfiniteScroll from 'react-infinite-scroller';

const EventList = ({events, moreEvents, getNextEvents, loading}) => {
  return (
    <>
      {events.length !== 0 && (
        <InfiniteScroll
          pageStart={0}
          loadMore={getNextEvents}
          hasMore={!loading && moreEvents}
          initialLoad={false}
        >
          {events.map(event => (
            <EventListItem key={event.id} event={event} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

export default EventList;
