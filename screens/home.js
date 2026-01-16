import { View, Text, ImageBackground, Pressable, Alert } from 'react-native'
import styles from '../styles/styles.js';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import * as Location from 'expo-location';

const Home = ({navigation}) => {

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  //to retrieve weather emoji according to weather condition
  const getWeatherEmoji = (condition) => {
  const weatherEmojis = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
  };
  return weatherEmojis[condition] || '🌤️';
};

   useEffect(() => {
    fetchWeather();
  }, []);
  useEffect(() => {
  // Subscribe to network state updates
  const unsubscribe = NetInfo.addEventListener(state => {
    setIsOnline(state.isConnected);
  });

  // Cleanup subscription
  return () => unsubscribe();
}, []);
  const fetchWeather = async () => {
  try {
    let lat = 13.7563;  // Default location: Bangkok
    let lon = 100.5018;
    
    // Try to get actual device location
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
          timeout: 5000, // 5 seconds timeout
        });
        
        lat = currentLocation.coords.latitude;
        lon = currentLocation.coords.longitude;
        console.log('Using device location:', lat, lon);
      } else {
        console.log('Location permission denied, using default location');
      }
    } catch (locationError) {
      console.log('Could not get device location, using default:', locationError.message);
      // Falls back to Bangkok coordinates
    }
    
    const API_KEY = ///
    
    const response = await fetch(
      //fetching weather data from coordinates
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    console.log('Weather data:', data); //log weather data fetched
    setWeather(data);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching weather:', error);
    setLoading(false);
  }
};
  
  return (
    <ImageBackground
    source={require('../assets/home-bg.png')}
    style={styles.background}>
  <SafeAreaView style={styles.safearea}>
    <View style={styles.container}>
       {/* Offline Indicator */}
      {!isOnline && (
        <View style={styles.offlineIndicator}>
          <Text style={styles.offlineText}>You are offline</Text>
        </View>
      )}
      <View style={styles.horizontal}>
      <Text style={styles.greet}>Hey, Hiker!</Text>
      <Pressable onPress={() => navigation.navigate('Welcome')}><ImageBackground
      source={require('../assets/m-hike-icon-square.png')}
      style={styles.logosquare}></ImageBackground></Pressable>
      </View>
      <View style={styles.bottomCard}>
        <Text style={styles.blueHeading}>Ready for a hike?</Text>
        <Text style={styles.h2a}>Let's get started</Text>
        {/* Weather Card */}
       <ImageBackground
       source={require('../assets/weather-img.jpg')}
        style={styles.weatherCard}
        imageStyle={{borderRadius: 12,}}
        >
      { weather ? (
        <>
         <Text style={styles.weatherSubtext}>
           {weather.name}, {weather.sys.country}
          </Text>
          <Text style={styles.weatherText}>
            {Math.round(weather.main.temp)}°C - {getWeatherEmoji(weather.weather[0].main)} {weather.weather[0].main}
          </Text>
          <Text style={styles.weatherSubtext}>
            Feels like {Math.round(weather.main.feels_like)}°C
          </Text>
        </>
      ) : (
        <Text style={styles.weatherText}>
      {isOnline ? 'Weather Loading...' : 'Offline - Weather unavailable'}
    </Text>
      )}
    </ImageBackground>
    {/* Home Page Feature Buttons */}
          <View style={styles.row}>
            <View>
      <Pressable style={styles.imageButton}
     onPress={() => navigation.navigate('Hike Record')}>
        <ImageBackground
          source={require('../assets/hike-record.png')}
          style={styles.imageButton}>
            <View style={{padding:10}}>
          <Text style={styles.buttonText}>Record</Text>
          <Text style={styles.buttonText}>My Hike</Text>
          </View>
        </ImageBackground>
      </Pressable>
      <Text style={styles.h2}>Record a new hike</Text>
      </View>

      <View>
      <Pressable style={styles.imageButton}
      onPress={() => navigation.navigate('Hike List')}>
      <ImageBackground
        source={require('../assets/hike-history.png')}
        style={styles.imageButton}>
      <View style={{padding:10}}>
        <Text style={styles.buttonText}>My</Text>
        <Text style={styles.buttonText}>Hike History</Text>
      </View>
</ImageBackground>
</Pressable>
      <Text style={styles.h2}>View your past hikes </Text>
      </View>
    </View>
    <View style={styles.row}>
            <View>
      <Pressable style={styles.imageButton}
        onPress={() => navigation.navigate('Popular Locations')}>
        <ImageBackground
          source={require('../assets/popular-hikes.png')}
          style={styles.imageButton}>
          <View style={{padding:10}}>
            <Text style={styles.buttonText}>Popular</Text>
            <Text style={styles.buttonText}>Hiking Spots</Text>
          </View>
        </ImageBackground>
      </Pressable>
      <Text style={styles.h2}>Find your next hike</Text>
      </View>

      <View>
      <Pressable style={styles.imageButton}
      onPress={() => navigation.navigate('Location')}>
      <ImageBackground
        source={require('../assets/my-location.jpg')}
        style={styles.imageButton}>
        <View style={{padding:10}}>
          <Text style={styles.buttonText}>Check</Text>
          <Text style={styles.buttonText}>My Location</Text>
        </View>
      </ImageBackground>
</Pressable>
      <Text style={styles.h2}>See where you are</Text>
      </View>
    </View>
    {/* Need Help Text Alert */}
    <View style={styles.row}>
      <View style={styles.needHelpContainer}>
    <Pressable onPress={() => {
    Alert.alert(
    'Need Help?',
    "Welcome to M-Hike!\n\n📝 Record your hikes with details like location, date, and difficulty level.\n\n👁️ Add observations for your hikes.\n\n🔍 Search and view all your recorded hikes.\n\nGet started by clicking 'Record My Hike'",    
[
      { text: 'Got it!' }
    ]
  );
}}>
    <Text style={styles.needHelpText}>Need Help?</Text></Pressable>
  
    </View>
      </View>
      </View>
    </View>
  </SafeAreaView>
  </ImageBackground>
)
};
export default Home
