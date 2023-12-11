import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import FlatButton from '../../components/ui/flatButton';
import PrimaryButton from '../../components/ui/primaryButton';

import {styles} from './styles';
import {COLORS} from '../../constants/theme';
import {
  extractDigits,
  removeNonAlphabeticCharacters,
  formatNumber,
} from '../../util/helper';

const LoginScreen = ({navigation, route}) => {
  const [contactNumber, setContactNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  function numberHandler(value) {
    const number = extractDigits(value);
    setContactNumber(number);
  }

  function userNameHandler(value) {
    const name = removeNonAlphabeticCharacters(value);
    setUserName(name);
  }

  function getOtpHandler() {
    if (contactNumber.length === '' || contactNumber.length < 10) {
      Alert.alert(
        'Invalid Phone Number',
        'Please provide a valid phone number.',
      );
    } else if (userName.length === 0) {
      Alert.alert('Enter your name', 'Please provide a name.');
    } else {
      navigation.navigate('OtpScreen', {number: contactNumber, name: userName});
    }
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding'})}
        style={styles.rootContainer}>
        <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
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
          <View style={styles.nameInputContainer}>
            <TextInput
              style={styles.nameInput}
              onChangeText={userNameHandler}
              value={userName}
              placeholder="Name"
              placeholderTextColor={COLORS.gray}
            />
          </View>

          <View style={styles.countryPickerContainer}>
            <Text style={[styles.normalText, styles.countryPicker]}>India</Text>
          </View>
          <View style={styles.numberInputContainer}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.mutedText}>+</Text>
              <TextInput
                style={styles.countryCodeInput}
                defaultValue="91"
                maxLength={2}
                editable={false}
              />
            </View>
            <TextInput
              style={[styles.numberInput, isFocused && {borderBottomWidth: 2}]}
              onChangeText={numberHandler}
              keyboardType="number-pad"
              // maxLength={10}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={
                contactNumber !== '' && contactNumber.length === 10
                  ? formatNumber(contactNumber)
                  : contactNumber
              }
              placeholder="Phone Number"
              placeholderTextColor={COLORS.gray}
            />
          </View>
          <Text style={styles.mutedText}>
            International carrier charges may apply
          </Text>
        </View>
        <PrimaryButton
          title={'Next'}
          color={COLORS.green_200}
          onPress={getOtpHandler}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
