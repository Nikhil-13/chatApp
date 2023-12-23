import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/theme';

export const styles = StyleSheet.create({
  rootContainer: {
    alignSelf: 'center',
    marginVertical: 5,
    maxWidth: 'auto',
    height: 30,
    backgroundColor: COLORS.green_400,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  dateText: {color: COLORS.white},
});
