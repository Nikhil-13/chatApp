import {View, ScrollView, Text, Image} from 'react-native';
import {useState, useEffect, useLayoutEffect} from 'react';
import ChatBubble from '../../components/ui/chatBubble';
import InputField from '../../components/form/textInput';
import IconButton from '../../components/ui/iconButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import {COLORS} from '../../constants/theme';

const ChatScreen = ({navigation, route}) => {
  const [selectedMessage, setSelectedMessage] = useState();
  useEffect(() => {
    if (!!selectedMessage) {
      navigation.setOptions({
        headerRight: ({tintColor}) => <RightHeader color={tintColor} />,
      });
    }
  }, [selectedMessage]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({tintColor}) => <LeftHeader color={tintColor} />,
    });
  });

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
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
          }}
          style={styles.avatarImage}
        />
        <Text style={{color: color, fontSize: 18}}>abv</Text>
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

  return (
    <View style={styles.rootContainer}>
      <ScrollView
        style={styles.chatContainer}
        showsVerticalScrollIndicator={false}>
        <ChatBubble dir={'left'} onLongPress={setSelectedMessage} />
        <ChatBubble dir={'right'} />
        <ChatBubble dir={'left'} />
        <ChatBubble dir={'right'} />
        <ChatBubble dir={'left'} />
        <ChatBubble dir={'right'} />
        <ChatBubble dir={'left'} />
        <ChatBubble dir={'right'} />
        <ChatBubble dir={'left'} />
        <ChatBubble dir={'left'} />
        <ChatBubble dir={'left'} />
        <ChatBubble dir={'left'} />
        <ChatBubble dir={'right'} />
      </ScrollView>
      <View style={styles.messageInputContainer}>
        <InputField placeholder={'Type Your Message'} />
        <IconButton
          name="send"
          size={22}
          color={COLORS.white}
          bgColor={COLORS.green_200}
          style={styles.sendButton}
        />
      </View>
    </View>
  );
};

export default ChatScreen;
