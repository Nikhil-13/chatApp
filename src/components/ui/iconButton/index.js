import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './styles';

const IconButton = ({name, size, color, onPress, bgColor, style}) => {
  const containerStyle = {backgroundColor: bgColor, ...style};
  return (
    <Pressable
      hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
      style={({pressed}) => [containerStyle, pressed && styles.pressed]}
      onPress={onPress}>
      <Icon name={name} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;
