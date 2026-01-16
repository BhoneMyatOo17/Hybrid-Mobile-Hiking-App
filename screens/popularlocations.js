import { View, Text, ScrollView, Pressable, ImageBackground, Linking, Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';

const PopularLocations = ({ navigation }) => {
  
  // Predefined popular hiking locations
  const popularHikes = [
    {
      id: 1,
      name: 'Doi Inthanon National Park',
      location: 'Chiang Mai, Thailand',
      description: 'The highest peak in Thailand with stunning waterfalls and nature trails.',
      difficulty: 'moderate',
      estimatedLength: '5.2 km',
      lat: 18.5889,
      lon: 98.4867,
      highlights: 'Twin Royal Pagodas, Waterfalls, Cloud forests'
    },
    {
      id: 2,
      name: 'Khao Yai National Park',
      location: 'Nakhon Ratchasima, Thailand',
      description: 'UNESCO World Heritage site with diverse wildlife and beautiful landscapes.',
      difficulty: 'easy',
      estimatedLength: '3.8 km',
      lat: 14.4396,
      lon: 101.3719,
      highlights: 'Wildlife viewing, Haew Suwat Waterfall, Scenic viewpoints'
    },
    {
      id: 3,
      name: 'Phu Kradueng National Park',
      location: 'Loei, Thailand',
      description: 'Famous for its plateau summit offering breathtaking sunrise and sunset views.',
      difficulty: 'hard',
      estimatedLength: '9.0 km',
      lat: 16.9167,
      lon: 101.8167,
      highlights: 'Plateau summit, Pine forests, Sunrise viewpoint'
    },
    {
      id: 4,
      name: 'Erawan National Park',
      location: 'Kanchanaburi, Thailand',
      description: 'Known for the stunning 7-tiered Erawan Waterfall with emerald green pools.',
      difficulty: 'easy',
      estimatedLength: '2.1 km',
      lat: 14.3719,
      lon: 99.1472,
      highlights: 'Erawan Waterfall, Swimming spots, Limestone caves'
    },
    {
      id: 5,
      name: 'Doi Suthep-Pui National Park',
      location: 'Chiang Mai, Thailand',
      description: 'Sacred mountain with temple and panoramic views of Chiang Mai city.',
      difficulty: 'moderate',
      estimatedLength: '4.5 km',
      lat: 18.8048,
      lon: 98.9216,
      highlights: 'Wat Phra That temple, City views, Hmong village'
    },
  ];
//Difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return '#4CAF50';
      case 'moderate':
        return '#FF9800';
      case 'hard':
        return '#F44336';
      default:
        return '#999';
    }
  };
//Open Hike location on google map from coordinates
  const openInMaps = (hike) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${hike.lat},${hike.lon}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open maps');
    });
  };

  const addToMyHikes = (hike) => {
    Alert.alert(
      'Add to My Hikes',
      `Would you like to add "${hike.name}" to your hiking plans?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Add',
          onPress: () => {
            // Navigate to hike records with pre-filled data
            navigation.navigate('Hike Record', {
              prefillData: {
                name: hike.name,
                location: hike.location,
                length: hike.estimatedLength.replace(' km', ''),
                difficulty: hike.difficulty
              }
            });
          }}]
    );
  };

  return (
    <ImageBackground
      source={require('../assets/popular-hikes-bg.png')}
      style={styles.background}>
      <SafeAreaView style={styles.safearea}>
        <ScrollView style={styles.popularContainer}>
          <View style={styles.popularHeader}>
            <Text style={styles.popularTitle}>🏔️ Popular Hiking Spots</Text>
            <Text style={styles.popularSubtitle}>
              Discover amazing trails across Thailand.
            </Text>
          </View>

          {popularHikes.map((hike) => (
            <View key={hike.id} style={styles.popularCard}>
              <View style={styles.popularCardHeader}>
                <Text style={styles.popularHikeName}>{hike.name}</Text>
                <View style={[styles.popularDifficultyBadge, { 
                  backgroundColor: getDifficultyColor(hike.difficulty)}]}>
                  <Text style={styles.popularDifficultyText}>
                    {hike.difficulty.charAt(0).toUpperCase() + hike.difficulty.slice(1)}
                  </Text>
                </View>
              </View>

              <Text style={styles.popularLocation}>📍 {hike.location}</Text>
              <Text style={styles.popularDescription}>{hike.description}</Text>
              <View style={styles.popularInfoRow}>
              <Text style={styles.popularInfoText}>🧗 ~{hike.estimatedLength}</Text>
              </View>
              <View style={styles.popularHighlights}>
                <Text style={styles.popularHighlightsTitle}>✨ Highlights:</Text>
                <Text style={styles.popularHighlightsText}>{hike.highlights}</Text>
              </View>
              <View style={styles.popularActions}>
                <Pressable
                  style={styles.popularMapButton}
                  onPress={() => openInMaps(hike)}>
                  <Text style={styles.popularButtonText}>Get Directions</Text>
                </Pressable>

                <Pressable
                  style={styles.popularAddButton}
                  onPress={() => addToMyHikes(hike)}>
                  <Text style={styles.popularButtonText}>Plan This Hike</Text>
                </Pressable>
              </View>
            </View>)
          )
          }
   <View style={{ height: 80 }} />
    </ScrollView>
        {/* Floating Action Button */}
        <Pressable
          style={styles.fab}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.fabText}>⌂</Text>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default PopularLocations;