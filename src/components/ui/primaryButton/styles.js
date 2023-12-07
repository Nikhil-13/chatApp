import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/theme';

export const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 10,
    shadowOffset: {height: 0, width: 0},
    shadowColor: COLORS.black,
    shadowOpacity: 0.7,
  },
  textContainer: {padding: 12},
  pressed: {opacity: 0.6},
  btnTitle: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 16,
  },
});
