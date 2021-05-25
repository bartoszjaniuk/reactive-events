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
