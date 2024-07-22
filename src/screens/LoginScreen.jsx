import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import Toast from 'react-native-toast-message';
import { CommonActions } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log('User logged in!', user);
            Toast.show({
                type: 'success',
                text1: 'Login Successful',
                position: 'bottom',
            });

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Tab' }],
                })
            );

        } catch (error) {
            console.error(error);
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: error.message,
                position: 'bottom',
            });
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.titleHeading}>Log in</Text>
            <TextInput
                style={styles.inputHeader}
                placeholder="Enter Email"
                onChangeText={setEmail}
                value={email} />
            <TextInput
                style={styles.inputHeader}
                placeholder="Enter Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry />
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.loginText}>Want to create new account? Sign up</Text>
            </TouchableOpacity>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: COLORS.Black,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titleHeading: {
        fontSize: FONTSIZE.size_30,
        color: COLORS.White,
        fontWeight: 'bold',
        marginBottom: SPACING.space_18 * 2,

    },

    center: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },

    inputHeader: {
        width: '80%',
        backgroundColor: COLORS.White,
        padding: SPACING.space_18,
        borderRadius: SPACING.space_18 * 10,
        marginBottom: SPACING.space_18,
        fontSize: FONTSIZE.size_20,
        borderColor: COLORS.Orange,
        borderWidth: 2,
    },

    containerGap36: {
        gap: SPACING.space_36
    },

    buttonStyle: {
        width: '80%',
        backgroundColor: COLORS.Orange,
        padding: SPACING.space_18,
        borderRadius: SPACING.space_18 * 10,
        marginBottom: SPACING.space_18,
        alignItems: 'center',
    },

    buttonText: {
        color: COLORS.White,
        fontSize: FONTSIZE.size_20,
        fontWeight: 'bold',
    },

    loginText: {
        color: COLORS.White,
        fontSize: FONTSIZE.size_16,
        marginTop: SPACING.space_18,
    },
});

export default LoginScreen;
