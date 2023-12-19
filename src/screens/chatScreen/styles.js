import {StyleSheet, Platform} from 'react-native';
import {COLORS} from '../../constants/theme';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingBottom: Platform.select({ios: 20}),
    backgroundColor: COLORS.primary_black,
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  chatContainer: {
    flex: 1,
  },
  messageInputContainer: {
    columnGap: 10,
    flexDirection: 'row',
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textSection: {
    flexDirection: Platform.select({ios: 'column', android: 'row'}),
    alignItems: 'center',
    gap: 5,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.green_200,
    height: 45,
    width: 45,
    borderRadius: 50,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 0.7,
  },
  avatarImage: {
    height: 35,
    width: 35,
    borderRadius: 40,
    objectFit: 'cover',
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullHeight: {
    height: '100%',
  },
  leftHeaderStyles: {flexDirection: 'row', alignItems: 'center', gap: 10},
  rightHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    marginRight: 5,
  },
  initials: {color: COLORS.black, fontSize: 18},
  messageInputInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 50,
    padding: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: COLORS.green_400,
  },

  inputRightIconsContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputLeftIconsContainer: {
    // paddingTop: Platform.select({ios: 2}),
    // marginLeft: 5,
  },
  replyItemContainer: {
    flex: 1,
    backgroundColor: COLORS.green_400,
    borderRadius: 20,
  },
});
