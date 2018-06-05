import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ListItem extends React.Component {
  render() {
    let columns = React.Children.map(this.props.children, (column, index) => {
      return React.cloneElement(column, {
        style: styles.column
      });
    });

    let navigationArrow = null;
    if (this.props.onPress) {
      navigationArrow = <Icon style={styles.chevron} name="chevron-right" />;
    }

    let isLastItem = this.props.last || false;

    return (
      <TouchableOpacity onPress={this.props.onPress} style={[styles.listItem, isLastItem && styles.lastListItem]}>
        {columns}
        {navigationArrow}
      </TouchableOpacity>
    );
  }
}

const styles = {
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#f4f4f0',
  },
  lastListItem: {
    borderBottomWidth: 0,
    marginBottom: 15,
  },
  column: {
    marginHorizontal: 15,
  },
  chevron: {
    marginRight: 5,
    color: '#666',
    alignSelf: 'center',
  }
};
