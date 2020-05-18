import React from 'react';
import { View, Text } from 'react-native';
import styleMerger from 'app/shared/utils/styleMerger';
import RNPickerSelect from 'react-native-picker-select';

export default class TextInputComponent extends React.Component {
  render() {
    let mergedStyles = styleMerger.merge(styles, this.props.style);

    let label = null;
    if (this.props.label) {
      label = <Text style={mergedStyles.label}>{this.props.label}</Text>;
    }

    let hint = null;
    if (this.props.hint) {
      hint = <Text style={mergedStyles.hint}>{this.props.hint}</Text>;
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
              fontFamily: 'montserrat-regular',
              padding: 15,
            },
            inputIOS: {
              backgroundColor: '#fff',
              fontFamily: 'montserrat-regular',
              padding: 15,
            },
          }}
          // value={this.props.value}
        />
        {hint}
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
  placeholderColor: '#666',
  hint: {
    color: '#fff',
    fontFamily: 'montserrat-regular',
    fontSize: 12,
    marginTop: 3,
  }
};
