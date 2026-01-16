import { View, Text, ImageBackground, Pressable } from 'react-native'
import React from 'react'
import styles from '../styles/styles.js';
import { SafeAreaView } from 'react-native-safe-area-context'

const Welcome = ({navigation}) => {
  return (
   <ImageBackground
   source={require('../assets/welcome-img.jpg')}
   style = {styles.background}>
    <SafeAreaView
    style = {styles.safearea}>
      <View style = {styles.endContainer}>
      <Text style = {styles.welcomeText1}>Memories</Text>
      <Text style = {styles.welcomeText1}>in Every Mile</Text>
      <Text style = {styles.welcomeText2}>Turn your hikes into lasting stories</Text>
      <Text style = {styles.welcomeText2}>record your hike and relive adventures anytime, anywhere.</Text>
      <Pressable style = {styles.welcomebutton} 
      onPress={() => navigation.navigate('Home')}
      ><Text style = {styles.welcomeText3} >Get Started</Text></Pressable>
      </View>
      
    </SafeAreaView>
   </ImageBackground>
  )
}

export default Welcome