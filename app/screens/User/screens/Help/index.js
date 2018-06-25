import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { ScreenHeader, ContentWrapper, Card } from 'app/components';
import { trans } from 'app/shared';
import globalStyle from 'app/styles';

class Help extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ScreenHeader title={trans('help', this.props.lang)} left navigation={this.props.navigation} />
        <ContentWrapper>
          <Card header={trans('your_account', this.props.lang)} headerPosition='outside'>
            <View style={styles.section}>
              <Text style={styles.label}>{trans('help_reset_password', this.props.lang)}</Text>
              <Text style={styles.text}>{trans('help_reset_password_info', this.props.lang)}</Text>
            </View>
            <View>
              <Text style={styles.label}>{trans('help_update_user', this.props.lang)}</Text>
              <Text style={styles.text}>{trans('help_update_user_info', this.props.lang)}</Text>
            </View>
          </Card>
          <Card header={trans('need_help', this.props.lang)} headerPosition='outside'>
            <View>
              <Text style={styles.text}>{trans('need_help_info', this.props.lang)}</Text>
            </View>
          </Card>
        </ContentWrapper>
      </View>
    );
  }
}

export default Help;

let styles = {
  section: {
    borderBottomWidth: 1,
    borderColor: globalStyle.backgroundColor,
    marginBottom: 15,
    paddingBottom: 15,
  },
  label: {
    fontFamily: 'montserrat-semibold',
    marginBottom: 5,
  },
  text: {
    fontFamily: 'montserrat-regular',
  },
};
