import {View, Text, Pressable} from 'react-native';
import {COLORS} from '../../../constants/theme';
import {styles} from './styles';
import {timestampToLocal} from '../../../util/helper';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatBubble = ({userNumber, messageKey, onLongPress, messageData}) => {
  const dir = userNumber === messageData?.recepientNumber ? 'left' : 'right';
  const alignDirection = dir === 'left' ? 'flex-start' : 'flex-end';
  const bubbleColor = dir === 'left' ? COLORS.green_400 : COLORS.green_200;
  const arrowDir = dir === 'left';

  function longPressHandler() {
    const messageObj = {messageId: messageKey, messageData: messageData};
    return onLongPress(messageObj);
  }

  return (
    <Pressable
      onLongPress={longPressHandler}
      style={[
        styles.rootContainer,
        {alignSelf: alignDirection, backgroundColor: bubbleColor},
      ]}>
      {messageData.isFowarded && (
        <View style={styles.forwardMessageContainer}>
          <Icon name={'mail-forward'} color={COLORS.gray} size={16} />
          <Text style={styles.forwardMessageText}>Forwarded</Text>
        </View>
      )}
      {messageData.replyId && (
        <View style={styles.replyMessageContainer}>
          <View style={styles.bar}></View>
          <Text style={styles.replyText}>{messageData.repliedTo}</Text>
        </View>
      )}
      <View style={styles.innerMessageContainer}>
        <Text style={styles.chatText}> {messageData.content}</Text>
        <Text style={styles.mesageTime}>
          {timestampToLocal(messageData.timestamp)}
        </Text>
      </View>
      {dir === 'left' ? (
        <View
          style={[
            styles.rightMessageArrow,
            {borderTopColor: COLORS.green_400},
          ]}></View>
      ) : (
        <View
          style={[
            styles.leftMessageArrow,
            {borderTopColor: COLORS.green_200},
          ]}></View>
      )}
    </Pressable>
  );
};

export default ChatBubble;
