import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { COLORS } from '../../../constants/theme';
import { styles } from './styles';

const ChatBubble = ({ dir, onLongPress }) => {
  const alignDirection = dir === 'left' ? 'flex-start' : 'flex-end';
  const bubbleColor = dir === 'left' ? COLORS.green_400 : COLORS.green_200;

  function longPressHandler({ nativeEvent }) {
    onLongPress(nativeEvent?.timestamp)
  }

  return (
    <Pressable onLongPress={longPressHandler}
      style={[
        styles.rootContainer,
        { alignSelf: alignDirection, backgroundColor: bubbleColor },
      ]}>
      <Text style={styles.chatText}>ChatBubble</Text>
    </Pressable>
  );
};

export default ChatBubble;
