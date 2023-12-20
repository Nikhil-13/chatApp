import {View, Text} from 'react-native';
import {styles} from './styles';
import {formatBadgeDate} from '../../../util/helper';

const DateBadge = ({date}) => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.dateText}>{formatBadgeDate(date)}</Text>
    </View>
  );
};

export default DateBadge;
