import {View, Text, Image} from 'react-native';
import React from 'react';
import {IMAGE_PATHS} from '../../../constants/assets';

const SplashScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Image
        source={IMAGE_PATHS.splash_screen}
        style={{width: '100%', height: '100%'}}
      />
    </View>
  );
};

export default SplashScreen;
