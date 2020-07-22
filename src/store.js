import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import firebase from "firebase";
import "firebase/firestore"; // <- needed if using firestore
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
  apiKey: "AIzaSyB05mt4q6sOan3i6wviuFd16mE7UfHAKCc",
  authDomain: "reactclientpanel-c48c2.firebaseapp.com",
  databaseURL: "https://reactclientpanel-c48c2.firebaseio.com",
  projectId: "reactclientpanel-c48c2",
  storageBucket: "reactclientpanel-c48c2.appspot.com",
  messagingSenderId: "1019652470068",
  appId: "1:1019652470068:web:fa33c08c5d8170bee92161",
  measurementId: "G-0RX40DPHT2"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

//Init firebase instance
firebase.initializeApp(firebaseConfig);
//Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

//Check for setting in localStorage
if (localStorage.getItem("settings") == null) {
  //Default values
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  //Set the default values into localStorage (RECIVES ONLY STRING)
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

//Create initial state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

//create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
