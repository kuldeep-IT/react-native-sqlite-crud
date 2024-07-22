import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { getUsers } from '../database/crud';
import CommonHeader from '../components/CommonHeader';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';

const UserSignupListScreen = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            await getUsers(setUsers);
        };

        fetchUsers();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.userItem}>
            <Text style={styles.itemName}>{item.Name}</Text>
            <Text style={styles.itemEmail}>{item.Email}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <CommonHeader screenName="User Signup List" />
            <FlatList
                style={{
                    marginTop: SPACING.space_18,
                }}
                data={users}
                keyExtractor={item => item.ID.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.Black
    },

    userItem: {
        backgroundColor: COLORS.White,
        padding: SPACING.space_12,
        paddingLeft: SPACING.space_18,
        marginBottom: SPACING.space_12,
        marginHorizontal: SPACING.space_14,
        borderRadius: SPACING.space_18 * 10,
    },

    itemName: {
        fontSize: FONTSIZE.size_18,
        fontWeight: 'bold',
        color: COLORS.Orange
    },

    itemEmail: {
        fontSize: FONTSIZE.size_14,
        color: COLORS.Grey
    },

});

export default UserSignupListScreen