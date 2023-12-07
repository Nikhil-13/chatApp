import React from 'react';
import {Image, Pressable} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {styles} from './styles';

const IconButton = ({name, size, color, onPress, bgColor}) => {
  const containerStyle = {...styles.iconContainer, backgroundColor: bgColor};
  return (
    <Pressable
      style={({pressed}) => [containerStyle, pressed && styles.pressed]}
      onPress={onPress}>
      <IonIcon name={name} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;
