import {View, ScrollView, Text, Image, FlatList} from 'react-native';
import {useState, useEffect, useLayoutEffect, useContext} from 'react';
import ChatBubble from '../../components/ui/chatBubble';
import InputField from '../../components/form/textInput';
import IconButton from '../../components/ui/iconButton';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import {COLORS} from '../../constants/theme';
import {getInitials} from '../../util/helper';
import database from '@react-native-firebase/database';
import AuthContext from '../../store/context/authContext';

const ChatScreen = ({navigation, route}) => {
  const [selectedMessage, setSelectedMessage] = useState();
  const [textMessage, setTextMessage] = useState();
  const {token} = useContext(AuthContext);

  useEffect(() => {
    if (!!selectedMessage) {
      navigation.setOptions({
        headerRight: ({tintColor}) => <RightHeader color={tintColor} />,
        headerLeft: ({tintColor}) => (
          <IconButton
            name="arrow-left"
            size={24}
            color={tintColor}
            onPress={() => setSelectedMessage(false)}
            style={styles.fullHeight}
          />
        ),
      });
    }
  }, [selectedMessage]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({tintColor}) => <LeftHeader color={tintColor} />,
      headerRight: () => {},
    });
  });

  const userData = route.params?.data;
  console.log(userData);
  const chatsArray = Object.entries(userData?.chats).reverse();

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
          <Text style={styles.initials}>{getInitials(userData.name)}</Text>
        </View>
        <Text style={{color: color, fontSize: 18}}>{userData.name}</Text>
      </View>
    );
  }

  function RightHeader({color}) {
    return (
      <View style={[styles.rightHeader, styles.fullHeight]}>
        <IconButton name={'delete'} color={color} size={24} />
        <Icon name={'mail-forward'} color={color} size={22} />
      </View>
    );
  }

  async function sendMessage() {
    const messageObj = {
      recepientName: userData.name,
      recepientNumber: userData.number,
      content: textMessage,
      timestamp: +Date.now(),
    };
    setTextMessage('');

    const pushUserData = await database()
      .ref('/users/' + token + '/chats' + '/' + userData.number)
      .push({...messageObj});
    const pushRecepientData = await database()
      .ref('/users/' + userData.number + '/chats' + '/' + token)
      .push({...messageObj});
  }

  return (
    <View style={styles.rootContainer}>
      {/* <ChatBubble dir={'left'} onLongPress={setSelectedMessage} /> */}

      {chatsArray ? (
        <FlatList
          style={styles.chatContainer}
          data={chatsArray}
          renderItem={({item}) => <ChatBubble dir={'right'} data={item} />}
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
          onPress={sendMessage}
        />
      </View>
    </View>
  );
};

export default ChatScreen;
