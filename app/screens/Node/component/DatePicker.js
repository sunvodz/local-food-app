import React, { Component } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import _ from 'lodash';

import { BadgeDate, BadgeWrapper } from 'app/components';
import * as actions from '../actions';
import { trans } from 'app/shared';

class DatePicker extends Component {
  onSelectDate(date) {
    this.props.onSelectDate(date);
  }

  render() {
    if (this.props.dates && this.props.dates.length === 0) {
      return (
        <BadgeWrapper style={badgeWrapperStyle} label={trans('pickup_dates', this.props.lang)}>
          <Text style={{marginLeft: 15, color: '#999'}}>{trans('no_available_pickup_dates', this.props.lang)}</Text>
        </BadgeWrapper>
      );
    }

    let selectedDate = this.props.selectedDate;

    let badgeItems = _.map(this.props.dates, (date) => {
      let isSelected = date === selectedDate;
      return <BadgeDate key={date} labelTop={moment(date).format('D')} labelBottom={trans(moment(date).format('MMM'), this.props.lang)} selected={isSelected} onPress={this.onSelectDate.bind(this, date)} />;
    })

    return (
      <BadgeWrapper style={badgeWrapperStyle} label={trans('pickup_dates', this.props.lang)}>
        {badgeItems}
      </BadgeWrapper>
    );
  }
}

export default DatePicker;

const badgeWrapperStyle = {
  badgeWrapper: {
    backgroundColor: '#f4f4f0',
    borderBottomWidth: 1,
    borderColor: '#f0f0ea',
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
