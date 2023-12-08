import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';


export const styles = StyleSheet.create({
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOpacity: 0.7,
    shadowOffset: { height: 1, width: 1 },
    elevation: 2,
  },
  pressed: {
    opacity: 0.7,
  },
});
