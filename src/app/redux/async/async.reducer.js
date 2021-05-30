import AsyncActionTypes from './async.types';

const INITIAL_STATE = {
  loading: false,
  error: null,
};

const asyncReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case AsyncActionTypes.ASYNC_ACTION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AsyncActionTypes.ASYNC_ACTION_FINISH:
      return {
        ...state,
        loading: false,
      };

    case AsyncActionTypes.ASYNC_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default asyncReducer;
