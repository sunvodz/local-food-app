import React from 'react';
import { View, Text, Picker } from 'react-native';

export default class PickerComponent extends React.Component {
  static Item = Picker.Item;

  mergeStyles() {
    let mergeStyles = {};

    Object.keys(styles).map(key => {
      mergeStyles[key] = styles[key];

      if (this.props.style && this.props.style[key]) {
        mergeStyles[key] = Object.assign({}, styles[key], this.props.style[key]);
      }
    });

    return mergeStyles;
  }

  render() {
    let mergedStyles = this.mergeStyles();

    let label = null;
    if (this.props.label) {
      label = <Text style={mergedStyles.label}>{this.props.label.toUpperCase()}</Text>;
    }

    return (
      <View>
        {label}
        <View style={mergedStyles.pickerWrapper}>
          <Picker {...this.props} style={mergedStyles.picker}>
            {this.props.children}
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = {
  label: {
    fontFamily: 'montserrat-semibold',
    marginBottom: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#c4c4c0',
    borderRadius: 2,
  },
  picker: {
  }
};
