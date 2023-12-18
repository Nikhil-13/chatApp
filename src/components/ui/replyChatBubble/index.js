import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {styles} from './styles';
import AuthContext from '../../../store/context/authContext';
import {COLORS} from '../../../constants/theme';

const ReplyChatBubble = ({messageData}) => {
  const {token} = useContext(AuthContext);
  const ownMessage = messageData?.recepientNumber !== token;
  const replyHeader = ownMessage ? 'You' : messageData?.recepientName;
  const replyHeaderTextColor = ownMessage ? COLORS.green_100 : COLORS.purple;
  return (
    <View style={styles.replyMessageContainer}>
      <View
        style={[styles.bar, {backgroundColor: replyHeaderTextColor}]}></View>
      <View>
        <Text style={[styles.headerText, {color: replyHeaderTextColor}]}>
          {replyHeader}
        </Text>
        <Text style={styles.replyText}>
          {messageData?.repliedTo || messageData?.content}
        </Text>
      </View>
    </View>
  );
};

export default ReplyChatBubble;
