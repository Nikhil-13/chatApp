import {View, Text, FlatList} from 'react-native';
import React, {useContext, useLayoutEffect} from 'react';
import {useSelector} from 'react-redux';
import {styles} from './styles';
import ContactCard from '../../components/ui/contactCard';
import IconButton from '../../components/ui/iconButton';
import AuthContext from '../../store/context/authContext';
import {SCREEN_NAMES, SCREEN_HEADER_TITLES} from '../../constants/navigation';
import {HEADERS} from '../../constants/strings';

const ForwardMessageScreen = ({navigation, route}) => {
  const {token} = useContext(AuthContext);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({tintColor}) => <LeftHeader color={tintColor} />,
      headerRight: ({tintColor}) => <RightHeader color={tintColor} />,
    });
  });

  const messageData = route.params?.messageData?.messageData;

  const users = useSelector(state => state.user.users);
  const userId = users.filter(user => user.number === token)[0];
  const userChatList = users.filter(user => user.number === token)[0]?.chats;
  const everyOneElse = users.filter(user => user.number !== token);

  const usersCount = everyOneElse.length;

  function forwardMessageHandler(item) {
    const forwardMessageObj = {
      content: messageData?.content,
      isFowarded: true,
    };
    navigation.navigate(SCREEN_NAMES.CHAT_SCREEN, {
      recepient: item,
      fowardMessage: forwardMessageObj,
    });
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
            {SCREEN_HEADER_TITLES.forward_to}
          </Text>
        </View>
      </View>
    );
  }

  function RightHeader({color}) {
    return (
      <View style={styles.rightHeaderStyles}>
        <IconButton name={'account-group'} color={color} size={26} />
        <IconButton name={'magnify'} color={color} size={26} />
      </View>
    );
  }

  return (
    <View style={styles.rootContainer}>
      {usersCount === 0 ? (
        <Text style={styles.noContacts}>{HEADERS.no_contacts}</Text>
      ) : (
        <FlatList
          alwaysBounceVertical={true}
          data={everyOneElse}
          renderItem={({item}) => (
            <ContactCard
              data={item}
              onPress={() => forwardMessageHandler(item)}
            />
          )}
        />
      )}
    </View>
  );
};

export default ForwardMessageScreen;
