import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dataFromSnapshot } from '../firebase/firestoreService';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../redux/async/async.actions';

export default function useFirestoreDoc({ firestoreQuery, data, deps, shouldExecute = true }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldExecute) return;
    dispatch(asyncActionStart());
    const unsubscribe = firestoreQuery().onSnapshot(
      snapshot => {
        if (!snapshot.exists) {
          dispatch(asyncActionError({ code: 'not-found', message: 'Could not find document' }));
          return;
        }
        data(dataFromSnapshot(snapshot));
        dispatch(asyncActionFinish());
      },
      error => dispatch(asyncActionError())
    );
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
