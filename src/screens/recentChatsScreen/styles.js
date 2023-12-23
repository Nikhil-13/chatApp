import {StyleSheet, Platform} from 'react-native';
import {COLORS} from '../../constants/theme';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.green_500,
    paddingBottom: Platform.select({ios: 20}),
  },
  newChatButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.green_200,
    height: 50,
    width: 50,
    borderRadius: 10,
    elevation: 4,
    shadowColor: COLORS.black,
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 0.7,
  },
  leftHeaderTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  rightHeader: {flexDirection: 'row', gap: 10},
  noChats: {color: COLORS.white, fontSize: 20},
});
