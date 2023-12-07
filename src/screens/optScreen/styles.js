import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/theme';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.primary_black,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  detailSection: {
    gap: 20,
    alignItems: 'center',
  },
  numberInputContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: COLORS.green_200,
  },
  numberInput: {
    backgroundColor: 'transparent',
    color: COLORS.white,
    padding: 8,
    width: 30,
    fontSize: 20,
  },
  headerText: {
    color: COLORS.green_100,
    fontSize: 20,
  },
  mutedText: {
    color: COLORS.gray,
    opacity: 0.7,
  },
  seperator: {
    marginHorizontal: 10,
  },
});
