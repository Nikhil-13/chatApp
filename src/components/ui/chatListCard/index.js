import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';

const ChatListCard = ({data, onPress}) => {
  // console.log('chat card', data);
  return (
    <Pressable style={styles.rootContainer} onPress={onPress}>
      <View style={styles.outerContainer}>
        <View style={styles.avatarImage}>
          <Text style={styles.initials}>Abc</Text>
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.userDetail}>
            <Text style={styles.userNameText}>ABc</Text>
            <Text style={styles.messageTime}>4:23 pm</Text>
          </View>
          <View style={styles.messageDetailContainer}>
            <Text style={styles.messageText}>weqwe</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatListCard;
