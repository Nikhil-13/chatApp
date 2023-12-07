import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";
export const styles = StyleSheet.create({
    rootContainer: {
        height: 70
    }, outerContainer: {
        marginVertical: 5,
        gap: 10,
        height: '100%',
        width: "100%",
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avatarImage: {
        height: 50,
        width: 50,
        borderRadius: 40,
        objectFit: 'cover'
    },
    detailContainer: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 4
    },
    userDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 4
    },
    userNameText: {
        color: COLORS.white
        , fontSize: 18
    }

    , statusContainer: {
        width: "100%"
    }
    , statusText: {
        color: COLORS.white
    }
})