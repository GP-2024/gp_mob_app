import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SignupScreen from '../gp_mob_app/components/SignupScreen';
import LoginScreen from '../gp_mob_app/components/LoginScreen';
import ProfileScreen from '../gp_mob_app/components/ProfileScreen';
import ScanningScreen from '../gp_mob_app/components/ScanningScreen';

import Icon from 'react-native-vector-icons/FontAwesome6';


const Tab = createBottomTabNavigator();

export default function App() {
  console.log("Code ran!");
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Login') {
              // iconName = focused
              //   ? 'ios-information-circle'
              //   : 'ios-information-circle-outline';
              iconName = 'arrow-right-to-bracket';
            } else if (route.name === 'Sign Up') {
              iconName = 'user-plus'
            } else if (route.name === 'Profile') {
              iconName = 'address-card'
            } else if (route.name === 'Scan') {
              iconName = 'camera'
            }

            return <Icon
              name={iconName}
              size={20}
              color='#2089DC'
            />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Sign Up" component={SignupScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Scan" component={ScanningScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
