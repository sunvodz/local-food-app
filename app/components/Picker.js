import React from 'react';
import { View, Text, Picker } from 'react-native';
import styleMerger from 'app/shared/utils/styleMerger';

export default class PickerComponent extends React.Component {
  static Item = Picker.Item;

  render() {
    let mergedStyles = styleMerger.merge(styles, this.props.style);

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

let styles = {
  label: {
    fontFamily: 'montserrat-semibold',
    marginBottom: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#c4c4c0',
    borderRadius: 2,
  },
  picker: {}
};
