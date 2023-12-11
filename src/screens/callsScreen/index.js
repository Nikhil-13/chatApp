import {View, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/theme';

const CallScreen = () => {
  return (
    <View style={{backgroundColor: COLORS.green_500, flex: 1}}>
      <Text style={{color: 'white'}}>CallScreen</Text>
    </View>
  );
};

export default CallScreen;
