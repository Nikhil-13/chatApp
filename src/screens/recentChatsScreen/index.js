import React, {useLayoutEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import IconButton from '../../components/ui/iconButton';
import ChatListCard from '../../components/ui/chatListCard';
import {useDispatch} from 'react-redux';
import {styles} from './styles';
import {COLORS} from '../../constants/theme';
import {addUsers} from '../../store/redux/userSlice';
import database from '@react-native-firebase/database';

const RecentChats = ({navigation, route}) => {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({tintColor}) => <LeftHeader color={tintColor} />,
    });

    async function getAllUsers() {
      database()
        .ref('/users/')
        .on('value', snapshot => {
          dispatch(addUsers(snapshot.val()));
        });
    }
    getAllUsers();
  });

  function LeftHeader({color}) {
    return (
      <Text style={[styles.leftHeaderTitle, {color: color}]}>ChatsApp</Text>
    );
  }

  function openChatHandler() {
    navigation.navigate('ChatScreen');
  }
  function newChatHandler() {
    navigation.navigate('NewChatScreen');
  }

  return (
    <View style={styles.rootContainer}>
      <ScrollView alwaysBounceVertical={true}>
        <ChatListCard
          avatar={
            'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
          }
          onPress={openChatHandler}
        />
      </ScrollView>
      <IconButton
        name={'android-messages'}
        size={24}
        color={COLORS.white}
        style={styles.newChatButton}
        onPress={newChatHandler}
      />
    </View>
  );
};

export default RecentChats;
