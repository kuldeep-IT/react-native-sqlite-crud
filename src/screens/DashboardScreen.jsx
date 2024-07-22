import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import CommonHeader from '../components/CommonHeader';
import db from '../database/db';
import { Text } from 'react-native-svg';

const DashboardScreen = () => {
    const screenWidth = Dimensions.get('window').width;
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchUserCreationData = () => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT DateCreated FROM Users;',
                    [],
                    (tx, results) => {
                        const rows = results.rows;
                        let dates = [];
                        for (let i = 0; i < rows.length; i++) {
                            dates.push(new Date(rows.item(i).DateCreated));
                        }

                        // Process data to get the number of users created each month
                        const monthCounts = Array(12).fill(0); // Array to hold counts for each month

                        dates.forEach(date => {
                            const month = date.getMonth(); // Get month (0-11)
                            monthCounts[month] += 1; // Increment count for the month
                        });

                        const data = {
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            datasets: [
                                {
                                    data: monthCounts, // Only show data for Jun to Nov
                                },
                            ],
                        };

                        setChartData(data);
                    },
                    error => {
                        console.log('Error fetching user creation data:', error);
                    }
                );
            });
        };

        fetchUserCreationData();
    }, []);

    if (!chartData) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <>
            <CommonHeader screenName="Dashboard" />
            <View style={styles.container}>
                <BarChart
                    data={chartData}
                    width={screenWidth - (SPACING.space_18 * 3)}
                    height={220}
                    fromZero
                    showValuesOnTopOfBars
                    chartConfig={{
                        backgroundColor: COLORS.Orange,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.Black,
    },
});

export default DashboardScreen;
