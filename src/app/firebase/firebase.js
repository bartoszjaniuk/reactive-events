import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyD7MlKPWrv7X-MBxWWxYAqaPLwdIATTiAc',
  authDomain: 'reactivefitness-6cb79.firebaseapp.com',
  projectId: 'reactivefitness-6cb79',
  storageBucket: 'reactivefitness-6cb79.appspot.com',
  messagingSenderId: '240643136461',
  appId: '1:240643136461:web:e20dc0b1924cc74fcf4284',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
