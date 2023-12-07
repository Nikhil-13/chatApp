import React from 'react';
import { Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './styles';

const IconButton = ({ name, size, color, onPress, bgColor, style }) => {
  const containerStyle = { backgroundColor: bgColor, ...style };
  return (
    <Pressable
      style={({ pressed }) => [containerStyle, pressed && styles.pressed]}
      onPress={onPress}>
      <Icon name={name} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;
