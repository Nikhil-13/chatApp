import {styles} from './styles';
import {View, Text, Pressable} from 'react-native';

const PrimaryButton = ({title, color, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        {backgroundColor: color},
        pressed && styles.pressed,
      ]}>
      <View style={styles.textContainer}>
        <Text style={styles.btnTitle}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default PrimaryButton;
