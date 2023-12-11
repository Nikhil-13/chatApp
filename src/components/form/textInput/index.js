import {View, TextInput} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {COLORS} from '../../../constants/theme';

const InputField = ({placeholder, message, setTextMessage}) => {
  function inputHandler(value) {
    setTextMessage(value);
  }
  return (
    <View style={styles.rootContainer}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        value={message}
        onChangeText={inputHandler}
      />
    </View>
  );
};

export default InputField;
