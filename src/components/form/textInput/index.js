import {View, TextInput} from 'react-native';
import React, {forwardRef} from 'react';
import {styles} from './styles';
import {COLORS} from '../../../constants/theme';

const InputField = forwardRef(function input(
  {placeholder, message, setTextMessage},
  ref,
) {
  function inputHandler(value) {
    setTextMessage(value);
  }
  return (
    <View style={styles.rootContainer}>
      <TextInput
        ref={ref}
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        value={message}
        onChangeText={inputHandler}
      />
    </View>
  );
});

export default InputField;
