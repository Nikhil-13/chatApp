import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/theme';

export const styles = StyleSheet.create({
  rootContainer: {
    paddingVertical: 8,
    paddingHorizontal: 5,
    maxWidth: '85%',
    margin: 4,
    marginVertical: 6,
    borderRadius: 10,
  },
  innerMessageContainer: {
    paddingHorizontal: 4,
    maxWidth: '80%',
    gap: 10,
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
    zIndex: -2,
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
    zIndex: -2,
  },
  mesageTime: {
    fontSize: 11,
    color: COLORS.white,
    opacity: 0.8,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  replyMessageContainer: {
    backgroundColor: COLORS.black,
    opacity: 0.6,
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
  bubbleBackdrop: {
    backgroundColor: COLORS.green_100,
    opacity: 0.15,
    height: '95%',
    width: '100%',
    position: 'absolute',
    marginVertical: 2,
    padding: 4,
    zIndex: 1,
  },
  deletedText: {
    fontStyle: 'italic',
    opacity: 0.5,
    marginLeft: 4,
  },
  deletedMessageRow: {flexDirection: 'row'},
  messageStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
    // marginLeft: 10,
  },
  messageStatus: {
    alignSelf: 'flex-end',
  },
});
