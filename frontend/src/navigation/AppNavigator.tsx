import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ClientHomeScreen from '../screens/ClientHomeScreen';
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen';

export type RootStackParamList = {
  ClientHome: undefined;
  WorkoutDetails: {
    workoutName: string;
    sets: number;
    reps: number;
    unit: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ClientHome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2563EB',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="ClientHome" 
          component={ClientHomeScreen}
          options={{
            title: 'Trainr',
          }}
        />
        <Stack.Screen 
          name="WorkoutDetails" 
          component={WorkoutDetailsScreen}
          options={{
            title: 'Workout Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
