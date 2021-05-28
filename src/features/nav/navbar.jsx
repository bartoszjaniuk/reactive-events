import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Container, Menu, Icon, Button, Dropdown, Image } from 'semantic-ui-react';
import { openModal } from '../../app/redux/modals/modal.actions';
import { userSignOut } from '../../app/redux/user/user.actions';

const Navbar = () => {
  const dispatch = useDispatch();
  const { authenticated, currentUser } = useSelector(state => state.user);
  console.log(authenticated);
  const history = useHistory();

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
        {!authenticated ? (
          <Menu.Item position="right">
            <Button
              basic
              inverted
              content="Login"
              onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))}
            />
            <Button basic inverted content="Register" style={{ marginLeft: '0.5rem' }} />
          </Menu.Item>
        ) : (
          <Menu.Item position="right">
            <Image avatar spaced="right" src={currentUser.photoURL || '/assets/user.png'} />
            <Dropdown pointing="top left" text={currentUser.email}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/createEvent" text="Create Event" icon="plus" />
                <Dropdown.Item text="My profile" icon="user" />
                <Dropdown.Item
                  text="Sign out"
                  icon="power"
                  onClick={() => {
                    dispatch(userSignOut());
                    history.push('/');
                  }}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default Navbar;
