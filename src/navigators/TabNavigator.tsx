/* eslint-disable react/react-in-jsx-scope */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import { StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardScreen from '../screens/DashboardScreen';
import ContactFormScreen from '../screens/ContactFormScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserSignupListScreen from '../screens/UserSignupListScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.Black,
          height: SPACING.space_10 * 10,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={[
                  styles.activeTabBg,
                  focused ? { backgroundColor: COLORS.Orange } : {},
                ]}>
                <MaterialCommunityIcons
                  name="home-circle-outline"
                  color={COLORS.White}
                  size={FONTSIZE.size_30}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={[
                  styles.activeTabBg,
                  focused ? { backgroundColor: COLORS.Orange } : {},
                ]}>
                <MaterialCommunityIcons
                  name="view-dashboard-outline"
                  color={COLORS.White}
                  size={FONTSIZE.size_30}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Contact Form"
        component={ContactFormScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={[
                  styles.activeTabBg,
                  focused ? { backgroundColor: COLORS.Orange } : {},
                ]}>
                <MaterialCommunityIcons
                  name="card-account-mail-outline"
                  color={COLORS.White}
                  size={FONTSIZE.size_30}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={[
                  styles.activeTabBg,
                  focused ? { backgroundColor: COLORS.Orange } : {},
                ]}>
                <MaterialCommunityIcons
                  name="account-circle-outline"
                  color={COLORS.White}
                  size={FONTSIZE.size_30}
                />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="UsersList"
        component={UserSignupListScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={[
                  styles.activeTabBg,
                  focused ? { backgroundColor: COLORS.Orange } : {},
                ]}>
                <MaterialCommunityIcons
                  name="account-group"
                  color={COLORS.White}
                  size={FONTSIZE.size_30}
                />
              </View>
            );
          },
        }}
      />

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeTabBg: {
    backgroundColor: COLORS.Black,
    padding: SPACING.space_18,
    borderRadius: SPACING.space_18 * 10,
  },
});

export default TabNavigator;
