import { View, Text, FlatList, Pressable, Alert, ImageBackground, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllHikes, deleteHike, deleteAllHikes, searchHikesByName, toggleFavorite, getFavoriteHikes } from '../database/MHikeDBHelper';
import styles from '../styles/styles';

const HikeList = ({ navigation }) => {
  const [hikes, setHikes] = useState([]);
  const [filteredHikes, setFilteredHikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  //Reaload hikes when screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadHikes();
    });
    return unsubscribe;
  }, [navigation]);
  //Reload hikes when favorite toggle action is done
  useEffect(() => {
  if (!loading) {
    loadHikes();
  }
}, [showFavoritesOnly]);

  // Load all hikes from database
  const loadHikes = async () => {
  try {
    const allHikes = showFavoritesOnly ? await getFavoriteHikes() : await getAllHikes();
    setHikes(allHikes);
    setFilteredHikes(allHikes);
    setLoading(false);
  } catch (error) {
    console.error('Error loading hikes:', error);
    setLoading(false);
    Alert.alert('Error', 'Failed to load hikes');
  }
};

  // Handle search
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredHikes(hikes); //Show all hikes when search is empty
    } else {
      const filtered = hikes.filter(hike =>
        hike.name.toLowerCase().includes(text.toLowerCase()) //case-insensitive keyword matching
      );
      setFilteredHikes(filtered);
    }
  };

  // Delete hike
  const handleDeleteHike = (id, name) => {
    Alert.alert(
      'Delete Hike',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteHike(id);
              loadHikes();
              Alert.alert('Success', 'Hike deleted successfully');
            } catch (error) {
              console.error('Error deleting hike:', error);
              Alert.alert('Error', 'Failed to delete hike');
            }
          }
        }
      ]
    );
  };

  // Delete all hikes
  const handleDeleteAll = () => {
    if (hikes.length === 0) {
      Alert.alert('No Hikes', 'There are no hikes to delete');
      return;
    }

    Alert.alert(
      'Reset All Hikes',
      'Are you sure you want to delete ALL hikes? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset All',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAllHikes();
              loadHikes();
              setSearchQuery('');
              Alert.alert('Success', 'All hikes deleted successfully');
            } catch (error) {
              console.error('Error deleting all hikes:', error);
              Alert.alert('Error', 'Failed to delete all hikes');
            }
          }
        }
      ]
    );
  };
  //Handle favorite toggle feature
  const handleToggleFavorite = async (id, currentStatus) => {
  try {
    await toggleFavorite(id, currentStatus);
    loadHikes(); // Reload the list
  } catch (error) {
    console.error('Error toggling favorite:', error);
    Alert.alert('Error', 'Failed to update favorite status');
  }
};

  // Get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return '#FFA726';
      case 'moderate':
        return '#FF7043';
      case 'hard':
        return '#E53935';
      default:
        return '#999';
    }
  };

  // Each hike item
