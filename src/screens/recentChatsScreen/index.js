import { View, Text, ScrollView } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { styles } from './styles';
import ChatListCard from '../../components/ui/chatListCard';
import IconButton from '../../components/ui/iconButton';
import { COLORS } from '../../constants/theme';

const RecentChats = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: 'ChatApp' })
  })

  function openChatHandler() {
    navigation.navigate('ChatScreen')
  }
  function newChatHandler() {
    navigation.navigate('NewChatScreen')
  }

  return (
    <View style={styles.rootContainer}>
      <ScrollView alwaysBounceVertical={true}>
        <ChatListCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={openChatHandler} />
        <ChatListCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={openChatHandler} />
        <ChatListCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={openChatHandler} />
        <ChatListCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={openChatHandler} />
        <ChatListCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={openChatHandler} />
        <ChatListCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={openChatHandler} />
        <ChatListCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={openChatHandler} />
        <ChatListCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={openChatHandler} />
        <ChatListCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={openChatHandler} />
        <ChatListCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={openChatHandler} />
        <ChatListCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={openChatHandler} />
        <ChatListCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={openChatHandler} />
      </ScrollView>
      <IconButton name={'android-messages'} size={24} color={COLORS.white} style={styles.newChatButton} onPress={newChatHandler} />
    </View>
  );
};

export default RecentChats;
