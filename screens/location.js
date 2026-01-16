import { View, Text, ImageBackground, Pressable, ActivityIndicator, Linking, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import styles from '../styles/styles';

const LocationScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
  try {
    setLoading(true);
    setError(null);

    // Request location permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      setError('Permission to access location was denied');
      setLoading(false);
      return;
    }

    // Get current position with timeout
    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      timeout: 10000, // 10 seconds timeout
    });

    const { latitude, longitude } = currentLocation.coords;
    setLocation({ lat: latitude, lon: longitude });

    // Reverse geocode to get address
    const addressData = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (addressData && addressData.length > 0) {
      setAddress(addressData[0]);
    }

    setLoading(false);
  } catch (err) {
    console.error('Error getting location:', err);
    
    // Fallback to last known location
    try {
      const lastLocation = await Location.getLastKnownPositionAsync();
      if (lastLocation) {
        const { latitude, longitude } = lastLocation.coords;
        setLocation({ lat: latitude, lon: longitude });
        
        const addressData = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        
        if (addressData && addressData.length > 0) {
          setAddress(addressData[0]);
        }
        setLoading(false);
        Alert.alert('Notice', 'Using last known location');
        return;
      }
    } catch (fallbackErr) {
      console.error('Fallback error:', fallbackErr);
    }
    
    setError('Location services unavailable. Please enable GPS on your device.');
    setLoading(false);
  }
};

  const openInMaps = () => {
    if (location) {
      const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lon}`;
      Linking.openURL(url);
    }
  };

  if (loading) {
    return (
      <ImageBackground
        source={require('../assets/my-location-bg.jpg')}
        style={styles.background}
      >
        <SafeAreaView style={styles.safearea}>
          <View style={styles.locationContainer}>
            <ActivityIndicator size="large" color="#636CCB" />
            <Text style={styles.locationLoadingText}>Getting your location...</Text>
            <Text style={styles.locationSubtext}>This may take a few seconds</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  if (error) {
    return (
      <ImageBackground
        source={require('../assets/my-location-bg.jpg')}
        style={styles.background}
      >
        <SafeAreaView style={styles.safearea}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationErrorText}>❌{error}</Text>
            <Pressable style={styles.retryButton} onPress={getCurrentLocation}>
              <Text style={styles.buttonText}>Try Again</Text>
            </Pressable>
            <Pressable style={styles.backButtonLarge} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Back to Home</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/my-location-bg.jpg')}
      style={styles.background}>
      <SafeAreaView style={styles.safearea}>
        <View style={styles.locationContainer}>
          <View style={styles.locationCard}>
            <Text style={styles.locationTitle}>📍 Your Location</Text>

            <View style={styles.locationInfoSection}>
              <Text style={styles.locationLabel}>Coordinates:</Text>
              <Text style={styles.locationValue}>
                {location.lat.toFixed(6)}°, {location.lon.toFixed(6)}°
              </Text>
            </View>

            {address && (
              <>
                {address.city && (
                  <View style={styles.locationInfoSection}>
                    <Text style={styles.locationLabel}>City:</Text>
                    <Text style={styles.locationValue}>{address.city}</Text>
                  </View>
                )}

                {address.region && (
                  <View style={styles.locationInfoSection}>
                    <Text style={styles.locationLabel}>Region:</Text>
                    <Text style={styles.locationValue}>{address.region}</Text>
                  </View>
                )}

                {address.country && (
                  <View style={styles.locationInfoSection}>
                    <Text style={styles.locationLabel}>Country:</Text>
                    <Text style={styles.locationValue}>{address.country}</Text>
                  </View>
                )}

                {address.postalCode && (
                  <View style={styles.locationInfoSection}>
                    <Text style={styles.locationLabel}>Postal Code:</Text>
                    <Text style={styles.locationValue}>{address.postalCode}</Text>
                  </View>
                )}

                {(address.street || address.name) && (
                  <View style={styles.locationInfoSection}>
                    <Text style={styles.locationLabel}>Address:</Text>
                    <Text style={styles.locationFullAddress}>
                      {address.street || address.name}
                      {address.district ? `, ${address.district}` : ''}
                    </Text>
                  </View>
                )}
              </>
            )}

        <View style={styles.locationActions}>
          <Pressable style={styles.openMapsButton} onPress={openInMaps}>
            <Text style={styles.buttonText}>🗺️ Open in Maps</Text>
          </Pressable>

          <Pressable style={styles.refreshButton} onPress={getCurrentLocation}>
            <Text style={styles.buttonText}>🔄 Refresh</Text>
          </Pressable>

          <Pressable style={styles.backButtonLarge} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>← Back to Home</Text>
          </Pressable>
        </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LocationScreen;