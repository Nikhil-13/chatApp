import { View, Text, TextInput, Alert, SafeAreaView, StatusBar } from 'react-native';
import React, { useState, useRef, useContext, useEffect, } from 'react';
import { COLORS } from '../../constants/theme';
import { styles } from './styles';
import { extractDigits, formatNumber, formattedNumber } from '../../util/helper';
import PrimaryButton from '../../components/ui/primaryButton';
import AuthContext from '../../store/authContext';
import IconButton from '../../components/ui/iconButton';
import FlatButton from '../../components/ui/flatButton';

const OtpScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const { authenticate } = useContext(AuthContext);
  const digitOne = useRef();
  const digitTwo = useRef();
  const digitThree = useRef();
  const digitFour = useRef();
  const digitFive = useRef();
  const digitSix = useRef();

  useEffect(() => {
    if (otp.length === 6) {
      submitHandler()
    }
  }, [otp])

  function digitInputHandler(nextElement, value) {

    if (nextElement && value !== '') {
      nextElement.current.focus();
    }
    setOtp(otp => otp + value);

  }

  function backpressHandler(nativeEvent, prevElement, index) {
    if (nativeEvent.key === 'Backspace' && prevElement !== '') {
      if (otp.length !== 0) {
        setOtp(otp => otp.slice(0, -1));
        prevElement.current.focus()
      }
    }
  }

  function submitHandler() {
    if (otp.length === 6) {
      authenticate(contactNumber);
      // navigation.navigate('RecentChats');
    } else {
      Alert.alert('Invalid OTP!!', 'Please Enter a 4 digit OTP.');
    }
  }

  function navigateBack() {
    navigation.goBack()
  }
  const contactNumber = route.params?.number;

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <View style={styles.detailSection}>
        <Text style={styles.headerText}>
          Verifying your number
        </Text>
        <View style={styles.textSection}>
          <Text style={styles.normalText}>
            Whatsapp will read sms automatically sent to{' '}
            <Text style={[styles.normalText, { fontWeight: 'bold' }]}>
              +91 {formattedNumber(contactNumber)}{' '}
            </Text>
            <FlatButton
              title={`Wrong number?`}
              size={14}
              color={'blue'}
              onPress={navigateBack}
            />
          </Text>
        </View>
        <View style={styles.numberInputContainer}>
          <TextInput
            ref={digitOne}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            placeholderTextColor={COLORS.primary_black}
            autoFocus={true}
            onChangeText={digitInputHandler.bind(this, digitTwo)}
            onKeyPress={({ nativeEvent }) => backpressHandler(nativeEvent, '', 0)}
          />
          <TextInput
            ref={digitTwo}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            placeholderTextColor={COLORS.primary_black}
            onChangeText={digitInputHandler.bind(this, digitThree)}
            onKeyPress={({ nativeEvent }) => backpressHandler(nativeEvent, digitOne, 1)}
          />
          <TextInput
            ref={digitThree}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            placeholderTextColor={COLORS.primary_black}
            onChangeText={digitInputHandler.bind(this, digitFour)}
            onKeyPress={({ nativeEvent }) => backpressHandler(nativeEvent, digitTwo, 2)}
          />
          <View style={styles.seperator}></View>
          <TextInput
            ref={digitFour}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            placeholderTextColor={COLORS.primary_black}
            onChangeText={digitInputHandler.bind(this, digitFive)}
            onKeyPress={({ nativeEvent }) => backpressHandler(nativeEvent, digitThree, 3)}
          />
          <TextInput
            ref={digitFive}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            placeholderTextColor={COLORS.primary_black}
            onChangeText={digitInputHandler.bind(this, digitSix)}
            onKeyPress={({ nativeEvent }) => backpressHandler(nativeEvent, digitFour, 4)}
          />
          <TextInput
            ref={digitSix}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            placeholderTextColor={COLORS.primary_black}
            onChangeText={digitInputHandler.bind(this, '')}
            onKeyPress={({ nativeEvent }) => backpressHandler(nativeEvent, digitFive, 5)}
          />
        </View>
        <Text style={styles.mutedText}>Enter 6-digit code</Text>
        <FlatButton title={`Didn't receive code?`} color={COLORS.green_200} />
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;
