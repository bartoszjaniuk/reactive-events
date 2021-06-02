import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dataFromSnapshot } from '../firebase/firestoreService';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../redux/async/async.actions';

const useFirestoreDoc = ({ firestoreQuery, data, dependencies, shouldExecute = true }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!shouldExecute) return;
    dispatch(asyncActionStart());
    const unsubscribe = firestoreQuery().onSnapshot(
      snapshot => {
        if (!snapshot.exists) {
          dispatch(
            asyncActionError({
              code: 'not-found',
              message: 'Could not found document',
            })
          );
          return;
        }
        data(dataFromSnapshot(snapshot));
        dispatch(asyncActionFinish());
      },
      error => dispatch(asyncActionError())
    );
    return () => unsubscribe();
  }, dependencies);
};

export default useFirestoreDoc;
