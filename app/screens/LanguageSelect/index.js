import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, NativeModules } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { sharedActions } from 'app/shared';
import { CommonActions } from '@react-navigation/native';

class LanguageSelect extends Component {
  constructor(props) {
    super(props);

    this.setLangauge = this.setLanguage.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(sharedActions.systemActions.getLanguages());
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.system.availableLanguages || this.props.system.lang !== prevProps.system.lang) {
      this.props.dispatch(sharedActions.systemActions.getLanguages());
    }

    if (prevProps.system.lang != this.props.system.lang && this.props.navigation) {
      NativeModules.DevSettings.reload();
    }
  }

  setLanguage(lang) {
    this.props.dispatch(sharedActions.systemActions.setLanguage(lang));
  }

  renderListItem({item, index, separators}) {
    let selected = null;
    if (item.selected) {
      selected = <Icon name="check" style={styles.listItemSelected} />
    }

    return (
      <TouchableOpacity style={styles.listItem} onPress={() => this.setLanguage(item.key)}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'centerw'}}>
          <Text style={styles.listItemContent}>{item.label}</Text>
          {selected}
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    let content = <ActivityIndicator style={{flex: 1}} />;
    if (this.props.system.availableLanguages && this.props.system.availableLanguages.length > 0) {
      content = (
        <FlatList
          data={this.props.system.availableLanguages}
          renderItem={this.renderListItem.bind(this)}
        />
      );
    }

    return (
      <View>
        {content}
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { system } = state;

  return {
    system,
  }
}

export default connect(mapStateToProps)(LanguageSelect);

let styles = {
  modal: {
    backgroundColor: '#fff',
    flex: 1,
    paddingVertical: 15,
  },
  header: {
    fontFamily: 'montserrat-semibold',
    marginBottom: 15,
    marginHorizontal: 15,
  },
  listItem: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 15,
  },
  listItemContent: {
    fontFamily: 'montserrat-regular',
  },
  listItemSelected: {
    //
  }
};
