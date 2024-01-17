import {View, Text, Image} from 'react-native';
import React from 'react';
import {IMAGE_PATHS} from '../../../constants/assets';
import {AppIcon} from '../../svg';
import {COLORS} from '../../../constants/theme';

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.gray,
      }}>
      <AppIcon />
    </View>
  );
};

export default SplashScreen;
