import React, {useLayoutEffect, useContext, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import IconButton from '../../components/ui/iconButton';
import ChatListCard from '../../components/ui/chatListCard';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {COLORS} from '../../constants/theme';
import {addUsers} from '../../store/redux/userSlice';
import database from '@react-native-firebase/database';
import AuthContext from '../../store/context/authContext';
import {SCREEN_NAMES} from '../../constants/navigation';
import {HEADERS} from '../../constants/strings';

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

  const users = useSelector(state => state.user.users);
  const userId = users.filter(user => user.number === token)[0];
  const userChatList = users.filter(user => user.number === token)[0]?.chats;
  const chatListArray = userChatList && Object.entries(userChatList);
  const everyOneElse = users.filter(user => user.number !== token);

  function openChatHandler(item, list) {
    // console.log('item', item[0]);
    // console.log('list', list[0]);
    // const chatObj = item[0];
    // navigation.navigate(SCREEN_NAMES.CHAT_SCREEN, {recepient: chatObj});
  }
  function newChatHandler() {
    navigation.navigate(SCREEN_NAMES.NEW_CHAT_SCREEN, {userNumber: token});
  }

  return (
    <View style={styles.rootContainer}>
      {chatListArray === undefined ? (
        <Text style={styles.noChats}>{HEADERS.no_chats}</Text>
      ) : (
        <FlatList
          data={chatListArray}
          alwaysBounceVertical={true}
          renderItem={({item}) => (
            <ChatListCard
              data={item}
              onPress={() => openChatHandler(item, everyOneElse)}
            />
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
