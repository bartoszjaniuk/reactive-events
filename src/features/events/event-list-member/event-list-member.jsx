import React from 'react';
import { List, Image } from 'semantic-ui-react';

const EventListMember = ({ attende }) => {
  return (
    <List.Item>
      <Image size="mini" circular src={attende.photoURL} />
    </List.Item>
  );
};

export default EventListMember;
