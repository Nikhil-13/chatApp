import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/theme';
export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    height: 45,
    overflow: 'hidden',
    // borderRadius: 20,
    backgroundColor: COLORS.green_400,
  },
  textInput: {
    paddingHorizontal: 6,
    fontSize: 18,
    color: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
