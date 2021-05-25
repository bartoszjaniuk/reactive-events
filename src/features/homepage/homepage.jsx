import React from 'react';
import { Segment, Container, Header, Button, Icon } from 'semantic-ui-react';

const HomePage = ({ history }) => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container>
        <Header as="h1" inverted>
          <Icon name="users" size="massive" style={{ marginBottom: 12 }} />
          Reactive Events
        </Header>
        <Button onClick={() => history.push('/events')} size="huge" inverted>
          Get started
          <Icon name="right arrow" inverted />
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePage;
