import {Text, Pressable} from 'react-native';
import {styles} from './styles';

const FlatButton = ({title, disabled, color, size, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.button, pressed && styles.pressed]}>
      <Text
        style={[
          styles.btnTitle,
          {color: color, fontSize: size},
          disabled && styles.disabled,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
};

export default FlatButton;
