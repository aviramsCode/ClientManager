import { NOTIFY_USER } from "./types";

//data is sent to the notifyReducer file
export const notifyUser = (message, messageType) => {
  return {
    type: NOTIFY_USER,
    message: message,
    messageType: messageType
  };
};
