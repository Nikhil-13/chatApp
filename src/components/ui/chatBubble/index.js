import {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {styles} from './styles';
import IconButton from '../iconButton';
import {COLORS} from '../../../constants/theme';
import {timestampToLocal} from '../../../util/helper';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatBubble = ({
  userNumber,
  messageKey,
  messageData,
  selectedMessage,
  setSelectedMessage,
}) => {
  const [messageBackdrop, setMessageBackdrop] = useState(false);
  const dir = userNumber === messageData?.recepientNumber ? 'left' : 'right';
  const alignDirection = dir === 'left' ? 'flex-start' : 'flex-end';
  const bubbleColor = dir === 'left' ? COLORS.green_400 : COLORS.green_200;
  const arrowDir = dir === 'left';

  const delMessageIdentifier =
    userNumber !== messageData?.recepientNumber
      ? 'You deleted this message'
      : 'This message was deleted';

  function longPressHandler() {
    const messageObj = {messageId: messageKey, messageData: messageData};
    setMessageBackdrop(true);
    setSelectedMessage(messages => [...messages, [messageObj]]);
  }
  function onPressHandler() {
    setSelectedMessage(null);
    setMessageBackdrop(!messageBackdrop);
  }

  return (
    <>
      {messageBackdrop && <View style={styles.bubbleBackdrop}></View>}
      <Pressable
        onLongPress={longPressHandler}
        onPress={messageBackdrop ? onPressHandler : () => {}}
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

        {messageData.replyId && !messageData.isDeleted ? (
          <View style={styles.replyMessageContainer}>
            <View style={styles.bar}></View>
            <Text style={styles.replyText}>{messageData.repliedTo}</Text>
          </View>
        ) : (
          ''
        )}

        <View style={styles.innerMessageContainer}>
          {messageData?.isDeleted ? (
            <View style={styles.deletedMessageRow}>
              <IconButton name="cancel" size={22} color={COLORS.gray} />
              <Text style={[styles.chatText, styles.deletedText]}>
                {delMessageIdentifier}
              </Text>
            </View>
          ) : (
            <Text style={styles.chatText}> {messageData?.content}</Text>
          )}
          {messageData?.status === 'sent' ? (
            <Text style={{color: 'white'}}>sent</Text>
          ) : (
            <Text style={{color: 'white'}}>read</Text>
          )}
          <Text style={styles.mesageTime}>
            {timestampToLocal(messageData?.timestamp)}
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
    </>
  );
};

export default ChatBubble;
