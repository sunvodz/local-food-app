import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ContentWrapper, Card } from 'app/components';
import { trans } from 'app/shared';
import globalStyle from 'app/styles';

export default class FAQ extends Component {
  render() {
    let lang = this.props.route.params.lang;

    return (
      <View style={{flex: 1}}>
        <ContentWrapper>
          <Card header={trans('Your account', lang)} headerPosition='outside'>
            <View>
              <Text style={styles.label}>{trans('Reset password', lang)}</Text>
              <Text style={styles.text}>{trans('Reset password is not a feature in app yet. To restore your password visit localfoodnodes.org.', lang)}</Text>
            </View>
          </Card>
          <Card header={trans('System status', lang)} headerPosition='outside'>
            <View>
              <Text style={styles.text}>{trans('Sometimes we and our external services have techinal problems. We appreciate you contacting us telling us about your problem. We inform you about known issues on our twitter account', lang)}</Text>
              <Text style={[styles.textBold, {marginTop: 15}]}>{trans('Twitter: @localfoodnodes', lang)}</Text>
            </View>
          </Card>
          <Card header={trans('Support', lang)} headerPosition='outside'>
            <View>
              <Text style={styles.text}>{trans('Feel free to contact us on the chat at localfoodnodes.org or email us on info@localfoodnodes.org.', lang)}</Text>
            </View>
          </Card>
        </ContentWrapper>
      </View>
    );
  }
}

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
    lineHeight: 20,
  },
  textBold: {
    fontFamily: 'montserrat-semibold',
    lineHeight: 20,
  },
};
