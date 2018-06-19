import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';

import { BadgeDate, BadgeWrapper } from 'app/components';
import { trans } from 'app/shared';
import globalStyle from 'app/styles';

class DatePicker extends Component {
  onSelectDate(date) {
    this.props.onSelectDate(date);
  }

  render() {
    let selectedDate = this.props.selectedDate;

    if (!this.props.dates) {
      return null;
    }

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
    backgroundColor: globalStyle.backgroundColor,
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
