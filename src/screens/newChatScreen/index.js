import { View, Text, ScrollView } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { styles } from './styles';
import ContactCard from '../../components/ui/contactCard';

const NewChat = ({ navigation, route }) => {
    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: 'Select Contact' })
    })

    function startChatHandler() {
        navigation.navigate('ChatScreen')
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
