import {View, Text, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../constants/theme';
import {styles} from './styles';
import {extractDigits, validateNumber} from '../../util/helper';
import PrimaryButton from '../../components/ui/primaryButton';
import FlatButton from '../../components/ui/flatButton';

const LoginScreen = ({navigation, route}) => {
  const [contactNumber, setContactNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  function numberHandler(value) {
    const number = extractDigits(value);
    setContactNumber(number);
  }

  function getOtpHandler() {
    if (validateNumber(contactNumber) || contactNumber.length === '') {
      Alert.alert(
        'Invalid Phone Number',
        'Please provide a valid phone number.',
      );
    } else {
      navigation.navigate('OtpScreen', {number: contactNumber});
    }
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.detailSection}>
        <Text style={styles.headerText}>Enter your phone number</Text>
        <View style={styles.textSection}>
          <Text style={styles.normalText}>
            Whatsapp will need to verify your account.
          </Text>
          <FlatButton
            title={`What's my number?`}
            size={14}
            color={COLORS.green_200}
          />
        </View>
        <View style={styles.numberInputContainer}>
          <Text style={styles.mutedText}>+91</Text>
          <TextInput
            style={[styles.numberInput, isFocused && {borderBottomWidth: 2}]}
            onChangeText={numberHandler}
            keyboardType="number-pad"
            maxLength={10}
            minLength={10}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={contactNumber}
            placeholder="Phone Number"
          />
        </View>
        <Text style={styles.mutedText}>
          International carrier charges may apply
        </Text>
      </View>
      <PrimaryButton
        title={'Get OTP'}
        color={COLORS.green_200}
        onPress={getOtpHandler}
      />
    </View>
  );
};

export default LoginScreen;
