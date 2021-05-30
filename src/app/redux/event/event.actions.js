import fetchSampleData from '../../api/mockApi';
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../async/async.actions';
import { EventActionTypes } from './event.types';

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

export const loadEvents = () => {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const events = await fetchSampleData();
      dispatch({
        type: EventActionTypes.FETCH_EVENTS,
        payload: events,
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
};
