import {useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {styles} from './styles';
import IconButton from '../iconButton';
import {COLORS} from '../../../constants/theme';
import {timestampToLocal} from '../../../util/helper';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ReplyChatBubble from '../replyChatBubble';

import 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const ChatBubble = ({
  userNumber,
  messageKey,
  messageData,
  selectedMessage,
  setSelectedMessage,
  replyInChatHandler,
  setChatReplyActive,
  chatReplyActive,
}) => {
  const [messageBackdrop, setMessageBackdrop] = useState(false);
  const dir = userNumber === messageData?.recepientNumber ? 'left' : 'right';
  const alignDirection = dir === 'left' ? 'flex-start' : 'flex-end';
  const bubbleColor = dir === 'left' ? COLORS.green_400 : COLORS.green_200;
  const arrowDir = dir === 'left';

  useEffect(() => {
    if (selectedMessage?.length === 0) {
      setMessageBackdrop(false);
    }
  }, [selectedMessage]);

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

  const messageStatus = status => {
    if (status === 'sent') {
      return (
        <FeatherIcon
          name="check"
          color={COLORS.gray}
          size={12}
          style={styles.messageStatus}
        />
      );
    } else if (status === 'seen' && !messageData?.isDeleted) {
      return (
        <IonIcon
          name="checkmark-done"
          color={COLORS.blue}
          size={14}
          style={styles.messageStatus}
        />
      );
    } else if (status === 'pending') {
      return (
        <FeatherIcon
          name="clock"
          color={COLORS.gray}
          size={12}
          style={styles.messageStatus}
        />
      );
    }
  };

  const pressed = useSharedValue(false);
  const offset = useSharedValue(0);
  const updateReplayState = () => {
    const messageObj = {messageId: messageKey, messageData: messageData};
    setSelectedMessage(messages => [...messages, [messageObj]]);
    replyInChatHandler();
    setChatReplyActive(true);
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange(event => {
      if (
        event.translationX > 0 &&
        !messageData?.isDeleted &&
        event.translationX < 100
      ) {
        offset.value = event.translationX;
      }
    })
    .onFinalize(event => {
      if (event.state === 5) {
        updateReplayState();
      }
      offset.value = withSpring(0);
      pressed.value = false;
    })
    .runOnJS(true);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[{flex: 1, justifyContent: 'center'}, animatedStyles]}>
        <Pressable
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
          onLongPress={longPressHandler}
          onPress={onPressHandler}>
          {messageBackdrop && <View style={styles.bubbleBackdrop}></View>}
          <View
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
              <ReplyChatBubble messageData={messageData} />
            ) : (
              ''
            )}
            <View style={{flexDirection: 'row', gap: 5}}>
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
                <Text style={styles.mesageTime}>
                  {timestampToLocal(messageData?.timestamp)}
                </Text>
                {messageStatus(messageData?.status)}
              </View>
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
          </View>
        </Pressable>
        <Icon
          name={'mail-forward'}
          color={COLORS.white}
          size={18}
          style={{position: 'absolute', left: -50}}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default ChatBubble;
