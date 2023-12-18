import {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {styles} from './styles';
import IconButton from '../iconButton';
import {COLORS} from '../../../constants/theme';
import {timestampToLocal} from '../../../util/helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';

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
    if (!!selectedMessage && selectedMessage?.length === 0) {
      setMessageBackdrop(true);
      setSelectedMessage(messages => [...messages, [messageObj]]);
    }
  }
  function onPressHandler() {
    const messageObj = {messageId: messageKey, messageData: messageData};
    if (!!selectedMessage && selectedMessage?.length > 0) {
      selectedMessage.filter(message => {
        if (message[0]?.messageId === messageObj?.messageId) {
          setMessageBackdrop(false);
          setSelectedMessage(messages =>
            messages.filter(
              message => message[0]?.messageId !== messageObj?.messageId,
            ),
          );
        } else {
          setMessageBackdrop(true);
          setSelectedMessage(messages => [...messages, [messageObj]]);
        }
      });
    }
  }

  return (
    <>
      {messageBackdrop && <View style={styles.bubbleBackdrop}></View>}
      <Pressable
        hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
        onLongPress={longPressHandler}
        onPress={onPressHandler}
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
        </View>

        <View style={styles.messageStatusContainer}>
          {messageData?.status === 'sent' ? (
            <FeatherIcon
              name="check"
              color={COLORS.gray}
              size={12}
              style={styles.messageStatus}
            />
          ) : (
            <IconButton name="check" color={COLORS.blue} size={12} />
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
