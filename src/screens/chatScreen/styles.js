import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/theme';
export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.primary_black,
  },
  chatContainer: {
    flex: 1,
  },
  messageInputContainer: {
    columnGap: 10,
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
