import React from 'react';
import { View, Text } from 'react-native';
import styleMerger from 'app/shared/utils/styleMerger';
import RNPickerSelect from 'react-native-picker-select';

export default class TextInputComponent extends React.Component {
  render() {
    let mergedStyles = styleMerger.merge(styles, this.props.style);

    let label = null;
    let hint = this.props.hint || '';

    if (this.props.label) {
      label = <Text style={mergedStyles.label}>{this.props.label}</Text>;
    }

    return (
      <View style={mergedStyles.wrapper}>
        {label}
        <RNPickerSelect
          placeholder={this.props.placeholder}
          placeholderTextColor='#666'
          items={this.props.items}
          onValueChange={this.props.onValueChange}
          hideIcon={this.props.hideIcon}
          useNativeAndroidPickerStyle={false}
          style={{
            inputAndroid: {
              backgroundColor: '#fff',
              padding: 15,
              fontFamily: 'montserrat-regular',
            },
            inputIOSContainer: {
              backgroundColor: '#fff',
              padding: 15,
            },
          }}
          // value={this.props.value}
        />
        <Text style={mergedStyles.hint}>{hint}</Text>
      </View>
    );
  }
}

let styles = {
  wrapper: {
    flex: 1,
  },
  label: {
    marginBottom: 5,
    fontFamily: 'montserrat-semibold',
    color: '#fff',
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 2,
    elevation: 0,
    fontFamily: 'montserrat-regular',
    padding: 15,
    textDecorationLine: 'none',
  },
  placeholderColor: '#666',
  hint: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    marginTop: 3,
  }
};
