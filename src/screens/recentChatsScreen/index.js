import React, {useLayoutEffect, useContext, useEffect} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import IconButton from '../../components/ui/iconButton';
import ChatListCard from '../../components/ui/chatListCard';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {COLORS} from '../../constants/theme';
import {addUsers} from '../../store/redux/userSlice';
import database from '@react-native-firebase/database';
import AuthContext from '../../store/context/authContext';

const RecentChats = ({navigation, route}) => {
  const {token, logout} = useContext(AuthContext);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    async function getAllUsers() {
      database()
        .ref('/users/')
        .on('value', snapshot => {
          dispatch(addUsers(snapshot.val()));
        });
    }
    getAllUsers();
  }, []);

  const userData = useSelector(state => state.user.users);
  const userChatList = userData.filter(user => user.number === token)[0]?.chats;
  const chatListArray = userChatList && Object.entries(userChatList);

  function openChatHandler(item) {
    console.log(item);
    // const newObj = {name: 'rajehhs', number: item[0], chats: item[1]};
    // navigation.navigate('ChatScreen', {data: newObj});
  }
  function newChatHandler() {
    navigation.navigate('NewChatScreen', {userNumber: token});
  }

  return (
    <View style={styles.rootContainer}>
      {chatListArray?.length === 0 ? (
        <Text style={styles.noChats}>No Chats</Text>
      ) : (
        <FlatList
          data={chatListArray}
          alwaysBounceVertical={true}
          renderItem={({item}) => (
            <ChatListCard data={item} onPress={() => openChatHandler(item)} />
          )}
        />
      )}
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
