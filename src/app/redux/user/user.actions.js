export const userSignIn = payload => {
  return {
    type: 'SIGN_IN_USER',
    payload,
  };
};

export const userSignOut = () => {
  return {
    type: 'SIGN_OUT_USER',
  };
};
