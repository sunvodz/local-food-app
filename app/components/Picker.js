import React from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

export default class PickerComponent extends React.Component {
  static Item = Picker.Item;

  render() {
    let label = this.props.label || '';
    return (
      <View>
        <Text style={styles.label}>{label.toUpperCase()}</Text>
        <View style={styles.pickerWrapper}>
          <Picker {...this.props} style={styles.picker}>
            {this.props.children}
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
  },
  pickerWrapper: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#9e9e9e',
    borderRadius: 2,
  },
  picker: {

  }
});
