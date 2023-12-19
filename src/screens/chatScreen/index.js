import {
  View,
  Text,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {addToPendingMessages} from '../../store/redux/userSlice';
import {
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
  useRef,
  useMemo,
} from 'react';
import ChatBubble from '../../components/ui/chatBubble';
import InputField from '../../components/form/textInput';
import IconButton from '../../components/ui/iconButton';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import {COLORS} from '../../constants/theme';
import {getInitials, sortByTimestamp, timestampToDate} from '../../util/helper';
import database from '@react-native-firebase/database';
import AuthContext from '../../store/context/authContext';
import DeleteMessageModal from '../../components/ui/deleteMessageModal';
import {SCREEN_NAMES} from '../../constants/navigation';
import {INPUT_PLACEHOLDERS} from '../../constants/strings';
import ReplyChatBubble from '../../components/ui/replyChatBubble';
import {useNetInfo} from '@react-native-community/netinfo';
import uuid from 'react-native-uuid';

const ChatScreen = ({navigation, route}) => {
  const [selectedMessage, setSelectedMessage] = useState([]);
  const [textMessage, setTextMessage] = useState('');
  const [chatReplyActive, setChatReplyActive] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [lastMessageDate, setLastMessageDate] = useState('');
  const messageInputRef = useRef();
  const flatlistRef = useRef();
  const {isConnected} = useNetInfo();
  const dispatch = useDispatch();

  const {token} = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({tintColor}) => <LeftHeader color={tintColor} />,
      headerRight: ({tintColor}) => <DefaultRightHeader color={tintColor} />,
    });
    updateStatusUserSide();
    updateStatusRecepientSide();
  }, []);

  useEffect(() => {
    if (selectedMessage?.length > 0) {
      function backPressHandler() {
        setChatReplyActive(false);
        setSelectedMessage([]);
      }
      navigation.setOptions({
        headerRight: ({tintColor}) => <RightHeader color={tintColor} />,
        headerLeft: ({tintColor}) => (
          <IconButton
            name="arrow-left"
            size={24}
            color={tintColor}
            onPress={backPressHandler}
            style={styles.fullHeight}
          />
        ),
      });
    } else {
      navigation.setOptions({
        headerLeft: ({tintColor}) => <LeftHeader color={tintColor} />,
        headerRight: ({tintColor}) => <DefaultRightHeader color={tintColor} />,
      });
    }
  }, [selectedMessage]);

  useEffect(() => {
    if (route.params.fowardMessage) {
      const messagesArray = route.params?.fowardMessage;
      messagesArray.forEach(message => {
        async function forwardMessage() {
          const forwardMessageObj = {
            ...message,
            timestamp: new Date().getTime() / 1000,
            recepientName: recepientName,
            recepientNumber: recepientNumber,
            status: 'sent',
          };
          if (isConnected) {
            const pushUserData = await database()
              .ref('/users/' + token + '/chats' + '/' + recepientNumber)
              .push({...forwardMessageObj});
            const pushRecepientData = await database()
              .ref('/users/' + recepientNumber + '/chats' + '/' + token)
              .push({...forwardMessageObj});
          } else {
            const pendingMessage = [
              uuid.v4(),
              {...forwardMessageObj, status: 'pending'},
            ];
            dispatch(addToPendingMessages(pendingMessage));
          }
        }
        forwardMessage();
      });
      flatlistRef.current?.scrollToEnd();
    }
  }, [route.params]);

  const users = useSelector(state => state.user.users);
  const userData = users.filter(user => user.number === token)[0];
  const userChatList = users.filter(user => user.number === token)[0]?.chats;
  const pendingMessages = useSelector(state => state.user.pendingMessages);

  const recepientName = route.params?.recepient?.name;
  const recepientNumber = route.params?.recepient?.number;

  const fetchChatArray = () => {
    if (userChatList) {
      if (userChatList[recepientNumber]) {
        if (!!pendingMessages && !isConnected) {
          const wholeDataArray = [
            ...pendingMessages,
            ...Object.entries(userChatList[recepientNumber]),
          ];
          return sortByTimestamp(wholeDataArray);
        } else {
          return sortByTimestamp(Object.entries(userChatList[recepientNumber]));
        }
      } else {
        return [];
      }
    }
  };

  const chatDataArray = useMemo(
    () => fetchChatArray(),
    [userChatList, pendingMessages],
  );

  const updateStatusUserSide = () => {
    if (chatDataArray) {
      let i = chatDataArray?.length;
      function checkStatus(last) {
        if (last) {
          if (last[1]?.status === 'sent') {
            database()
              .ref(
                '/users/' + token + '/chats/' + recepientNumber + '/' + last[0],
              )
              .update({
                status: 'seen',
              });
            i--;
            checkStatus(chatDataArray[i - 1]);
          }
        }
      }
      checkStatus(chatDataArray[i - 1]);
    }
  };

  const updateStatusRecepientSide = () => {
    const recepientChatData = users.filter(
      user => user.number === recepientNumber,
    )[0]?.chats;
    const chatData = recepientChatData && recepientChatData?.[token];
    const chatDataArray = chatData && sortByTimestamp(Object.entries(chatData));

    if (!!chatDataArray) {
      let i = chatDataArray?.length;
      function checkStatus(last) {
        if (last) {
          if (last[1]?.status === 'sent') {
            database()
              .ref(
                '/users/' + recepientNumber + '/chats/' + token + '/' + last[0],
              )
              .update({
                status: 'seen',
              });
            i--;
            checkStatus(chatDataArray[i - 1]);
          }
        }
      }
      checkStatus(chatDataArray[i - 1]);
    }
  };

  function deleteForMeHandler() {
    setModalVisible(!isModalVisible);
    setChatReplyActive(false);
    setSelectedMessage([]);
    selectedMessage.forEach(async message => {
      const endpoint =
        '/users/' +
        token +
        '/chats/' +
        recepientNumber +
        '/' +
        message[0]?.messageId;
      const data = await database().ref(endpoint).remove();
    });
  }

  function deleteForEveryOneHandler() {
    selectedMessage.forEach(async message => {
      const messageTimeStamp = message[0]?.messageData?.timestamp;
      const chatList = users.filter(user => user.number === recepientNumber)[0]
        ?.chats;
      const messageArray = Object.entries(chatList[token]);
      const messageToDelete = messageArray.filter(
        message => message[1]?.timestamp === messageTimeStamp,
      );
      setModalVisible(!isModalVisible);
      setChatReplyActive(false);
      setSelectedMessage([]);

      if (messageToDelete[0][1]?.recepientNumber !== token) {
        //for you
        const endpoint =
          '/users/' +
          token +
          '/chats/' +
          recepientNumber +
          '/' +
          message[0]?.messageId;
        if (messageToDelete[0][1]?.isDeleted) {
          const data = await database().ref(endpoint).remove();
        } else {
          database().ref(endpoint).update({
            isDeleted: true,
            content: '',
          });
        }
        // for recepient
        const recepientEndpoint =
          '/users/' +
          recepientNumber +
          '/chats/' +
          token +
          '/' +
          messageToDelete[0][0];
        if (!messageToDelete[0][1]?.isDeleted) {
          database().ref(recepientEndpoint).update({
            isDeleted: true,
            content: '',
          });
        } else if (
          messageToDelete[0][1]?.isDeleted &&
          recepientNumber === token
        ) {
          const data = await database().ref(recepientEndpoint).remove();
        }
      }
    });
  }

  function deleteButtonHandler() {
    setModalVisible(!isModalVisible);
  }

  function forwardMessageHandler() {
    setSelectedMessage('');
    navigation.navigate(SCREEN_NAMES.FORWARD_MESSAGE_SCREEN, {
      messageData: selectedMessage,
    });
  }

  function replyInChatHandler() {
    messageInputRef.current.focus();
    setChatReplyActive(true);
  }

  function LeftHeader({color}) {
    return (
      <View style={[styles.leftHeaderStyles, {color: color}]}>
        <IconButton
          name="arrow-left"
          size={24}
          color={color}
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.fullHeight}
        />
        <View style={styles.avatarImage}>
          <Text style={styles.initials}>{getInitials(recepientName)}</Text>
        </View>
        <Text style={{color: color, fontSize: 18}}>{recepientName}</Text>
      </View>
    );
  }

  function RightHeader({color}) {
    return (
      <View style={[styles.rightHeader, styles.fullHeight]}>
        {selectedMessage?.length == 1 ? (
          <Pressable
            onPress={replyInChatHandler}
            hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}>
            <Icon name={'mail-reply'} color={color} size={20} />
          </Pressable>
        ) : (
          ''
        )}
        <IconButton
          name={'delete'}
          color={color}
          size={24}
          onPress={deleteButtonHandler}
        />
        <Pressable
          onPress={forwardMessageHandler}
          hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}>
          <Icon name={'mail-forward'} color={color} size={20} />
        </Pressable>
      </View>
    );
  }

  function DefaultRightHeader({color}) {
    return (
      <View style={[styles.rightHeader, styles.fullHeight]}>
        <IconButton name={'video'} color={color} size={24} />
        <IconButton name={'camera'} color={color} size={24} />
        <IconButton name={'dots-vertical'} color={color} size={24} />
      </View>
    );
  }

  async function sendMessage() {
    if (textMessage !== '') {
      const timeStamp = new Date().getTime() / 1000;
      const messageObj = {
        recepientName: recepientName,
        recepientNumber: recepientNumber,
        content: textMessage,
        timestamp: timeStamp,
        status: 'sent',
      };
      setTextMessage('');
      if (isConnected) {
        const pushUserData = await database()
          .ref('/users/' + token + '/chats' + '/' + recepientNumber)
          .push({...messageObj});
        const pushRecepientData = await database()
          .ref('/users/' + recepientNumber + '/chats' + '/' + token)
          .push({...messageObj});
      } else {
        const pendingMessage = [uuid.v4(), {...messageObj, status: 'pending'}];
        dispatch(addToPendingMessages(pendingMessage));
      }
    }
    flatlistRef.current?.scrollToEnd();
  }

  async function sendReply() {
    const reply = selectedMessage[0][0];
    if (textMessage !== '') {
      const timeStamp = new Date().getTime() / 1000;
      const messageObj = {
        content: textMessage,
        recepientName: recepientName,
        recepientNumber: recepientNumber,
        replyId: reply?.messageId,
        timestamp: timeStamp,
        repliedTo: reply.messageData.content,
        status: 'sent',
      };
      setTextMessage('');
      setSelectedMessage([]);
      if (isConnected) {
        const pushUserData = await database()
          .ref('/users/' + token + '/chats' + '/' + recepientNumber)
          .push({...messageObj});
        const pushRecepientData = await database()
          .ref('/users/' + recepientNumber + '/chats' + '/' + token)
          .push({...messageObj});
      } else {
        const pendingMessage = [uuid.v4(), {...messageObj, status: 'pending'}];
        dispatch(addToPendingMessages(pendingMessage));
      }
    }
    flatlistRef.current?.scrollToEnd();
  }

  function cancelReplyHanler() {
    setSelectedMessage('');
    setChatReplyActive(false);
  }

  // function getDateBadge(date) {
  //   if (lastMessageDate === '') {
  //     setLastMessageDate(new Date(date));
  //   } else {
  //     if (new Date(date) === lastMessageDate) {
  //       return null;
  //     } else {
  //       setLastMessageDate(new Date(date));

  //       return <Text style={{color: 'red'}}>{date}</Text>;
  //     }
  //   }
  // }

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'padding'})}
      style={{flex: 1}}
      keyboardVerticalOffset={80}>
      <View style={styles.rootContainer}>
        {chatDataArray ? (
          <FlatList
            ref={flatlistRef}
            style={styles.chatContainer}
            data={chatDataArray}
            keyExtractor={item => item[0]}
            renderItem={({item}) => (
              <>
                {/* {getDateBadge(timestampToDate(item[1]?.timestamp))} */}
                <ChatBubble
                  messageKey={item[0]}
                  recepientNumber={recepientNumber}
                  userNumber={token}
                  messageData={item[1]}
                  selectedMessage={selectedMessage}
                  chatReplyActive={chatReplyActive}
                  setSelectedMessage={setSelectedMessage}
                />
              </>
            )}
          />
        ) : (
          <View style={styles.chatContainer}></View>
        )}
        <DeleteMessageModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          deleteForMe={deleteForMeHandler}
          deleteForEveryOne={deleteForEveryOneHandler}
          isConnected={isConnected}
        />

        <View
          style={[
            styles.messageInputContainer,
            chatReplyActive && {marginBottom: 20},
          ]}>
          <View style={styles.replyItemContainer}>
            {chatReplyActive && selectedMessage?.length === 1 && (
              <View style={{padding: 8}}>
                <ReplyChatBubble
                  messageData={selectedMessage[0][0]?.messageData}
                />
                <Icon
                  name={'close'}
                  size={14}
                  color={COLORS.white}
                  style={{position: 'absolute', right: 14, top: 10}}
                  hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}
                  onPress={cancelReplyHanler}
                />
              </View>
            )}
            <View style={styles.messageInputInnerContainer}>
              <View style={styles.inputLeftIconsContainer}>
                <Icon name="smile-o" size={24} color={COLORS.gray} />
              </View>
              <InputField
                placeholder={INPUT_PLACEHOLDERS.message}
                message={textMessage}
                setTextMessage={setTextMessage}
                ref={messageInputRef}
              />
              <View style={styles.inputRightIconsContainer}>
                <Icon name="paperclip" size={24} color={COLORS.gray} />
                <Icon
                  name="camera"
                  size={20}
                  color={COLORS.gray}
                  style={[textMessage && {display: 'none'}]}
                />
              </View>
            </View>
          </View>
          <IconButton
            name={textMessage === '' ? 'microphone' : 'send'}
            size={22}
            color={COLORS.white}
            bgColor={COLORS.green_200}
            style={styles.sendButton}
            onPress={chatReplyActive ? sendReply : sendMessage}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
