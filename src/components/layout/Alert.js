import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Alert = props => {
  const { message, messageType } = props;
  return (
    <div
      // className is conditional based on the messageType diffrent color will be visable
      // classNames recives base class name "alert" and two conditional options
      className={classnames("alert", {
        "alert-success": messageType === "success",
        "alert-danger": messageType === "error"
      })}
    >
      {message}
    </div>
  );
};

Alert.propsTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired
};

export default Alert;
