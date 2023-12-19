import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styles';
import FlatButton from '../flatButton';
import {COLORS} from '../../../constants/theme';
import {BUTTON_TITLES, HEADERS} from '../../../constants/strings';

function DeleteMessageModal({
  isConnected,
  isModalVisible,
  setModalVisible,
  deleteForMe,
  deleteForEveryOne,
}) {
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={300}
      animationOutTiming={300}
      coverScreen={false}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}>
      <View style={styles.rootContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>{HEADERS.delete_message}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          {isConnected && (
            <FlatButton
              title={BUTTON_TITLES.delete_for_everyone}
              weight={'bold'}
              onPress={deleteForEveryOne}
              color={COLORS.green_100}
            />
          )}
          <FlatButton
            title={BUTTON_TITLES.delete_for_me}
            weight={'bold'}
            color={COLORS.green_100}
            onPress={deleteForMe}
          />
          <FlatButton
            title={BUTTON_TITLES.cancel}
            color={COLORS.green_100}
            weight={'bold'}
            onPress={toggleModal}
          />
        </View>
      </View>
    </Modal>
  );
}

export default DeleteMessageModal;
