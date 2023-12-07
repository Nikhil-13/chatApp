import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { styles } from './styles'

const ChatListCard = ({ avatar, onPress }) => {
    return (
        <Pressable style={styles.rootContainer} onPress={onPress}>
            <View style={styles.outerContainer}>
                <Image source={{ uri: avatar }} style={styles.avatarImage} />
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
    )
}

export default ChatListCard