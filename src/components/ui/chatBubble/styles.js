import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/theme';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  rootContainer: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    maxWidth: '75%',
    margin: 4,
    borderRadius: 10,
  },
  innerMessageContainer: {
    gap: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  forwardMessageText: {
    fontSize: 14,
    color: COLORS.gray,
    fontStyle: 'italic',
  },
  forwardMessageContainer: {
    flexDirection: 'row',
    gap: 5,
    paddingBottom: 5,
    paddingLeft: 4,
    alignItems: 'center',
  },
  chatText: {
    fontSize: 16,
    color: COLORS.white,
    alignSelf: 'flex-start',
  },
  leftMessageArrow: {
    position: 'absolute',
    height: 0,
    width: 0,
    borderRightWidth: 15,
    borderLeftColor: 'transparent',
    borderTopColor: COLORS.white,
    borderTopWidth: 15,
    alignSelf: 'flex-start',
    borderRightColor: 'transparent',
    right: -8,
    top: 0,
  },
  rightMessageArrow: {
    position: 'absolute',
    height: 0,
    width: 0,
    borderLeftWidth: 15,
    borderLeftColor: 'transparent',
    borderTopColor: COLORS.white,
    borderTopWidth: 15,
    alignSelf: 'flex-start',
    borderRightColor: 'transparent',
    left: -8,
    top: 0,
    zIndex: -1,
  },
  mesageTime: {
    fontSize: 11,
    color: COLORS.white,
    opacity: 0.8,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  replyMessageContainer: {
    backgroundColor: COLORS.green_450,
    flexDirection: 'row',
    borderRadius: 8,
    gap: 5,
    overflow: 'hidden',
  },
  replyText: {
    padding: 4,
    color: COLORS.white,
  },
  bar: {backgroundColor: COLORS.green_100, width: 6},
});
