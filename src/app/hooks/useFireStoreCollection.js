import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dataFromSnapshot } from '../firebase/firestoreService';
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../redux/async/async.actions';

const useFireStoreCollection = ({ firestoreQuery, data, dependencies }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = firestoreQuery().onSnapshot(
      snapshot => {
        const docs = snapshot.docs.map(doc => dataFromSnapshot(doc));
        data(docs);
        dispatch(asyncActionFinish());
      },
      error => dispatch(asyncActionError(error))
    );
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useFireStoreCollection;
