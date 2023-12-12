import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/theme';
export const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: COLORS.green_400,
    height: 200,
    borderRadius: 40,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  modalHeader: {
    padding: 4,
  },
  modalHeaderText: {
    color: COLORS.gray,
    fontSize: 14,
    opacity: 0.6,
  },
  buttonsContainer: {
    flex: 1,
    borderColor: 'white',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
});
