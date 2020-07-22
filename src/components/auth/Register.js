import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notifyUser } from "../../actions/notifyActions";
import Alert from "../layout/Alert";

class Register extends Component {
  state = {
    email: "",
    password: "",
    error: false
  };

  componentWillMount() {
    const { allowRegistration } = this.props.settings;

    if (!allowRegistration) {
      this.props.history.push("/");
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { firebase, notifyUser } = this.props;
    const { email, password, error } = this.state;

    //Register with fb
    firebase
      .createUser({ email, password })
      .catch(err => this.setState({ error: err.message }));
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    // const {message, messageType} = this.props.notify;
    const { error } = this.state;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {/* {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null} */}
              {error ? <Alert message={error} messageType={"error"} /> : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <FontAwesomeIcon icon="lock" /> Register
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  firebaseConnect: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings
    }),
    { notifyUser }
  )
)(Register);
