import {asyncActionError, asyncActionFinish, asyncActionStart} from '../async/async.actions';
import {EventActionTypes} from './event.types';
import {dataFromSnapshot, fetchEventsFromFirestore} from '../../firebase/firestoreService';

export const createEvent = event => ({
  type: EventActionTypes.CREATE_EVENT,
  payload: event,
});

export const updateEvent = event => ({
  type: EventActionTypes.UPDATE_EVENT,
  payload: event,
});

export const deleteEvent = event => ({
  type: EventActionTypes.DELETE_EVENT,
  payload: event,
});

export function fetchEvents(predicate, limit, lastDocSnapshot) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const snapshot = await fetchEventsFromFirestore(predicate, limit, lastDocSnapshot).get();
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreEvents = snapshot.docs.length >= limit;
      const events = snapshot.docs.map(doc => dataFromSnapshot(doc));
      dispatch({type: 'FETCH_EVENTS', payload: {events, moreEvents}});
      dispatch(asyncActionFinish());
      return lastVisible;
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export const listenToSelectedEvent = event => {
  return {
    type: EventActionTypes.LISTEN_TO_SELECTED_EVENT,
    payload: event,
  };
};

export const listenToEventChat = comments => {
  return {
    type: EventActionTypes.LISTEN_TO_EVENT_CHAT,
    payload: comments,
  };
};

export const clearComments = () => {
  return {
    type: EventActionTypes.CLEAR_COMMENTS,
  };
};

export const clearEvents = () => {
  return {
    type: EventActionTypes.CLEAR_EVENTS,
  };
};
