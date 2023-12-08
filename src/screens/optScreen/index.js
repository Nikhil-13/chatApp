import {
  View,
  Text,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useState, useRef, useContext, useEffect} from 'react';
import {COLORS} from '../../constants/theme';
import {styles} from './styles';
import {formattedNumber} from '../../util/helper';
import AuthContext from '../../store/context/authContext';
import IconButton from '../../components/ui/iconButton';
import FlatButton from '../../components/ui/flatButton';
import database from '@react-native-firebase/database';

const reference = database().ref('/users/123');

const OtpScreen = ({navigation, route}) => {
  const [otp, setOtp] = useState('');
  const {authenticate} = useContext(AuthContext);
  const digitOne = useRef();
  const digitTwo = useRef();
  const digitThree = useRef();
  const digitFour = useRef();
  const digitFive = useRef();
  const digitSix = useRef();

  useEffect(() => {
    if (otp.length === 6) {
      submitHandler();
    }
  }, [otp]);

  function digitInputHandler(nextElement, value) {
    if (nextElement && value !== '') {
      nextElement.current.focus();
    }
    setOtp(otp => otp + value);
  }

  function backpressHandler(nativeEvent, prevElement, index) {
    if (nativeEvent.key === 'Backspace' && prevElement !== '') {
      if (otp.length !== 0) {
        if (index < otp.length) {
          setOtp(otp => otp.slice(0, index) + otp.slice(index + 1, otp.length));
        }
        prevElement.current.focus();
      }
    }
  }

  function submitHandler() {
    if (otp.length === 6) {
      authenticate(contactNumber, name.trim());
      registerUser();
    } else {
      Alert.alert('Invalid OTP!!', 'Please Enter a 6 digit OTP.');
    }
  }

  function navigateBack() {
    navigation.goBack();
  }

  async function registerUser() {
    database()
      .ref('/users/' + contactNumber)
      .set({
        name: route.params?.name,
        timeStamp: +Date.now(),
        number: contactNumber,
      })
      .then(() => console.log('data added'));
  }

  const contactNumber = route.params?.number;
  const name = route.params?.name;

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <View style={styles.detailSection}>
        <Text style={styles.headerText}>Verifying your number</Text>
        <View style={styles.textSection}>
          <Text style={styles.normalText}>
            Whatsapp will read sms automatically sent to{' '}
          </Text>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text style={[styles.normalText, {fontWeight: 'bold'}]}>
              +91 {formattedNumber(contactNumber)}{' '}
            </Text>
            <FlatButton
              title={`Wrong number?`}
              size={14}
              color={'blue'}
              onPress={navigateBack}
            />
          </View>
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
            value={otp[0]}
            onChangeText={digitInputHandler.bind(this, digitTwo)}
            onKeyPress={({nativeEvent}) => backpressHandler(nativeEvent, '', 0)}
          />
          <TextInput
            value={otp[1]}
            ref={digitTwo}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            placeholderTextColor={COLORS.primary_black}
            onChangeText={digitInputHandler.bind(this, digitThree)}
            onKeyPress={({nativeEvent}) =>
              backpressHandler(nativeEvent, digitOne, 1)
            }
          />
          <TextInput
            value={otp[2]}
            ref={digitThree}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            placeholderTextColor={COLORS.primary_black}
            onChangeText={digitInputHandler.bind(this, digitFour)}
            onKeyPress={({nativeEvent}) =>
              backpressHandler(nativeEvent, digitTwo, 2)
            }
          />
          <View style={styles.seperator}></View>
          <TextInput
            value={otp[3]}
            ref={digitFour}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            placeholderTextColor={COLORS.primary_black}
            onChangeText={digitInputHandler.bind(this, digitFive)}
            onKeyPress={({nativeEvent}) =>
              backpressHandler(nativeEvent, digitThree, 3)
            }
          />
          <TextInput
            value={otp[4]}
            ref={digitFive}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            placeholderTextColor={COLORS.primary_black}
            onChangeText={digitInputHandler.bind(this, digitSix)}
            onKeyPress={({nativeEvent}) =>
              backpressHandler(nativeEvent, digitFour, 4)
            }
          />
          <TextInput
            value={otp[5]}
            ref={digitSix}
            style={styles.numberInput}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            placeholder="-"
            placeholderTextColor={COLORS.primary_black}
            onChangeText={digitInputHandler.bind(this, '')}
            onKeyPress={({nativeEvent}) =>
              backpressHandler(nativeEvent, digitFive, 5)
            }
          />
        </View>
        <Text style={styles.mutedText}>Enter 6-digit code</Text>
        <FlatButton title={`Didn't receive code?`} color={COLORS.green_200} />
        <IconButton
          name={'close'}
          color={COLORS.gray}
          size={24}
          style={{position: 'absolute', left: 15}}
          onPress={navigateBack}
        />
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;
