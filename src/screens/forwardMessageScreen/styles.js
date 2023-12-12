import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/theme';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.green_500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftHeaderStyles: {flexDirection: 'row', alignItems: 'center', gap: 10},
  rightHeaderStyles: {flexDirection: 'row', alignItems: 'center', gap: 10},
  contactsCount: {
    fontSize: 14,
  },
  headerHeadng: {
    fontSize: 22,
  },
  fullHeight: {
    height: '100%',
  },
  noContacts: {
    fontSize: 20,
    color: COLORS.gray,
  },
});