const renderHikeItem = ({ item }) => (
  <View style={styles.hikeCard}>
    {/* Header with name, favorite icon, and difficulty badge */}
    <View style={styles.hikeCardHeader}>
      <Text style={styles.hikeName}>{item.name}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Pressable onPress={() => handleToggleFavorite(item.id, item.is_favorite)}>
          <Text style={styles.favoriteIcon}>
            {item.is_favorite ? '⭐' : '☆'}
          </Text>
        </Pressable>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
          <Text style={styles.difficultyText}>
            {item.difficulty?.charAt(0).toUpperCase() + item.difficulty?.slice(1)}
          </Text>
        </View>
      </View>
    </View>

    {/* Location and Date */}
    <View style={styles.hikeMetaRow}>
      <View style={styles.hikeMetaItem}>
        <Text style={styles.hikeMetaIcon}>📍</Text>
        <Text style={styles.hikeMetaText}>{item.location}</Text>
      </View>
      <View style={styles.hikeMetaItem}>
        <Text style={styles.hikeMetaIcon}>📅</Text>
        <Text style={styles.hikeMetaText}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
    </View>

    {/* Length, Parking, Weather */}
    <View style={styles.hikeStatsRow}>
      <View style={styles.hikeStatBox}>
        <Text style={styles.hikeStatIcon}>🧗</Text>
        <Text style={styles.hikeStatValue}>{item.length} km</Text>
        <Text style={styles.hikeStatLabel}>Length</Text>
      </View>

      <View style={styles.hikeStatBox}>
        <Text style={styles.hikeStatIcon}>🚘</Text>
        <Text style={styles.hikeStatValue}>{item.parking === 'yes' ? 'Yes' : 'No'}</Text>
        <Text style={styles.hikeStatLabel}>Parking</Text>
      </View>

      <View style={styles.hikeStatBox}>
        <Text style={styles.hikeStatIcon}>🌤️</Text>
        <Text style={styles.hikeStatValue}>
          {item.weather ? item.weather.charAt(0).toUpperCase() + item.weather.slice(1) : '-'}
        </Text>
        <Text style={styles.hikeStatLabel}>Weather</Text>
      </View>
    </View>

    {/* Terrain Type */}
    {item.terrain && (
      <Text style={styles.hikeTerrain}>
        Terrain: {item.terrain.charAt(0).toUpperCase() + item.terrain.slice(1)}
      </Text>)}

    {/* Description */}
    {item.description && (
      <Text style={styles.hikeDescription} numberOfLines={2}>
        {item.description}
      </Text>)}

    {/* Action Buttons */}
    <View style={styles.hikeActionRow}>
      <Pressable
        style={styles.viewDetailsButton}
        onPress={() => navigation.navigate('Hike Details', { hikeId: item.id })}>
        <Text style={styles.viewDetailsText}>View Details</Text>
      </Pressable>

      <Pressable
        style={styles.editButton}
        onPress={() => navigation.navigate('Edit Hike', { hikeId: item.id })}>
        <Text style={styles.editText}>Edit</Text>
      </Pressable>

      <Pressable
        style={styles.deleteButton}
        onPress={() => handleDeleteHike(item.id, item.name)}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  </View>
);

  return (
    <ImageBackground
      source={require('../assets/hike-history-bg.png')}
      style={styles.background}>
      <SafeAreaView style={styles.safearea}>
        <View style={styles.roundContainer}>
        <View style={styles.listContainer}>
          {/* Header */}
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>My Hikes</Text>
            <Pressable
              style={styles.addHikeButton}
              onPress={() => navigation.navigate('Hike Record')}>
              <Text style={styles.addHikeButtonText}>+ Add Hike</Text>
            </Pressable>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search hikes by name..."
              value={searchQuery}
              onChangeText={handleSearch}/>
          </View>
          {/* Favorites Filter */}
        <Pressable
          style={[styles.favoritesFilter, showFavoritesOnly && styles.favoritesFilterActive]}
          onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}>
          <Text style={[styles.favoritesFilterText, showFavoritesOnly && styles.favoritesFilterTextActive]}>
            {showFavoritesOnly ? '⭐ Showing Favorites' : '☆ Show Favorites Only'}
          </Text>
        </Pressable>

          {/* Hikes List */}
            {loading ? (
              <Text style={styles.centerText}>Loading hikes...</Text>
            ) : filteredHikes.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {searchQuery ? 'No hikes found' : 'No hikes recorded yet'}
                </Text>
                <Text style={styles.emptySubtext}>
                  {searchQuery ? 'Try a different search term' : 'Start by recording your first hike!'}
                </Text>
                {!searchQuery && (
                  <Pressable
                    style={styles.emptyButton}
                    onPress={() => navigation.navigate('Hike Record')}>
                    <Text style={styles.buttonText}>Record a Hike</Text>
                  </Pressable>
                )}
              </View>
            ) : (
              <FlatList
                data={filteredHikes}
                renderItem={renderHikeItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.hikeList}/>
            )}

            {/* Footer Buttons */}
            <View style={styles.listFooter}>
              {hikes.length > 0 && (
                <Pressable
                  style={styles.resetAllButton}
                  onPress={handleDeleteAll}>
                  <Text style={styles.buttonText}>Reset All Hikes</Text>
                </Pressable>
              )}

              <Pressable
                style={styles.backHomeButton}
                onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>🏠 Back to Home</Text>
              </Pressable>
            </View>
         
        </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HikeList;