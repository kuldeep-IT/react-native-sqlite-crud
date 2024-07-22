import React from 'react';
import { View, Text, Button, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import { auth } from '../firebase/config';
import Toast from 'react-native-toast-message';

const CommonHeader = ({ screenName }) => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await auth.signOut();

            Toast.show({
                type: 'success',
                text1: `Logged out!`,
                position: 'bottom',
            });


            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }], // Ensure 'LoginScreen' is correctly named in your navigator
                })
            );
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={styles.header}>
            {/* <Toast /> */}
            <Text style={styles.title}>{screenName}</Text>
            <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: SPACING.space_10,
        backgroundColor: COLORS.Orange,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.WhiteRGBA15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: FONTSIZE.size_18,
        fontWeight: 'bold',
        color: COLORS.White,
        marginLeft: SPACING.space_18,
    },
    logoutText: {
        fontSize: FONTSIZE.size_18,
        fontWeight: 'bold',
        color: COLORS.White,
    },
    userInfo: {
        marginTop: SPACING.space_10,
    },
    btnLogout: {
        paddingVertical: SPACING.space_10,
        paddingHorizontal: SPACING.space_18,
        backgroundColor: COLORS.Black,
        borderRadius: SPACING.space_18 * 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default CommonHeader;
