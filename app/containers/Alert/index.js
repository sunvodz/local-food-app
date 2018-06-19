import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import _ from 'lodash';

import * as actionTypes from './actionTypes';
import { trans } from 'app/shared';

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
      alert.message = _.map(alert.message, m => {
        return trans(m, this.props.lang);
      }).join(' ');
    } else {
      alert.message = trans(alert.message, this.props.lang)
    }

    this.dropdown.alertWithType(alert.level, trans(alert.title, this.props.lang), alert.message);
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
    let titleStyle = {
      fontSize: 14,
      textAlign: 'left',
      fontFamily: 'montserrat-semibold',
      color: '#333',
      backgroundColor: 'transparent'
    };

    let messageStyle = {
      fontSize: 14,
      textAlign: 'left',
      fontFamily: 'montserrat-regular',
      color: '#333',
      backgroundColor: 'transparent'
    };

    let props = {
      messageStyle: messageStyle,
      titleStyle: titleStyle,
      successmageSrc: null,
      infoImageSrc: null,
      warnImageSrc: null,
      errorImageSrc: null,
      successColor: '#fff',
      infoColor: '#fff',
      warnColor: '#fff',
      errorColor: '#fff',
      activeStatusBarStyle: 'dark-content',
    }

    return (
      <DropdownAlert {...props} ref={component => this.dropdown = component} onClose={data => this.onClose(data)} translucent={true} />
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
