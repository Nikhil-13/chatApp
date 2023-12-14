import {View, Text, FlatList, Pressable} from 'react-native';
import {useState, useEffect, useLayoutEffect, useContext} from 'react';
import ChatBubble from '../../components/ui/chatBubble';
import InputField from '../../components/form/textInput';
import IconButton from '../../components/ui/iconButton';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import {COLORS} from '../../constants/theme';
import {getInitials, sortByTimestamp} from '../../util/helper';
import database from '@react-native-firebase/database';
import AuthContext from '../../store/context/authContext';
import DeleteMessageModal from '../../components/ui/deleteMessageModal';
import {SCREEN_NAMES} from '../../constants/navigation';
import {INPUT_PLACEHOLDERS} from '../../constants/strings';

import Swipeable from 'react-native-gesture-handler/Swipeable';

const ChatScreen = ({navigation, route}) => {
  const [selectedMessage, setSelectedMessage] = useState();
  const [textMessage, setTextMessage] = useState('');
  const [chatReplyActive, setChatReplyActive] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const {token} = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({tintColor}) => <LeftHeader color={tintColor} />,
      headerRight: ({tintColor}) => <DefaultRightHeader color={tintColor} />,
    });
  }, []);

  useEffect(() => {
    if (!!selectedMessage) {
      function backPressHandler() {
        setChatReplyActive(false);
        setSelectedMessage(null);
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
      async function forwardMessage() {
        const forwardMessageObj = {
          ...route.params.fowardMessage,
          timestamp: new Date().getTime() / 1000,
          recepientName: recepientName,
          recepientNumber: recepientNumber,
        };
        const pushUserData = await database()
          .ref('/users/' + token + '/chats' + '/' + recepientNumber)
          .push({...forwardMessageObj});
        const pushRecepientData = await database()
          .ref('/users/' + recepientNumber + '/chats' + '/' + token)
          .push({...forwardMessageObj});
      }
      forwardMessage();
    }
  }, [route.params]);

  const users = useSelector(state => state.user.users);
  const userData = users.filter(user => user.number === token)[0];
  const userChatList = users.filter(user => user.number === token)[0]?.chats;
  const recepientName = route.params?.recepient?.name;
  const recepientNumber = route.params?.recepient?.number;
  const chatDataArray =
    userChatList &&
    sortByTimestamp(Object.entries(userChatList[recepientNumber]));

  // const chatDataArray = () => {
  //   if (userChatList !== undefined) {
  //     if (Object.keys(users)?.length <= Object.keys(userChatList)?.length) {
  //       return sortByTimestamp(Object.entries(userChatList[recepientNumber]));
  //     }
  //   }
  // };
  // chatDataArray();

  async function deleteForMeHandler() {
    setModalVisible(!isModalVisible);
    setChatReplyActive(false);
    setSelectedMessage('');
    const endpoint =
      '/users/' +
      token +
      '/chats/' +
      recepientNumber +
      '/' +
      selectedMessage.messageId;
    const data = await database().ref(endpoint).remove();
  }

  async function deleteForEveryOneHandler() {
    const messageTimeStamp = selectedMessage?.messageData?.timestamp;
    const chatList = users.filter(user => user.number === recepientNumber)[0]
      ?.chats;
    const messageArray = Object.entries(chatList[token]);
    const messageToDelete = messageArray.filter(
      message => message[1]?.timestamp === messageTimeStamp,
    );
    setModalVisible(!isModalVisible);
    setChatReplyActive(false);
    setSelectedMessage('');

    if (messageToDelete[0][1]?.recepientNumber !== token) {
      //for you
      const endpoint =
        '/users/' +
        token +
        '/chats/' +
        recepientNumber +
        '/' +
        selectedMessage.messageId;
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
    setChatReplyActive(true);
  }

  function LeftHeader({color}) {
    return (
      <View style={[styles.leftHeaderStyles, {color: color}]}>
        <IconButton
          name="arrow-left"
          size={24}
          color={color}
          onPress={() => navigation.goBack()}
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
        <Pressable
          onPress={replyInChatHandler}
          hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}>
          <Icon name={'mail-reply'} color={color} size={20} />
        </Pressable>
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
      };
      setTextMessage('');
      const pushUserData = await database()
        .ref('/users/' + token + '/chats' + '/' + recepientNumber)
        .push({...messageObj});
      const pushRecepientData = await database()
        .ref('/users/' + recepientNumber + '/chats' + '/' + token)
        .push({...messageObj});
    }
  }

  async function sendReply() {
    if (textMessage !== '') {
      const timeStamp = new Date().getTime() / 1000;
      const messageObj = {
        content: textMessage,
        recepientName: recepientName,
        recepientNumber: recepientNumber,
        replyId: selectedMessage.messageId,
        timestamp: timeStamp,
        repliedTo: selectedMessage.messageData.content,
      };
      setTextMessage('');
      setSelectedMessage('');
      const pushUserData = await database()
        .ref('/users/' + token + '/chats' + '/' + recepientNumber)
        .push({...messageObj});
      const pushRecepientData = await database()
        .ref('/users/' + recepientNumber + '/chats' + '/' + token)
        .push({...messageObj});
    }
  }

  return (
    <View style={styles.rootContainer}>
      {chatDataArray ? (
        <FlatList
          style={styles.chatContainer}
          data={chatDataArray}
          keyExtractor={item => item[0]}
          renderItem={({item}) => (
            <ChatBubble
              messageKey={item[0]}
              recepientNumber={recepientNumber}
              userNumber={token}
              messageData={item[1]}
              setSelectedMessage={setSelectedMessage}
            />
          )}
        />
      ) : (
        <View style={styles.chatContainer}></View>
      )}
      <View style={styles.messageInputContainer}>
        <View style={styles.messageInputInnerContainer}>
          <View style={styles.inputLeftIconsContainer}>
            <Icon
              name="smile-o"
              size={24}
              color={COLORS.gray}
              style={styles.fullHeight}
            />
          </View>
          <InputField
            placeholder={INPUT_PLACEHOLDERS.message}
            message={textMessage}
            setTextMessage={setTextMessage}
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
        <IconButton
          name={textMessage === '' ? 'microphone' : 'send'}
          size={22}
          color={COLORS.white}
          bgColor={COLORS.green_200}
          style={styles.sendButton}
          onPress={chatReplyActive ? sendReply : sendMessage}
        />
      </View>
      <DeleteMessageModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        deleteForMe={deleteForMeHandler}
        deleteForEveryOne={deleteForEveryOneHandler}
      />
    </View>
  );
};

export default ChatScreen;
