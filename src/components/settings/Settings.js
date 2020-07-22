import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  setAllowRegistration,
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit
} from "../../actions/settingsActions";

const Settings = props => {
  const {
    setDisableBalanceOnAdd,
    setDisableBalanceOnEdit,
    setAllowRegistration,
    settings: { disableBalanceOnAdd, disableBalanceOnEdit, allowRegistration }
  } = props;

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-6">
          <Link to="/" className="btn btn-link">
            <FontAwesomeIcon icon="arrow-circle-left" /> Back To Dashboard
          </Link>
        </div>
      </div>
      <div className="card">
        <div className="card-header">Edit Settings</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Allow Registration</label>{" "}
              <input
                type="checkbox"
                name="allowRegistration"
                checked={allowRegistration}
                onChange={setAllowRegistration}
              />
            </div>
            <div className="form-group">
              <label>Disable Balance On Add</label>{" "}
              <input
                type="checkbox"
                name="disableBalanceOnAdd"
                checked={disableBalanceOnAdd}
                onChange={setDisableBalanceOnAdd}
              />
            </div>
            <div className="form-group">
              <label>Disable Balance On Edit</label>{" "}
              <input
                type="checkbox"
                name="disableBalanceOnEdit"
                checked={disableBalanceOnEdit}
                onChange={setDisableBalanceOnEdit}
              />
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  disableBalanceOnAdd: PropTypes.func.isRequired,
  disableBalanceOnEdit: PropTypes.func.isRequired,
  allowRegistration: PropTypes.func.isRequired
};

//inside connect we:
//1.created an arrow function that brought settings from our redux state and we assign it to a prop name settings
//2.declared our actions { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit } alow us to check the boxes
//2.1 clicking on one of the checkboxes will triger the corresponding case in the settingReducer.js file
export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  { setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit }
)(Settings);
