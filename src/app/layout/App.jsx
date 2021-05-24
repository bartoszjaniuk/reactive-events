import { Fragment, useState } from 'react';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/events/event-dashboard/event-dashboard';
import Navbar from '../../features/nav/navbar';

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = event => {
    setSelectedEvent(event);
    setFormOpen(true);
  };

  const handleCreateFormOpen = () => {
    setSelectedEvent(null);
    setFormOpen(true);
  };
  return (
    <Fragment>
      <Navbar setFormOpen={handleCreateFormOpen} />
      <Container className="main">
        <EventDashboard
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectEvent={handleSelectEvent}
          selectedEvent={selectedEvent}
        />
      </Container>
    </Fragment>
  );
}

export default App;
