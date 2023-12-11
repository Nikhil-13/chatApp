import {View, Text, Pressable} from 'react-native';
import {COLORS} from '../../../constants/theme';
import {styles} from './styles';

const ChatBubble = ({dir, onLongPress, data}) => {
  const alignDirection = dir === 'left' ? 'flex-start' : 'flex-end';
  const bubbleColor = dir === 'left' ? COLORS.green_400 : COLORS.green_200;
  const arrowDir = dir === 'left';

  function longPressHandler({nativeEvent}) {
    onLongPress(nativeEvent?.timestamp);
  }

  return (
    <Pressable
      onLongPress={longPressHandler}
      style={[
        styles.rootContainer,
        {alignSelf: alignDirection, backgroundColor: bubbleColor},
      ]}>
      <Text style={styles.chatText}> {data[1].content}</Text>
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
