import { EventActionTypes } from './event.types';
const INITIAL_STATE = {
  events: [],
  comments: [],
};
// mozna zamiast action zrobić {type, payload}
const eventReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case EventActionTypes.CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
      };
    case EventActionTypes.UPDATE_EVENT:
      return {
        ...state,
        // TO CHECK
        events: [...state.events.filter(event => event.id !== payload.id), payload],
      };
    case EventActionTypes.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event.id !== payload.id),
      };
    case EventActionTypes.FETCH_EVENTS:
      return {
        ...state,
        events: payload,
      };
    case EventActionTypes.LISTEN_TO_EVENT_CHAT:
      return {
        ...state,
        comments: payload,
      };

    case EventActionTypes.CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
      };

    default:
      return state;
  }
};

export default eventReducer;
