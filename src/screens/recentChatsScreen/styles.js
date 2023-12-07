import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../constants/theme';

export const styles = StyleSheet.create({
    rootContainer: {
        flex: 1, backgroundColor: COLORS.green_500,
        paddingBottom: Platform.select({ ios: 20 })
    },
    newChatButton: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: COLORS.green_200,
        height: 50,
        width: 50,
        borderRadius: 10,
        elevation: 4,
        shadowColor: COLORS.black,
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: .7
    }
});
