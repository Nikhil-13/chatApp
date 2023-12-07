import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/theme';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.primary_black,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  detailSection: {
    alignItems: 'center',
    gap: 20,
  },
  textSection: {flexDirection: 'row', alignItems: 'center', gap: 5},
  numberInputContainer: {
    width: '50%',
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberInput: {
    flex: 1,
    backgroundColor: 'transparent',
    color: COLORS.white,
    padding: 4,
    borderBottomWidth: 1,
    borderColor: COLORS.green_200,
  },
  headerText: {
    color: COLORS.green_100,
    fontSize: 20,
  },
  mutedText: {
    color: COLORS.gray,
    opacity: 0.7,
  },
  normalText: {
    color: COLORS.white,
    fontSize: 14,
  },
});
