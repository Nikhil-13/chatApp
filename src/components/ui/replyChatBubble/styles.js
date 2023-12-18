import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/theme';

export const styles = StyleSheet.create({
  replyMessageContainer: {
    backgroundColor: COLORS.black,
    opacity: 0.6,
    flexDirection: 'row',
    borderRadius: 8,
    gap: 5,
    overflow: 'hidden',
  },
  replyText: {
    padding: 4,
    color: COLORS.white,
  },
  bar: {backgroundColor: COLORS.green_100, width: 6},

  headerText: {
    color: 'red',
    fontWeight: 'bold',
  },
});
