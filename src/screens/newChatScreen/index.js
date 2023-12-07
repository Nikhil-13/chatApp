import { View, Text, ScrollView } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { styles } from './styles';
import ContactCard from '../../components/ui/contactCard';

const NewChat = ({ navigation, route }) => {
    useLayoutEffect(() => {
        navigation.setOptions({ headerLeft: ({ tintColor }) => <LeftHeader color={tintColor} />, headerTitle: '' })
    })

    function startChatHandler() {
        navigation.navigate('ChatScreen')
    }

    function LeftHeader({ color }) {
        return <View>
            <Text style={{ color: color, fontSize: 18 }}>Select Contact</Text>
            <Text style={{ color: color, fontSize: 14 }}>123 contacts</Text>
        </View>
    }

    return (
        <View style={styles.rootContainer}>
            <ScrollView alwaysBounceVertical={true}>
                <ContactCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={startChatHandler} />
                <ContactCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={startChatHandler} />
                <ContactCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={startChatHandler} />
                <ContactCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={startChatHandler} />
                <ContactCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={startChatHandler} />
                <ContactCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={startChatHandler} />
                <ContactCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={startChatHandler} />
                <ContactCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={startChatHandler} />
                <ContactCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={startChatHandler} />
                <ContactCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={startChatHandler} />
                <ContactCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={startChatHandler} />
                <ContactCard avatar={'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'} onPress={startChatHandler} />
            </ScrollView>
        </View>
    );
};

export default NewChat;
