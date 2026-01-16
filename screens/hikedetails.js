import { View, Text, ScrollView, Pressable, ImageBackground, Share } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getHikeById } from '../database/MHikeDBHelper';
import styles from '../styles/styles';

const HikeDetails = ({ route, navigation }) => {
  const { hikeId } = route.params;
  const [hike, setHike] = useState(null);
  const [loading, setLoading] = useState(true);
//Load hike details from database
  useEffect(() => {
    loadHikeDetails();
  }, []);
  //Format and share hike record data
  const handleShareHike = async () => {
  try {
    const shareMessage = `
🥾 ${hike.name}

📍 Location: ${hike.location}
📅 Date: ${new Date(hike.date).toLocaleDateString()}
📏 Length: ${hike.length} km
🅿️ Parking: ${hike.parking === 'yes' ? 'Available' : 'Not Available'}
⚡ Difficulty: ${hike.difficulty.charAt(0).toUpperCase() + hike.difficulty.slice(1)}
${hike.weather ? `🌤️ Weather: ${hike.weather.charAt(0).toUpperCase() + hike.weather.slice(1)}` : ''}
${hike.terrain ? `🏔️ Terrain: ${hike.terrain.charAt(0).toUpperCase() + hike.terrain.slice(1)}` : ''}
${hike.description ? `\n📝 ${hike.description}` : ''}

Shared from M-Hike App
    `.trim();

    await Share.share({
      message: shareMessage,
      title: `Hike: ${hike.name}`
    });
  } catch (error) {
    console.error('Error sharing:', error);
  }
};
  //Load hike details from ID and update component state.
  const loadHikeDetails = async () => {
    try {
      const hikeData = await getHikeById(hikeId);
      setHike(hikeData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading hike details:', error);
      setLoading(false);
    }
  };

  //Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.safearea}>
        <Text style={styles.centerText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  //Error state
  if (!hike) {
    return (
      <SafeAreaView style={styles.safearea}>
        <Text style={styles.centerText}>Hike not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/hike-history-bg.png')}
      style={styles.background}>
      <SafeAreaView style={styles.safearea}>
        <ScrollView style={styles.detailsContainer}>
          <View style={styles.detailsCard}>
            {/* Header */}
            <View style={styles.detailsHeader}>
              <Text style={styles.detailsTitle}>{hike.name}</Text>
              <View style={[styles.difficultyBadge, { 
                backgroundColor: hike.difficulty === 'easy' ? '#FFA726' : 
                                 hike.difficulty === 'moderate' ? '#FF7043' : '#E53935' }]}>
                <Text style={styles.difficultyText}>
                  {hike.difficulty?.charAt(0).toUpperCase() + hike.difficulty?.slice(1)}
                </Text>
              </View>
            </View>

            {/* Details Grid */}
            <View style={styles.detailsGrid}>
              <View style={styles.detailsItem}>
                <Text style={styles.detailsLabel}>📍 Location</Text>
                <Text style={styles.detailsValue}>{hike.location}</Text>
              </View>

              <View style={styles.detailsItem}>
                <Text style={styles.detailsLabel}>📅 Date</Text>
                <Text style={styles.detailsValue}>
                  {new Date(hike.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Text>
              </View>

              <View style={styles.detailsItem}>
                <Text style={styles.detailsLabel}>📏 Length</Text>
                <Text style={styles.detailsValue}>{hike.length} km</Text>
              </View>

              <View style={styles.detailsItem}>
                <Text style={styles.detailsLabel}>🅿️ Parking</Text>
                <Text style={styles.detailsValue}>
                  {hike.parking === 'yes' ? 'Available' : 'Not Available'}
                </Text>
              </View>

              {hike.weather && (
                <View style={styles.detailsItem}>
                  <Text style={styles.detailsLabel}>🌤️ Weather</Text>
                  <Text style={styles.detailsValue}>
                    {hike.weather.charAt(0).toUpperCase() + hike.weather.slice(1)}
                  </Text>
                </View>
              )}

              {hike.terrain && (
                <View style={styles.detailsItem}>
                  <Text style={styles.detailsLabel}>🏔️ Terrain</Text>
                  <Text style={styles.detailsValue}>
                    {hike.terrain.charAt(0).toUpperCase() + hike.terrain.slice(1)}
                  </Text>
                </View>
              )}
            </View>

            {/* Description */}
            {hike.description && (
              <View style={styles.descriptionSection}>
                <Text style={styles.descriptionLabel}>Description</Text>
                <Text style={styles.descriptionText}>{hike.description}</Text>
              </View>
            )}

            {/* Action Buttons */}
            <View style={styles.detailsActions}>
              <Pressable
                style={styles.editButtonLarge}
                onPress={() => navigation.navigate('Edit Hike', { hikeId: hike.id })}>
                <Text style={styles.buttonText}>Edit Hike ✏️</Text>
              </Pressable>
              <Pressable
                style={styles.shareButton}
                onPress={handleShareHike}>
                <Text style={styles.buttonText}>Share Hike 📤</Text>
              </Pressable>
              <Pressable
                style={styles.backButtonLarge}
                onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Back to List</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HikeDetails;