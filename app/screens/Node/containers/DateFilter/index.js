import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';

import { Button, Badge, BadgeWrapper } from 'app/components';
import * as actions from '../../actions';

class DateFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchNodeDates(this.props.nodeId));
  }

  openModal() {
    this.setState({modal: true});
  }

  closeModal() {
    this.setState({modal: false});
  }

  toggleDate(date) {
    let selectedDate = _.get(this.props.node, 'filters.date');

    if (date === selectedDate) {
      this.props.dispatch(actions.setDateFilter());
    } else {
      this.props.dispatch(actions.setDateFilter(date));
    }

    this.setState({modal: false});
  }

  render() {
    let isActive = _.get(this.props.node, 'filters.date');
    let selectedDate = _.get(this.props.node, 'filters.date');

    let modalProps = {
      onBackButtonPress: this.closeModal,
      onBackdropPress: this.closeModal,
      isVisible: this.state.modal
    }

    let nodeDates = null;

    if (this.props.node.dates) {
      nodeDates = _.map(this.props.node.dates, (date) => {
        let isSelected = (date === selectedDate);
        return <Badge key={date} label={date} selected={isSelected} onPress={this.toggleDate.bind(this, date)} />;
      })
    }

    return (
      <View>
        <Icon name='date-range' size={24} onPress={this.openModal} style={[styles.icon, isActive && styles.activeIcon]}/>
        <Modal {...modalProps}>
          <View style={{ flex: 1, backgroundColor: '#fff'}}>
            <BadgeWrapper>{nodeDates}</BadgeWrapper>
          </View>
        </Modal>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { auth, node } = state;

  return {
    auth,
    node,
  }
}

export default connect(mapStateToProps)(DateFilter);

const styles = StyleSheet.create({
  icon: {
    marginRight: 15,
  },
  activeIcon: {
    color: 'red',
  },
  activeDate: {
    color: 'red',
  }
});
