import { Fragment, useState } from 'react';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/event-dashboard/event-dashboard';
import Navbar from '../../features/nav/navbar';

function App() {
  const [formOpen, setFormOpen] = useState(false);
  return (
    <Fragment>
      <Navbar setFormOpen={setFormOpen} />
      <Container className="main">
        <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} />
      </Container>
    </Fragment>
  );
}

export default App;
