import { View, Text, ImageBackground, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/styles.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getHikeById, updateHike } from '../database/MHikeDBHelper.js';

const HikeEdit = ({ route, navigation }) => {
  const { hikeId } = route.params;

  // State for form fields
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [length, setLength] = useState('');
  const [parking, setParking] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [weather, setWeather] = useState('');
  const [terrain, setTerrain] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  // State for error messages
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadHikeData();
  }, []);

  const loadHikeData = async () => {
    try {
      const hike = await getHikeById(hikeId);
      if (hike) {
        setName(hike.name);
        setLocation(hike.location);
        setDate(new Date(hike.date));
        setLength(hike.length.toString());
        setParking(hike.parking);
        setDifficulty(hike.difficulty);
        setWeather(hike.weather || '');
        setTerrain(hike.terrain || '');
        setDescription(hike.description || '');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading hike:', error);
      Alert.alert('Error', 'Failed to load hike details');
      setLoading(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Hike name is required';
    }

    if (!location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!length.trim()) {
      newErrors.length = 'Length is required';
    } else if (isNaN(length) || parseFloat(length) <= 0) {
      newErrors.length = 'Length must be a positive number';
    }

    if (!parking) {
      newErrors.parking = 'Please select parking availability';
    }

    if (!difficulty) {
      newErrors.difficulty = 'Please select difficulty level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showErrorAlert = () => {
    const errorMessages = Object.values(errors)
      .filter(msg => msg !== null && msg !== undefined)
      .join('\n\n');
    
    Alert.alert(
      'Validation Error',
      errorMessages || 'Please check the required fields',
      [{ text: 'OK' }]
    );
  };

  const showConfirmationDialog = () => {
    const hikeDetails = `
Name: ${name}\n
Location: ${location}\n
Date: ${date.toDateString()}\n
Length: ${length} km\n
Parking: ${parking === 'yes' ? 'Yes' : 'No'}\n
Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}\n
${weather ? `Weather: ${weather.charAt(0).toUpperCase() + weather.slice(1)}` : ''}\n
${terrain ? `Terrain: ${terrain.charAt(0).toUpperCase() + terrain.slice(1)}` : ''}\n
${description ? `Description: ${description}` : ''}\n
    `.trim();

    Alert.alert(
      'Confirm Update',
      hikeDetails,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Update',
          onPress: () => updateHikeData()
        }
      ]
    );
  };

  const handleUpdate = () => {
    setErrors({});

    if (validateForm()) {
      showConfirmationDialog();
    } else {
      showErrorAlert();
    }
  };

  const updateHikeData = async () => {
    try {
      const hikeData = {
        name,
        location,
        date: date.toISOString(),
        parking,
        length: parseFloat(length),
        difficulty,
        weather: weather || null,
        terrain: terrain || null,
        description: description || null
      };

      await updateHike(hikeId, hikeData);
      
      Alert.alert(
        'Success',
        'Hike updated successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      console.error('Error updating hike:', error);
      Alert.alert(
        'Error',
        'Failed to update hike. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Edit',
      'Are you sure you want to cancel? Any unsaved changes will be lost.',
      [
        {
          text: 'Continue Editing',
          style: 'cancel'
        },
        {
          text: 'Cancel',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safearea}>
        <Text style={styles.centerText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/hike-history-bg.png')}
        style={styles.background}
      >
        <SafeAreaView style={styles.safearea}>
          <ScrollView>
          <View style={styles.roundContainer}>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={styles.blueHeading}>Edit Hike</Text>
            </View>

            <View style={{ paddingHorizontal: 25, paddingVertical: 15 }}>
              {/* Name Field */}
              <Text style={styles.label}>Name *</Text>
              <TextInput
                placeholder="Enter hike name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) {
                    setErrors({...errors, name: null});
                  }
                }}
                style={[styles.inputBox, errors.name && styles.inputError]}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

              {/* Location Field */}
              <Text style={styles.label}>Location *</Text>
              <TextInput
                placeholder="Hiking Location"
                value={location}
                onChangeText={(text) => {
                  setLocation(text);
                  if (errors.location) {
                    setErrors({...errors, location: null});
                  }
                }}
                style={[styles.inputBox, errors.location && styles.inputError]}
              />
              {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}

              {/* Date and Length Row */}
              <View style={styles.row2}>
                <View style={styles.halfWidth}>
                  <Text style={styles.label}>Date of Hike *</Text>
                  <Pressable
                    style={styles.inputBox}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text>{date.toDateString()}</Text>
                  </Pressable>

                  {showDatePicker && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                    />
                  )}
                </View>

                <View style={styles.halfWidth}>
                  <Text style={styles.label}>Length (km) *</Text>
                  <TextInput
                    placeholder="0.0"
                    value={length}
                    onChangeText={(text) => {
                      setLength(text);
                      if (errors.length) {
                        setErrors({...errors, length: null});
                      }
                    }}
                    style={[styles.inputBox, errors.length && styles.inputError]}
                    keyboardType="numeric"
                  />
                  {errors.length && <Text style={styles.errorText}>{errors.length}</Text>}
                </View>
              </View>

              {/* Parking Available */}
              <View style={{marginBottom:20}}>
                <Text style={styles.label}>Parking Available *</Text>
                <View style={styles.radioRow}>
                  <Pressable 
                    style={styles.radioOption}
                    onPress={() => {
                      setParking('yes');
                      if (errors.parking) {
                        setErrors({...errors, parking: null});
                      }
                    }}
                  >
                    <View style={[styles.radioCircle, errors.parking && styles.radioError]}>
                      {parking === 'yes' && <View style={styles.radioSelected} />}
                    </View>
                    <Text style={styles.radioText}>Yes</Text>
                  </Pressable>

                  <Pressable 
                    style={styles.radioOption}
                    onPress={() => {
                      setParking('no');
                      if (errors.parking) {
                        setErrors({...errors, parking: null});
                      }
                    }}
                  >
                    <View style={[styles.radioCircle, errors.parking && styles.radioError]}>
                      {parking === 'no' && <View style={styles.radioSelected} />}
                    </View>
                    <Text style={styles.radioText}>No</Text>
                  </Pressable>
                </View>
                {errors.parking && <Text style={styles.errorText}>{errors.parking}</Text>}
              </View> 

              {/* Difficulty and Weather Row */}
            <View style={styles.row2}>
                <View style={styles.halfWidth}>
                <Text style={styles.label}>Level of Difficulty *</Text>
                <View style={[styles.pickerContainer, errors.difficulty && styles.inputError]}>
                  <Picker
                    selectedValue={difficulty}
                    onValueChange={(itemValue) => {
                      setDifficulty(itemValue);
                      if (errors.difficulty) {
                        setErrors({...errors, difficulty: null});
                      }
                    }}
                    style={{ height: 215, width: '100%' }}
                  >
                    <Picker.Item label="Difficulty..." value="" />
                    <Picker.Item label="Easy" value="easy" />
                    <Picker.Item label="Moderate" value="moderate" />
                    <Picker.Item label="Hard" value="hard" />
                  </Picker>
                </View>
                {errors.difficulty && <Text style={styles.errorText}>{errors.difficulty}</Text>}
              </View>

                <View style={styles.halfWidth}>
                  <Text style={styles.label}>Weather Condition</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={weather}
                      onValueChange={(itemValue) => setWeather(itemValue)}
                      style={{ height: 215, width: '100%' }}
                    >
                      <Picker.Item label="Weather..." value="" />
                      <Picker.Item label="Sunny" value="sunny" />
                      <Picker.Item label="Cloudy" value="cloudy" />
                      <Picker.Item label="Rainy" value="rainy" />
                      <Picker.Item label="Snowy" value="snowy" />
                    </Picker>
                  </View>
                </View>
              </View>  

              {/* Terrain Type */}
              <View>
                <Text style={styles.label}>Terrain Type</Text>
                <View style={styles.radioRow}>
                  <Pressable 
                    style={styles.radioOption}
                    onPress={() => setTerrain('mountain')}
                  >
                    <View style={styles.radioCircle}>
                      {terrain === 'mountain' && <View style={styles.radioSelected} />}
                    </View>
                    <Text style={styles.radioText}>Mountain</Text>
                  </Pressable>

                  <Pressable 
                    style={styles.radioOption}
                    onPress={() => setTerrain('coastal')}
                  >
                    <View style={styles.radioCircle}>
                      {terrain === 'coastal' && <View style={styles.radioSelected} />}
                    </View>
                    <Text style={styles.radioText}>Coastal</Text>
                  </Pressable>

                  <Pressable 
                    style={styles.radioOption}
                    onPress={() => setTerrain('forest')}
                  >
                    <View style={styles.radioCircle}>
                      {terrain === 'forest' && <View style={styles.radioSelected} />}
                    </View>
                    <Text style={styles.radioText}>Forest</Text>
                  </Pressable>
                </View>
              </View> 

              {/* Description */}
              <View style={{marginTop:12}}>
                <Text style={styles.label}>Description (Optional)</Text>
                <TextInput
                  placeholder="Enter description"
                  value={description}
                  onChangeText={setDescription}
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                  style={[styles.inputBox, styles.multilineInput]}
                />
              </View>

              {/* Buttons */}
              <View style={styles.buttonRow}>
                <Pressable style={styles.saveButton} onPress={handleUpdate}>
                  <Text style={styles.buttonText}>Update Hike</Text>
                </Pressable>

                <Pressable style={styles.clearButton} onPress={handleCancel}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
              </View>

              <View style={styles.footerTextContainer}>
                <Text style={styles.requiredText}>* Required fields</Text>
              </View>
            </View>
          </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

export default HikeEdit;