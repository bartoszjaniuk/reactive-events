const INITIAL_STATE = null;

const modalReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case 'OPEN_MODAL':
      const { modalType, modalProps } = payload;
      return { modalType, modalProps };
    case 'CLOSE_MODAL':
      return null;
    default:
      return state;
  }
};

export default modalReducer;
