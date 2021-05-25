import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Container, Menu, Icon, Button, Dropdown, Image } from 'semantic-ui-react';

const Navbar = ({ setFormOpen }) => {
  const [auth, setAuth] = useState(true);
  const history = useHistory();
  const handleSignOut = () => {
    setAuth(false);
    history.push('/');
  };
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <Icon name="users" />
          Reactive Events
        </Menu.Item>
        <Menu.Item name="Events" as={NavLink} exact to="/events" />
        <Menu.Item as={NavLink} to="/createEvent">
          <Button basic inverted content="Create Event" />
        </Menu.Item>
        {auth ? (
          <Menu.Item position="right">
            <Button basic inverted content="Login" onClick={() => setAuth(false)} />
            <Button basic inverted content="Register" style={{ marginLeft: '0.5rem' }} />
          </Menu.Item>
        ) : (
          <Menu.Item position="right">
            <Image avatar spaced="right" src="/assets/user.png" />
            <Dropdown pointing="top left" text="Bartol">
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/createEvent" text="Create Event" icon="plus" />
                <Dropdown.Item text="My profile" icon="user" />
                <Dropdown.Item text="Sign out" icon="power" onClick={() => handleSignOut()} />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default Navbar;
