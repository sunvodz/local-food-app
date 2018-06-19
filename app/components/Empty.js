import React, { Component } from 'react';
import { ScrollView, RefreshControl, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import globalStyle from 'app/styles';

class Empty extends Component {
  onRefresh() {
    this.props.onRefresh();
  }

  render() {
    let refreshControl = null;
    let refreshing = this.props.refreshing || false;

    if (this.props.onRefresh) {
      refreshControl = <RefreshControl onRefresh={this.onRefresh.bind(this)} refreshing={refreshing} />;
    }

    return (
      <ScrollView refreshControl={refreshControl} contentContainerStyle={{flex: 1}}>
        <View style={styles.view}>
          <View style={styles.iconWrapper}>
              <Icon style={styles.icon} name={this.props.icon} />
          </View>
          <Text style={styles.header}>{this.props.header}</Text>
          <Text style={styles.text}>{this.props.text}</Text>
          {this.props.action}
        </View>
      </ScrollView>
    );
  }
}

let styles = {
  view: {
    alignItems: 'center',
    backgroundColor: globalStyle.backgroundColor,
    flex: 1,
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    backgroundColor: '#bc360c',
    borderRadius: 200,
    height: 100,
    justifyContent: 'center',
    marginBottom: 15,
    width: 100,
  },
  icon: {
    color: globalStyle.backgroundColor,
    fontSize: 48,
  },
  header: {
    color: '#333',
    fontFamily: 'montserrat-semibold',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    color: '#333',
    fontSize: 14,
    fontFamily: 'montserrat-regular',
    margin: 15,
    textAlign: 'center',
  }
};

export default Empty;
