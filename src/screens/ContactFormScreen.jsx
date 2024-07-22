import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import CommonHeader from '../components/CommonHeader';
import { auth, firebase } from '../firebase/config';
import { addContactInfo, getContactInfoByEmail, getUserByEmail, updateContactInfo, updateUser } from '../database/crud';
import Toast from 'react-native-toast-message';

const ContactFormScreen = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const user = firebase.auth().currentUser;
        if (user) {
            setEmail(user.email);
            getContactInfoByEmail(user.email, contactInfo => {
                if (contactInfo) {
                    setName(contactInfo.Name || '');
                    setPhone(contactInfo.Phone || '');
                    setAddress(contactInfo.Address || '');
                }
            });
        } else {
            // Handle user not logged in
            console.log('User not logged in');
            Toast.show({
                type: 'error',
                text1: 'User not logged in',
                position: 'bottom',
            })
        }
    }, []);

    const handleSubmit = async () => {

        if (!email || !name || !phone || !address) {
            Toast.show({
                type: 'error',
                text1: 'All fields are required!',
                position: 'bottom',
            });
            return;
        }

        try {
            const existingContactInfo = await new Promise(resolve => getContactInfoByEmail(email, resolve));
            if (existingContactInfo) {
                await updateContactInfo(email, name, phone, address);
                console.log('Contact information updated successfully');
                Toast.show({
                    type: 'success',
                    text1: 'Contact information updated successfully',
                    position: 'bottom',
                });
            } else {
                await addContactInfo(email, name, phone, address);
                console.log('Contact information added successfully');
                Toast.show({
                    type: 'success',
                    text1: 'Contact information added successfully',
                    position: 'bottom',
                });
            }
        } catch (error) {
            console.error('Error handling contact information:', error);
            Toast.show({
                type: 'error',
                text1: 'Failed to handle contact information',
                text2: error.message,
                position: 'bottom',
            });
        }
    };

    return (
        <>
            <CommonHeader screenName="Contact Form" />
            <View style={styles.container}>
                <TextInput
                    style={styles.inputHeader}
                    placeholder="Nick Name" onChangeText={setName} value={name} />
                <TextInput
                    style={styles.inputHeader}
                    placeholder="Phone" onChangeText={setPhone} value={phone} />
                <TextInput
                    style={styles.inputHeader}
                    placeholder="Address" onChangeText={setAddress} value={address} />
                <TouchableOpacity
                    style={styles.buttonStyle}
                    title="Submit" onPress={handleSubmit} >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

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

export default ContactFormScreen;
