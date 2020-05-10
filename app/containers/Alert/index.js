import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import { trans } from 'app/shared';
import globalStyle from 'app/styles';
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

    if (Array.isArray(alert.message)) {
      alert.message = alert.message.map(message => {
        message = message.charAt(0).toUpperCase() + message.slice(1);

        return trans(message, this.props.lang);
      }).join(' ');
    } else {
      alert.message = trans(alert.message, this.props.lang)
    }

    this.dropdown.alertWithType(alert.level, trans(alert.title, this.props.lang), trans(alert.message));
    this.resetAlert();
  }

  resetAlert() {
    this.props.dispatch({
      type: actionTypes.RESET_ALERT
    });
  }

  render() {
    let titleStyle = {
      color: '#fff',
      fontFamily: 'montserrat-semibold',
      fontSize: 14,
      marginBottom: 3,
      textAlign: 'left',
    };

    let messageStyle = {
      color: '#fff',
      fontFamily: 'montserrat-regular',
      fontSize: 14,
      textAlign: 'left',
    };

    let props = {
      closeInterval: 5000,
      messageStyle: messageStyle,
      titleStyle: titleStyle,
      successImageSrc: null,
      infoImageSrc: null,
      warnImageSrc: null,
      errorImageSrc: null,
      successColor: globalStyle.primaryColor,
      infoColor: globalStyle.primaryColor,
      warnColor: globalStyle.primaryColor,
      errorColor: globalStyle.primaryColor,
      activeStatusBarStyle: 'light-content',
      inactiveStatusBarStyle: 'light-content',
      showCancel: true,
      cancelBtnImageStyle: { padding: 8, width: 20, height: 20, alignSelf: 'center' }
    }

    return (
      <DropdownAlert {...props} ref={component => this.dropdown = component} translucent={true} />
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
