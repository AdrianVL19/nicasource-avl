import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ListScreen from '../screens/ListScreen';
import ReadQR from '../screens/ReadQR';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={{ backgroundColor: '#000' }}
        tabBarOptions={{
          activeTintColor: '#31CE73',
          activeBackgroundColor: 'rgba(7, 36, 62, 0.9)',
          inactiveTintColor: '#fff',
          inactiveBackgroundColor: 'rgba(7, 36, 62, 0.9)',
          showLabel: false,
        }}
      >
        <Tab.Screen
          name="List"
          component={ListScreen}
          options={{
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ color }) => (
              <Ionicons name="list" size={28} color={color} />

            ),
          }}
        />
        <Tab.Screen
          name="ReadQR"
          component={ReadQR}
          options={{
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ color }) => (
              <Ionicons name="qr-code-outline" size={28} color={color} />

            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
