import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import CommonHeader from '../components/CommonHeader';

const DashboardScreen = () => {
    const screenWidth = Dimensions.get('window').width;

    const data = {
        labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
        datasets: [
            {
                data: [50, 100, 25, 150, 100, 20],
            },
        ],
    };

    return (
        <>
            <CommonHeader screenName="Dashboard" />
            <View style={styles.container}>
                <BarChart
                    data={data}
                    width={screenWidth - (SPACING.space_18 * 3)}
                    height={220}
                    fromZero
                    showValuesOnTopOfBars
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                />
            </View >
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
        padding: SPACING.space_18,
    },
});

export default DashboardScreen;
