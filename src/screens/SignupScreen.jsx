import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ToastAndroid, StyleSheet, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import Toast from 'react-native-toast-message';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import SQLite from 'react-native-sqlite-storage';
import { addUser, createTable } from '../database/crud';


const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [db, setDb] = useState(null);

    // useEffect(() => {
    //     const initDb = () => {
    //         const dbInstance = SQLite.openDatabase(
    //             {
    //                 name: 'UserDatabase.db',
    //                 location: 'default',
    //             },
    //             () => {
    //                 console.log('Database opened');
    //                 dbInstance.transaction(tx => {
    //                     tx.executeSql(
    //                         'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT);'
    //                     );
    //                 });
    //                 setDb(dbInstance);
    //             },
    //             error => {
    //                 console.log('Error opening database:', error);
    //                 Toast.show({
    //                     type: 'error',
    //                     text1: 'Error opening database',
    //                     position: 'bottom',
    //                 });
    //             }
    //         );
    //     };
    //     initDb();
    // }, []);


    const handleSignup = async () => {
        if (!email || !password || !name) {
            Toast.show({
                type: 'error',
                text1: 'All fields are required!',
                position: 'bottom',
            });
            return;
        }

        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            if (user) {
                await user.updateProfile({ displayName: name });

                // Fetch user details again to confirm the update
                const updatedUser = firebase.auth().currentUser;

                if (updatedUser) {
                    try {
                        // Create table after successful signup
                        createTable();

                        // Insert user data into the local database
                        await addUser(name, email, password);
                        Toast.show({
                            type: 'success',
                            text1: `User signed up! ${updatedUser.email}`,
                            position: 'bottom',
                        });

                        // navigation.push('Home');
                        console.log('User signed up and profile updated!', updatedUser);
                    } catch (error) {
                        Toast.show({
                            type: 'error',
                            text1: 'Error inserting user data',
                            position: 'bottom',
                        });
                        console.log('Error inserting user data:', error);
                    }
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error fetching updated user details',
                        position: 'bottom',
                    });
                    console.log('Error fetching updated user details');
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error creating user',
                    position: 'bottom',
                });
                console.log('Error creating user');
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error.message,
                position: 'bottom',
            });
            console.log('Error during signup:', error);
        }
    };
    return (
        <View style={styles.container}>
            <Toast />
            <Text style={styles.titleHeading}>Signup</Text>
            <TextInput
                style={styles.inputHeader}
                placeholder="Enter Email"
                onChangeText={setEmail}
                value={email} />
            <TextInput
                style={styles.inputHeader}
                placeholder="Enter Name"
                onChangeText={setName}
                value={name} />
            <TextInput
                style={styles.inputHeader}
                placeholder="Enter Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry />
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Already have an account? Login</Text>
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


export default SignupScreen;
