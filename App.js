import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/welcome';
import HomeScreen from './screens/home'
import HikerecordScreen from './screens/hikerecord';
import { useEffect } from 'react';
import { initDatabase, addFavoriteColumn } from './database/MHikeDBHelper';
import HikeListScreen from './screens/hikelist';
import HikeDetailsScreen from './screens/hikedetails';
import HikeEditScreen from './screens/hikeedit';
import LocationScreen from './screens/location';
import PopularLocationsScreen from './screens/popularlocations';


const Stack = createNativeStackNavigator(); // to create a stack of screens to navigate between
const App = () => {
  // initializing database
  useEffect(() => {
  initDatabase()
    .then(() => console.log('Database initialized')) // Logging database initialization
    .catch(error => console.error('Database initialization error:', error));
}, []);
  return (
     <NavigationContainer>
      <Stack.Navigator>
        {/* Welcome Page */}
        <Stack.Screen name="Welcome" 
        component={WelcomeScreen} 
        options={{ headerShown: false }}/>
        {/* Home Page */}
        <Stack.Screen name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }}/>
        {/* Hike record Page */}
        <Stack.Screen name="Hike Record" 
        component={HikerecordScreen} 
        options={{ headerShown: false }}/>
        {/* Hike list Page */}
        <Stack.Screen name="Hike List" 
        component={HikeListScreen} 
        options={{ headerShown: false }}/>
        {/* Hike Details Page */}
        <Stack.Screen name="Hike Details" 
        component={HikeDetailsScreen} 
        options={{ headerShown: false }}/>
        {/* Edit Hike Page Page */}
        <Stack.Screen name="Edit Hike" 
        component={HikeEditScreen} 
        options={{ headerShown: false }}/>
        {/* Location Checking Page */}
        <Stack.Screen name="Location" 
        component={LocationScreen} 
        options={{ headerShown: false }}/>
        {/* Popular hike locations Page */}
        <Stack.Screen name="Popular Locations" 
        component={PopularLocationsScreen} 
        options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App