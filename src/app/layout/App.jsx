import {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, useLocation} from 'react-router';
import {Container} from 'semantic-ui-react';
import AccountPage from '../../features/account-page/account-page';
import EventDashboard from '../../features/events/event-dashboard/event-dashboard';
import EventDetailsPage from '../../features/events/event-details-page/event-details-page.component';
import EventForm from '../../features/events/event-form/event.form';
import HomePage from '../../features/homepage/homepage';
import ModalManager from '../../features/modal-manager/modal-manager';
import Navbar from '../../features/nav/navbar';
import ProfilePage from '../../features/profiles/profile-page/profile-page';
import Error from '../errors/error';
import firebase from '../firebase/firebase';
import {verifyAuth} from '../redux/user/user.actions';
import PrivateRoute from './private-route';

function App() {
  const dispatch = useDispatch();
  const {key} = useLocation();
  // const { currentUser } = useSelector(state => state.user);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(currentUser => {
      dispatch(verifyAuth(currentUser));
    });
  }, [verifyAuth]);
  return (
    <Fragment>
      <ModalManager />
      <Route exact path="/" component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Navbar />
            <Container className="main">
              <Route exact path="/events" component={EventDashboard} />
              <Route path="/events/:id" component={EventDetailsPage} />
              <PrivateRoute
                path={['/createEvent', '/manage/:id']}
                component={EventForm}
                key={key}
              />
              <Route path={'/error'} component={Error} />
              <PrivateRoute path={'/account'} component={AccountPage} />
              <PrivateRoute path={'/profile/:id'} component={ProfilePage} />
            </Container>
          </>
        )}
      />
    </Fragment>
  );
}

export default App;
