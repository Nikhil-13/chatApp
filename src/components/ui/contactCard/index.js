import {View, Text, Pressable} from 'react-native';
import {getInitials} from '../../../util/helper';
import {DEFAULT_USER_DETAIL} from '../../../constants/strings';
import {styles} from './styles';

const ContactCard = ({onPress, data}) => {
  return (
    <Pressable style={styles.rootContainer} onPress={onPress}>
      <View style={styles.outerContainer}>
        <View style={styles.avatarImage}>
          <Text style={styles.initials}>{getInitials(data.name)}</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.userDetail}>
            <Text style={styles.userNameText}>{data.name}</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{DEFAULT_USER_DETAIL.status}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ContactCard;
