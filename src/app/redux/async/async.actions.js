import AsyncActionTypes from './async.types';

export const asyncActionStart = () => ({
  type: AsyncActionTypes.ASYNC_ACTION_START,
});
export const asyncActionFinish = () => ({
  type: AsyncActionTypes.ASYNC_ACTION_FINISH,
});
export const asyncActionError = error => ({
  type: AsyncActionTypes.ASYNC_ACTION_ERROR,
  payload: error,
});
