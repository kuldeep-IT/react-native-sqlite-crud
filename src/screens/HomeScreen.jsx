import React from 'react';
import { Text, View } from 'react-native';
import { COLORS, FONTSIZE } from '../theme/theme';

const HomeScreen = () => {
    return (
        <View style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.Black,
        }}>
            <Text style={{
                fontSize: FONTSIZE.size_30,
                color: COLORS.White
            }}>Welcome</Text>
        </View>
    );
};

export default HomeScreen;