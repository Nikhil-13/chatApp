import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/theme';
export const styles = StyleSheet.create({
  rootContainer: {
    height: 70,
    maxWidth: '100%',
  },
  outerContainer: {
    marginVertical: 5,
    gap: 10,
    height: '100%',
    width: '100%',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarImage: {
    height: 50,
    width: 50,
    borderRadius: 40,
    objectFit: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
  },
  initials: {color: COLORS.black, fontSize: 20},
  detailContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 4,
  },
  userDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  userNameText: {
    color: COLORS.white,
    fontSize: 18,
  },
  messageTime: {
    color: COLORS.white,
    fontSize: 14,
  },
  messageDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  messageText: {
    color: COLORS.white,
  },
  lastMessageSenderText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: 'bold',
  },
  lastMessageTextContainer: {
    flexDirection: 'row',
  },
  unreadCountBadge: {
    backgroundColor: COLORS.green_200,
    height: 18,
    width: 18,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCountText: {color: COLORS.white, fontSize: 10},
});
