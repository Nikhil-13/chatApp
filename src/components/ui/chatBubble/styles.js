import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/theme';

export const styles = StyleSheet.create({
  rootContainer: {
    padding: 10,
    maxWidth: '75%',
    margin: 10,
    borderRadius: 10,
  },
  chatText: {
    color: COLORS.white,
  },
  leftMessageArrow: {
    position: 'absolute',
    height: 0,
    width: 0,
    borderRightWidth: 15,
    borderLeftColor: "transparent",
    borderTopColor: COLORS.white,
    borderTopWidth: 15,
    alignSelf: "flex-start",
    borderRightColor: "transparent",
    right: -8,
    top: 0,
  },
  rightMessageArrow: {
    position: 'absolute',
    height: 0,
    width: 0,
    borderLeftWidth: 15,
    borderLeftColor: "transparent",
    borderTopColor: COLORS.white,
    borderTopWidth: 15,
    alignSelf: "flex-start",
    borderRightColor: "transparent",
    left: -8,
    top: 0,
    zIndex: -1
  },
});
