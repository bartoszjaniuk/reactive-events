import {useSelector} from 'react-redux';
import {Route} from 'react-router-dom';
import UnauthModal from '../../features/unauth-modal/unauth-modal';

const PrivateRoute = ({component: Component, prevLocation, ...rest}) => {
  const {authenticated} = useSelector(state => state.user);
  return (
    <Route
      {...rest}
      render={props => (authenticated ? <Component {...props} /> : <UnauthModal {...props} />)}
    />
  );
};
export default PrivateRoute;
