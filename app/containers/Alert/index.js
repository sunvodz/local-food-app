import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StatusBar } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import _ from 'lodash';

import * as actionTypes from './actionTypes';

class Alert extends Component {
  componentDidUpdate() {
    if (this.props.alert.level && this.props.alert.message) {
      this.showAlert(this.props.alert);
    }
  }

  showAlert(alert) {
    if (!alert.title) {
      alert.title = alert.level;
    }

    if (_.isArray(alert.message)) {
      alert.message = alert.message.join(' ');
    }

    this.dropdown.alertWithType(alert.level, alert.title, alert.message);
    this.resetAlert();
  }

  resetAlert() {
    this.props.dispatch({
      type: actionTypes.RESET_ALERT
    });
  }

  onClose(data) {
    // data = {type, title, message, action}
    // action means how the alert was closed.
    // returns: automatic, programmatic, tap, pan or cancel
  }

  render() {
    return (
      <DropdownAlert errorColor='#bc3b1f' ref={component => this.dropdown = component} onClose={data => this.onClose(data)} translucent={true} />
    );
  }
}


function mapStateToProps(state) {
  const { alert } = state;

  return {
    alert
  }
}

export default connect(mapStateToProps)(Alert);
