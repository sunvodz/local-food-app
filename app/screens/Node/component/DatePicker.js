import React, { Component } from 'react';
import { View, Text } from 'react-native';
import _ from 'lodash';

import { Badge, BadgeWrapper } from 'app/components';
import * as actions from '../actions';

class DatePicker extends Component {
  onSelectDate(date) {
    this.props.onSelectDate(date);
  }

  render() {
    if (!this.props.dates) {
      return null;
    }

    let selectedDate = this.props.selectedDate;

    let badgeItems = _.map(this.props.dates, (date) => {
      let isSelected = date === selectedDate;
      return <Badge key={date} label={date} selected={isSelected} onPress={this.onSelectDate.bind(this, date)} />;
    })

    return (
      <BadgeWrapper style={badgeWrapperStyle} label='Pick up dates'>
        {badgeItems}
      </BadgeWrapper>
    );
  }
}

export default DatePicker;

const badgeWrapperStyle = {
  badgeWrapper: {
    backgroundColor: '#fafafa',
    borderBottomWidth: 1,
    borderColor: '#f4f4f0',
  },
  label: {
    marginLeft: 15,
    marginTop: 5,
  },
  scrollView: {
    marginBottom: 0,
    paddingBottom: 5,
  }
}
