import React, { Component } from 'react';
import { ScrollView, RefreshControl, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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

const styles = {
  view: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    backgroundColor: '#fff2e0',
    borderRadius: 200,
    height: 100,
    justifyContent: 'center',
    marginBottom: 15,
    width: 100,
  },
  icon: {
    color: '#c4c4c0',
    fontSize: 48,
  },
  header: {
    color: '#a4a4a0',
    fontFamily: 'montserrat-semibold',
    fontSize: 24,
    textAlign: 'center',
  },
  text: {
    color: '#a4a4a0',
    fontSize: 16,
    fontFamily: 'montserrat-regular',
    margin: 15,
    textAlign: 'center',
  }
};

export default Empty;
