import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import CommonHeader from '../components/CommonHeader';
import { getUserByEmail, updateUser } from '../database/crud';
import { firebase } from '../firebase/config';
import Toast from 'react-native-toast-message';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [storedPassword, setStoredPassword] = useState('');

    useEffect(() => {
        const user = firebase.auth().currentUser;
        if (user) {
            setEmail(user.email);
            getUserByEmail(user.email, userInfo => {
                if (userInfo) {
                    setName(userInfo.Name || '');
                    setStoredPassword(userInfo.Password || '');
                }
            });
        } else {
            // Handle user not logged in
            console.log('User not logged in');
            Toast.show({
                type: 'error',
                text1: 'User not logged in',
                position: 'bottom',
            });
        }
    }, []);
    const handleSubmit = async () => {
        if (!email || !name || !currentPassword || !newPassword || !confirmNewPassword) {
            Toast.show({
                type: 'error',
                text1: 'All fields are required!',
                position: 'bottom',
            });
            return;
        }

        if (currentPassword !== storedPassword) {
            Toast.show({
                type: 'error',
                text1: 'Current password is incorrect!',
                position: 'bottom',
            });
            return;
        }

        if (newPassword !== confirmNewPassword) {
            Toast.show({
                type: 'error',
                text1: 'New passwords do not match!',
                position: 'bottom',
            });
            return;
        }

        try {
            await updateUser(email, name, newPassword);
            console.log('User information updated successfully');
            Toast.show({
                type: 'success',
                text1: 'User information updated successfully',
                position: 'bottom',
            });
        } catch (error) {
            console.error('Error updating user information:', error);
            Toast.show({
                type: 'error',
                text1: 'Failed to update user information',
                text2: error.message,
                position: 'bottom',
            });
        }
    };
    return (
        <>
            <CommonHeader screenName="Profile" />
            <View style={styles.container}>
                <TextInput
                    style={styles.inputHeader}
                    placeholder="Name"
                    onChangeText={setName}
                    value={name}
                />
                <TextInput
                    style={styles.inputHeader}
                    placeholder="Current Password"
                    secureTextEntry
                    onChangeText={setCurrentPassword}
                    value={currentPassword}
                />
                <TextInput
                    style={styles.inputHeader}
                    placeholder="New Password"
                    secureTextEntry
                    onChangeText={setNewPassword}
                    value={newPassword}
                />
                <TextInput
                    style={styles.inputHeader}
                    placeholder="Confirm New Password"
                    secureTextEntry
                    onChangeText={setConfirmNewPassword}
                    value={confirmNewPassword}
                />
                <TouchableOpacity
                    style={styles.buttonStyle}
                    title="Submit"
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            <Toast />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.Black,
    },

    inputHeader: {
        width: '80%',
        backgroundColor: COLORS.White,
        padding: SPACING.space_10,
        borderRadius: SPACING.space_18 * 10,
        marginBottom: SPACING.space_18,
        fontSize: FONTSIZE.size_20,
        borderColor: COLORS.Orange,
        paddingLeft: SPACING.space_18,
        borderWidth: 2,
    },
    buttonStyle: {
        backgroundColor: COLORS.Orange,
        padding: SPACING.space_12,
        paddingHorizontal: SPACING.space_18 * 2,
        borderRadius: SPACING.space_18 * 10,
        marginBottom: SPACING.space_18,
        alignItems: 'center',
    },

    buttonText: {
        color: COLORS.White,
        fontSize: FONTSIZE.size_20,
        fontWeight: 'bold',
    },

    titleHeading: {
        fontSize: FONTSIZE.size_30,
        color: COLORS.White,
        fontWeight: 'bold',
        marginBottom: SPACING.space_18 * 2,

    },
});


export default ProfileScreen