import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Container, Menu, Icon, Button, Dropdown, Image } from 'semantic-ui-react';
import { signOutFirebase } from '../../app/firebase/firebaseService';
import { openModal } from '../../app/redux/modals/modal.actions';

const Navbar = () => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector(state => state.user);
  const { currentUserProfile } = useSelector(state => state.profile);
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await signOutFirebase();
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <Icon name="users" />
          Fitness Events
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
            <Button
              basic
              inverted
              content="Register"
              style={{ marginLeft: '0.5rem' }}
              onClick={() => dispatch(openModal({ modalType: 'RegisterForm' }))}
            />
          </Menu.Item>
        ) : (
          <Menu.Item position="right">
            <Image avatar spaced="right" src={currentUserProfile?.photoURL || '/assets/user.png'} />
            <Dropdown pointing="top left" text={currentUserProfile?.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/createEvent" text="Create Event" icon="plus" />
                <Dropdown.Item
                  text="My profile"
                  icon="user"
                  as={Link}
                  to={`/profile/${currentUserProfile?.id}`}
                />
                <Dropdown.Item text="My account" icon="setting" as={Link} to="/account" />
                <Dropdown.Item text="Sign out" icon="power" onClick={handleSignOut} />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default Navbar;
