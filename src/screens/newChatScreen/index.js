import {View, Text, ScrollView, FlatList} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';
import {styles} from './styles';
import ContactCard from '../../components/ui/contactCard';
import IconButton from '../../components/ui/iconButton';

const NewChat = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({tintColor}) => <LeftHeader color={tintColor} />,
      headerRight: ({tintColor}) => <RightHeader color={tintColor} />,
    });
  });

  const users = useSelector(state => state.user.users);
  const usersCount = users.length;

  console.log(users);
  function startChatHandler() {
    navigation.navigate('ChatScreen');
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
      <FlatList
        alwaysBounceVertical={true}
        data={users}
        renderItem={({itemData}) => (
          <ContactCard
            avatar={
              'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
            }
            onPress={startChatHandler}
          />
        )}></FlatList>
    </View>
  );
};

export default NewChat;
