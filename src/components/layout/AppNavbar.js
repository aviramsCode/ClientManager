import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class AppNavbar extends Component {
  state = {
    isAuth: false
  };

  //checks if the user have a user id - meaning he is authenticated
  //auth is avilable to us in props because we maped it from the state vis connect
  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuth: true };
    } else {
      return { isAuth: false };
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    const { isAuth } = this.state;
    const { auth } = this.props;
    const { allowRegistration } = this.props.settings;
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            ClientPanel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mr auto">
              {/* Dashboard will be showen only if user is authenticated */}
              {isAuth ? (
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Dashboard
                  </Link>
                </li>
              ) : null}
            </ul>

            {/* Logout will be showen only if user is authenticated */}
            {isAuth ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#!" className="nav-link">
                    {auth.email}
                  </a>
                </li>
                <li className="nav-item">
                  <Link to="/settings" className="nav-link">
                    Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    href="#!"
                    className="nav-link"
                    onClick={this.onLogoutClick}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            ) : null}
            {allowRegistration && !isAuth ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
}

AppNavbar.propTypes = {
  // firebaseConnect: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  // firebase is available to us since we use firebaseConnect
  //connect mapes auth from redux state to props
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }))
)(AppNavbar);
