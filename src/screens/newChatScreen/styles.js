import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/theme';

export const styles = StyleSheet.create({
  rootContainer: {flex: 1, backgroundColor: COLORS.green_500},
  leftHeaderStyles: {flexDirection: 'row', alignItems: 'center', gap: 10},
  contactsCount: {
    fontSize: 14,
  },
  headerHeadng: {
    fontSize: 18,
  },
  fullHeight: {
    height: '100%',
  },
});
