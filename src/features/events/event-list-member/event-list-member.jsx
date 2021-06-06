import React from 'react';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';

const EventListMember = ({ attende }) => {
  return (
    <List.Item as={Link} to={`/profile/${attende.id}`}>
      <Image size="mini" circular src={attende.photoURL || '/assets/user.png'} />
    </List.Item>
  );
};

export default EventListMember;
