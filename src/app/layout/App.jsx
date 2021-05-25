import { Fragment } from 'react';
import { Route, useLocation } from 'react-router';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/event-dashboard/event-dashboard';
import EventDetailsPage from '../../features/events/event-details-page/event-details-page.component';
import EventForm from '../../features/events/event-form/event.form';
import HomePage from '../../features/homepage/homepage';
import Navbar from '../../features/nav/navbar';

function App() {
  const { key } = useLocation();
  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Navbar />
            <Container className="main">
              <Route exact path="/events" component={EventDashboard} />
              <Route path="/events/:id" component={EventDetailsPage} />
              <Route path={['/createEvent', '/manage/:id']} component={EventForm} key={key} />
            </Container>
          </>
        )}
      />
    </Fragment>
  );
}

export default App;
