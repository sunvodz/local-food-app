import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { ScreenHeader, ContentWrapper, Card } from 'app/components';
import { trans } from 'app/shared';
import globalStyle from 'app/styles';

class Help extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ScreenHeader title={trans('Help', this.props.lang)} left navigation={this.props.navigation} />
        <ContentWrapper>
          <Card header={trans('Your account', this.props.lang)} headerPosition='outside'>
            <View>
              <Text style={styles.label}>{trans('Reset password', this.props.lang)}</Text>
              <Text style={styles.text}>{trans('Reset password is not a feature in app yet. To restore your password visit localfoodnodes.org.', this.props.lang)}</Text>
            </View>
          </Card>
          <Card header={trans('Need help?', this.props.lang)} headerPosition='outside'>
            <View>
              <Text style={styles.text}>{trans('Feel free to contact us on the chat at localfoodnodes.org or email us on info@localfoodnodes.org.', this.props.lang)}</Text>
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
