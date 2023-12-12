import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styles';
import FlatButton from '../flatButton';
import {COLORS} from '../../../constants/theme';

function DeleteMessageModal({isModalVisible, setModalVisible, deleteForMe}) {
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
          <Text style={styles.modalHeaderText}>Delete Message?</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <FlatButton
            title={'Delete for Everyone'}
            weight={'bold'}
            color={COLORS.green_100}
          />
          <FlatButton
            title={'Delete for Me'}
            weight={'bold'}
            color={COLORS.green_100}
            onPress={deleteForMe}
          />
          <FlatButton
            title={'Cancel'}
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
