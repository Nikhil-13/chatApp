import {View, Text, TextInput, Alert} from 'react-native';
import React, {useState, useRef, useContext} from 'react';
import {COLORS} from '../../constants/theme';
import {styles} from './styles';
import {extractDigits, formatNumber} from '../../util/helper';
import PrimaryButton from '../../components/ui/primaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../store/authContext';

const OtpScreen = ({navigation, route}) => {
  const [otp, setOtp] = useState('');
  const {authenticate} = useContext(AuthContext);
  const digitOne = useRef();
  const digitTwo = useRef();
  const digitThree = useRef();
  const digitFour = useRef();
  const digitFive = useRef();
  const digitSix = useRef();

  function digitInputHandler(nextElement, value) {
    if (nextElement && value !== '') {
      nextElement.current.focus();
    }
    setOtp(otp => otp + value);
  }

  function backpressHandler(nativeEvent) {
    if (nativeEvent.key === 'Backspace') {
      if (otp.length !== 0) {
        setOtp(otp => otp.slice(0, -1));
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
  const contactNumber = route.params?.number;

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.headerText}>
        Verify +91 {formatNumber(contactNumber)}
      </Text>
      <View style={styles.detailSection}>
        <View style={styles.numberInputContainer}>
          <TextInput
            ref={digitOne}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            onChangeText={digitInputHandler.bind(this, digitTwo)}
            onKeyPress={({nativeEvent}) => backpressHandler(nativeEvent)}
          />
          <TextInput
            ref={digitTwo}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            onChangeText={digitInputHandler.bind(this, digitThree)}
            onKeyPress={({nativeEvent}) => backpressHandler(nativeEvent)}
          />
          <TextInput
            ref={digitThree}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            onChangeText={digitInputHandler.bind(this, digitFour)}
            onKeyPress={({nativeEvent}) => backpressHandler(nativeEvent)}
          />
          <View style={styles.seperator}></View>
          <TextInput
            ref={digitFour}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            onChangeText={digitInputHandler.bind(this, digitFive)}
            onKeyPress={({nativeEvent}) => backpressHandler(nativeEvent)}
          />
          <TextInput
            ref={digitFive}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            onChangeText={digitInputHandler.bind(this, digitSix)}
            onKeyPress={({nativeEvent}) => backpressHandler(nativeEvent)}
          />
          <TextInput
            ref={digitSix}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            onChangeText={digitInputHandler.bind(this, '')}
            onKeyPress={({nativeEvent}) => backpressHandler(nativeEvent)}
          />
        </View>
        <Text style={styles.mutedText}>Enter 6-digit code</Text>
      </View>
      <PrimaryButton
        title={'Submit'}
        color={COLORS.green_200}
        onPress={submitHandler}
      />
    </View>
  );
};

export default OtpScreen;
