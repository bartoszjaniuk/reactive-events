import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';

const Error = () => {
  const { error } = useSelector(state => state.async);

  return (
    <Segment>
      <Header textAlign="center">{error?.message || 'Oops - we have an error'}</Header>
      <Button as={Link} to="/events" primary style={{ marginTop: 20 }} content="Return to events" />
    </Segment>
  );
};

export default Error;
