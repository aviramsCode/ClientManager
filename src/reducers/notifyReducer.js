import { NOTIFY_USER } from "../actions/types";
//when ever we create a reducer we need to add it to our combineReducers function, that we have in store.js

const initialState = {
  message: null,
  messageType: null
};
// case NOTIFY_USER: notify is part of the state (see combineReducers function in store.js)
// return: we are addind to the current state message & messageType
export default function(state = initialState, action) {
  switch (action.type) {
    case NOTIFY_USER:
      return {
        ...state,
        message: action.message,
        messageType: action.messageType
      };
    default:
      return state;
  }
}
