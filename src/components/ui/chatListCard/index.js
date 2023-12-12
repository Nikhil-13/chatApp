import {View, Text, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import {
  getInitials,
  timestampToLocal,
  sortByTimestamp,
} from '../../../util/helper';
import AuthContext from '../../../store/context/authContext';

const ChatListCard = ({data, onPress}) => {
  const {token} = useContext(AuthContext);
  const users = useSelector(state => state.user.users);
  const userId = users.filter(user => user.number === data[0])[0];
  const userName = userId?.name;
  const userChatList = userId?.chats;
  const lastMessage =
    userChatList && sortByTimestamp(Object.entries(userChatList[token])).pop();

  return (
    <Pressable style={styles.rootContainer} onPress={onPress}>
      <View style={styles.outerContainer}>
        <View style={styles.avatarImage}>
          <Text style={styles.initials}>{getInitials(userName)}</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.userDetail}>
            <Text style={styles.userNameText}>{userName}</Text>
            <Text style={styles.messageTime}>
              {timestampToLocal(lastMessage[1].timestamp)}
            </Text>
          </View>
          <View style={styles.messageDetailContainer}>
            <View style={{flexDirection: 'row'}}>
              {lastMessage[1].recepientName === userName ? (
                <Text style={styles.lastMessageSenderText}>You: </Text>
              ) : (
                <Text style={styles.lastMessageSenderText}>
                  {userName}
                  {': '}
                </Text>
              )}
              <Text style={styles.messageText}>{lastMessage[1].content}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatListCard;
