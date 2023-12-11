import {StyleSheet, Platform} from 'react-native';
import {COLORS} from '../../constants/theme';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Platform.select({ios: 40, android: 20}),
  },
  detailSection: {
    gap: 20,
    alignItems: 'center',
  },
  numberInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.green_200,
  },
  numberInput: {
    backgroundColor: 'transparent',
    color: COLORS.black,
    width: 20,
    fontSize: 20,
    marginVertical: Platform.select({ios: 6}),
  },
  headerText: {
    color: COLORS.green_100,
    fontSize: 20,
  },
  mutedText: {
    color: COLORS.gray,
  },
  seperator: {
    marginHorizontal: 2,
  },
  textSection: {
    paddingHorizontal: 45,
  },
  normalText: {
    flexDirection: 'row',
    textAlign: 'center',
    color: COLORS.black,
    fontSize: 14,
    gap: 20,
  },
  cancelButton: {
    position: 'absolute',

    top: Platform.select({ios: 1, android: 2}),
    left: Platform.select({ios: 15, android: 0}),
  },
});
