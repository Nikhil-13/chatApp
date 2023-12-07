import {View, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../../../constants/theme';
import {styles} from './styles';

const ChatBubble = ({dir}) => {
  const alignDirection = dir === 'left' ? 'flex-start' : 'flex-end';
  const bubbleColor = dir === 'left' ? COLORS.green_400 : COLORS.green_200;
  return (
    <View
      style={[
        styles.rootContainer,
        {alignSelf: alignDirection, backgroundColor: bubbleColor},
      ]}>
      <Text style={styles.chatText}>ChatBubble</Text>
    </View>
  );
};

export default ChatBubble;
