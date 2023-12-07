import {View, ScrollView} from 'react-native';
import ChatBubble from '../../components/ui/chatBubble';
import InputField from '../../components/form/textInput';
import IconButton from '../../components/ui/iconButton';
import {styles} from './styles';
import {COLORS} from '../../constants/theme';

const ChatScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <ScrollView
        style={styles.chatContainer}
        showsVerticalScrollIndicator={false}>
        <ChatBubble dir={'left'} />
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
          name="send-sharp"
          size={22}
          color="#fff"
          bgColor={COLORS.green_200}
        />
      </View>
    </View>
  );
};

export default ChatScreen;
