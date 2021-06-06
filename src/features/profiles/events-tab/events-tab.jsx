import { useState } from 'react';
import { Card, Grid, Header, Image, Tab } from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useFireStoreCollection from '../../../app/hooks/useFireStoreCollection';
import { getUserEventsQuery } from '../../../app/firebase/firestoreService';
import { listenToUserEvents } from '../../../app/redux/profile/profileActions';
import { format } from 'date-fns';

const EventsTab = ({ profile }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const { profileEvents } = useSelector(state => state.profile);
  const { loading } = useSelector(state => state.async);

  useFireStoreCollection({
    firestoreQuery: () => getUserEventsQuery(activeTab, profile.id),
    data: events => dispatch(listenToUserEvents(events)),
    dependencies: [dispatch, activeTab, profile.id],
  });
  const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } },
  ];
  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content="Event" icon="calendar" />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            onTabChange={(event, data) => setActiveTab(data.activeIndex)}
            panes={panes}
            menu={{ secondary: true, pointing: true }}
          />
          <Card.Group itemsPerRow={5} style={{ marginTop: 10 }}>
            {profileEvents.map(event => (
              <Card as={Link} to={`/events/${event.id}`} key={event.id}>
                <Image
                  src="/assets/events/heavy-pull.jpg" // TODO
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <Card.Content>
                  <Card.Header content={event.title} textAlign="center" />
                  <Card.Meta textAlign="center">
                    <div>{format(event.date, 'dd MM yyyy')}</div>
                    <div>{format(event.date, 'hh:mm a')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default EventsTab;
