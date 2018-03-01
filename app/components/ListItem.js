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

    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.listItem} activeOpacity={1}>
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
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderColor: '#ebebeb',
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
