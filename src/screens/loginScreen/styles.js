import {StyleSheet, Platform} from 'react-native';
import {COLORS} from '../../constants/theme';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  detailSection: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  textSection: {
    flexDirection: Platform.select({ios: 'column', android: 'row'}),
    alignItems: 'center',
    gap: 5,
  },
  numberInputContainer: {
    width: '50%',
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryPickerContainer: {
    borderBottomWidth: 1,
    borderColor: COLORS.green_200,
  },

  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeInput: {
    backgroundColor: 'transparent',
    color: COLORS.black,
    padding: 4,
    borderBottomWidth: 1,
    borderColor: COLORS.green_200,
  },
  countryPicker: {
    padding: 4,
    width: 150,
    textAlign: 'center',
  },
  nameInputContainer: {
    width: 150,
    padding: Platform.select({ios: 4, android: 0}),
    borderBottomWidth: 1,
    borderColor: COLORS.green_200,
  },
  numberInput: {
    flex: 1,
    backgroundColor: 'transparent',
    color: COLORS.black,
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
    fontSize: 14,
  },
  normalText: {
    color: COLORS.black,
    fontSize: 14,
  },
  nameInput: {
    textAlign: 'center',
    color: COLORS.black,
    padding: 0,
  },
});
