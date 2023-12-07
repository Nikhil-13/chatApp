import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { styles } from './styles'

const ContactCard = ({ avatar, onPress }) => {
    return (
        <Pressable style={styles.rootContainer} onPress={onPress}>
            <View style={styles.outerContainer}>
                <Image source={{ uri: avatar }} style={styles.avatarImage} />
                <View style={styles.detailContainer}>
                    <View style={styles.userDetail}>
                        <Text style={styles.userNameText}>ABc</Text>
                    </View>
                    <View style={styles.statusContainer}>
                        <Text style={styles.statusText}>status</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default ContactCard