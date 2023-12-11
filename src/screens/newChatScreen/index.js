import {View, Text, ScrollView, FlatList} from 'react-native';
import React, {useContext, useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';
import {styles} from './styles';
import ContactCard from '../../components/ui/contactCard';
import IconButton from '../../components/ui/iconButton';
import AuthContext from '../../store/context/authContext';

const NewChat = ({navigation, route}) => {
  const {token} = useContext(AuthContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({tintColor}) => <LeftHeader color={tintColor} />,
      headerRight: ({tintColor}) => <RightHeader color={tintColor} />,
    });
  });

  const users = useSelector(state => state.user.users);
  const userId = users.filter(user => user.number === token)[0];
  const userChatList = users.filter(user => user.number === token)[0]?.chats;
  const everyOneElse = users.filter(
    user => user.number !== route.params.userNumber,
  );

  const usersCount = everyOneElse.length;

  function startChatHandler(item) {
    console.log(userChatList);
    // const newObj = {name: 'rajehhs', number: item[0], chats: item[1]};
    // navigation.navigate('ChatScreen', {data: newObj});
  }

  function LeftHeader({color}) {
    return (
      <View style={styles.leftHeaderStyles}>
        <IconButton
          name="arrow-left"
          size={24}
          color={color}
          onPress={() => navigation.goBack()}
          style={styles.fullHeight}
        />
        <View>
          <Text style={[styles.headerHeadng, {color: color}]}>
            Select Contact
          </Text>
          <Text style={[styles.contactsCount, {color: color}]}>
            {usersCount}
          </Text>
        </View>
      </View>
    );
  }

  function RightHeader({color}) {
    return (
      <>
        <IconButton name={'magnify'} color={color} size={24} />
        <IconButton name={'dots-vertical'} color={color} size={24} />
      </>
    );
  }

  return (
    <View style={styles.rootContainer}>
      {users.length === 0 ? (
        <Text style={styles.noContacts}>No Contacts</Text>
      ) : (
        <FlatList
          alwaysBounceVertical={true}
          data={everyOneElse}
          renderItem={({item}) => (
            <ContactCard
              data={item}
              onPress={() => startChatHandler(everyOneElse)}
            />
          )}
        />
      )}
    </View>
  );
};

export default NewChat;
