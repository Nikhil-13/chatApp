import {View, Text, FlatList} from 'react-native';
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

const ChatScreen = ({navigation, route}) => {
  const [selectedMessage, setSelectedMessage] = useState();
  const [textMessage, setTextMessage] = useState();
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
        setSelectedMessage('');
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

  async function deleteForMeHandler() {
    setModalVisible(!isModalVisible);
    const endpoint =
      '/users/' +
      token +
      '/chats/' +
      recepientNumber +
      '/' +
      selectedMessage.messageId;
    const data = await database().ref(endpoint).remove();
  }

  function deleteButtonHandler() {
    setModalVisible(!isModalVisible);
  }

  function forwardMessageHandler() {
    setSelectedMessage('');
    navigation.navigate('ForwardMessageScreen', {messageData: selectedMessage});
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
        <Icon
          name={'mail-reply'}
          color={color}
          size={20}
          onPress={replyInChatHandler}
        />
        <IconButton
          name={'delete'}
          color={color}
          size={24}
          onPress={deleteButtonHandler}
        />
        <Icon
          name={'mail-forward'}
          color={color}
          size={20}
          onPress={forwardMessageHandler}
        />
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
      // setChatReplyActive(false);
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
              onLongPress={setSelectedMessage}
              messageData={item[1]}
            />
          )}
        />
      ) : (
        <View style={styles.chatContainer}></View>
      )}
      <View style={styles.messageInputContainer}>
        <InputField
          placeholder={'Type Your Message'}
          message={textMessage}
          setTextMessage={setTextMessage}
        />
        <IconButton
          name="send"
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
      />
    </View>
  );
};

export default ChatScreen;
