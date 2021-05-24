import React from 'react';
import { Container, Menu, Icon, Button } from 'semantic-ui-react';

const Navbar = ({ setFormOpen }) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <Icon disabled name="users" />
          Reactive Events
        </Menu.Item>
        <Menu.Item name="Events" />
        <Menu.Item>
          <Button basic inverted content="Create Event" onClick={() => setFormOpen(true)} />
        </Menu.Item>
        <Menu.Item position="right">
          <Button basic inverted content="Login" />
          <Button basic inverted content="Register" style={{ marginLeft: '0.5rem' }} />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
