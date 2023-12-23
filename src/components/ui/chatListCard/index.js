import {View, Text, Pressable} from 'react-native';
import React, {useContext} from 'react';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import {DEFAULT_USER_DETAIL} from '../../../constants/strings';
import IconButton from '../iconButton';
import {COLORS} from '../../../constants/theme';
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
  const userNumber = userId?.number;
  const userChatList = userId?.chats;
  const myChatList = users.filter(user => user.number === token)[0]?.chats;

  const getUnreadCount = () => {
    let unreadCounter = 0;
    if (userChatList) {
      if (userChatList[token]) {
        Object.entries(userChatList[token]).forEach(message => {
          if (
            message[1]?.recepientNumber === token &&
            message[1]?.status === 'sent'
          ) {
            unreadCounter++;
          }
        });
      }
    }
    return unreadCounter;
  };
  const unreadCount = getUnreadCount();

  const fetchLastMessage = () => {
    if (myChatList) {
      if (myChatList[userNumber]) {
        return sortByTimestamp(Object.entries(myChatList[userNumber]))?.pop();
      } else {
        return null;
      }
    }
  };

  const lastMessage = fetchLastMessage();

  const delMessageIdentifier =
    lastMessage && lastMessage[1]?.recepientNumber === userId?.number
      ? 'You deleted this message'
      : 'This message was deleted';

  return (
    <Pressable
      style={styles.rootContainer}
      onPress={onPress}
      android_ripple={{color: COLORS.gray}}>
      <View style={styles.outerContainer}>
        <View style={styles.avatarImage}>
          <Text style={styles.initials}>{getInitials(userName)}</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.userDetail}>
            <Text style={styles.userNameText}>{userName}</Text>
            <Text style={styles.messageTime}>
              {lastMessage && timestampToLocal(lastMessage[1]?.timestamp)}
            </Text>
          </View>
          <View style={styles.messageDetailContainer}>
            <View style={styles.lastMessageTextContainer}>
              {lastMessage &&
              lastMessage[1]?.isDeleted &&
              lastMessage[1]?.content === '' ? (
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <IconButton name="cancel" size={18} color={COLORS.gray} />
                  <Text
                    style={[
                      styles.chatText,
                      {
                        fontStyle: 'italic',
                        opacity: 0.5,
                        marginLeft: 4,
                        color: COLORS.gray,
                      },
                    ]}>
                    {delMessageIdentifier}
                  </Text>
                </View>
              ) : (
                ''
              )}
              {lastMessage &&
              lastMessage[1]?.recepientName === userName &&
              !lastMessage[1]?.isDeleted ? (
                <Text style={styles.lastMessageSenderText}>
                  {DEFAULT_USER_DETAIL.you}
                  {': '}
                </Text>
              ) : (
                ''
              )}
              <Text style={styles.messageText}>
                {lastMessage && lastMessage[1]?.content?.slice(0, 20)}
              </Text>
            </View>
            {!!unreadCount && (
              <View style={styles.unreadCountBadge}>
                <Text style={styles.unreadCountText}>{unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatListCard;
