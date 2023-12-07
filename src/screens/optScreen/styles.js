import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    color: COLORS.black,
    // padding: 8,
    width: 30,
    fontSize: 20,
    marginVertical: 6
  },
  headerText: {
    color: COLORS.green_100,
    fontSize: 20,
  },
  mutedText: {
    color: COLORS.gray,
  },
  seperator: {
    marginHorizontal: 10,
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

});
