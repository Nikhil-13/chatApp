import { View, ScrollView, Text } from 'react-native';
import { useState, useEffect } from 'react'
import ChatBubble from '../../components/ui/chatBubble';
import InputField from '../../components/form/textInput';
import IconButton from '../../components/ui/iconButton';
import { styles } from './styles';
import { COLORS } from '../../constants/theme';

const ChatScreen = ({ navigation, route }) => {
  const [selectedMessage, setSelectedMessage] = useState()
  useEffect(() => {
    if (!!selectedMessage) {
      navigation.setOptions({
        headerRight: () => <Text style={{ color: 'red' }}>delete</Text>
      })
    }
  }, [selectedMessage])
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
          color="#fff"
          bgColor={COLORS.green_200}
          style={styles.sendButton}
        />
      </View>
    </View>
  );
};

export default ChatScreen;
