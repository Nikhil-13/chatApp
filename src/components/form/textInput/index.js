import {View, TextInput} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {COLORS} from '../../../constants/theme';

const InputField = ({placeholder}) => {
  return (
    <View style={styles.rootContainer}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
      />
    </View>
  );
};

export default InputField;
