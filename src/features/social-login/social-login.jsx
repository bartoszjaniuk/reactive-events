import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { socialLogin } from '../../app/firebase/firebaseService';
import { closeModal } from '../../app/redux/modals/modal.actions';

const SocialLogin = () => {
  const dispatch = useDispatch();

  const handleSocialLogin = provider => {
    socialLogin(provider);
    dispatch(closeModal());
  };

  return (
    <>
      <Button
        onClick={() => handleSocialLogin('facebook')}
        icon="facebook"
        fluid
        color="facebook"
        style={{ marginBottom: 10 }}
        content="Login with Facebook"
        type="button"
      />
      <Button
        onClick={() => handleSocialLogin('google')}
        icon="google"
        fluid
        color="google plus"
        style={{ marginBottom: 10 }}
        content="Login with Google"
        type="button"
      />
    </>
  );
};

export default SocialLogin;
