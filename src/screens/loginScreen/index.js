import React, {useEffect, useState} from 'react';
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
import {
  HEADERS,
  NORMAL_TEXTS,
  BUTTON_TITLES,
  INPUT_PLACEHOLDERS,
  ERROR_MESSAGES,
  ERROR_MESSAGES_HEADER,
} from '../../constants/strings';

import {styles} from './styles';
import {COLORS} from '../../constants/theme';
import {
  extractDigits,
  removeNonAlphabeticCharacters,
  formatNumber,
} from '../../util/helper';
import {DEFAULT_VALUES} from '../../constants/enums';
import {SCREEN_NAMES} from '../../constants/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation, route}) => {
  const [contactNumber, setContactNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      const contactNumber = await AsyncStorage.getItem('number');
      const userName = await AsyncStorage.getItem('name');
      if (contactNumber !== null) {
        setContactNumber(contactNumber);
        setUserName(userName);
        navigation.navigate(SCREEN_NAMES.OTP_SCREEN, {
          number: contactNumber,
          name: userName,
        });
      }
    };
    getUserDetails();
  }, []);

  function numberHandler(value) {
    const number = extractDigits(value);
    setContactNumber(number);
  }

  function userNameHandler(value) {
    const name = removeNonAlphabeticCharacters(value);
    setUserName(name);
  }

  function getOtpHandler() {
    if (contactNumber?.length === '' || contactNumber?.length < 10) {
      Alert.alert(
        ERROR_MESSAGES_HEADER.invalid_number,
        ERROR_MESSAGES.invalid_number,
      );
    } else if (userName?.length === 0) {
      Alert.alert(
        ERROR_MESSAGES_HEADER.invalid_name,
        ERROR_MESSAGES.invalid_name,
      );
    } else {
      AsyncStorage.setItem('number', contactNumber);
      AsyncStorage.setItem('name', userName);
      navigation.navigate(SCREEN_NAMES.OTP_SCREEN, {
        number: contactNumber,
        name: userName,
      });
    }
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding'})}
        style={styles.rootContainer}>
        <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
        <View style={styles.detailSection}>
          <Text style={styles.headerText}>{HEADERS.enter_number}</Text>
          <View style={styles.textSection}>
            <Text style={styles.normalText}>{NORMAL_TEXTS.verify}</Text>
            <FlatButton title={``} size={14} color={COLORS.green_200} />
          </View>
          <View style={styles.nameInputContainer}>
            <TextInput
              style={styles.nameInput}
              onChangeText={userNameHandler}
              numberOfLines={1}
              value={userName}
              placeholder={INPUT_PLACEHOLDERS.name}
              placeholderTextColor={COLORS.gray}
            />
          </View>

          <View style={styles.countryPickerContainer}>
            <Text style={[styles.normalText, styles.countryPicker]}>
              {DEFAULT_VALUES.country_name}
            </Text>
          </View>
          <View style={styles.numberInputContainer}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.mutedText}>+</Text>
              <TextInput
                style={styles.countryCodeInput}
                defaultValue={DEFAULT_VALUES.country_code}
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
                contactNumber !== '' && contactNumber?.length === 10
                  ? formatNumber(contactNumber)
                  : contactNumber
              }
              placeholder={INPUT_PLACEHOLDERS.phone}
              placeholderTextColor={COLORS.gray}
            />
          </View>
          <Text style={styles.mutedText}>{NORMAL_TEXTS.carrier_charges}</Text>
        </View>
        <PrimaryButton
          title={BUTTON_TITLES.next}
          color={COLORS.green_200}
          onPress={getOtpHandler}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
