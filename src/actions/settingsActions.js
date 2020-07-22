import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION
} from "./types";

//when one of this functions will get call they will send back the type to the settingsReducer
//the settingsReducer file will toggle the appropriate value in state acording to the type of the action and payload sent

export const setDisableBalanceOnAdd = () => {
  //Get initial settings from localSotage
  const settings = JSON.parse(localStorage.getItem("settings"));

  //Toggle
  settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

  //Set back to localStorage
  localStorage.setItem("settings", JSON.stringify(settings));

  //returns the type and a boolean payload to the settingsReducer
  return {
    type: DISABLE_BALANCE_ON_ADD,
    payload: settings.disableBalanceOnAdd
  };
};

export const setDisableBalanceOnEdit = () => {
  //Get initial settings from localSotage
  const settings = JSON.parse(localStorage.getItem("settings"));

  //Toggle
  settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;

  //Set back to localStorage
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: DISABLE_BALANCE_ON_EDIT,
    payload: settings.disableBalanceOnEdit
  };
};

export const setAllowRegistration = () => {
  //Get initial settings from localSotage
  const settings = JSON.parse(localStorage.getItem("settings"));

  //Toggle
  settings.allowRegistration = !settings.allowRegistration;

  //Set back to localStorage
  localStorage.setItem("settings", JSON.stringify(settings));

  return {
    type: ALLOW_REGISTRATION,
    payload: settings.allowRegistration
  };
};
